import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Cursor } from "./components/Cursor";
import { useIsMobile } from "../hooks/useMediaQuery";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        background: "#0a0a0a",
        position: "relative",
        minHeight: "100vh",
        cursor: isMobile ? "auto" : "none",
      }}
    >
      <Cursor />
      {/* Grain texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: isMobile ? "150px 150px" : "200px 200px",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
      <Analytics />
    </div>
  );
}
