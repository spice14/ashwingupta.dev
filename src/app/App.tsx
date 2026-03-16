import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Cursor } from "./components/Cursor";
import { EnvironmentLayer } from "./components/EnvironmentLayer";
import { ParticleField } from "./components/ParticleField";
import { HologramInterface } from "./components/HologramInterface";
import { useIsMobile } from "../hooks/useMediaQuery";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  const isMobile = useIsMobile();

  return (
    <div
      className="spatial-scene"
      style={{ cursor: isMobile ? "auto" : "none" }}
    >
      <EnvironmentLayer />
      <ParticleField />
      <Cursor />
      <HologramInterface>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </HologramInterface>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
