import { lazy, Suspense } from "react";
import { Hero } from "./components/Hero";
import { Cursor } from "./components/Cursor";
import { EnvironmentLayer } from "./components/EnvironmentLayer";
import { AIBackground } from "./components/AIBackground";
import { HologramInterface } from "./components/HologramInterface";
import { useIsMobile } from "../hooks/useMediaQuery";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const About = lazy(() => import("./components/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("./components/Skills").then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import("./components/Projects").then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import("./components/Contact").then((m) => ({ default: m.Contact })));

export default function App() {
  const isMobile = useIsMobile();

  return (
    <div
      className="spatial-scene"
      style={{ cursor: isMobile ? "auto" : "none" }}
    >
      <EnvironmentLayer />
      <AIBackground />
      <Cursor />
      <HologramInterface>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </HologramInterface>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
