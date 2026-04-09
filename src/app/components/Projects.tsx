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
  // ── PERSONAL ─────────────────────────────────────────────────
  {
    index: "01",
    title: "ashwingupta.dev — Design Handoff to Production",
    company: "Personal",
    logo: "https://cdn.simpleicons.org/vercel/ffffff",
    logoHeight: 18,
    status: "Shipped",
    devStatus: "completed",
    tags: [
      "Spatial UI Architecture",
      "TypeScript / React",
      "Canvas 2D",
      "Astro · Vercel",
      "Performance Engineering",
      "Domain & DNS",
    ],
    impact:
      "Live at ashwingupta.dev · 90% image reduction · 72% JS bundle cut · 400 CSS DOM nodes eliminated",
    bullets: [
      "A portfolio site is its own proof unit. The designer baseline was self-defeating — the first thing a hiring manager measured was a **performance failure on the site claiming performance engineering**.",
      "Designer baseline: **400 CSS-animated DOM particles**, **2 MB JPEG** hero, Google Fonts loaded per-component, **72 unvetted dependencies**. The site needed to signal systems thinking — and was doing the opposite.",
      "Rebuilt end-to-end. **Three-layer spatial architecture** (environment, canvas particle field, hologram interface). All visual effects collapsed into a **single Canvas 2D RAF loop**. Images to WebP with fetchpriority preload. Below-fold sections split via **React.lazy + Suspense**.",
      "Scanline texture pre-rendered to offscreen canvas (**1 drawImage vs 270 fillRect/frame**). Edge cache rebuilt every 3 frames. RAF paused on visibility change. Mouse tracking gated behind RAF. **Stable 60 FPS under CPU throttle**.",
      "Image: **2 MB → 211 KB (90%)**. JS bundle: **72% cut**. DOM nodes: **400 CSS-animated eliminated**. Font requests: **3 → 0**. Canvas frame time: **18–25 ms → 4–6 ms**.",
    ],
    github: "https://github.com/spice14/ashwingupta.dev",
  },
  // ── OPEN SOURCE ──────────────────────────────────────────────
  {
    index: "02",
    title: "PageIndexOllama — Local-First Fork of PageIndex",
    company: "Open Source",
    logo: "https://cdn.simpleicons.org/github/ffffff",
    logoHeight: 18,
    status: "Shipped",
    devStatus: "completed",
    tags: [
      "Provider Abstraction",
      "Tree-Based RAG",
      "Ollama / Local LLMs",
      "Bounded Async Concurrency",
      "Hierarchical Fallback",
      "Python / Open Source",
    ],
    impact:
      "Fully offline tree-RAG execution · vendor lock-in eliminated · provider-agnostic runtime",
    bullets: [
      "All inference required a **live OpenAI API key** — offline or air-gapped execution was blocked entirely; **provider switches corrupted traversal silently** with no error surface; token encoding differences across providers produced inconsistent chunk boundaries with no visible signal.",
      "PageIndex's tree RAG was hardcoded to **OpenAI's API contract** — inline prompt strings, non-normalized completion handling. **Local or offline deployment was impossible**. Any provider change broke traversal.",
      "Forked and refactored: **provider-routing abstraction** resolved via env vars. **Finish-reason normalization layer** stabilizes recursive traversal across model outputs. Prompts externalized into a registry loader. **Bounded async concurrency** across TOC generation and summarization. Hierarchical fallback for large-document robustness.",
      "Normalized completion contracts prevent finish-reason variations from corrupting **recursive traversal state**. Fallback chunk policies handle **constrained VRAM and RAM**. Structured-output hardening absorbs imperfect model responses without pipeline failure.",
      "**Fully offline tree-RAG** with Ollama — no API keys. Seamless provider switching via stable internal contracts. Regression risk reduced through e2e coverage across document types and model sizes.",
    ],
    github: "https://github.com/spice14/PageIndexOllama",
  },
  {
    index: "03",
    title: "Research-It — Fully Local RAG System",
    company: "Open Source",
    logo: "https://cdn.simpleicons.org/github/ffffff",
    logoHeight: 18,
    status: "Shipped",
    devStatus: "completed",
    tags: [
      "LEANN / HNSW Indexing",
      "Dense Embeddings",
      "Ollama / Local LLMs",
      "Multi-Source Ingestion",
      "PyMuPDF · BeautifulSoup",
      "Privacy-First",
    ],
    impact:
      "Fully offline academic document QA · reproducible HNSW indexes · zero API dependency",
    bullets: [
      "Sensitive academic papers had **no private processing path** — all RAG required external inference APIs; researchers on **CPU-only or low-VRAM hardware** had no viable local inference option; institutions with air-gap requirements were blocked by all existing tooling.",
      "Researchers with sensitive papers had no offline RAG that handled mixed sources — local PDFs, arXiv URLs, paper directories — without exposing data to external inference APIs or cloud indexing.",
      "Fully local RAG: **LEANN/HNSW vector indexing** with dense embeddings (facebook/contriever), Ollama-backed inference, multi-source ingestion (PDFs, academic HTML, directories). Smart chunking with overlap, **configurable Top-K (3–4)** and **context windows (1024–1536 tokens)**. Quantized model support for CPU-only hardware.",
      "Reproducible index artifacts enable **air-gapped operation**. Context-window and Top-K settings tuned for recall vs. coherence tradeoff. PyMuPDF + BeautifulSoup handle varied PDF quality before indexing — not at query time.",
      "**API-free document QA** across academic sources. Runs on **sub-1GB quantized models**. Designed for air-gapped institutional research.",
    ],
    github: "https://github.com/spice14/research-it",
  },
  // ── COFORGE ──────────────────────────────────────────────────
  {
    index: "04",
    title: "Real-Time AI Voice Infrastructure for Banking",
    company: "HSBC · Coforge",
    logo: "https://cdn.simpleicons.org/hsbc/DB0011",
    logoHeight: 22,
    status: "Client Delivery",
    tags: [
      "SIP/Voice Orchestration (PJSIP · RFC 3261)",
      "asyncio + uvloop Concurrency",
      "GCP Infrastructure (Packer · GCE · HPA)",
      "Cross-Stack Observability",
      "LLM Inference Pipeline",
      "Cost Engineering",
    ],
    impact:
      "1,600+ concurrent sessions · 7× VM capacity · ~$1.3M annualized savings · MTTR ~1–2 hrs → ~5 min",
    bullets: [
      "**Thread-based GIL contention** concurrent sessions saturated at 20 per VM — before packet loss rose above 10%; available hardware capacity was highly under-utilised; post-call documentation required **10–15 minutes of manual effort** per interaction with no automated path; fragmented cross-service logs with no correlation layer meant incidents required **1–2 hours of manual reconstruction** to identify root cause.",
      "HSBC voice AI was thread-based, capped at **20 concurrent calls per VM**. Post-call documentation: **10–15 min per interaction**. Inference cost: **~$118K/month**. Incident recovery: **1–2 hours** — fragmented logs, no unified observability layer.",
      "Led a **4-engineer team**. Owned **Packer automation across all project modules** — standardizing GCE image builds for the full SIP stack **(SBC → STT → LLM inference)**. Refactored thread-based to **asyncio + uvloop**, eliminating GIL contention. Built **SIPp load test suite** (2,000 concurrent users). Architected **cross-stack log-correlation** over GCP Logging APIs — **250K+ log lines in under 5 seconds**.",
      "**<2s E2E transcription latency**, <5% packet loss at 1,600+ concurrent sessions. libsrtp + DTLS/SRTP for in-transit security. Grafana-Prometheus with MACD triggers. Migrated **n2-standard-32 → c4-standard-8**, improving transcript length **30–40% under load**.",
      "**7× per-VM capacity (20 → 140–160 calls)**. **1,600+ sessions** sustained. Documentation: **10–15 min → 2–3 min**. Compute: **$118K → $8K/month (~$1.3M annualized savings)**. MTTR: **1–2 hours → ~5 minutes**.",
    ],
    github: null,
  },
  {
    index: "05",
    title: "AI-Powered Azure Infrastructure Documentation Engine",
    company: "Coforge",
    logo: COFORGE_LOGO,
    logoHeight: 18,
    status: "Client Delivery",
    tags: [
      "Azure Resource Graph API",
      "Live State Extraction",
      "Network & Security Config Mapping",
      "PlantUML Diagram Generation",
      "Few-Shot LLM Prompting",
      "Fabrication Guardrails",
    ],
    impact:
      "~2–3 days → ~2–3 hours documentation turnaround · 104 resource groups/project · zero fabricated components",
    bullets: [
      "Infrastructure documentation required **manual extraction from Azure** — 2–3 days per project; **PlantUML diagrams were authored by hand** from memory or stale exports; documented architecture drifted from live infrastructure state with **no mechanism to detect or correct divergence**.",
      "Enterprise infrastructure documentation required manual Azure subscription extraction — **2–3 days per project**. Produced stale views, delayed governance reviews, and documented state that drifted from live infrastructure.",
      "Built a Streamlit engine accepting a **subscription ID**, auto-generating SDDs and **PlantUML diagrams** via automated inventory extraction, network flow mapping, security config analysis, and dependency graph construction. **Few-shot LLM prompting** grounds architecture rationale in live state. **Validation guardrails** cross-check every generated component against extracted inventory.",
      "Guardrail layer enforces that every generated component maps to a **verified live resource** — hallucinated topology can't reach governance docs. Outputs regenerated from live subscription state — no cached snapshots, no documentation drift.",
      "Documentation: **2–3 days → ~2–3 hours**. Average **104 resource groups per project**. Eliminated manual PlantUML authoring. Live-state grounding replaced manual transcription.",
    ],
    github: null,
  },
  {
    index: "06",
    title: "AI Contract Intelligence System for Airline Agreements",
    company: "Amex GBT · Coforge",
    logo: "https://cdn.simpleicons.org/americanexpress/2E77BC",
    logoHeight: 18,
    status: "Client Delivery",
    tags: [
      "PDF Table Extraction (Camelot · Ghostscript)",
      "GPT-4o Normalization",
      "One-Shot Prompting",
      "Mixed-Format Document Handling",
      "Contract Intelligence Pipeline",
    ],
    impact:
      "~96% extraction accuracy · automated normalization across varied airline PDF schemas",
    bullets: [
      "Airline contract tables were **reviewed manually** — slow, error-prone, and couldn't scale to the volume of carrier agreements; **template drift across carriers** meant each format required separate handling logic; sales and support queries on contract terms had **no real-time resolution path**.",
      "Airline contract PDFs for AMEX GBT mixed **image-embedded and readable tables**, with varied schemas and template drift across carriers. Manual review was slow, error-prone, and couldn't scale.",
      "Document intelligence pipeline: **Camelot + Ghostscript** extract tables from both image-embedded and readable PDF sources. **GPT-4o with one-shot prompting** normalizes across diverse contract formats — clause normalization, table structuring, schema-consistent output.",
      "One-shot prompting maintains contextual coherence across carrier templates **without per-carrier fine-tuning**. Camelot + Ghostscript in combination covers the full format range — from scan-quality images to nested programmatic tables.",
      "**~96% extraction accuracy** across airline contract Q&A. Automated normalization replaced manual review. Real-time query resolution for sales and customer support.",
    ],
    github: null,
  },
  // ── GIDA ─────────────────────────────────────────────────────
  {
    index: "07",
    title: "Here.app – Multilingual Vehicle Intelligence Platform",
    company: "HDFC Bank · Gida",
    logo: HDFC_LOGO,
    logoHeight: 22,
    status: "Client Delivery",
    tags: [
      "RAG",
      "163 Languages",
      "QA-Gated Retrieval",
      "Structured Spec Database",
      "Dynamic Data Retrieval",
      "Vehicle Intelligence",
    ],
    impact:
      "~97% factual accuracy · 163 languages · reduced manual escalation on specification queries",
    bullets: [
      "Vehicle spec chatbots produced **inconsistent and factually unreliable answers** — the same query in different languages could return contradictory results; **manual support escalation** was the only fallback for spec-heavy queries, creating volume bottlenecks at scale.",
      "HDFC Bank's vehicle intelligence required accurate answers on structured specification data across **163 languages**. Standard chatbots failed on spec queries — generating inconsistent answers that increased manual support escalation.",
      "**RAG-based vehicle intelligence assistant** grounded in a curated specification database with image-linked attributes. **QA-tested retrieval pipeline** with dynamic data lookup across **163 languages** — localized responses grounded in the same structured data, not translated post-hoc.",
      "QA-gated retrieval enforces factual grounding before responses are served — no speculative answers on spec queries. Structured specification database acts as a single source of truth across all 163 language boundaries. Accuracy validated across full coverage before production.",
      "**~97% factual accuracy** across **163 languages**. Reduced manual support escalation on spec-heavy queries.",
    ],
    github: null,
  },
  {
    index: "08",
    title: "Laminar · Metamorph · Polymorph — AI Delivery Toolchain",
    company: "Gida Technologies",
    logo: GIDA_LOGO,
    logoHeight: 28,
    status: "Client Delivery",
    tags: [
      "AI CMS (Laminar)",
      "No-Code Chatbot Builder (Metamorph)",
      "API Utility Engine (Polymorph)",
      "163-Language Content Generation",
      "cURL-to-20+ Language Conversion",
      "AI-Generated Visuals",
    ],
    impact:
      "Three interlinked AI tools · 163-language content generation · cURL-to-20+ language API conversion",
    bullets: [
      "Content generation, bot deployment, and API conversion each required **separate tools and manual handoff steps** — inconsistent output quality across every client engagement; **multilingual content at scale** had no standardized generation path; chatbot delivery required **engineering involvement** for every new deployment or update.",
      "Teams building multilingual products, chatbots, and API integrations operated with **fragmented tooling** — content generation, bot deployment, and API code conversion each required separate workflows and produced inconsistent output quality.",
      "Designed and shipped **three interlinked AI tools**: **Laminar** — AI CMS for multilingual content generation across **163+ languages** with AI-generated visuals and multi-format export; **Metamorph** — no-code chatbot builder from prompts or documentation; **Polymorph** — cURL-to-**20+ language** API converter with endpoint scaffolding.",
      "**Standardized output artifacts** across all three tools produce deployable outputs — not drafts. 163+ language generation maintains consistent quality without per-language customization. AI-generated visuals produce brand-consistent outputs from prompts across client deployments.",
      "**Three fragmented workflows replaced** by a unified toolchain. **163-language content generation at scale**. No-code bot deployment removed engineering dependency from chatbot delivery.",
    ],
    github: null,
  },
  {
    index: "09",
    title: "Graph-Based Skill Recommendation Engine",
    company: "Prismforce",
    logo: prismforceLogoImg,
    logoHeight: 28,
    status: "Client Delivery",
    tags: [
      "Weighted Directed Graph",
      "Multi-Level Skill Hierarchy",
      "Dynamic Node Updates",
      "Mathematical Scoring Heuristics",
      "Real-Time Inference",
      "NVIDIA T4",
    ],
    impact:
      "+30% recommendation relevance · sub-50ms latency · single NVIDIA T4 under production load",
    bullets: [
      "The recommendation system **ignored hierarchical skill relationships** — related skills treated as independent nodes with no structural modeling; **every taxonomy expansion triggered full batch retraining**, blocking updates until recompute completed; inference latency under production concurrency **exceeded the sub-50ms SLA** required for live platform use.",
      "Prismforce needed real-time skill recommendations against a **large, evolving taxonomy**. The existing system missed hierarchical skill relationships, went stale under profile updates, and couldn't hit **sub-50ms latency** for live platform use.",
      "Real-time recommendation engine using a **weighted directed graph** encoding multi-level skill hierarchy relationships as typed edges with dynamic weight updates. **Lightweight mathematical scoring heuristics** minimize computational overhead per inference call. Update model handles **dynamic node additions without full graph recomputation**.",
      "**Deterministic traversal logic** produces consistent outputs under frequent profile and taxonomy updates. Heuristics keep inference paths predictable and bounded. **Latency profiled under realistic production concurrency** on NVIDIA T4 before deployment.",
      "**~30% improvement** in recommendation relevance. **Sub-50ms inference** on NVIDIA T4 under production load. **Dynamic updates eliminated batch retraining** on taxonomy expansion.",
    ],
    github: null,
  },
  // ── BMSCE ────────────────────────────────────────────────────
  {
    index: "10",
    title: "Physics-Informed Neural Networks (PINNs)",
    company: "BMS College of Engineering",
    logo: BMSCE_LOGO,
    logoHeight: 28,
    status: "Best Outgoing Project · 2022–23",
    tags: [
      "PINNs",
      "Dual-Loss Optimization",
      "PDEs / ODEs",
      "Fluid Dynamics",
      "Structural Mechanics",
      "Heat Transfer",
    ],
    impact:
      "Best Outgoing Project · BMSCE 2022–23 · 6 validated benchmarks across fluid, structural, and thermal domains",
    bullets: [
      "Purely data-driven physics simulation required **large labeled datasets** expensive or impossible to generate experimentally; sparse training data produced **physically implausible solutions** — the model could satisfy the data loss while violating governing equations; no unified framework existed that validated across multiple physics domains simultaneously.",
      "Physics simulation (fluid dynamics, structural mechanics, heat transfer) is **unstable under purely data-driven approaches** — requires large labeled datasets that are expensive or impossible to generate, and produces physically implausible solutions under sparse data.",
      "**Dual-loss PINN framework** embedding governing **PDE/ODE constraints directly into the optimization objective** alongside data loss. Validated across **six benchmarks**: Burgers' equation, 1D heat conduction via pin fin, fixed-fixed column deflection, cantilever tip deflection, 1D transient cooling under **Neumann flux and Dirichlet boundary conditions**.",
      "Physics constraints act as a **regularizer** — preventing physically implausible solutions from satisfying data loss alone. Neumann and Dirichlet boundary condition variants validated generalizability across constraint types and problem geometries.",
      "**Stable convergence across 6 physics benchmarks** — fluid, structural, thermal — with limited labeled data. Applied use cases in HVAC thermal feedback and server cooling. **Best Outgoing Project — BMSCE 2022–23**.",
    ],
    github: null,
  },
];

// ── Bullet icon map — keyed on first matching keyword ──────────
const BULLET_STAGE_ICONS = ["⚡", "⚠️", "⚙️", "🛡️", "🚀"] as const;

function bulletIcon(index: number): string {
  return BULLET_STAGE_ICONS[index] ?? "▸";
}

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
          04 — Projects
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
          Built Under Constraint.
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
                              <span>{renderBullet(b)}</span>
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
