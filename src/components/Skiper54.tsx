// Adapted from Skiper54 Carousel_006 by @gurvinder-singh02.
// Retains Embla selection, animated clip-path and selected caption. No upstream illustrations used.
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Orbit,
  Hexagon,
  Receipt,
  ArrowUpRight,
} from "lucide-react";
import { milestones } from "../data";
const icons = [Orbit, Hexagon, Receipt];
export function Skiper54() {
  const [ref, api] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });
  const [current, setCurrent] = useState(0);
  const reduced = useReducedMotion();
  const onSelect = useCallback(() => {
    if (api) setCurrent(api.selectedScrollSnap());
  }, [api]);
  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);
  return (
    <div
      className="journey-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Development milestones"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          api?.scrollPrev();
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          api?.scrollNext();
        }
      }}
    >
      <div className="embla" ref={ref}>
        <div className="embla-track">
          {milestones.map((m, i) => {
            const Icon = icons[i];
            return (
              <div
                className="journey-slide"
                key={m.number}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${milestones.length}`}
              >
                <motion.article
                  initial={false}
                  animate={{
                    clipPath: reduced
                      ? "inset(0 round 20px)"
                      : current !== i
                        ? "inset(6% 0 6% 0 round 20px)"
                        : "inset(0 0 0 0 round 20px)",
                  }}
                  className={"journey-card journey-" + i}
                >
                  <div className="milestone-top">
                    <span>{m.tag}</span>
                    <span>{m.number} / {String(milestones.length).padStart(2, "0")}</span>
                  </div>
                  <div className="milestone-art" aria-hidden="true">
                    <span />
                    <span />
                    <Icon strokeWidth={1} />
                  </div>
                  <div>
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                    <a href={m.href} target="_blank" rel="noopener noreferrer">
                      See the project <ArrowUpRight size={16} />
                      <span className="sr-only"> — {m.title}</span>
                    </a>
                  </div>
                </motion.article>
                <div className="slide-caption">
                  <AnimatePresence mode="wait">
                    {current === i && (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.2 }}
                      >
                        A little further, one build at a time.
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls">
        <div className="carousel-count" aria-live="polite">
          0{current + 1}
          <span> / {String(milestones.length).padStart(2, "0")}</span>
        </div>
        <div className="carousel-dots">
          {milestones.map((m, i) => (
            <button
              key={m.number}
              aria-label={"Go to milestone " + (i + 1)}
              aria-pressed={current === i}
              className={current === i ? "active" : ""}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button
            aria-label="Previous milestone"
            onClick={() => api?.scrollPrev()}
          >
            <ArrowLeft size={18} />
          </button>
          <button aria-label="Next milestone" onClick={() => api?.scrollNext()}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
