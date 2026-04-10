import { Cursor } from "./components/Cursor";
import { EnvironmentLayer } from "./components/EnvironmentLayer";
import { AIBackground } from "./components/AIBackground";
import { HologramInterface } from "./components/HologramInterface";
import { ProjectPage } from "./components/ProjectPage";
import { useIsMobile } from "../hooks/useMediaQuery";

export default function ProjectDetailApp({ slug }: { slug: string }) {
  const isMobile = useIsMobile();

  return (
    <div className="spatial-scene" style={{ cursor: isMobile ? "auto" : "none" }}>
      <EnvironmentLayer />
      <AIBackground />
      <Cursor />
      <HologramInterface>
        <ProjectPage slug={slug} />
      </HologramInterface>
    </div>
  );
}
