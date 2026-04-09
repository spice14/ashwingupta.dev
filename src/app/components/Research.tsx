import { motion } from "motion/react";
import { useState } from "react";
import { useIsMobile, useIsTablet } from "../../hooks/useMediaQuery";
// @ts-ignore
import pinnsPdfUrl from "../../assets/PINNs whitepaper.pdf?url";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

type ItemType = "paper" | "whitepaper" | "github";

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
    color: "#F97316",
    border: "rgba(249,115,22,0.35)",
    bg: "rgba(249,115,22,0.08)",
    glow: "0 0 2px rgba(249,115,22,0.4)",
  },
  whitepaper: {
    label: "White Paper",
    color: "#06B6D4",
    border: "rgba(6,182,212,0.35)",
    bg: "rgba(6,182,212,0.08)",
    glow: "0 0 2px rgba(6,182,212,0.4)",
  },
  github: {
    label: "GitHub",
    color: "#A78BFA",
    border: "rgba(167,139,250,0.35)",
    bg: "rgba(167,139,250,0.08)",
    glow: "0 0 2px rgba(167,139,250,0.4)",
  },
};

const items: ResearchItem[] = [
  {
    type: "paper",
    name: "NCISCT 2022",
    title: "Automated Assessment Generation — Graphs & Language Models",
    subtitle: "Published Research · IJISET · Vol. 9 Special Issue",
    link: "https://ijiset.com/conference/NCISCT-2022/IJISET-NCISCT-220520.pdf",
    bullets: [
      "Distractor construction requires semantic reasoning — not just question writing",
      "BERT summarizes → proper nouns anchor pivots → WordNet/ConceptNet generate distractors via hierarchical fallback",
      "WordNet: hypernym→hyponym chains with sense disambiguation; ConceptNet: part-of relationships as fallback",
      "Semantic distance from the correct answer determines MCQ validity more than linguistic fluency",
    ],
  },
  {
    type: "whitepaper",
    name: "PINNs White Paper",
    title: "Physics-Informed Inference for Partial Observability",
    link: pinnsPdfUrl as string,
    bullets: [
      "Known governing dynamics, incomplete internal state visibility — operational decisions made blind",
      "PDEs embedded into the training objective alongside data loss — not as post-hoc constraints",
      "Staged training balances telemetry fidelity against PDE adherence; convergence diagnosed via physical consistency",
      "Physical constraints regularize learning — preventing silent invalid extrapolation under distribution shift",
    ],
  },
  {
    type: "github",
    name: "PHYSCLIP",
    title:
      "Contrastive Regime Classification — Symbolic and Observed Space Alignment",
    link: "https://github.com/spice14/PHYSCLIP",
    bullets: [
      "Sparse or noisy sensors cause non-deterministic gating — identical states routed differently across runs",
      "Dual encoders: symbolic (governing equations) and observed (field behavior + sensors) trained contrastively",
      "Contrastive loss enforces symbolic–observed consistency, grounding classification in physics not correlation",
      "Deterministic regime assignment at inference — no stochastic dispatch before numerical solvers",
    ],
  },
  {
    type: "github",
    name: "ScholarOS",
    title:
      "Research as Structured Execution — Deterministic Services Over Autonomous Generation",
    link: "https://github.com/spice14/ScholarOS",
    bullets: [
      "Fluent AI outputs with no traceable evidence link — unfit for workflows requiring reproducibility",
      "Five locked MCP services via central orchestrator: literature mapping, contradiction detection, hypothesis critique, evidence extraction, proposal assembly",
      "Agentic reasoning scoped to hypothesis critique only — all other stages deterministic with schema-defined interfaces",
      "Every claim bound to source evidence; contradiction detection surfaces where scholarly consensus breaks",
    ],
  },
  {
    type: "github",
    name: "Controla",
    title:
      "Execution-Aware Inference Orchestration — Scheduling Before Dispatch",
    link: "https://github.com/spice14/controla",
    bullets: [
      "Static backend routing — no awareness of task type, hardware state, or prior outcomes",
      "10-stage pipeline: classify → plan → route → schedule → batch → dispatch, before backend selection",
      "Priority-queue scheduler, VRAM-aware routing across 10 backends; latency and token efficiency tracked per request",
      "Routing policy updates from observed metrics — inference as a scheduled workload, not a stateless API call",
    ],
  },
];

function ResearchCard({ item, index }: { item: ResearchItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.6rem",
        borderRadius: "8px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}`,
        background: hovered
          ? "rgba(255,255,255,0.055)"
          : "rgba(255,255,255,0.012)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.35)" : "none",
        transition:
          "transform 280ms ease, border-color 280ms ease, background 280ms ease, box-shadow 280ms ease",
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
                letterSpacing: "0.05em",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: "0.88rem",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.56)",
              }}
            >
              {bullet}
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
              ? "rgba(255,255,255,0.45)"
              : "rgba(255,255,255,0.18)",
            transition: "color 250ms ease",
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
      {/* Section label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: isMobile ? "3.5rem" : "6rem",
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
      <div
        style={{ overflow: "hidden", marginBottom: isMobile ? "3rem" : "5rem" }}
      >
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
          Research & Systems Thinking
        </motion.h2>
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
