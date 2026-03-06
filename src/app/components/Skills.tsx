import { motion } from "motion/react";
import { TiltCard } from "./TiltCard";
import { useIsMobile } from "../../hooks/useMediaQuery";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

// Directly from the doc — Core Capabilities
const capabilities = [
  {
    title: "AI Systems Architecture",
    desc: "Designing production-grade, observable, and scalable intelligent systems under latency, cost, and regulatory constraints.",
    tags: ["LLM Deployment", "Observability", "SLA Design", "Cost Modeling"],
  },
  {
    title: "Distributed Inference & Real-Time ML",
    desc: "Concurrency scaling, SLA preservation, cost modeling, low-latency pipelines.",
    tags: ["vLLM", "Batching", "Concurrency", "Low-latency"],
  },
  {
    title: "Retrieval-Augmented Systems (RAG)",
    desc: "Index design, chunking strategy, embedding pipelines, HNSW-based vector search, grounding and hallucination mitigation.",
    tags: [
      "FAISS / HNSW",
      "Chunking",
      "Embeddings",
      "Hallucination Mitigation",
    ],
  },
  {
    title: "Model Monitoring & Drift Detection",
    desc: "Metric design (BLEU, ROUGE-L, cosine similarity, METEOR), time-series anomaly detection, governance and rollout safety.",
    tags: ["BLEU / ROUGE-L", "MACD Anomaly", "METEOR", "Rollout Safety"],
  },
  {
    title: "Graph-Based Recommendation Systems",
    desc: "Weighted directed graphs, hierarchy modeling, heuristic scoring, optimized traversal for real-time inference.",
    tags: ["Graph ML", "Heuristic Scoring", "Edge Traversal", "sub-50ms"],
  },
  {
    title: "Physics-Informed Machine Learning",
    desc: "PDE/ODE-constrained learning (PINNs), loss balancing, boundary condition modeling, regime-aware representations.",
    tags: ["PINNs", "PDEs/ODEs", "PHYSCLIP", "Contrastive Learning"],
  },
];

const techStack = [
  "PyTorch",
  "LangChain",
  "Hugging Face",
  "Ollama",
  "FastAPI",
  "GCP",
  "Azure",
  "Docker",
  "Kubernetes",
  "W&B",
  "MLflow",
  "FAISS",
  "Redis",
  "SQL",
  "Terraform",
  "Python",
];

export function Skills() {
  const isMobile = useIsMobile();

  return (
    <section
      id="skills"
      style={{
        padding: isMobile ? "4rem 4vw" : "10rem 6vw",
        background: "rgba(255,255,255,0.012)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: isMobile ? "3rem" : "5rem",
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
          02 — Core Capabilities
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
          gap: isMobile ? "5rem" : "8vw",
          alignItems: "start",
        }}
      >
        {/* LEFT — sticky heading + tech stack */}
        <div
          style={{
            position: isMobile ? "relative" : "sticky",
            top: isMobile ? "0" : "6rem",
            marginBottom: isMobile ? "2rem" : "0",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: FONT_SERIF,
                fontSize: isMobile
                  ? "clamp(1.6rem, 7vw, 3.2rem)"
                  : "clamp(2.2rem, 3.5vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fafaf8",
                margin: "0 0 1.2rem",
              }}
            >
              The stack behind the systems.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: FONT_SANS,
              fontSize: "0.88rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.48)",
              maxWidth: "260px",
              marginBottom: "2.5rem",
            }}
          >
            Built for production — not notebooks.
          </motion.p>

          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.18)",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Tech Stack
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
          >
            {techStack.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.03 * i }}
                whileHover={{
                  color: "#e8e0d0",
                  borderColor: "rgba(255,255,255,0.42)",
                  y: -2,
                }}
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.42)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "3px",
                  padding: "4px 9px",
                  cursor: "default",
                  transition: "all 0.2s",
                  display: "inline-block",
                }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — 3D capability cards from doc */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {capabilities.map((cap, gi) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
            >
              <TiltCard
                intensity={7}
                style={{
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  padding: "1.8rem 2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                    marginBottom: "0.7rem",
                    flexWrap: "wrap",
                  }}
                >
                  <p
                    style={{
                      fontFamily: FONT_SERIF,
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      color: "#fafaf8",
                      margin: 0,
                    }}
                  >
                    {cap.title}
                  </p>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.35)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    0{gi + 1}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: "0.85rem",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "1rem",
                  }}
                >
                  {cap.desc}
                </p>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {cap.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.56rem",
                        letterSpacing: "0.07em",
                        color: "rgba(255,255,255,0.42)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "2px",
                        padding: "3px 7px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;600&family=DM+Mono:wght@400&display=swap"
        rel="stylesheet"
      />
    </section>
  );
}
