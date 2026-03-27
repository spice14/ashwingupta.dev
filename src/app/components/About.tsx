import { motion } from "motion/react";
import { TiltCard } from "./TiltCard";
import { useIsMobile } from "../../hooks/useMediaQuery";
import coforgeLogoImg from "../../assets/coforgeLogo.webp?url";
import gidaLogoImg from "../../assets/gidaLogo.webp?url";
import bmsceLogoImg from "../../assets/BMSlogo.webp?url";
import iiitbLogoImg from "../../assets/IIITlogo.webp?url";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const timeline = [
  {
    year: "2024–Present",
    role: "AI Engineer",
    company: "Coforge",
    detail: "HSBC real-time conversational analytics — $1.3M saved",
    logo: coforgeLogoImg,
    logoH: 55,
    awards: [
      "Best Team Award — HSBC Account",
      "Pat on the Back — Think Customer Award (Individual Excellence)",
      "Trained a cohort of 130+ colleagues in AI/ML as part of the Java Spring AI training program",
    ],
  },
  {
    year: "2023–2024",
    role: "Data Scientist",
    company: "Gida Technologies",
    detail: "163+ language RAG systems, sub-50ms recommenders",
    logo: gidaLogoImg,
    logoH: 55,
  },
  {
    year: "2025-Present",
    role: "Executive Diploma",
    company: "IIIT Bangalore",
    detail: "Dual specialisation - MLOps, GenAI",
    logo: iiitbLogoImg,
    logoH: 55,
  },
  {
    year: "2019–2023",
    role: "B.E. Mechanical",
    company: "BMS College of Engineering",
    awards: [
      "Best Outgoing Project - Mechanical Engineering '23",
      "Published @ NCISCT 2022",
    ],
    logo: bmsceLogoImg,
    logoH: 55,
  },
];

const pillars = [
  {
    title: "Inference Infrastructure",
    desc: "Built SIP-to-LLM pipelines with bounded concurrency, distributed inference workers, and SLA monitoring under live traffic.",
  },
  {
    title: "Observability & Failure Isolation",
    desc: "Correlated logs across services, isolated failure domains, and reduced MTTR with traceable incident workflows.",
  },
  {
    title: "Retrieval & Orchestration Systems",
    desc: "Built tree and graph retrieval pipelines with evidence traceability and deterministic orchestration across runtimes.",
  },
];

export function About() {
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      style={{
        padding: isMobile ? "4rem 4vw" : "10rem 6vw",
        background: "transparent",
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
          01 — About
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
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "3rem" : "6vw",
          alignItems: "start",
        }}
      >
        {/* LEFT */}
        <div>
          <div style={{ overflow: "hidden", marginBottom: "2.5rem" }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: FONT_SERIF,
                fontSize: isMobile
                  ? "clamp(1.8rem, 7vw, 4rem)"
                  : "clamp(2.6rem, 4.5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fafaf8",
                margin: 0,
              }}
            >
              Building AI Infrastructure That Survives Production Load.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              fontFamily: FONT_SANS,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
              marginBottom: "1.5rem",
              maxWidth: "500px",
            }}
          >
            I build AI systems for production environments with strict latency,
            concurrency, and reliability constraints.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            style={{
              fontFamily: FONT_SANS,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.58)",
              marginBottom: "1.5rem",
              maxWidth: "500px",
            }}
          >
            My work covers inference infrastructure, retrieval systems, and
            observability for large-scale ML services.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            style={{
              fontFamily: FONT_SANS,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.58)",
              marginBottom: "2.5rem",
              maxWidth: "500px",
            }}
          >
            I treat AI as infrastructure — building for latency budgets,
            throughput ceilings, transparency, and operational clarity across
            distributed components.
          </motion.p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
          >
            {pillars.map(({ title, desc }, i) => (
              <div
                key={i}
              >
                <TiltCard
                  intensity={8}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.2rem",
                    padding: "1.2rem 1.5rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.11)",
                    background: "rgba(255,255,255,0.025)",
                  }}
                >
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#e8e0d0",
                      marginTop: "7px",
                      flexShrink: 0,
                      opacity: 0.6,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: FONT_SERIF,
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        color: "#fafaf8",
                        marginBottom: "3px",
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: "0.83rem",
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.58)",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — timeline */}
        <div>
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              marginBottom: "1.8rem",
            }}
          >
            Experience & Education
          </p>
          <div>
            {timeline.map(
              ({ year, role, company, detail, logo, awards }, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "110px 1fr",
                    gap: isMobile ? "0.5rem" : "1.5rem",
                    padding: "1.3rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.7)",
                      paddingTop: "3px",
                    }}
                  >
                    {year}
                  </span>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "4px",
                      }}
                    >
                      {logo && (
                        <div
                          style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "8px",
                            background: "rgba(255,255,255,0.93)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            overflow: "hidden",
                            padding: "5px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                          }}
                        >
                          <img
                            src={logo}
                            alt={company}
                            style={{
                              height: "42px",
                              width: "42px",
                              objectFit: "contain",
                              display: "block",
                            }}
                          />
                        </div>
                      )}
                      <p
                        style={{
                          fontFamily: FONT_SANS,
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          color: "#fafaf8",
                          margin: 0,
                        }}
                      >
                        {role}{" "}
                        <span
                          style={{
                            color: "rgba(255,255,255,0.48)",
                            fontWeight: 400,
                          }}
                        >
                          @ {company}
                        </span>
                      </p>
                    </div>
                    {detail && (
                      <p
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: "0.82rem",
                          color: "rgba(255,255,255,0.48)",
                          lineHeight: 1.5,
                          paddingLeft: logo ? "62px" : "0",
                          marginBottom: awards ? "0.6rem" : 0,
                        }}
                      >
                        {detail}
                      </p>
                    )}

                    {/* Awards */}
                    {awards && (
                      <div
                        style={{
                          paddingLeft: logo ? "62px" : "0",
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        {awards.map((award, j) => {
                          const isTrainingHighlight = award.startsWith(
                            "Trained a cohort of 130+ colleagues",
                          );
                          const isPublicationHighlight =
                            award.includes("Published @ NCISCT");
                          let awardIcon = "🏆";
                          if (isPublicationHighlight) {
                            awardIcon = "📄";
                          } else if (isTrainingHighlight) {
                            awardIcon = "🎓";
                          }

                          return (
                            <div
                              key={j}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <span style={{ fontSize: "0.75rem" }}>
                                {awardIcon}
                              </span>
                              <span
                                style={{
                                  fontFamily: FONT_SANS,
                                  fontSize: "0.78rem",
                                  color: "#c9a84c",
                                  lineHeight: 1.4,
                                }}
                              >
                                {award}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          <motion.a
            href="https://ijiset.com/conference/NCISCT-2022/IJISET-NCISCT-220520.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ x: 4 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "1.8rem",
              fontFamily: FONT_MONO,
              fontSize: "0.95rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.42)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#e8e0d0")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.42)")
            }
          >
            ↗️ NCISCT 2022 — Generating MCQs using Graphs & Language Models
          </motion.a>
        </div>
      </div>

    </section>
  );
}
