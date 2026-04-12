import { motion } from "motion/react";
import { useState } from "react";
import type React from "react";
import { useIsMobile, useIsTablet } from "../../hooks/useMediaQuery";

function renderBullet(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: "#e8e0d0", fontWeight: 600 }}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
// @ts-ignore
import pinnsPdfUrl from "../../assets/PINNs whitepaper.pdf?url";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

type ItemType = "paper" | "whitepaper" | "github" | "commercial";

type ResearchItem = {
  type: ItemType;
  name: string;
  title: string;
  subtitle?: string;
  link: string;
  bullets: [string, string, string, string];
};

const TYPE_META: Record<
  ItemType,
  { label: string; color: string; border: string; bg: string; glow: string }
> = {
  paper: {
    label: "Published",
    color: "#EAB308",
    border: "rgba(234,179,8,0.45)",
    bg: "rgba(234,179,8,0.10)",
    glow: "0 0 2px rgba(234,179,8,0.35)",
  },
  whitepaper: {
    label: "White Paper",
    color: "#10B981",
    border: "rgba(16,185,129,0.45)",
    bg: "rgba(16,185,129,0.10)",
    glow: "0 0 2px rgba(16,185,129,0.35)",
  },
  github: {
    label: "Open Source",
    color: "#60A5FA",
    border: "rgba(96,165,250,0.45)",
    bg: "rgba(96,165,250,0.10)",
    glow: "0 0 2px rgba(96,165,250,0.35)",
  },
  commercial: {
    label: "Commercial Software (In Development)",
    color: "#ffffff",
    border: "rgba(139,92,246,0.55)",
    bg: "rgba(93,33,182,0.22)",
    glow: "0 0 8px rgba(139,92,246,0.35)",
  },
};

const RESEARCH_LABELS = ["Problem", "Method", "System design", "Insight"];

const items: ResearchItem[] = [
  {
    type: "paper",
    name: "NCISCT 2022",
    title: "Automated Assessment Generation — Graphs & Language Models",
    subtitle: "Published Research · IJISET · Vol. 9 Special Issue",
    link: "https://ijiset.com/conference/NCISCT-2022/IJISET-NCISCT-220520.pdf",
    bullets: [
      "**Distractor construction** requires semantic reasoning — not just question writing; wrong options must be plausible enough to distinguish genuine understanding from guessing",
      "**BERT** summarizes → **proper nouns anchor pivots** → **WordNet/ConceptNet** generate distractors via hierarchical fallback",
      "WordNet: **hypernym→hyponym chains** with sense disambiguation; ConceptNet: **part-of relationships** as fallback when WordNet sense coverage is insufficient",
      "**Semantic distance** from the correct answer determines MCQ validity more than linguistic fluency",
    ],
  },
  {
    type: "whitepaper",
    name: "PINNs White Paper",
    title: "Physics-Informed Inference for Partial Observability",
    link: pinnsPdfUrl as string,
    bullets: [
      "Known governing dynamics, **incomplete internal state visibility** — operational decisions made blind on partial telemetry",
      "**PDEs embedded into the training objective** alongside data loss — not as post-hoc constraints applied after learning",
      "**Staged training** balances telemetry fidelity against PDE adherence; convergence diagnosed via **physical consistency** metrics",
      "Physical constraints **regularize learning** — preventing silent invalid extrapolation under **distribution shift**",
    ],
  },
  {
    type: "github",
    name: "PHYSCLIP",
    title:
      "Contrastive Regime Classification — Symbolic and Observed Space Alignment",
    link: "https://github.com/spice14/PHYSCLIP",
    bullets: [
      "Existing physics-informed approaches **assume known governing equations** — the harder question of **which physics applies** first goes unanswered",
      "**CLIP-inspired dual encoders**: a text encoder for symbolic descriptions (equations, boundary conditions, regimes) and a field encoder for observed physical data, trained jointly into a **shared latent space**",
      "**Contrastive objective** pulls matched physics-description/physical-state pairs together and pushes mismatched ones apart — PHYSCLIP acts as a **perception layer upstream of PINNs**, resolving regime before equation enforcement begins",
      "**Latent proximity encodes physical meaning** — representation learning restores context to physics rather than replacing it, enabling **interpretable regime identification** under partial observability",
    ],
  },
  {
    type: "commercial",
    name: "ScholarOS",
    title:
      "Research as Structured Execution — Deterministic Services Over Autonomous Generation",
    link: "/projects/12",
    bullets: [
      "Fluent AI outputs with **no traceable evidence link** — unfit for workflows requiring reproducibility",
      "**Five locked MCP services** via central orchestrator: literature mapping, contradiction detection, hypothesis critique, evidence extraction, proposal assembly",
      "Agentic reasoning **scoped to hypothesis critique only** — all other stages deterministic with **schema-defined interfaces**",
      "Every claim **bound to source evidence**; contradiction detection surfaces where **scholarly consensus breaks**",
    ],
  },
  {
    type: "commercial",
    name: "controla",
    title:
      "Local Inference That Learns — Routing That Compounds With Every Deployment",
    link: "/projects/11",
    bullets: [
      "**Local inference is stateless by default** — routing ignores task type, available hardware, and prior outcomes; nothing is learned between requests, and every restart discards what worked",
      "**Gets better the longer it runs** — every request is an observation; routing adapts to your exact workload and hardware without manual tuning",
      "**Policy changes are validated before they ship** — tested against real execution history, rolled back if they regress",
      "Inference as a **managed workload**, not a stateless API call",
    ],
  },
];

function ResearchCard({ item, index }: { item: ResearchItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.link}
      target={item.link.startsWith("/") ? undefined : "_blank"}
      rel={item.link.startsWith("/") ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.025 }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.6rem",
        borderRadius: "8px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)"}`,
        background: "transparent",
        transition: "border-color 0.2s, color 0.2s",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      {/* Name + badge row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.6rem",
        }}
      >
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 800,
            fontSize: "1.75rem",
            color: "#fafaf8",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {item.name}
        </p>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.52rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            padding: "3px 9px",
            borderRadius: "20px",
            color: TYPE_META[item.type].color,
            border: `1px solid ${TYPE_META[item.type].border}`,
            background: TYPE_META[item.type].bg,
            boxShadow: TYPE_META[item.type].glow,
          }}
        >
          {TYPE_META[item.type].label}
        </span>
      </div>

      {/* Title (former subtitle) */}
      <p
        style={{
          fontFamily: FONT_SANS,
          fontWeight: 400,
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.45,
          margin: 0,
        }}
      >
        {item.title}
      </p>

      {/* Subtitle */}
      {item.subtitle && (
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.28)",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          {item.subtitle}
        </p>
      )}

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.06)",
        }}
      />

      {/* Bullets */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {item.bullets.map((bullet, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "0.65rem",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.62rem",
                color: "rgba(255,255,255,0.22)",
                marginTop: "4px",
                flexShrink: 0,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                width: "76px",
                lineHeight: 1.5,
              }}
            >
              {RESEARCH_LABELS[i]}
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: "0.88rem",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.56)",
              }}
            >
              {renderBullet(bullet)}
            </span>
          </div>
        ))}
      </div>

      {/* Link arrow */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "0.5rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.72rem",
            color: hovered
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.35)",
            transition: "color 0.2s",
          }}
        >
          ↗
        </span>
      </div>
    </motion.a>
  );
}

export function Research() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section
      id="research"
      style={{
        padding: isMobile ? "5rem 4vw" : "10rem 6vw",
        background: "transparent",
        position: "relative",
      }}
    >
      {/* Sticky heading block */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          marginLeft: isMobile ? "-4vw" : "-6vw",
          marginRight: isMobile ? "-4vw" : "-6vw",
          paddingLeft: isMobile ? "4vw" : "6vw",
          paddingRight: isMobile ? "4vw" : "6vw",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          background:
            "linear-gradient(to right, rgba(5,5,8,0.52) 0%, rgba(5,5,8,0.52) 45%, rgba(5,5,8,0) 88%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          marginBottom: isMobile ? "3rem" : "5rem",
        }}
      >
        {/* Section label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
            }}
          >
            03 — Research &amp; Systems Thinking
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.07)",
            }}
          />
        </div>

        {/* Section heading */}
        <div style={{ overflow: "hidden" }}>
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: FONT_SERIF,
              fontSize: isMobile
                ? "clamp(1.8rem, 7vw, 4rem)"
                : "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "#fafaf8",
              margin: 0,
            }}
          >
            Observe. Abstract. Construct.
          </motion.h2>
        </div>
        {/* Hint */}
        <div style={{ textAlign: "right", marginTop: "0.6rem" }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            Tap to dive deeper
          </span>
        </div>
      </div>

      {/* Cards grid — row 1: 3 cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "1fr 1fr"
              : "1fr 1fr 1fr",
          gap: "1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        {items
          .slice(0, isMobile ? items.length : isTablet ? 2 : 3)
          .map((item, i) => (
            <ResearchCard key={i} item={item} index={i} />
          ))}
      </div>

      {/* Cards grid — row 2: remaining cards fill width */}
      {!isMobile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr 1fr" : "1fr 1fr",
            gap: "1.25rem",
          }}
        >
          {items.slice(isTablet ? 2 : 3).map((item, i) => (
            <ResearchCard key={i} item={item} index={(isTablet ? 2 : 3) + i} />
          ))}
        </div>
      )}
    </section>
  );
}
