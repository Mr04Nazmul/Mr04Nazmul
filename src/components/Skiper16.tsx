// Adapted from Skiper16 StickyCard_001 by @gurvinder-singh02.
// Free personal/commercial use with Skiper UI attribution. See THIRD-PARTY-NOTICES.md.
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "../data";
function StickyCard({
  project,
  i,
  progress,
}: {
  project: (typeof projects)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const scale = useTransform(
    progress,
    [i / projects.length, 1],
    [1, Math.max(0.84, 1 - (projects.length - i - 1) * 0.045)],
  );
  return (
    <div
      className="project-sticky"
      style={{ top: `calc(var(--stack-top) + ${i * 12}px)` }}
    >
      <motion.article
        className="project-card"
        style={{ scale: reduced ? 1 : scale, transformOrigin: "top center" }}
      >
        <div className="project-information">
          <div className="project-topline">
            <span>
              {project.number} / {project.category}
            </span>
            <span>{project.year}</span>
          </div>
          <div>
            <h3>{project.title}</h3>
            <p>{project.detail}</p>
            <div className="tags">
              {project.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="project-actions">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {project.url.includes("github.com")
                ? "Explore code"
                : "Open project"}{" "}
              <ArrowUpRight size={18} />
              <span className="sr-only"> — {project.title}</span>
            </a>
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={"Source code for " + project.title}
              className="source-link"
            >
              Source <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={"project-visual " + (project.title === "NAZU Token" ? "token-visual" : "")}
          style={{ backgroundColor: project.color }}
          aria-label={"Explore " + project.title}
        >
          <div className="browser-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>
              {project.title === "NAZU Token"
                ? "ETHEREUM / SEPOLIA"
                : project.title.toLowerCase().replaceAll(" ", "—")}
            </span>
            <ArrowUpRight size={12} />
          </div>
          <img
            src={project.image}
            alt={
              project.title === "NAZU Token"
                ? "Original NAZU token logo"
                : `Actual ${project.title} repository interface screenshot`
            }
            width={1100}
            height={760}
            loading="lazy"
          />
          <span className="visual-caption">
            {project.title === "NAZU Token"
              ? "Testnet experiment"
              : "Repository interface capture · October 2026"}
          </span>
        </a>
      </motion.article>
    </div>
  );
}
export function Skiper16() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={container} className="project-stack">
      {projects.map((p, i) => (
        <StickyCard
          key={p.title}
          project={p}
          i={i}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}
