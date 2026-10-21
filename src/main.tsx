import { createRoot } from "react-dom/client";
import { useEffect, useRef } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import Lenis from "lenis";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  MapPin,
  Code2,
  Smartphone,
  Workflow,
  Database,
  GitBranch,
  Hexagon,
  Github,
  Globe,
  Command,
  Terminal,
  Braces,
} from "lucide-react";
import BlurText from "./components/BlurText";
import { BlurFade as OriginalBlurFade } from "./components/BlurFade";
import { BorderBeam } from "./components/BorderBeam";
import { BentoGrid, BentoCard } from "./components/Bento";
import { Navbar } from "./components/Navbar";
import { Skiper16 } from "./components/Skiper16";
import { Skiper54 } from "./components/Skiper54";
import { VideoSound } from "./components/VideoSound";
import { github } from "./data";
import type { ReactNode } from "react";
import "./style.css";
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return reduced ? (
    <div className={className}>{children}</div>
  ) : (
    <OriginalBlurFade
      className={className}
      delay={delay}
      inView
      blur="4px"
      offset={12}
    >
      {children}
    </OriginalBlurFade>
  );
}
function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return reduced ? (
    <span className={className}>{text}</span>
  ) : (
    <BlurText
      text={text}
      delay={65}
      animateBy="words"
      direction="bottom"
      className={className}
      trigger="load"
      stepDuration={0.28}
    />
  );
}
function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span className="tiny-cross" aria-hidden="true">
        +
      </span>
      {children}
      <span className="section-number">/{number}</span>
    </div>
  );
}
function Hero() {
  return (
    <section id="home" className="hero container">
      <div className="hero-top">
        <span className="eyebrow">
          <i />
          INDEPENDENT DEVELOPER & MAKER
        </span>
        <span className="hero-location">
          <MapPin size={13} /> BASED IN JAPAN
        </span>
      </div>
      <h1>
        <span className="sr-only">Hossain Najmul. Developer & maker.</span>
        <span aria-hidden="true" className="hero-name">
          <AnimatedText text="Hossain" />
          <AnimatedText text="Najmul." className="mint" />
        </span>
      </h1>
      <div className="hero-bottom">
        <Reveal className="hero-intro">
          <p>
            Small ideas.
            <br />
            Useful things.<span className="muted"> Built with curiosity.</span>
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work <ArrowUpRight size={18} />
            </a>
            <a
              className="button button-ghost"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={17} /> GitHub
            </a>
          </div>
        </Reveal>
        <Reveal className="hero-note" delay={0.2}>
          <span className="note-cross">✳</span>
          <p>
            Web, Android, AI & a little Web3.
            <br />
            Learning by making things that matter.
          </p>
          <a href="#about">
            A little about me <ArrowDown size={14} />
          </a>
        </Reveal>
      </div>
      <div className="hero-baseline">
        <span>DESIGN. BUILD. KEEP LEARNING.</span>
        <a href="#projects">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </a>
        <span className="edition">PORTFOLIO — 2026</span>
      </div>
    </section>
  );
}
function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <Reveal>
          <SectionLabel number="01">THE PERSON BEHIND THE PIXELS</SectionLabel>
        </Reveal>
        <div className="about-layout">
          <Reveal className="about-heading">
            <h2>
              Curious mind.
              <br />
              <span className="serif">Builder's instinct.</span>
            </h2>
            <div className="identity">
              <a className="identity-portrait" href="/images/hossain-portrait.jpg" target="_blank" rel="noopener noreferrer" aria-label="View Hossain Najmul's portrait">
                <img src="/images/hossain-portrait.jpg" alt="Hossain Najmul's illustrated portrait" width="996" height="1578" loading="lazy" decoding="async" />
              </a>
              <div>
                <strong>Hossain Najmul</strong>
                <span>Student · Independent developer</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-copy" delay={0.1}>
            <p>
              I’m a student and independent developer based in Japan. I turn
              everyday frustrations into websites, mobile experiments and tools
              that make life a little simpler.
            </p>
            <p className="muted">
              From building everyday tools to exploring a new technology, I
              like starting with a real question—and learning my way to an
              answer.
            </p>
            <div className="about-details">
              <div>
                <span>01 / APPROACH</span>
                <strong>Build. Learn. Improve.</strong>
              </div>
              <div>
                <span>02 / FOCUS</span>
                <strong>Useful digital products.</strong>
              </div>
            </div>
            <a
              className="text-link"
              href={github + "?tab=repositories"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow what I'm building <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <Reveal>
          <SectionLabel number="02">SELECTED WORK</SectionLabel>
          <div className="section-heading-row">
            <h2>
              Ideas out
              <br />
              <span className="serif">in the world.</span>
            </h2>
            <p>
              A few things I’m building.
              <br />
              <span className="muted">Products, prototypes & experiments.</span>
            </p>
          </div>
        </Reveal>
        <Skiper16 />
        <Reveal className="all-work">
          <span>More experiments. More things to learn.</span>
          <a
            href={github + "?tab=repositories"}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            All repositories <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
function Achievements() {
  return (
    <section id="achievements" className="section journey-section">
      <div className="container">
        <Reveal>
          <SectionLabel number="03">PROGRESS, NOT PERFECTION</SectionLabel>
          <div className="section-heading-row">
            <h2>
              Every build.
              <br />
              <span className="serif">A step forward.</span>
            </h2>
            <p>
              A journey in making.
              <br />
              <span className="muted">Real projects. Small milestones.</span>
            </p>
          </div>
        </Reveal>
        <Skiper54 />
      </div>
    </section>
  );
}
const skills = [
  {
    name: "Web development",
    description: "Thoughtful interfaces that work across screens.",
    Icon: Code2,
    className: "bento-wide",
    href: github,
    visual: (
      <div className="code-art">
        <span>
          <i />
          devnazu / workspace
        </span>
        <code>
          <b>const</b> idea = curiosity;
          <br />
          <b>function</b> build() {"{"}
          <br />
          &nbsp; return somethingUseful;
          <br />
          {"}"}
        </code>
        <Braces size={100} />
      </div>
    ),
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    name: "Android & mobile",
    description: "Exploring useful experiences for the small screen.",
    Icon: Smartphone,
    href: github,
    visual: (
      <div className="phone-art">
        <span />
        <div />
        <div />
        <div />
      </div>
    ),
    tags: ["Mobile interfaces", "Prototyping"],
  },
  {
    name: "AI & automation",
    description: "Practical experiments with intelligent workflows.",
    Icon: Workflow,
    href: github + "/receipt-ai-japan",
    visual: (
      <div className="workflow-art">
        <Command />
        <span />
        <Workflow />
        <span />
        <Terminal />
      </div>
    ),
    tags: ["AI tools", "Workflows"],
  },
  {
    name: "Data & backend",
    description: "Connecting interfaces to authentication and data.",
    Icon: Database,
    href: github,
    visual: (
      <div className="data-art">
        {"{"}
        <br />
        &nbsp; ideas: [ ... ],
        <br />
        &nbsp; learning: true
        <br />
        {"}"}
      </div>
    ),
    tags: ["Supabase", "APIs"],
  },
  {
    name: "Code & collaboration",
    description: "Versioning the experiments. Sharing the process.",
    Icon: GitBranch,
    href: github,
    visual: (
      <div className="git-art">
        <GitBranch strokeWidth={0.6} />
      </div>
    ),
    tags: ["Git", "GitHub"],
  },
  {
    name: "Web3 exploration",
    description: "Learning through tokens and testnet experiments.",
    Icon: Hexagon,
    className: "bento-wide bento-web3",
    href: github + "/Nazu-testnet-",
    visual: (
      <div className="web3-art">
        <img src="/images/token.svg" width="110" height="110" alt="" />
        <span>
          SEPOLIA
          <br />
          <b>TESTNET LAB</b>
        </span>
      </div>
    ),
    tags: ["Ethereum", "ERC-20", "Sepolia"],
  },
];
function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <Reveal>
          <SectionLabel number="04">THE TOOLKIT</SectionLabel>
          <div className="section-heading-row">
            <h2>
              The tools change.
              <br />
              <span className="serif">The curiosity stays.</span>
            </h2>
            <p>
              What I work with.
              <br />
              <span className="muted">Always a work in progress.</span>
            </p>
          </div>
        </Reveal>
        <BentoGrid>
          {skills.map((s, i) => (
            <Reveal key={s.name} className={s.className} delay={(i % 3) * 0.05}>
              <BentoCard {...s} background={s.visual}>
                <div className="tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </BentoCard>
            </Reveal>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
function Contact() {
  const reduced = useReducedMotion(),
    ref = useRef<HTMLDivElement>(null);
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <Reveal>
          <SectionLabel number="05">
            SOMETHING GOOD STARTS WITH A HELLO
          </SectionLabel>
          <div className="contact-card" ref={ref}>
            <div className="contact-top">
              <span>
                <i />
                OPEN TO INTERESTING CONVERSATIONS
              </span>
              <Globe size={20} strokeWidth={1} />
            </div>
            <h2>
              Have an idea?
              <br />
              <span className="serif">Let's make it real.</span>
            </h2>
            <div className="contact-bottom">
              <p>
                A small tool, a big question, or just saying hello.
                <br />
                <span className="muted">Find me where I build and share.</span>
              </p>
              <div className="contact-links">
                <a
                  className="button button-primary"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={17} /> GitHub <ArrowUpRight size={17} />
                </a>
                <a
                  className="button button-ghost"
                  href="https://x.com/nazuseco"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X / Twitter <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            {!reduced && (
              <BorderBeam
                duration={12}
                size={140}
                colorFrom="#cdfc94"
                colorTo="#6aa89b"
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="container footer">
      <Reveal className="footer-main">
        <a className="brand" href="#home">
          devnazu<span className="brand-dot">.jp</span>
        </a>
        <p>Made with curiosity. Built in Japan.</p>
        <a className="back-top" href="#home">
          Back to top <ArrowUp size={15} />
        </a>
      </Reveal>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Hossain Najmul</span>
        <a href="/credits.html">Credits</a>
        <span>THANKS FOR SCROLLING ↗</span>
      </div>
    </footer>
  );
}
function App() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.05,
      smoothWheel: true,
    });
    return () => lenis.destroy();
  }, [reduced]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <VideoSound />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <MotionConfig reducedMotion="user">
    <App />
  </MotionConfig>,
);
