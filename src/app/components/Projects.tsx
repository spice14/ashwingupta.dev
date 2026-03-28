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
      "A designer-submitted baseline — **400 CSS-animated DOM particles**, a **2 MB JPEG hero image**, Google Fonts loaded per-component, and **72 unvetted dependencies** — needed a full E2E transformation into a production-grade personal brand site that communicates technical depth and system-level thinking.",
      "Rebuilt end-to-end: introduced a **three-layer spatial architecture** (fixed environment, canvas particle field, scrollable hologram interface); replaced CSS particles with a **unified Canvas 2D engine** absorbing dust motes, network graph, scanlines, and data packets into a single RAF loop; migrated images to WebP with fetchpriority preloading; bundled fonts via @fontsource; split below-fold sections with **React.lazy and Suspense**; deployed on Vercel with domain and DNS on Cloudflare.",
      "Pre-rendered scanline texture (**1 drawImage vs 270 fillRect/frame**), squared-distance edge cache rebuilt **every 3 frames**, visibility-change RAF pausing, and RAF-gated mouse tracking maintained **stable 60 FPS** under CPU throttle across desktop and mobile.",
      "Profile image reduced **90% (2 MB → 211 KB)**; JS bundle cut **72%**; **400 CSS-animated DOM nodes** eliminated; font HTTP requests dropped from **3 to 0**; per-frame canvas time cut from **~18–25 ms to ~4–6 ms**.",
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
      "PageIndex's tree-based RAG reasoning was tightly coupled to **OpenAI's API contract** — hardcoded inference calls, inline prompt strings, and non-normalized completion handling made **local or offline deployment impossible** and increased regression risk across any provider change.",
      "Forked and refactored the full runtime layer with a **provider-routing abstraction** that resolves LLM_PROVIDER from environment variables and dispatches through provider-specific wrappers; added a **finish-reason normalization layer** to stabilize recursive tree traversal across model outputs; externalized all prompts into a registry-driven loader system; introduced **bounded async concurrency** across TOC generation and summarization stages; implemented adaptive chunking and hierarchical fallback paths for large-document robustness.",
      "Normalized completion contracts prevent provider-specific finish-reason variations from corrupting **recursive traversal state**; fallback chunk policies ensure long-document execution completes on **constrained VRAM and RAM**; structured-output hardening handles imperfect model responses without pipeline failure.",
      "**Fully offline tree-RAG execution** with Ollama backends — no API keys, no external inference services; **stable internal contracts** enable seamless provider switching; regression risk reduced through hardened e2e test coverage across document types and model sizes.",
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
      "Researchers working with sensitive or proprietary papers had no production-quality RAG system that could operate **entirely offline** across mixed sources — local PDFs, arXiv URLs, directory trees — without exposing data to external inference APIs or cloud indexing services.",
      "Built a fully local RAG pipeline using **LEANN/HNSW vector indexing** with dense embeddings (facebook/contriever via sentence-transformers), Ollama-backed LLM inference, and a multi-source ingestion layer supporting local PDFs, academic HTML pages (arXiv, NeurIPS, ResearchGate), and entire paper directories; implemented smart chunking with overlap, **configurable Top-K retrieval**, and quantized model support for CPU-only operation; shipped a Streamlit chat UI and Typer CLI for batch ingestion workflows.",
      "Reproducible vector index artifacts enable **air-gapped and offline-first operation**; configurable context-window **(1024–1536 tokens)** and Top-K **(3–4)** settings stabilize inference on **low-VRAM and CPU-only hardware**; PyMuPDF and BeautifulSoup parsing handles varied PDF quality and web content formats before indexing.",
      "**Deterministic, API-free document QA** across academic sources — all compute, indexing, and inference runs locally with **zero external dependency**; supports **sub-1GB quantized models** for resource-constrained environments; designed for air-gapped institutional research operation.",
    ],
    github: "https://github.com/spice14/research-it",
  },
  {
    index: "04",
    title: "Controla — Local-First Inference Control Plane",
    company: "Open Source",
    logo: "https://cdn.simpleicons.org/github/ffffff",
    logoHeight: 18,
    status: "Active Development",
    devStatus: "in-progress",
    tags: [
      "Execution-Aware Routing",
      "Real Scheduling Engine",
      "10 Backend Adapters",
      "VRAM-Aware Dispatch",
      "Feedback-Driven Optimization",
      "Python / Local-First",
    ],
    impact:
      "10 inference backends orchestrated · execution-aware scheduling · adaptive routing over time",
    bullets: [
      "Modern local AI systems are fragmented across **incompatible inference backends** — vLLM, Ollama, llama.cpp, TensorRT-LLM, and others — with **no shared scheduling layer**, static routing decisions that ignore hardware state and task complexity, and no feedback mechanism to improve dispatch over time; existing gateways proxy requests but do not control execution.",
      "Building Controla as a **10-stage execution pipeline** (Request Analyzer → Execution Planner → Routing Engine → Scheduler → Batch Engine → Backend Adapters) that treats inference as a **system-level workload**, not a function call; **task classification** (reasoning, extraction, summarization, multimodal) drives an execution plan before backend selection; a **priority-queue scheduler** with deadline awareness, fairness enforcement, and starvation prevention dispatches across **10 supported backends** (vLLM, Ollama, llama.cpp, SGLang, TGI, TensorRT-LLM, MLX-LM, AirLLM, LocalAI, ExLlamaV2); **VRAM-aware routing** handles dynamic model loading/unloading and GPU/CPU-aware dispatch.",
      "**Feedback loop** records latency, throughput, failure rate, and token efficiency per backend, continuously updating routing policy to prevent static dispatch degradation; **starvation prevention and load-aware dispatch** prevent queue saturation under concurrent workloads; multi-GPU, CPU-only, and Apple Silicon execution paths designed for correctness across hardware configurations.",
      "Unified control plane orchestrating **10 inference backends** across heterogeneous hardware; **multi-step execution** routes individual pipeline stages to the optimal backend (retrieval → llama.cpp, reasoning → vLLM, summarization → Ollama); **adaptive routing reduces inference cost and latency over time** through performance feedback; designed for local AI systems, research platforms, multi-agent orchestration, and on-prem enterprise deployments.",
    ],
    github: "https://github.com/spice14/controla",
  },
  {
    index: "05",
    title: "ScholarOS — Agentic Research Execution System",
    company: "Open Source",
    logo: "https://cdn.simpleicons.org/github/ffffff",
    logoHeight: 18,
    status: "Active Development",
    devStatus: "in-progress",
    tags: [
      "Agentic Orchestration",
      "Deterministic Tool Services",
      "Evidence Traceability",
      "Multi-Agent Hypothesis Critique",
      "MCP / Composable Architecture",
    ],
    impact:
      "Structured research execution · adversarial hypothesis critique · provenance-tracked evidence extraction",
    bullets: [
      "Existing AI research tools generate plausible-sounding outputs that **cannot be reproduced, audited, or traced back** to source evidence — making them unsuitable for real academic workflows where contradiction detection, hypothesis validation, and scholarly rigor are required, not just text generation.",
      "Building ScholarOS as a modular research execution system with a central orchestrator coordinating **five locked capability services**: contextual literature mapping, contradiction and consensus detection, multi-agent adversarial hypothesis critique, multimodal evidence extraction with provenance tracking, and a grant/proposal assistant; all tool services expose uniform **Model Context Protocol (MCP)** interfaces; agentic reasoning applied selectively only for adversarial critique loops.",
      "**Deterministic tool services** with schema-defined MCP interfaces eliminate hidden coupling between pipeline stages; **evidence-bound outputs enforce source provenance tracking** on every generated claim; isolated tool execution prevents cross-stage state contamination and maintains consistent outputs across identical runs.",
      "Research workflows produce **fully auditable execution traces** with clear evidence links for every insight; **contradiction and consensus detection** surfaces where scholarly agreement exists, breaks down, or remains contested; composable architecture allows capability extension without disrupting validated pipeline stages.",
    ],
    github: "https://github.com/spice14/ScholarOS",
  },
  {
    index: "06",
    title:
      "PHYSCLIP — Contrastive Alignment of Physical Laws and Field Solutions",
    company: "Open Source",
    logo: "https://cdn.simpleicons.org/github/ffffff",
    logoHeight: 18,
    status: "Active Development",
    devStatus: "in-progress",
    tags: [
      "Contrastive Learning",
      "Dual-Encoder Architecture",
      "Physics-Constrained Training",
      "Symbolic Alignment",
      "Regime Classification",
      "Inference Gating",
    ],
    impact:
      "Deterministic regime gating before compute dispatch · stable under sparse and noisy measurements",
    bullets: [
      "Runtime control stacks for physics-governed systems require reliable regime identification before routing to **expensive downstream solvers** — but purely data-driven classifiers **fail under sparse measurements, noisy sensor readings, or partially missing physical state**, producing unstable gating that propagates errors into downstream computation.",
      "Designing PHYSCLIP as a **contrastive dual-encoder regime classifier** that aligns symbolic physics descriptors — governing equations and physical law representations — with observed field-solution behavior — simulation outputs and sensor measurements — through contrastive representation learning; alignment between symbolic and observed domains grounds classification in **physical constraints rather than statistical correlations**.",
      "**Physics-constrained training** enforces consistency between symbolic and observed representation spaces, preventing regime misclassification under sparse or partially missing measurements; **deterministic routing logic** avoids stochastic assignment at inference time, producing stable and reproducible gating behavior across variable operating conditions.",
      "**Stable regime selection layer** upstream of expensive numerical solvers and compute dispatch pipelines; improves downstream decision consistency **without replacing validated numerical methods**; designed for environments where **measurement coverage is incomplete and misclassification has high downstream cost**.",
    ],
    github: "https://github.com/spice14/PHYSCLIP",
  },
  // ── COFORGE ──────────────────────────────────────────────────
  {
    index: "07",
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
      "HSBC's banking voice AI operations were constrained by a thread-based architecture capped at **20 concurrent calls per VM**, post-call documentation averaging **10–15 minutes per interaction**, inference costs at **~$118K/month**, and incident recovery times of **1–2 hours** caused by fragmented cross-service logs with no unified observability layer.",
      "Led a **4-engineer team** designing and shipping the enterprise SIP integration stack across Packer-automated GCE workloads and core signaling services **(SBC → STT → LLM inference)**; drove an architectural refactor from thread-based to **asyncio + uvloop**, eliminating GIL contention; built a **SIPp-based load test suite** simulating up to 2,000 concurrent users; architected a **cross-stack log-correlation layer** over GCP Logging APIs reconstructing **250K+ log lines in under 5 seconds**.",
      "Sustained **<2s E2E transcription latency** and **<5% packet loss** under 1,600+ concurrent sessions; in-transit security enforced via libsrtp with DTLS/SRTP; Grafana-Prometheus dashboards with MACD triggers provided real-time infra and model monitoring; infrastructure density optimization enabled migration from **n2-standard-32 → c2-standard-8** while improving transcript length **30–40% under load**.",
      "Per-VM capacity increased **7× (20 → 140–160 calls)**; **1,600+ sessions** sustained in production; post-call documentation reduced from **10–15 min → 2–3 min** per interaction; compute spend reduced from **~$118K → ~$8K/month (~$1.3M annualized savings)**; MTTR reduced from **~1–2 hours → ~5 minutes** through unified log correlation.",
    ],
    github: null,
  },
  {
    index: "08",
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
      "Enterprise infrastructure documentation required manual extraction from Azure subscription data — a process taking **2–3 days per project** that produced stale architecture views, delayed governance reviews, and created discrepancies between documented and live infrastructure state.",
      "Built a Streamlit-based engine that accepts a **subscription ID** and auto-generates SDDs and **PlantUML architecture diagrams** through an automated pipeline of inventory extraction, network flow mapping, security configuration analysis, and dependency graph construction; applied **few-shot LLM prompting** for architecture rationale grounded in live state; integrated Azure Backbone topology exploration; explicit **validation guardrails** cross-check generated components against extracted inventory to prevent fabricated resources from appearing in outputs.",
      "**Guardrail layer enforces** that every generated component maps to a verified resource in the live Azure state, preventing hallucinated topology from reaching governance documentation; outputs regenerated from **live subscription state** rather than cached snapshots, preventing documentation drift; topology validation directly accelerated GCP infrastructure debugging in subsequent projects.",
      "Documentation turnaround reduced from **2–3 days → ~2–3 hours** across an average of **104 resource groups per project**; automated diagram generation eliminated manual PlantUML authoring; **materially improved architectural fidelity** through live-state grounding rather than manual transcription.",
    ],
    github: null,
  },
  {
    index: "09",
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
      "Airline contract PDFs for AMEX GBT contained tables in **inconsistent formats** — some rendered as embedded images, others as readable structured text — with varied schemas, nested table layouts, and **template drift across carriers**; manual review was slow, error-prone, and could not scale to the volume of agreement processing required.",
      "Built a document intelligence pipeline using **Camelot and Ghostscript** to extract tables from both image-embedded and programmatically-readable PDF sources, normalizing them to clean structured output regardless of source format; applied **GPT-4o with one-shot prompting** to maintain contextual accuracy across diverse contract formats, handling clause normalization, table structuring, and schema-consistent output generation.",
      "**One-shot prompting** preserved contextual coherence across varied airline contract templates **without requiring per-carrier fine-tuning** or schema-specific rule authoring; Camelot and Ghostscript in combination covered the full range of airline PDF formats — from scan-quality images to programmatically-generated nested tables.",
      "**~96% extraction accuracy** across airline contract Q&A; **automated normalization pipeline** replaced manual contract review steps, significantly accelerating commercial analysis cycles and enabling real-time query resolution for sales and customer support teams.",
    ],
    github: null,
  },
  // ── GIDA ─────────────────────────────────────────────────────
  {
    index: "10",
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
      "HDFC Bank's vehicle intelligence operations required accurate, real-time answers to specification-heavy queries across India's **diverse linguistic landscape** — but standard chatbots lacked multilingual coverage and consistently failed on structured vehicle data, generating **inconsistent answers that eroded user trust** and increased manual support escalation.",
      "Developed a **RAG-based vehicle intelligence assistant** grounded in a curated database of vehicle specifications and image-linked attributes; built a **QA-tested retrieval pipeline** with dynamic data lookup resolving queries across **163 languages**, ensuring localized responses are grounded in the same structured specification data regardless of input language — not translated post-hoc.",
      "**QA-gated retrieval and inference paths** enforce factual grounding before responses are served, preventing speculative answers on specification queries; **structured specification database** acts as a single source of truth that prevents variant answers from emerging across language boundaries; validated accuracy across the **full 163-language coverage** before production deployment.",
      "**~97% factual accuracy** on vehicle queries across **163 languages**; measurably **reduced manual escalation** for specification-heavy support cases; enabled consistent vehicle intelligence at scale across India's multilingual user base.",
    ],
    github: null,
  },
  {
    index: "11",
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
      "Development teams building multilingual web products, chatbots, and API integrations were operating with **fragmented tooling** — content generation, bot deployment, and API code conversion each required separate workflows and bespoke engineering effort, slowing cross-functional delivery and producing **inconsistent output quality**.",
      "Designed and shipped **three interlinked AI tools** as a unified delivery toolchain: **Laminar** — AI-powered CMS for multilingual content generation across **163+ languages** with AI-driven visuals and multi-format media export; **Metamorph** — no-code chatbot builder constructing deployment-ready bots from user prompts or documentation; **Polymorph** — API utility engine converting cURL to **20+ programming languages**, generating sample endpoints and scaffolding integration boilerplate.",
      "**Standardized output artifacts** across all three tools ensured deployable outputs rather than drafts requiring manual cleanup; **163+ language content generation** maintained consistent quality without per-language customization; AI-generated visuals and titles produced brand-consistent outputs from text prompts across client deployments.",
      "**Unified toolchain replaced three fragmented workflows** with standardized, production-ready artifacts; enabled **163-language content generation at scale**; **no-code bot deployment** removed engineering dependency from chatbot delivery and significantly accelerated API integration velocity.",
    ],
    github: null,
  },
  {
    index: "12",
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
      "Prismforce's workforce intelligence platform needed real-time skill recommendations against a **large, constantly evolving taxonomy** — but the existing system **failed to model hierarchical skill relationships**, produced stale recommendations under frequent profile updates, and could not meet **sub-50ms latency requirements** for live platform use.",
      "Built a real-time recommendation engine using a **weighted directed graph** that encodes multi-level skill hierarchy relationships as typed edges with dynamic weight updates; implemented optimized graph traversal using **lightweight mathematical scoring heuristics** to minimize computational overhead per inference call; designed the update model to handle **dynamic node additions and taxonomy changes without full graph recomputation**.",
      "**Deterministic traversal logic** preserved consistent recommendation outputs under frequent profile and taxonomy updates; lightweight heuristics kept inference paths predictable and bounded rather than relying on probabilistic model outputs; **latency profiled under realistic production concurrency** on a single NVIDIA T4 GPU to validate real-time SLA compliance before deployment.",
      "**~30% improvement** in recommendation relevance through hierarchical skill modeling; sustained **sub-50ms inference latency** on a single NVIDIA T4 GPU under production load; **dynamic update model eliminated batch retraining cycles** when the skill taxonomy expanded.",
    ],
    github: null,
  },
  // ── BMSCE ────────────────────────────────────────────────────
  {
    index: "13",
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
      "Physics simulation domains — fluid dynamics, structural mechanics, heat transfer — are **unstable under purely data-driven approaches**, requiring **large labeled datasets that are expensive or impossible to generate** in experimental settings, and producing physically implausible solutions when training data is sparse.",
      "Built a **dual-loss PINN framework** that embeds governing **PDE/ODE constraints directly into the optimization objective** alongside the standard data loss, enforcing physical law compliance throughout training; implemented and validated across **six benchmark problems**: Burgers' equation (nonlinear fluid dynamics), 1D heat conduction via pin fin, fixed-fixed column deflection, cantilever tip deflection, and 1D transient cooling under both **Neumann flux and Dirichlet boundary conditions**.",
      "**Dual-loss formulation uses physics constraints as a regularizer**, stabilizing convergence under sparse labeled data by preventing physically implausible solutions from satisfying the data loss alone; **Neumann and Dirichlet boundary condition variants** validated generalizability across different physical constraint types and problem geometries.",
      "**Stable convergence validated across six physics benchmarks** spanning fluid, structural, and thermal domains with limited labeled data; proposed applied use cases in **HVAC optimization via real-time thermal feedback** and **predictive server cooling for direct-to-chip systems**; awarded **Best Outgoing Project at BMSCE 2022–23**.",
    ],
    github: null,
  },
];

// ── Bullet icon map — keyed on first matching keyword ──────────
const BULLET_STAGE_ICONS = ["⚠️", "⚙️", "🛡️", "🚀"] as const;

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
