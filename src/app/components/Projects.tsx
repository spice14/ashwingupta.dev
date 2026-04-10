import { motion } from "motion/react";
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

export type Project = {
  index: string;
  title: string;
  company: string;
  logo: string;
  logoHeight: number;
  status: string;
  devStatus?: string;
  tags: string[];
  impact: string;
  summary: [string, string, string, string];
  bullets: string[];
  github: string | null;
};

export function renderBullet(text: string): React.ReactNode {
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

export const projects: Project[] = [
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
    summary: [
      "A site claiming performance engineering had **400 CSS-animated DOM nodes**, a **2 MB JPEG** hero, and 72 unvetted dependencies — the artifact contradicted the claim",
      "Rebuilt around a **three-layer spatial architecture**: environment, Canvas 2D particle field, hologram interface — all visual effects collapsed into a **single RAF loop**",
      "**Offscreen canvas pre-rendering** eliminates per-frame fillRect calls; RAF gated on visibility; lazy boundaries enforce below-fold deferral — each decision reduces execution cost",
      "**90% image reduction** · **72% JS bundle cut** · frame time **18–25ms → 4–6ms** · stable 60fps under CPU throttle",
    ],
    bullets: [
      "A portfolio site is its own proof unit. The designer baseline was self-defeating — the first thing a hiring manager measured was a **performance failure on the site claiming performance engineering**.",
      "Designer baseline: **400 CSS-animated DOM particles**, **2 MB JPEG** hero, Google Fonts loaded per-component, **72 unvetted dependencies**. The site needed to signal systems thinking — and was doing the opposite.",
      "Rebuilt end-to-end. **Three-layer spatial architecture** (environment, canvas particle field, hologram interface). All visual effects collapsed into a **single Canvas 2D RAF loop**. Images to WebP with fetchpriority preload. Below-fold sections split via **React.lazy + Suspense**.",
      "Scanline texture pre-rendered to offscreen canvas (**1 drawImage vs 270 fillRect/frame**). Edge cache rebuilt every 3 frames. RAF paused on visibility change. Mouse tracking gated behind RAF. **Stable 60 FPS under CPU throttle**.",
      "Image: **2 MB → 211 KB (90%)**. JS bundle: **72% cut**. DOM nodes: **400 CSS-animated eliminated**. Font requests: **3 → 0**. Canvas frame time: **18–25 ms → 4–6 ms**.",
    ],
    github: "https://github.com/spice14/ashwingupta.dev",
  },
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
    summary: [
      "Tree-RAG **hardcoded to a single provider** — provider contract differences silently corrupted recursive traversal with no error surface",
      "Introduced a **provider-routing abstraction** and **finish-reason normalization layer** — the traversal state machine no longer depends on any specific provider's output contract",
      "Hierarchical fallback handles large documents on **constrained VRAM**; bounded concurrency prevents pipeline saturation; prompts externalized so the system is configurable without touching execution logic",
      "**Fully offline tree-RAG** execution — the system routes, normalizes, and traverses without external API dependency",
    ],
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
    summary: [
      "Sensitive academic papers had **no private processing path** — all RAG required cloud APIs; air-gap institutions were fully blocked by existing tooling",
      "A **privacy-first inference pipeline**: LEANN/HNSW indexes stay local, Ollama serves models on-device, and document ingestion normalizes across sources before any query reaches the retrieval layer",
      "Smart chunking with overlap, **configurable Top-K (3–4)** and **context windows (1024–1536 tokens)**; PyMuPDF + BeautifulSoup handle varied PDF quality before indexing — not at query time",
      "**API-free document QA** on sub-1GB quantized models · **reproducible index artifacts** for air-gapped institutional research",
    ],
    bullets: [
      "Sensitive academic papers had **no private processing path** — all RAG required external inference APIs; researchers on **CPU-only or low-VRAM hardware** had no viable local inference option; institutions with air-gap requirements were blocked by all existing tooling.",
      "Researchers with sensitive papers had no offline RAG that handled mixed sources — local PDFs, arXiv URLs, paper directories — without exposing data to external inference APIs or cloud indexing.",
      "Fully local RAG: **LEANN/HNSW vector indexing** with dense embeddings (facebook/contriever), Ollama-backed inference, multi-source ingestion (PDFs, academic HTML, directories). Smart chunking with overlap, **configurable Top-K (3–4)** and **context windows (1024–1536 tokens)**. Quantized model support for CPU-only hardware.",
      "Reproducible index artifacts enable **air-gapped operation**. Context-window and Top-K settings tuned for recall vs. coherence tradeoff. PyMuPDF + BeautifulSoup handle varied PDF quality before indexing — not at query time.",
      "**API-free document QA** across academic sources. Runs on **sub-1GB quantized models**. Designed for air-gapped institutional research.",
    ],
    github: "https://github.com/spice14/research-it",
  },
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
    summary: [
      "Thread-based concurrency **capped at 20 calls/VM**; post-call docs **10–15 min each**; compute **$118K/month**; incident recovery **1–2 hours** from fragmented cross-service logs",
      "**Concurrency architecture redesigned** from thread pool to asyncio event loop — each SIP session becomes a coroutine, GIL contention eliminated, scheduling owned per request across the full SBC→STT→LLM pipeline",
      "**Cross-stack log correlation** over GCP Logging APIs reconstructs **250K+ log lines in under 5 seconds**; libsrtp + DTLS/SRTP for in-transit security; n2-standard-32 → c4-standard-8 migration",
      "**7× per-VM capacity** · **1,600+ sessions** sustained · **$118K → $8K/month** (~$1.3M annualized) · MTTR **1–2 hr → ~5 min**",
    ],
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
    summary: [
      "Infrastructure docs took **2–3 days per project**, authored by hand from **stale exports**, and drifted from live state with no mechanism to detect divergence",
      "**Live-state extraction pipeline**: subscription ID resolves to resource graph traversal → network topology mapping → security config analysis — documentation generated from what the infrastructure is, not what was last recorded",
      "**Few-shot LLM prompting** grounded in live Azure Resource Graph state; **validation guardrails** cross-check every generated component against extracted inventory — hallucinated topology can't reach governance docs",
      "**2–3 days → ~2–3 hours** · 104 resource groups/project · **zero fabricated components** · manual PlantUML authoring eliminated",
    ],
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
    summary: [
      "Airline contract PDFs **mixed image-embedded and readable tables**; template drift across carriers meant **no unified extraction path**; manual review couldn't scale",
      "**Camelot + Ghostscript** extract tables from both source types; **GPT-4o with one-shot prompting** normalizes across diverse carrier formats into schema-consistent output",
      "One-shot prompting maintains contextual coherence **without per-carrier fine-tuning**; covers the full format range from scan-quality images to nested programmatic tables",
      "**~96% extraction accuracy** · automated normalization replaced manual review · **real-time query resolution** for sales and customer support",
    ],
    bullets: [
      "Airline contract tables were **reviewed manually** — slow, error-prone, and couldn't scale to the volume of carrier agreements; **template drift across carriers** meant each format required separate handling logic; sales and support queries on contract terms had **no real-time resolution path**.",
      "Airline contract PDFs for AMEX GBT mixed **image-embedded and readable tables**, with varied schemas and template drift across carriers. Manual review was slow, error-prone, and couldn't scale.",
      "Document intelligence pipeline: **Camelot + Ghostscript** extract tables from both image-embedded and readable PDF sources. **GPT-4o with one-shot prompting** normalizes across diverse contract formats — clause normalization, table structuring, schema-consistent output.",
      "One-shot prompting maintains contextual coherence across carrier templates **without per-carrier fine-tuning**. Camelot + Ghostscript in combination covers the full format range — from scan-quality images to nested programmatic tables.",
      "**~96% extraction accuracy** across airline contract Q&A. Automated normalization replaced manual review. Real-time query resolution for sales and customer support.",
    ],
    github: null,
  },
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
    summary: [
      "Vehicle spec chatbots returned **inconsistent and contradictory answers** across languages; **manual escalation** was the only fallback for spec-heavy queries",
      "**RAG** grounded in a curated specification database with image-linked attributes and a **QA-tested retrieval pipeline** with dynamic data lookup across **163 languages**",
      "**QA-gated retrieval** enforces factual grounding before responses are served; 163-language localization from the **same structured data source** — not translated post-hoc",
      "**~97% factual accuracy** across **163 languages** · reduced manual escalation on spec-heavy queries",
    ],
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
    summary: [
      "Content generation, bot deployment, and API conversion required **separate tools with manual handoffs** and inconsistent output quality across every client engagement",
      "**Unified delivery toolchain** — each tool owns one fragmented workflow: **Laminar** orchestrates multilingual content generation across 163 languages, **Metamorph** converts prompts to deployed chatbots, **Polymorph** resolves API specs to implementation across 20+ languages",
      "**Standardized output artifacts** across all three tools produce deployable outputs — not drafts; AI-generated visuals maintain **brand consistency** from prompts across client deployments",
      "**Three fragmented workflows unified** · **163-language content** at scale · no-code bot deployment **removed engineering dependency** from chatbot delivery",
    ],
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
    summary: [
      "Recommendation system **ignored hierarchical skill relationships**; every taxonomy expansion triggered **full batch retraining**; inference **exceeded sub-50ms SLA** under production concurrency",
      "**Weighted directed graph** encoding multi-level skill hierarchies as typed edges; **lightweight scoring heuristics**; dynamic node updates without full graph recomputation",
      "**Deterministic traversal logic** produces consistent outputs under frequent profile and taxonomy updates; latency profiled at **99th percentile** on NVIDIA T4 before deployment",
      "**+30% recommendation relevance** · **sub-50ms inference** on NVIDIA T4 · batch retraining **eliminated** on taxonomy expansion",
    ],
    bullets: [
      "The recommendation system **ignored hierarchical skill relationships** — related skills treated as independent nodes with no structural modeling; **every taxonomy expansion triggered full batch retraining**, blocking updates until recompute completed; inference latency under production concurrency **exceeded the sub-50ms SLA** required for live platform use.",
      "Prismforce needed real-time skill recommendations against a **large, evolving taxonomy**. The existing system missed hierarchical skill relationships, went stale under profile updates, and couldn't hit **sub-50ms latency** for live platform use.",
      "Real-time recommendation engine using a **weighted directed graph** encoding multi-level skill hierarchy relationships as typed edges with dynamic weight updates. **Lightweight mathematical scoring heuristics** minimize computational overhead per inference call. Update model handles **dynamic node additions without full graph recomputation**.",
      "**Deterministic traversal logic** produces consistent outputs under frequent profile and taxonomy updates. Heuristics keep inference paths predictable and bounded. **Latency profiled under realistic production concurrency** on NVIDIA T4 before deployment.",
      "**~30% improvement** in recommendation relevance. **Sub-50ms inference** on NVIDIA T4 under production load. **Dynamic updates eliminated batch retraining** on taxonomy expansion.",
    ],
    github: null,
  },
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
    summary: [
      "Purely data-driven physics simulation required **large labeled datasets** and produced **physically implausible solutions** under sparse data — model could satisfy data loss while violating governing equations",
      "**Dual-loss PINN framework** embedding **PDE/ODE constraints directly into the optimization objective** alongside data loss, validated across six physics benchmarks",
      "Validated across **Burgers' equation**, **1D heat conduction**, fixed-fixed and cantilever deflection, **1D transient cooling** under Neumann flux and Dirichlet boundary conditions",
      "**Stable convergence** across fluid, structural, and thermal domains with limited labeled data · **Best Outgoing Project — BMSCE 2022–23**",
    ],
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

const SUMMARY_LABELS = ["Problem", "System", "Design", "Outcome"];

function ProjectCard({
  p,
  index,
}: {
  p: Project;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const isAward = p.status === "Best Outgoing Project · 2022–23";
  const statusColor = isAward
    ? "#facc15"
    : p.status === "Client Delivery"
      ? "#22d3ee"
      : p.devStatus === "completed"
        ? "#4ade80"
        : "#facc15";
  const statusBorder = isAward
    ? "rgba(250,204,21,0.35)"
    : p.status === "Client Delivery"
      ? "rgba(34,211,238,0.4)"
      : p.devStatus === "completed"
        ? "rgba(74,222,128,0.35)"
        : "rgba(250,204,21,0.35)";
  const statusBg = isAward
    ? "rgba(250,204,21,0.06)"
    : p.status === "Client Delivery"
      ? "rgba(34,211,238,0.08)"
      : p.devStatus === "completed"
        ? "rgba(74,222,128,0.06)"
        : "rgba(250,204,21,0.06)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.025 }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { window.location.href = `/projects/${p.index}`; }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.6rem",
        borderRadius: "8px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)"}`,
        background: "transparent",
        transition: "border-color 0.2s, color 0.2s",
        cursor: "pointer",
      }}
    >
      {/* Title + badge row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.75rem",
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
            flex: 1,
          }}
        >
          {p.title}
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
            flexShrink: 0,
            marginTop: "3px",
            color: statusColor,
            border: `1px solid ${statusBorder}`,
            background: statusBg,
          }}
        >
          {p.status}
          {isAward && " 🏆"}
        </span>
      </div>

      {/* Company */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={p.logo}
          alt={p.company}
          style={{
            height: `${p.logoHeight}px`,
            width: "auto",
            maxWidth: "72px",
            objectFit: "contain",
            borderRadius: "3px",
            opacity: 0.85,
          }}
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).style.display = "none")
          }
        />
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.7rem",
            letterSpacing: "0.09em",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {p.company}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

      {/* 4 summary bullets */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {p.summary.map((bullet, i) => (
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
              {SUMMARY_LABELS[i]}
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

      {/* Footer: index + arrow */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          paddingTop: "0.25rem",
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.1em",
          }}
        >
          {p.index}
        </span>
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
    </motion.div>
  );
}

export function Projects() {
  const isMobile = useIsMobile();

  const orderedProjects = [...projects].sort((a, b) => {
    const aIsAward = a.status === "Best Outgoing Project · 2022–23";
    const bIsAward = b.status === "Best Outgoing Project · 2022–23";
    if (aIsAward === bIsAward) return 0;
    return aIsAward ? 1 : -1;
  });

  const ROW_COLS = isMobile ? [1, 1, 1, 1] : [3, 2, 3, 2];
  const ROW_SLICES = [[0, 3], [3, 5], [5, 8], [8, 10]];

  return (
    <section
      id="projects"
      style={{
        padding: isMobile ? "2.75rem 4vw 4rem" : "6.5rem 6vw 10rem",
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
          background: "linear-gradient(to right, rgba(5,5,8,0.52) 0%, rgba(5,5,8,0.52) 45%, rgba(5,5,8,0) 88%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          marginBottom: "5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
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
            Delivered, Scaled.
          </motion.h2>
        </div>
      </div>

      {/* Grid — alternating 3-col / 2-col rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {ROW_SLICES.map(([start, end], rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${ROW_COLS[rowIdx]}, 1fr)`,
              gap: "1.25rem",
            }}
          >
            {orderedProjects.slice(start, end).map((p) => {
              const globalIdx = orderedProjects.indexOf(p);
              return (
                <ProjectCard
                  key={p.index}
                  p={p}
                  index={globalIdx}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
