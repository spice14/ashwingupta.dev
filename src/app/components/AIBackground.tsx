import { useEffect, useRef } from "react";
import { useIsMobile, useIsTouchDevice } from "../../hooks/useMediaQuery";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  activationTimer: number;
  activationDuration: number;
  layer: number;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
}

// ── Black monochrome palette with white accents ─────────────────────────────
const BG = "0,0,0"; // pure black
const NODE_DIM = "rgba(255,255,255,";
const NODE_BRIGHT = "rgba(255,255,255,";
const EDGE_COLOR = "255,255,255";
const PARTICLE_COLOR = "255,255,255";

// Mobile vs Desktop counts - reduce for better mobile performance
const getNodeCount = (isMobile: boolean) => (isMobile ? 40 : 80);
const getParticleCount = (isMobile: boolean) => (isMobile ? 15 : 30);
const getConnectionDist = (isMobile: boolean) => (isMobile ? 150 : 200);

const CONNECTION_DIST_DESKTOP = 200;
const PACKET_INTERVAL = 3;
const PACKET_SPEED_MIN = 0.04;
const PACKET_SPEED_MAX = 0.08;
const NODE_SPEED = 0.4;
const PARTICLE_COUNT = 30;

export function AIBackground() {
  const isMobile = useIsMobile();
  const isTouchDevice = useIsTouchDevice();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const packetsRef = useRef<Packet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Dynamic counts based on device
    const NODE_COUNT = getNodeCount(isMobile);
    const PARTICLE_COUNT = getParticleCount(isMobile);
    const CONNECTION_DIST = getConnectionDist(isMobile);

    // ── mouse tracking for interactivity (disabled on touch devices) ───────
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ── resize ─────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      initNodes();
      initParticles();
    };

    // ── init nodes ──────────────────────────────────────────────────────────
    const initNodes = () => {
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => {
        const layer = Math.floor(Math.random() * 3);
        const speed = NODE_SPEED * (0.5 + layer * 0.3);
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: 1.5 + layer * 0.8 + Math.random() * 0.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.04 + Math.random() * 0.03,
          layer,
          activationTimer: 0,
          activationDuration: 30 + Math.floor(Math.random() * 25),
        };
      });
    };

    // ── init floating particles ────────────────────────────────────────────
    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 0.5 + Math.random() * 1.5,
        alpha: 0.1 + Math.random() * 0.3,
        life: Math.random(),
      }));
    };

    // ── spawn packet ────────────────────────────────────────────────────────
    const spawnPacket = () => {
      const nodes = nodesRef.current;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const from = nodes[fromIdx];

      const candidates: number[] = [];
      for (let i = 0; i < nodes.length; i++) {
        if (i === fromIdx) continue;
        const dx = nodes[i].x - from.x;
        const dy = nodes[i].y - from.y;
        if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DIST) candidates.push(i);
      }
      if (candidates.length === 0) return;

      const toIdx = candidates[Math.floor(Math.random() * candidates.length)];
      nodes[fromIdx].activationTimer = nodes[fromIdx].activationDuration;

      packetsRef.current.push({
        fromNode: fromIdx,
        toNode: toIdx,
        progress: 0,
        speed:
          PACKET_SPEED_MIN +
          Math.random() * (PACKET_SPEED_MAX - PACKET_SPEED_MIN),
      });
    };

    // ── draw grid pattern ───────────────────────────────────────────────────
    const drawGrid = (time: number) => {
      const W = canvas.width,
        H = canvas.height;
      const gridSize = 50;
      const offset = (time * 0.02) % gridSize;

      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = -offset; x < W + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -offset; y < H + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    };

    // ── draw scanlines effect ───────────────────────────────────────────────
    const drawScanlines = () => {
      const W = canvas.width,
        H = canvas.height;
      ctx.fillStyle = "rgba(255,255,255,0.015)";
      for (let y = 0; y < H; y += 4) {
        ctx.fillRect(0, y, W, 1);
      }
    };

    // ── draw loop ────────────────────────────────────────────────────────────
    const draw = () => {
      const nodes = nodesRef.current;
      const packets = packetsRef.current;
      const particles = particlesRef.current;
      const W = canvas.width,
        H = canvas.height;

      // Pure black background
      ctx.fillStyle = `rgba(${BG},1)`;
      ctx.fillRect(0, 0, W, H);

      // Subtle grid (skip on mobile for performance)
      if (!isMobile) {
        drawGrid(frameRef.current);
      }

      // Scanlines for that premium tech feel (skip on mobile for performance)
      if (!isMobile) {
        drawScanlines();
      }

      frameRef.current++;
      if (frameRef.current % PACKET_INTERVAL === 0) spawnPacket();
      if (Math.random() < 0.12) spawnPacket();

      // ── move and draw particles ────────────────────────────────────────────
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.01;
        p.alpha = 0.2 + Math.sin(p.life) * 0.15;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR},${p.alpha})`;
        ctx.fill();
      }

      // ── move nodes with mouse interaction ──────────────────────────────────
      const mouse = mouseRef.current;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.activationTimer > 0) n.activationTimer--;

        // Mouse repulsion (disabled on touch devices for performance)
        if (!isTouchDevice) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150;
            n.x += (dx / dist) * force * 2;
            n.y += (dy / dist) * force * 2;
          }
        }

        if (n.x < 0 || n.x > W) {
          n.vx *= -1;
          n.x = Math.max(0, Math.min(W, n.x));
        }
        if (n.y < 0 || n.y > H) {
          n.vy *= -1;
          n.y = Math.max(0, Math.min(H, n.y));
        }
      }

      // ── draw edges with glow ───────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = b.x - a.x,
            dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECTION_DIST) continue;

          const fade = 1 - dist / CONNECTION_DIST;
          const isActive = a.activationTimer > 0 || b.activationTimer > 0;
          const alpha = isActive ? fade * 0.6 : fade * 0.12;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${EDGE_COLOR},${alpha.toFixed(3)})`;
          ctx.lineWidth = isActive ? 1.2 : 0.4;
          ctx.stroke();

          // Add glow to active connections
          if (isActive) {
            ctx.strokeStyle = `rgba(${EDGE_COLOR},${(alpha * 0.3).toFixed(3)})`;
            ctx.lineWidth = 3;
            ctx.stroke();
          }
        }
      }

      // ── draw nodes with enhanced glow ──────────────────────────────────────
      for (const n of nodes) {
        const ps = 1 + Math.sin(n.pulse) * 0.25;
        const isActive = n.activationTimer > 0;
        const frac = n.activationTimer / n.activationDuration;

        if (isActive) {
          // Outer glow ring
          const ring = n.radius * (4 + frac * 8) * ps;
          const rg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, ring);
          rg.addColorStop(0, `rgba(255,255,255,${(frac * 0.4).toFixed(3)})`);
          rg.addColorStop(0.5, `rgba(255,255,255,${(frac * 0.15).toFixed(3)})`);
          rg.addColorStop(1, "rgba(255,255,255,0)");
          ctx.beginPath();
          ctx.arc(n.x, n.y, ring, 0, Math.PI * 2);
          ctx.fillStyle = rg;
          ctx.fill();

          // Inner bright ring
          const innerRing = n.radius * 2.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, innerRing, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${(frac * 0.2).toFixed(3)})`;
          ctx.fill();
        }

        // Core dot with glow
        const coreAlpha = isActive ? 1 : 0.3 + n.layer * 0.15;
        const coreGlow = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          n.radius * ps * 2,
        );
        coreGlow.addColorStop(0, `${NODE_BRIGHT}${coreAlpha})`);
        coreGlow.addColorStop(1, `${NODE_BRIGHT}${coreAlpha * 0.3})`);

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * ps * 2, 0, Math.PI * 2);
        ctx.fillStyle = coreGlow;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * ps, 0, Math.PI * 2);
        ctx.fillStyle = `${NODE_BRIGHT}${coreAlpha})`;
        ctx.fill();
      }

      // ── draw packets with enhanced trails ──────────────────────────────────
      packetsRef.current = packets.filter((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          nodes[p.toNode].activationTimer = nodes[p.toNode].activationDuration;
          return false;
        }

        const from = nodes[p.fromNode],
          to = nodes[p.toNode];
        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;

        // Long glowing trail
        const t0 = Math.max(0, p.progress - 0.25);
        const tx = from.x + (to.x - from.x) * t0;
        const ty = from.y + (to.y - from.y) * t0;

        const tg = ctx.createLinearGradient(tx, ty, px, py);
        tg.addColorStop(0, "rgba(255,255,255,0)");
        tg.addColorStop(0.5, "rgba(255,255,255,0.6)");
        tg.addColorStop(1, "rgba(255,255,255,1)");
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = tg;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bright head with glow
        const hg = ctx.createRadialGradient(px, py, 0, px, py, 6);
        hg.addColorStop(0, "rgba(255,255,255,1)");
        hg.addColorStop(0.5, "rgba(255,255,255,0.6)");
        hg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();

        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
}
