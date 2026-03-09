import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useCallback, useState } from "react";
import { useIsMobile, useIsTouchDevice } from "../../hooks/useMediaQuery";
import profilePicture from "../../assets/profilePicture.jpeg";

const PROFILE_IMAGE = profilePicture;
const CONTACT_EMAIL = "ashwingupta3012@gmail.com";

export function Hero() {
  const isMobile = useIsMobile();
  const isTouchDevice = useIsTouchDevice();
  const layerText = useRef<HTMLDivElement>(null);
  const layerPhoto = useRef<HTMLDivElement>(null);
  const layerPills = useRef<HTMLDivElement>(null);
  const [copyToastMessage, setCopyToastMessage] = useState<string | null>(null);

  const copyEmailToClipboard = useCallback(async () => {
    try {
      await globalThis.navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopyToastMessage("Email copied to clipboard!");
      setTimeout(() => setCopyToastMessage(null), 1600);
    } catch {
      setCopyToastMessage("Could not copy email");
      setTimeout(() => setCopyToastMessage(null), 1800);
    }
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const W = window.innerWidth,
      H = window.innerHeight;
    const x = (e.clientX / W - 0.5) * 2;
    const y = (e.clientY / H - 0.5) * 2;
    if (layerText.current)
      layerText.current.style.transform = `translate(${x * 8}px, ${y * 5}px)`;
    if (layerPhoto.current)
      layerPhoto.current.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 5}deg) translate(${x * 18}px, ${y * 12}px)`;
    if (layerPills.current)
      layerPills.current.style.transform = `translate(${x * 14}px, ${y * 9}px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    [layerText, layerPhoto, layerPills].forEach((r) => {
      if (r.current) {
        r.current.style.transform = "none";
        r.current.style.transition =
          "transform 0.9s cubic-bezier(0.23,1,0.32,1)";
      }
    });
  }, []);

  const onMouseEnterSection = useCallback(() => {
    [layerText, layerPhoto, layerPills].forEach((r) => {
      if (r.current) r.current.style.transition = "transform 0.08s ease-out";
    });
  }, []);

  return (
    <section
      onMouseMove={isTouchDevice ? undefined : onMouseMove}
      onMouseLeave={isTouchDevice ? undefined : onMouseLeave}
      onMouseEnter={isTouchDevice ? undefined : onMouseEnterSection}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "0 4vw" : "0 6vw",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Horizontal rule top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          top: isMobile ? 60 : 80,
          left: isMobile ? "4vw" : "6vw",
          right: isMobile ? "4vw" : "6vw",
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          transformOrigin: "left",
          zIndex: 5,
        }}
      />

      {/* Nav-style label top left */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{
          position: "absolute",
          top: isMobile ? 36 : 56,
          left: isMobile ? "4vw" : "6vw",
          fontFamily: '"DM Mono", monospace',
          fontSize: isMobile ? "0.55rem" : "0.65rem",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          zIndex: 5,
        }}
      >
        Ashwin Gupta — Portfolio 2025
      </motion.div>

      {/* Nav-style label top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: "absolute",
          top: isMobile ? 36 : 56,
          right: isMobile ? "4vw" : "6vw",
          fontFamily: '"DM Mono", monospace',
          fontSize: isMobile ? "0.55rem" : "0.65rem",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          zIndex: 5,
        }}
      >
        AI Engineer — Bangalore
      </motion.div>

      {/* Main content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "3rem" : "4vw",
          alignItems: "center",
          paddingTop: isMobile ? "40px" : "60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT — typography */}
        <div ref={layerText} style={{ willChange: "transform" }}>
          {/* Eyebrow */}
          <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{ width: "28px", height: "1px", background: "#e8e0d0" }}
              />
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "#e8e0d0",
                  textTransform: "uppercase",
                }}
              >
                Inside the Architecture of Intelligence
              </span>
            </motion.div>
          </div>

          {/* Giant name */}
          <div style={{ overflow: "visible", marginBottom: "-0.05em" }}>
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                fontFamily:
                  '"Editorial New", "Playfair Display", Georgia, serif',
                fontSize: isMobile
                  ? "clamp(3.5rem, 13vw, 11rem)"
                  : "clamp(5rem, 13vw, 11rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "#fafaf8",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              Ashwin
            </motion.h1>
          </div>
          <div
            style={{
              overflow: "visible",
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.65,
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                fontFamily:
                  '"Editorial New", "Playfair Display", Georgia, serif',
                fontSize: isMobile
                  ? "clamp(3.5rem, 13vw, 11rem)"
                  : "clamp(5rem, 13vw, 11rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                color: "#fafaf8",
                margin: 0,
                display: "block",
              }}
            >
              Gupta
            </motion.h1>
          </div>

          {/* Role + description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "1.5rem" : "3rem",
              marginBottom: isMobile ? "2rem" : "2.5rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Role
              </p>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "0.9rem",
                  color: "#e8e0d0",
                  lineHeight: 1.5,
                }}
              >
                AI Systems Engineer
                <br />
                Production-Grade Intelligence
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Company
              </p>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "0.9rem",
                  color: "#e8e0d0",
                  lineHeight: 1.5,
                }}
              >
                Coforge
                <br />
                Jun 2024 – Present
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: isMobile ? "0.95rem" : "1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
              maxWidth: isMobile ? "100%" : "420px",
              marginBottom: isMobile ? "2rem" : "2.5rem",
            }}
          >
            Systems-focused AI engineer building high-throughput, fault-tolerant
            inference infrastructure. Architected concurrency and observability
            layers enabling{" "}
            <span style={{ color: "#e8e0d0" }}>1,600+ concurrent sessions</span>
            , <span style={{ color: "#e8e0d0" }}>7× capacity expansion</span>,{" "}
            <span style={{ color: "#e8e0d0" }}>
              ~$1.3M annual cost reduction
            </span>
            , and rapid root-cause isolation under production load.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "1rem" : "1.5rem",
            }}
          >
            <motion.a
              href="#projects"
              whileHover={{ gap: "12px" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 600,
                fontSize: isMobile ? "0.8rem" : "0.85rem",
                letterSpacing: "0.05em",
                color: "#0a0a0a",
                background: "#e8e0d0",
                padding: isMobile ? "11px 22px" : "12px 24px",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "background 0.2s",
                width: isMobile ? "100%" : "auto",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#fff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#e8e0d0")
              }
            >
              View work <ArrowRight size={14} />
            </motion.a>
            <div
              style={{
                display: "flex",
                gap: "12px",
                width: isMobile ? "100%" : "auto",
                justifyContent: isMobile ? "center" : "flex-start",
                alignItems: "center",
              }}
            >
              <AnimatePresence mode="wait">
                {copyToastMessage && (
                  <motion.div
                    key={copyToastMessage}
                    initial={{ opacity: 0, x: -8, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -4, scale: 0.98 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: "0.78rem",
                      color: "#4ade80",
                      border: "1px solid rgba(74,222,128,0.35)",
                      background: "rgba(74,222,128,0.06)",
                      borderRadius: "999px",
                      padding: "6px 12px",
                      whiteSpace: "nowrap",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                    }}
                  >
                    {copyToastMessage}
                  </motion.div>
                )}
              </AnimatePresence>
              {[
                {
                  href: `mailto:${CONTACT_EMAIL}`,
                  icon: <Mail size={15} />,
                  label: "Email",
                },
                {
                  href: "https://github.com/spice14",
                  icon: <Github size={15} />,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/ashwingupta3012/",
                  icon: <Linkedin size={15} />,
                  label: "LinkedIn",
                },
                {
                  href: "https://www.kaggle.com/ashwingupta3012",
                  icon: (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.334" />
                    </svg>
                  ),
                  label: "Kaggle",
                },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  onClick={
                    href.startsWith("mailto:")
                      ? (e) => {
                          e.preventDefault();
                          void copyEmailToClipboard();
                        }
                      : undefined
                  }
                  whileHover={{ y: -2 }}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#e8e0d0";
                    el.style.color = "#e8e0d0";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.12)";
                    el.style.color = "rgba(255,255,255,0.65)";
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — photo */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "relative",
            width: "90%",
            margin: isMobile ? "0 auto" : "0 3vw 0 auto",
          }}
        >
          <div
            ref={layerPhoto}
            style={{ willChange: "transform", borderRadius: "4px" }}
          >
            {/* Photo */}
            <div
              style={{
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden",
                aspectRatio: "3/4",
              }}
            >
              <img
                src={PROFILE_IMAGE}
                alt="Ashwin Gupta"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 15%",
                  filter: "grayscale(20%) contrast(1.05)",
                }}
              />
              {/* Dark bottom fade */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 40%, transparent 70%)",
                }}
              />
            </div>

            {/* Caption below image */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                gap: isMobile ? "0.5rem" : "0",
                marginTop: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                }}
              >
                MLOps & GenAI — IIIT Bangalore
              </span>
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                }}
              >
                PyTorch · LLMs · RAG · GCP
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom rule */}

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
      </div>

      {/* Font imports */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;1,300&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400&display=swap"
        rel="stylesheet"
      />
    </section>
  );
}
