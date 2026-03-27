import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "../../hooks/useMediaQuery";
import coforgeLogoImg from "../../assets/coforgeLogo.webp?url";
import gidaLogoImg from "../../assets/gidaLogo.webp?url";
import hdfcLogoImg from "../../assets/HDFClogo.webp?url";
import bmsceLogoImg from "../../assets/BMSlogo.webp?url";
import prismforceLogoImg from "../../assets/prismforceLogo.webp?url";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const COFORGE_LOGO = coforgeLogoImg;
const GIDA_LOGO = gidaLogoImg;
const HDFC_LOGO = hdfcLogoImg;
const BMSCE_LOGO = bmsceLogoImg;

function CompanyLogo({
  logo,
  alt,
  height = 20,
}: {
  logo?: string;
  alt: string;
  height?: number;
}) {
  if (!logo) return null;
  return (
    <img
      loading="lazy"
      src={logo}
      alt={alt}
      style={{
        height: `${height}px`,
        width: "auto",
        maxWidth: "80px",
        objectFit: "contain",
        borderRadius: "3px",
      }}
      onError={(e) =>
        ((e.currentTarget as HTMLImageElement).style.display = "none")
      }
    />
  );
}

const projects = [
  // ── OPEN SOURCE ──────────────────────────────────────────────
  {
    index: "01",
    title: "PageIndexOllama — Local-First Fork of PageIndex",
    company: "Open Source",
    logo: "https://cdn.simpleicons.org/github/ffffff",
    logoHeight: 18,
    status: "Shipped",
    devStatus: "completed",
    tags: [
      "Ollama",
      "Provider-Agnostic",
      "Local-First",
      "Async Concurrency",
      "Python",
      "CLI",
    ],
    impact:
      "Replaced OpenAI-only runtime with provider-agnostic local inference under bounded concurrency",
    bullets: [
      "Vendor-coupled runtime design limited deployment flexibility and increased operational risk for local/offline document intelligence.",
      "Provider-routed local-first fork with Ollama defaults, normalized completion handling, and unified runtime wrappers across PDF and Markdown workflows.",
      "Bounded async concurrency, model-capability controls, and fallback chunk policies stabilized long-document execution on constrained hardware.",
      "Provider-agnostic tree-RAG execution with stronger reliability and expanded integration coverage for production hardening.",
    ],
    github: "https://github.com/spice14/PageIndexOllama",
  },
  {
    index: "02",
    title: "Research-It — Fully Local RAG System",
    company: "Open Source",
    logo: "https://cdn.simpleicons.org/github/ffffff",
    logoHeight: 18,
    status: "Shipped",
    devStatus: "completed",
    tags: ["RAG", "HNSW", "Ollama", "Privacy-First", "Local LLM", "PyMuPDF"],
    impact:
      "No external APIs · deterministic index builds · stable local inference",
    bullets: [
      "Research teams required private, high-throughput retrieval across PDFs, URLs, and folders without cloud exposure.",
      "Fully local LEANN + HNSW RAG stack with Ollama inference, mixed-source ingestion, and evidence-linked metadata.",
      "Runtime tuning for low-VRAM and CPU environments via configurable chunking, retrieval Top-K, and context-window controls.",
      "Deterministic local indexes and predictable source-grounded answers with zero external API dependency.",
    ],
    github: "https://github.com/spice14/research-it",
  },
  {
    index: "03",
    title: "ScholarOS — A System for Reproducible, Evidence-Linked Research",
    company: "Open Source",
    logo: "https://cdn.simpleicons.org/github/ffffff",
    logoHeight: 18,
    status: "Active Development",
    devStatus: "in-progress",
    tags: [
      "Research Automation",
      "Deterministic Pipelines",
      "Evidence Traceability",
      "Knowledge Synthesis",
      "Python / Modular Services",
    ],
    impact:
      "Evidence-linked insights · reproducible research runs · auditable execution",
    bullets: [
      "Modern AI research tools often generate results that cannot be reliably reproduced or audited, making insights difficult to trust in real research workflows.",
      "Built ScholarOS, a research execution system that converts documents and questions into structured, evidence-linked knowledge through deterministic service pipelines coordinated by a central orchestrator.",
      "Enforced strict schema-defined services, isolated tool execution, and traceable pipeline stages to eliminate hidden coupling and maintain consistent outputs across runs.",
      "Produces reproducible research outputs with clear evidence links, full execution traces, and auditable reasoning paths for every generated insight.",
    ],
    github: "https://github.com/spice14/ScholarOS",
  },
  {
    index: "04",
    title: "PHYSCLIP — Physics-Constrained Regime Classification",
    company: "Open Source",
    logo: "https://cdn.simpleicons.org/github/ffffff",
    logoHeight: 18,
    status: "Active Development",
    devStatus: "in-progress",
    tags: [
      "Contrastive Learning",
      "Physics-Constrained Models",
      "Multimodal Encoders",
      "Regime Identification",
      "Production Inference Layer",
      "Python / ML Pipeline",
    ],
    impact:
      "Deterministic regime classification for downstream routing under variable operating conditions",
    bullets: [
      "Runtime control stacks needed reliable physical-regime selection before expensive downstream compute dispatch.",
      "Contrastive dual-representation regime classifier aligning symbolic physics descriptors with observed field-solution behavior.",
      "Deterministic routing logic maintained under sparse, noisy, or partially missing measurements.",
      "Stable regime gating that improves downstream decision consistency without replacing numerical solvers.",
    ],
    github: "https://github.com/spice14/PHYSCLIP",
  },
  // ── COFORGE ──────────────────────────────────────────────────
  {
    index: "05",
    title: "Real-Time AI Voice Infrastructure for Banking",
    company: "HSBC · Coforge",
    logo: "https://cdn.simpleicons.org/hsbc/DB0011",
    logoHeight: 22,
    status: "Client Delivery",
    tags: [
      "LLM Infrastructure",
      "Async Concurrency",
      "Observability & MTTR Reduction",
      "SIP/Voice Orchestration",
      "Cost Optimization",
    ],
    impact:
      "1,600+ concurrent sessions · ~$1.3M annualized savings · low-latency SLA",
    bullets: [
      "Banking voice AI operations faced capacity ceilings, high inference cost, and slow incident recovery.",
      "SIP-to-LLM production runtime with async concurrency controls and end-to-end observability across network, model, and orchestration layers.",
      "Maintained low-latency and packet-loss SLAs under sustained high-concurrency production traffic.",
      "1,600+ concurrent sessions, 7x capacity increase, ~$1.3M annualized savings, and MTTR reduced from ~1-2 hours to ~5 minutes.",
    ],
    github: null,
  },
  {
    index: "06",
    title: "AI-Powered Azure Infrastructure Documentation Engine",
    company: "Coforge",
    logo: COFORGE_LOGO,
    logoHeight: 18,
    status: "Client Delivery",
    tags: [
      "Azure Infrastructure",
      "State Extraction",
      "Dependency Mapping",
      "PlantUML Diagram Generation",
      "Validation & Drift Guardrails",
    ],
    impact:
      "~2–3 days → ~2–3 hours documentation turnaround from live cloud state",
    bullets: [
      "Manual infrastructure documentation created stale architecture views and delayed delivery governance.",
      "Live Azure-state extraction and dependency-mapping engine generating SDDs plus PlantUML architecture diagrams.",
      "Preserved modeling accuracy across ~104 resource groups while preventing fabricated components in generated outputs.",
      "Documentation cycle reduced from ~2-3 days to ~2-3 hours with materially improved architectural fidelity.",
    ],
    github: null,
  },
  {
    index: "07",
    title: "AI Contract Intelligence System for Airline Agreements",
    company: "Amex GBT · Coforge",
    logo: "https://cdn.simpleicons.org/americanexpress/2E77BC",
    logoHeight: 18,
    status: "Client Delivery",
    tags: [
      "Document Processing Pipeline",
      "Structured Extraction",
      "LLM-Assisted Normalization",
      "PDF Table Parsing",
      "Contract Intelligence Systems",
    ],
    impact:
      "~96% extraction accuracy · automated contract normalization pipeline",
    bullets: [
      "Contract review velocity was constrained by inconsistent, semi-structured airline PDF agreements.",
      "Document intelligence pipeline using Camelot, Ghostscript, and controlled LLM normalization for clause and table structuring.",
      "Preserved contractual context across mixed scan quality, nested table layouts, and template drift.",
      "~96% extraction accuracy with significantly faster commercial analysis cycles.",
    ],
    github: null,
  },
  // ── GIDA ─────────────────────────────────────────────────────
  {
    index: "08",
    title: "Here.app – Multilingual Vehicle Intelligence Platform",
    company: "HDFC Bank · Gida",
    logo: HDFC_LOGO,
    logoHeight: 22,
    status: "Client Delivery",
    tags: ["RAG", "163 Languages", "QA Pipeline", "Vehicle Intelligence"],
    impact: "~97% factual accuracy · 163 languages supported",
    bullets: [
      "Multilingual vehicle-support operations suffered from inconsistent answer quality across markets.",
      "163-language RAG assistant grounded in curated vehicle specifications and image-linked attributes.",
      "Enforced factual consistency across language variants with QA-gated retrieval and inference paths.",
      "~97% factual accuracy and reduced manual escalation for specification-heavy support queries.",
    ],
    github: null,
  },
  {
    index: "09",
    title: "Laminar · Metamorph · Polymorph — AI Delivery Toolchain",
    company: "Gida Technologies",
    logo: GIDA_LOGO,
    logoHeight: 28,
    status: "Client Delivery",
    tags: [
      "AI CMS",
      "No-code Chatbot",
      "API Engine",
      "163 Languages",
      "cURL Converter",
    ],
    impact: "Multilingual CMS · 20+ language API conversions",
    bullets: [
      "Multi-product delivery pipelines were fragmented, causing slower content, chatbot, and API release cycles.",
      "Unified Laminar, Metamorph, and Polymorph toolchain for multilingual CMS, bot delivery, and API code generation.",
      "Supported 163+ language content operations and 20+ API language conversions with deployable output guarantees.",
      "Faster cross-team delivery through standardized artifacts and production-ready generated endpoints.",
    ],
    github: null,
  },
  {
    index: "10",
    title: "Graph-Based Skill Recommendation Engine",
    company: "Prismforce",
    logo: prismforceLogoImg,
    logoHeight: 28,
    status: "Client Delivery",
    tags: ["Graph ML", "Real-time Inference", "NVIDIA T4", "Skill Taxonomy"],
    impact: "+30% recommendation relevance · sub-50ms latency",
    bullets: [
      "Skill recommendation quality and inference latency were below real-time platform requirements.",
      "Weighted directed-graph recommender with dynamic hierarchy updates and optimized traversal for evolving workforce taxonomy.",
      "Preserved deterministic low-latency behavior under frequent profile updates and strict response-time budgets.",
      "~30% relevance improvement and sustained sub-50ms inference on a single NVIDIA T4.",
    ],
    github: null,
  },
  // ── BMSCE ────────────────────────────────────────────────────
  {
    index: "11",
    title: "Physics-Informed Neural Networks (PINNs)",
    company: "BMS College of Engineering",
    logo: BMSCE_LOGO,
    logoHeight: 28,
    status: "Best Outgoing Project · 2022–23",
    tags: [
      "PINNs",
      "PDEs/ODEs",
      "Fluid Dynamics",
      "Structural Mechanics",
      "Heat Transfer",
    ],
    impact: "Best Outgoing Project Award · BMSCE 2022–23",
    bullets: [
      "Data-sparse physics domains were unstable under purely data-driven modeling approaches.",
      "Dual-loss PINN framework embedding governing PDE/ODE constraints directly into optimization.",
      "Improved convergence stability across fluid, structural, and thermal benchmarks with limited labeled data.",
      "More stable validated behavior across benchmark cases and Best Outgoing Project recognition (BMSCE 2022-23).",
    ],
    github: null,
  },
];

// ── Bullet icon map — keyed on first matching keyword ──────────
const BULLET_STAGE_ICONS = ["⚠️", "⚙️", "🛡️", "🚀"] as const;

function bulletIcon(index: number): string {
  return BULLET_STAGE_ICONS[index] ?? "▸";
}

export function Projects() {
  const isMobile = useIsMobile();
  const [openCard, setOpenCard] = useState<number | null>(0);
  const orderedProjects = [...projects].sort((a, b) => {
    const aIsAward = a.status === "Best Outgoing Project · 2022–23";
    const bIsAward = b.status === "Best Outgoing Project · 2022–23";
    if (aIsAward === bIsAward) return 0;
    return aIsAward ? 1 : -1;
  });

  return (
    <section
      id="projects"
      style={{
        padding: isMobile ? "2.75rem 4vw 4rem" : "6.5rem 6vw 10rem",
        background: "transparent",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "5rem",
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
          03 — Projects
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        />
      </div>

      <div style={{ overflow: "visible", marginBottom: "5rem" }}>
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
          Systems, Realized.
        </motion.h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {orderedProjects.map((p, i) => {
          const isOpen = openCard === i;
          const isAwardStatus = p.status === "Best Outgoing Project · 2022–23";
          const statusColor = isAwardStatus
            ? "#facc15"
            : p.status === "Client Delivery"
              ? "#22d3ee"
              : p.devStatus === "completed"
                ? "#4ade80"
                : p.devStatus === "in-progress"
                  ? "#facc15"
                  : "rgba(255,255,255,0.35)";
          const statusBorder = isAwardStatus
            ? "rgba(250,204,21,0.35)"
            : p.status === "Client Delivery"
              ? "rgba(34,211,238,0.4)"
              : p.devStatus === "completed"
                ? "rgba(74,222,128,0.35)"
                : p.devStatus === "in-progress"
                  ? "rgba(250,204,21,0.35)"
                  : "rgba(255,255,255,0.12)";
          const statusBg = isAwardStatus
            ? "rgba(250,204,21,0.06)"
            : p.status === "Client Delivery"
              ? "rgba(34,211,238,0.1)"
              : p.devStatus === "completed"
                ? "rgba(74,222,128,0.06)"
                : p.devStatus === "in-progress"
                  ? "rgba(250,204,21,0.06)"
                  : "transparent";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.04 * i, duration: 0.55 }}
              onClick={() => setOpenCard((prev) => (prev === i ? null : i))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenCard((prev) => (prev === i ? null : i));
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              style={{
                borderRadius: "12px",
                border: isOpen
                  ? "1px solid rgba(255,255,255,0.17)"
                  : "1px solid rgba(255,255,255,0.11)",
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "none",
                transition: "border-color 0.3s",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  padding: isMobile ? "1.2rem 1.2rem" : "1.6rem 1.8rem",
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "48px 1fr auto",
                  gap: isMobile ? "1rem" : "1.5rem",
                  alignItems: "start",
                }}
              >
                {/* Index */}
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    paddingTop: "5px",
                    color: isOpen
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(255,255,255,0.22)",
                    transition: "color 0.3s",
                  }}
                >
                  {p.index}
                </span>

                {/* Title + meta + expandable body */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                      marginBottom: "0.45rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: FONT_SERIF,
                        fontSize: isMobile
                          ? "clamp(0.95rem, 4vw, 1.15rem)"
                          : "clamp(1.05rem, 1.8vw, 1.45rem)",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        margin: 0,
                        color: isOpen ? "#fafaf8" : "rgba(255,255,255,0.65)",
                        transition: "color 0.3s",
                      }}
                    >
                      {p.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.52rem",
                        letterSpacing: "0.12em",
                        borderRadius: "20px",
                        padding: "3px 9px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        color: statusColor,
                        border: `1px solid ${statusBorder}`,
                        background: statusBg,
                      }}
                    >
                      {p.status}
                      {isAwardStatus && (
                        <span style={{ fontSize: "0.7rem", lineHeight: 1 }}>
                          🏆
                        </span>
                      )}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: isOpen ? "1rem" : "0",
                      transition: "margin 0.3s",
                    }}
                  >
                    <CompanyLogo
                      logo={p.logo}
                      alt={p.company}
                      height={p.logoHeight}
                    />
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.58rem",
                        letterSpacing: "0.09em",
                        color: "rgba(255,255,255,0.38)",
                      }}
                    >
                      {p.company}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        {/* Thin rule */}
                        <div
                          style={{
                            height: "1px",
                            background: "rgba(255,255,255,0.07)",
                            marginBottom: "1rem",
                          }}
                        />

                        {/* Bullets with category icons */}
                        <ul
                          style={{
                            margin: "0 0 1.1rem 0",
                            padding: 0,
                            listStyle: "none",
                            maxWidth: "680px",
                          }}
                        >
                          {p.bullets.map((b: string, bi: number) => (
                            <motion.li
                              key={bi}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.04 + bi * 0.05,
                                duration: 0.28,
                              }}
                              style={{
                                fontFamily: FONT_SANS,
                                fontSize: "0.84rem",
                                lineHeight: 1.75,
                                color: "rgba(255,255,255,0.68)",
                                display: "flex",
                                gap: "0.6rem",
                                alignItems: "flex-start",
                                marginBottom: "0.3rem",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "1.02rem",
                                  flexShrink: 0,
                                  marginTop: "0.08rem",
                                }}
                              >
                                {bulletIcon(bi)}
                              </span>
                              <span>{b}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Impact pill + tags */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1.25rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: FONT_MONO,
                              fontSize: "0.6rem",
                              color: "#e8e0d0",
                              letterSpacing: "0.05em",
                              background: "rgba(232,224,208,0.07)",
                              border: "1px solid rgba(232,224,208,0.15)",
                              borderRadius: "4px",
                              padding: "4px 10px",
                            }}
                          >
                            ↳ {p.impact}
                          </span>
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              flexWrap: "wrap",
                            }}
                          >
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                style={{
                                  fontFamily: FONT_MONO,
                                  fontSize: "0.52rem",
                                  letterSpacing: "0.07em",
                                  color: "rgba(255,255,255,0.4)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: "3px",
                                  padding: "3px 7px",
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* GitHub / NDA badge */}
                <div style={{ paddingTop: "4px" }}>
                  {p.github ? (
                    <motion.a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      animate={{ opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "34px",
                        height: "34px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        color: "rgba(255,255,255,0.6)",
                        textDecoration: "none",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#e8e0d0";
                        el.style.color = "#e8e0d0";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(255,255,255,0.2)";
                        el.style.color = "rgba(255,255,255,0.6)";
                      }}
                    >
                      <ArrowUpRight size={14} />
                    </motion.a>
                  ) : (
                    <motion.div
                      animate={{ opacity: isOpen ? 0.5 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        width: "34px",
                        height: "34px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: "0.42rem",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        NDA
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;600&family=DM+Mono:wght@400&display=swap"
        rel="stylesheet"
      />
    </section>
  );
}
