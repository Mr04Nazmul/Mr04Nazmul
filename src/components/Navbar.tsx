// Adapted from Ayushmaan Singh / Serenity UI TubeLightNavbar, featured on 21st.dev.
// MIT. Upstream preserved in sources/upstream/21st-navbar.tsx.
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Home,
  User,
  Layers,
  Award,
  Blocks,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
const tabs = [
  { name: "Home", id: "home", icon: Home },
  { name: "About", id: "about", icon: User },
  { name: "Work", id: "projects", icon: Layers },
  { name: "Journey", id: "achievements", icon: Award },
  { name: "Skills", id: "skills", icon: Blocks },
];
export function Navbar() {
  const [active, setActive] = useState("home"),
    [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="floating-header">
      <a href="#home" className="brand" aria-label="DevNazu home">
        <span className="brand-mark">n.</span>devnazu
        <span className="brand-dot">.jp</span>
      </a>
      <nav
        aria-label="Main navigation"
        id="main-nav"
        className={open ? "nav-links is-open" : "nav-links"}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon,
            isActive = active === tab.id;
          return (
            <a
              key={tab.id}
              href={"#" + tab.id}
              aria-current={isActive ? "location" : undefined}
              onClick={() => {
                setActive(tab.id);
                setOpen(false);
              }}
              className={"nav-item " + (isActive ? "is-active" : "")}
            >
              {isActive && (
                <>
                  <motion.span
                    layoutId={reduced ? undefined : "liquid-pill"}
                    className="nav-pill"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                      mass: 0.9,
                    }}
                  />
                  <motion.span
                    layoutId={reduced ? undefined : "tubelight-lamp"}
                    className="nav-lamp"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <span />
                  </motion.span>
                </>
              )}
              <Icon size={15} />
              <span>{tab.name}</span>
            </a>
          );
        })}
        <a
          className="mobile-connect"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let's talk <ArrowUpRight size={16} />
        </a>
      </nav>
      <a className="nav-contact" href="#contact">
        Let's talk <ArrowUpRight size={15} />
      </a>
      <button
        id="menu-toggle"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
