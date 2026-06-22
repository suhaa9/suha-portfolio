import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Target,
  BarChart3,
  Rocket,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  X,
  ArrowRight,
  Activity,
  Cpu,
  Database,
  LineChart,
  Users,
  GraduationCap,
  Briefcase,
  Award,
  Radio,
  Zap,
  Globe,
  Layers,
  Download,
  Circle,
  Network,
  ShieldAlert,
  Leaf,
  HeartHandshake,
  BookOpen,
  Clock,
} from "lucide-react";

/* =========================================================================
   TOKENS
   ========================================================================= */

const C = {
  bg: "#0B1020",
  surface: "#121826",
  surfaceLight: "#1A2333",
  accent: "#00E5A8",
  accent2: "#4F8CFF",
  text: "#F8FAFC",
  muted: "#94A3B8",
  border: "rgba(148, 163, 184, 0.16)",
};

const fontMono = { fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" };
const fontSans = { fontFamily: "'Inter', system-ui, sans-serif" };

/* =========================================================================
   SMALL UTILITIES
   ========================================================================= */

function useCountUp(target, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, durationMs]);
  return [value, start];
}

function Eyebrow({ children, icon: Icon }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
      style={{ background: "rgba(0,229,168,0.08)", border: `1px solid rgba(0,229,168,0.25)` }}
    >
      {Icon && <Icon size={13} style={{ color: C.accent }} />}
      <span
        className="text-xs uppercase tracking-widest"
        style={{ ...fontMono, color: C.accent, letterSpacing: "0.18em" }}
      >
        {children}
      </span>
    </div>
  );
}

function StatusDot({ pulse = true }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && (
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
          style={{ background: C.accent }}
        />
      )}
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: C.accent }} />
    </span>
  );
}

function MagneticButton({ children, primary, onClick, href }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    setPos({ x, y });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
        style={
          primary
            ? { background: C.accent, color: "#06140F", ...fontSans }
            : {
                background: "transparent",
                color: C.text,
                border: `1px solid ${C.border}`,
                ...fontSans,
              }
        }
      >
        {children}
      </Tag>
    </motion.div>
  );
}

/* =========================================================================
   BACKGROUND GRID + PARTICLES (ambient, used in hero)
   ========================================================================= */

function GridField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 90%)",
        }}
      />
      {Array.from({ length: 26 }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 10) * 0.4;
        const size = i % 4 === 0 ? 3 : 1.6;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: i % 3 === 0 ? C.accent2 : C.accent,
              opacity: 0.5,
            }}
            animate={{ opacity: [0.15, 0.65, 0.15], y: [0, -14, 0] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay }}
          />
        );
      })}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M ${-50 + i * 30} ${120 + i * 90} Q 400 ${40 + i * 60}, 900 ${200 + i * 50}`}
            stroke={i === 1 ? C.accent2 : C.accent}
            strokeWidth="1"
            fill="none"
            strokeDasharray="2 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2.6, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

/* =========================================================================
   LOADER
   ========================================================================= */

const LOADING_LINES = [
  "Loading operator profile...",
  "Loading intelligence systems...",
  "Loading mission data...",
];

function Loader({ onDone }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLineIndex((i) => Math.min(LOADING_LINES.length - 1, i + 1));
    }, 650);

    const start = performance.now();
    const duration = 2200;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 350);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearInterval(lineTimer);
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: C.bg }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <GridField />
      <div className="relative z-10 w-full max-w-md px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <StatusDot />
          <span className="text-xs tracking-widest" style={{ ...fontMono, color: C.muted }}>
            SYS//BOOT
          </span>
        </div>
        <h1
          className="text-2xl md:text-3xl mb-8 tracking-widest"
          style={{ ...fontMono, color: C.text, letterSpacing: "0.15em" }}
        >
          INITIALIZING CONTROL ROOM
        </h1>

        <div className="h-5 mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-sm"
              style={{ ...fontMono, color: C.muted }}
            >
              {LOADING_LINES[lineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(148,163,184,0.15)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${C.accent2}, ${C.accent})`, width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs" style={{ ...fontMono, color: C.muted }}>
          {progress}%
        </p>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   NAV + SCROLL PROGRESS
   ========================================================================= */

const SECTIONS = [
  { id: "hero", label: "Hub" },
  { id: "overview", label: "Overview" },
  { id: "exploration", label: "Explorations" },
  { id: "capability", label: "Capability Network" },
  { id: "questions", label: "Questions" },
  { id: "systems", label: "Intelligence Systems" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px]" style={{ background: "rgba(148,163,184,0.1)" }}>
        <motion.div className="h-full" style={{ width, background: `linear-gradient(90deg, ${C.accent2}, ${C.accent})` }} />
      </div>

      <header
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md"
        style={{ background: "rgba(11,16,32,0.7)", borderBottom: `1px solid ${C.border}` }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-sm"
              style={{ background: C.accent, boxShadow: `0 0 10px ${C.accent}` }}
            />
            <span className="text-sm tracking-widest" style={{ ...fontMono, color: C.text }}>
              SUHA.SALEEM
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {SECTIONS.slice(1).map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-xs uppercase tracking-wider transition-colors"
                style={{ ...fontMono, color: C.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="w-5 h-[1.5px]" style={{ background: C.text }} />
            <span className="w-5 h-[1.5px]" style={{ background: C.text }} />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {SECTIONS.slice(1).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="text-left text-sm"
                    style={{ ...fontMono, color: C.muted }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

/* =========================================================================
   HERO
   ========================================================================= */

const EXPLORATION_AREAS = [
  { label: "Artificial Intelligence", icon: Brain, level: 88 },
  { label: "Product Strategy", icon: Target, level: 82 },
  { label: "Decision Science", icon: Activity, level: 79 },
  { label: "Business Intelligence", icon: BarChart3, level: 85 },
  { label: "Entrepreneurship", icon: Rocket, level: 75 },
];

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <GridField />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.2fr_0.9fr] gap-14 items-center">
        <div>
          <Eyebrow icon={Radio}>Control Room // Operator Console</Eyebrow>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-semibold leading-[1.02] mb-4"
            style={{ ...fontSans, color: C.text }}
          >
            Suha Saleem
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-sm md:text-base" style={{ ...fontMono, color: C.accent2 }}>
              Systems Thinker • Builder • Explorer
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg max-w-xl mb-2"
            style={{ ...fontSans, color: C.text }}
          >
            Building intelligent systems that turn complexity into clarity.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-xl mb-10 leading-relaxed"
            style={{ ...fontSans, color: C.muted }}
          >
            I explore how technology, data, and human behavior interact to shape decisions, products, and outcomes.
          </motion.p>

          <div className="flex items-center gap-2 mb-10">
            <StatusDot />
            <span className="text-xs tracking-widest" style={{ ...fontMono, color: C.muted }}>
              STATUS: <span style={{ color: C.accent }}>ONLINE</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <MagneticButton
              primary
              onClick={() => document.getElementById("systems")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Systems <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#">
              Download Resume <Download size={16} />
            </MagneticButton>
          </div>
        </div>

        {/* Mission dashboard panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="rounded-2xl p-6 backdrop-blur-sm"
          style={{ background: "rgba(18,24,38,0.7)", border: `1px solid ${C.border}` }}
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs tracking-widest" style={{ ...fontMono, color: C.muted }}>
              AREAS OF EXPLORATION
            </span>
            <Layers size={14} style={{ color: C.accent2 }} />
          </div>

          <div className="space-y-4">
            {EXPLORATION_AREAS.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <a.icon size={14} style={{ color: C.accent }} />
                    <span className="text-sm" style={{ ...fontSans, color: C.text }}>
                      {a.label}
                    </span>
                  </div>
                  <span className="text-xs" style={{ ...fontMono, color: C.muted }}>
                    {a.level}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.12)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${C.accent2}, ${C.accent})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${a.level}%` }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: `1px solid ${C.border}` }}>
            <span className="text-xs" style={{ ...fontMono, color: C.muted }}>
              LAST SYNC
            </span>
            <span className="text-xs" style={{ ...fontMono, color: C.accent }}>
              JUST NOW
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-widest" style={{ ...fontMono, color: C.muted }}>
          SCROLL
        </span>
        <ChevronDown size={14} style={{ color: C.muted }} />
      </motion.div>
    </section>
  );
}

/* =========================================================================
   SECTION WRAPPER
   ========================================================================= */

function SectionHeader({ kicker, title, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 max-w-2xl"
    >
      <Eyebrow>{kicker}</Eyebrow>
      <h2 className="text-3xl md:text-4xl font-semibold mb-3" style={{ ...fontSans, color: C.text }}>
        {title}
      </h2>
      {sub && (
        <p className="leading-relaxed" style={{ ...fontSans, color: C.muted }}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

/* =========================================================================
   ABOUT / SYSTEM OVERVIEW
   ========================================================================= */

const STATS = [
  { label: "Projects Built", value: 5, icon: Cpu },
  { label: "Leadership Roles", value: 4, icon: Award },
  { label: "Internships", value: 3, icon: Briefcase },
];

function StatCard({ stat }) {
  const [value, start] = useCountUp(stat.value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={start}
      transition={{ duration: 0.5 }}
      className="rounded-xl p-5"
      style={{ background: C.surface, border: `1px solid ${C.border}` }}
    >
      <stat.icon size={16} style={{ color: C.accent2 }} className="mb-3" />
      <div className="text-3xl font-semibold mb-1" style={{ ...fontMono, color: C.text }}>
        {value}
        <span style={{ color: C.accent }}>+</span>
      </div>
      <div className="text-xs uppercase tracking-wider" style={{ ...fontMono, color: C.muted }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <section id="overview" className="relative py-28 px-6 md:px-10" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="System Overview"
          title="Operator Profile"
          sub="Core identity, training, and current assignments within the system."
        />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-7"
            style={{ background: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs tracking-widest" style={{ ...fontMono, color: C.muted }}>
                OPERATOR FILE
              </span>
              <StatusDot />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-semibold"
                style={{ background: "rgba(0,229,168,0.1)", color: C.accent, ...fontMono }}
              >
                SS
              </div>
              <div>
                <div className="font-medium" style={{ ...fontSans, color: C.text }}>
                  Suha Saleem
                </div>
                <div className="text-xs" style={{ ...fontMono, color: C.muted }}>
                  Operator ID // SS-2026
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <GraduationCap size={16} style={{ color: C.accent2 }} className="mt-0.5 shrink-0" />
                <div style={{ ...fontSans, color: C.muted }}>
                  B.Tech, Computer Science Engineering (AI &amp; ML)
                  <br />
                  Minor in Business Management
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase size={16} style={{ color: C.accent2 }} className="mt-0.5 shrink-0" />
                <div style={{ ...fontSans, color: C.muted }}>
                  Current roles: Data Analyst Intern
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${C.border}` }}>
              <div className="text-xs uppercase tracking-wider mb-2" style={{ ...fontMono, color: C.accent }}>
                Mission
              </div>
              <p className="leading-relaxed" style={{ ...fontSans, color: C.text }}>
                To build systems that bridge technology, intelligence, and business, translating
                signal from noise into decisions worth making.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 content-start">
            {STATS.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-2 rounded-xl p-5"
              style={{ background: "rgba(79,140,255,0.06)", border: `1px solid rgba(79,140,255,0.2)` }}
            >
              <p className="text-sm leading-relaxed" style={{ ...fontSans, color: C.muted }}>
                Every project below is a working hypothesis about how systems, markets, products,
                or people actually behave under pressure.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   AREAS OF EXPLORATION
   ========================================================================= */

const EXPLORATIONS = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    what: "Machine learning systems that recognize patterns humans miss.",
    why: "AI is the clearest lever we have for compressing the distance between data and decisions.",
    how: "Applying predictive models and NLP to real signals — attention, risk, behavior.",
  },
  {
    icon: Activity,
    title: "Decision Science",
    what: "The study of how people and organizations choose under uncertainty.",
    why: "Most failures aren't data failures — they're decision failures.",
    how: "Building frameworks and dashboards that make trade-offs visible before they're made.",
  },
  {
    icon: Target,
    title: "Product Strategy",
    what: "Turning ambiguous problems into sequenced, buildable bets.",
    why: "A good product is a decision system disguised as software.",
    how: "Prioritization frameworks, user research, and roadmap design grounded in evidence.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    what: "Converting raw operational data into strategic narrative.",
    why: "Numbers without a story don't change anyone's mind.",
    how: "Dashboards, KPI design, and reporting systems used in live internships.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship",
    what: "Building and testing ventures from a blank page.",
    why: "Theory only proves itself once it survives contact with a real market.",
    how: "Running founder-mode experiments — Solace Sanctuary and Psychia among them.",
  },
];

function ExplorationCard({ item }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 cursor-default"
      style={{
        background: C.surface,
        border: `1px solid ${hover ? "rgba(0,229,168,0.4)" : C.border}`,
        boxShadow: hover ? "0 0 28px rgba(0,229,168,0.08)" : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
        style={{ background: "rgba(0,229,168,0.1)" }}
      >
        <item.icon size={20} style={{ color: C.accent }} />
      </div>
      <h3 className="text-lg font-medium mb-3" style={{ ...fontSans, color: C.text }}>
        {item.title}
      </h3>

      <AnimatePresence initial={false} mode="wait">
        {!hover ? (
          <motion.p
            key="what"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm leading-relaxed"
            style={{ ...fontSans, color: C.muted }}
          >
            {item.what}
          </motion.p>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <div>
              <span className="text-xs uppercase tracking-wider" style={{ ...fontMono, color: C.accent2 }}>
                Why it interests me
              </span>
              <p className="text-sm mt-1 leading-relaxed" style={{ ...fontSans, color: C.text }}>
                {item.why}
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider" style={{ ...fontMono, color: C.accent2 }}>
                How I apply it
              </span>
              <p className="text-sm mt-1 leading-relaxed" style={{ ...fontSans, color: C.text }}>
                {item.how}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AreasOfExploration() {
  return (
    <section id="exploration" className="relative py-28 px-6 md:px-10" style={{ background: C.surface }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="Active Domains"
          title="Areas of Exploration"
          sub="Hover a card to expand the operating logic behind each domain."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPLORATIONS.map((item) => (
            <ExplorationCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   QUESTIONS I'M EXPLORING
   ========================================================================= */

const STATUS_STYLES = {
  "ACTIVE RESEARCH": { color: C.accent, bg: "rgba(0,229,168,0.1)" },
  INVESTIGATING: { color: C.accent2, bg: "rgba(79,140,255,0.1)" },
  EXPLORING: { color: "#FFB454", bg: "rgba(255,180,84,0.1)" },
};

const QUESTIONS = [
  {
    q: "Can consumer attention predict business growth?",
    status: "ACTIVE RESEARCH",
    a: "Attention is the earliest, noisiest signal a market gives off. I'm testing whether shifts in what people notice precede shifts in what they buy.",
  },
  {
    q: "Why do complex systems fail unexpectedly?",
    status: "INVESTIGATING",
    a: "Failure rarely comes from one broken part — it comes from interactions no one was monitoring. I study where those blind spots hide.",
  },
  {
    q: "How can AI support better decision making?",
    status: "ACTIVE RESEARCH",
    a: "Not by replacing judgment, but by widening it — surfacing options and risks a person would take too long to find alone.",
  },
  {
    q: "What separates successful products from forgotten ones?",
    status: "EXPLORING",
    a: "Usually timing and trust, not features. I'm mapping the decision points where products earn — or lose — that trust.",
  },
  {
    q: "How can data become strategic advantage?",
    status: "INVESTIGATING",
    a: "Only when it changes a decision before that decision is made — not after, in a retrospective. Speed of insight matters as much as accuracy.",
  },
];

function InvestigationFile({ item, index }) {
  const [open, setOpen] = useState(false);
  const tag = STATUS_STYLES[item.status];
  const tilt = index % 2 === 0 ? -1.4 : 1.4;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 26, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      whileHover={{ y: -6, rotate: tilt * 0.4 }}
      onClick={() => setOpen((o) => !o)}
      className="relative rounded-xl p-6 pt-7 cursor-pointer select-none"
      style={{
        background: `linear-gradient(165deg, ${C.surface}, ${C.bg})`,
        border: `1px solid ${open ? tag.color : C.border}`,
        boxShadow: open ? `0 0 32px ${tag.color}22` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <span
        className="absolute -top-2.5 left-6 px-2.5 py-0.5 rounded-t-md text-[10px] tracking-widest"
        style={{
          ...fontMono,
          background: C.surfaceLight,
          color: C.muted,
          border: `1px solid ${C.border}`,
          borderBottom: "none",
        }}
      >
        FILE {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="text-xs" style={{ ...fontMono, color: C.muted }}>
          CASE // Q-{String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ ...fontMono, color: tag.color, background: tag.bg }}
        >
          {item.status}
        </span>
      </div>

      <p className="font-medium leading-snug mb-4 pr-1" style={{ ...fontSans, color: C.text }}>
        {item.q}
      </p>

      <div className="flex items-center gap-1.5 text-xs" style={{ ...fontMono, color: C.accent2 }}>
        {open ? "Collapse file" : "Open file"}
        <motion.span animate={{ rotate: open ? 90 : 0 }} className="flex">
          <ChevronDown size={13} />
        </motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 14 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <p
              className="text-sm leading-relaxed pt-4"
              style={{ ...fontSans, color: C.muted, borderTop: `1px solid ${C.border}` }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Questions() {
  return (
    <section id="questions" className="relative py-28 px-6 md:px-10" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="Open Investigations"
          title="Questions I'm Exploring"
          sub="Each question is an open case file. Click to expand the reasoning behind it."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {QUESTIONS.map((item, i) => (
            <div key={item.q} className={i % 2 === 1 ? "md:mt-8" : ""}>
              <InvestigationFile item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   INTELLIGENCE SYSTEMS (PROJECTS)
   ========================================================================= */

const PROJECTS = [
  {
    code: "AE-01",
    icon: TrendingUp,
    title: "Attention Economy Intelligence Engine",
    classification: "Market Intelligence",
    objective: "Test whether shifts in consumer attention can forecast business growth before revenue data confirms it.",
    tech: ["Python", "NLP", "Social Data APIs", "Regression Models"],
    impact: "Built a scoring framework correlating public attention signals with downstream revenue trends.",
  },
  {
    code: "BS-02",
    icon: ShieldAlert,
    title: "Black Swan",
    classification: "Systemic Risk Intelligence",
    objective: "Identify early, weak signals that precede unexpected failures in complex systems.",
    tech: ["Python", "Simulation", "Risk Scoring", "Statistical Modeling"],
    impact: "Produced a working risk-detection prototype for modeling rare, high-impact failure events.",
  },
  {
    code: "BF-03",
    icon: Leaf,
    title: "BaseForest2",
    classification: "Environmental Intelligence",
    objective: "Monitor and forecast environmental change using observational and satellite-style data.",
    tech: ["Python", "ML Classification", "Geospatial Data", "Dashboards"],
    impact: "Delivered an environmental monitoring dashboard for tracking change over time.",
  },
  {
    code: "SS-04",
    icon: HeartHandshake,
    title: "Solace Sanctuary",
    classification: "Human Insights Platform",
    objective: "Create a safe, low-friction space for emotional check-ins and self-reflection.",
    tech: ["React", "Sentiment Analysis", "UX Research"],
    impact: "Designed a calm, trust-first interface validated through direct user feedback.",
  },
  {
    code: "PS-05",
    icon: BookOpen,
    title: "Psychia",
    classification: "Awareness & Education Platform",
    objective: "Make mental health literacy accessible through clear, stigma-free content design.",
    tech: ["React", "Content Strategy", "Education Frameworks"],
    impact: "Increased topic engagement through an approachable, educational content structure.",
  },
];

function ProjectCard({ p, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      onClick={() => onOpen(p)}
      className="rounded-2xl p-6 cursor-pointer group"
      style={{ background: C.bg, border: `1px solid ${C.border}` }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs" style={{ ...fontMono, color: C.muted }}>
          DOSSIER // {p.code}
        </span>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(79,140,255,0.1)" }}
        >
          <p.icon size={16} style={{ color: C.accent2 }} />
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2" style={{ ...fontSans, color: C.text }}>
        {p.title}
      </h3>
      <span
        className="inline-block text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full mb-4"
        style={{ ...fontMono, color: C.accent, background: "rgba(0,229,168,0.08)" }}
      >
        {p.classification}
      </span>
      <p className="text-sm leading-relaxed mb-4" style={{ ...fontSans, color: C.muted }}>
        {p.objective}
      </p>
      <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: C.accent2 }}>
        View dossier
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-lg rounded-2xl p-7"
          style={{ background: C.surface, border: `1px solid ${C.border}` }}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-xs" style={{ ...fontMono, color: C.muted }}>
                DOSSIER // {project.code}
              </span>
              <h3 className="text-xl font-semibold mt-1" style={{ ...fontSans, color: C.text }}>
                {project.title}
              </h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg" style={{ background: "rgba(148,163,184,0.1)" }}>
              <X size={16} style={{ color: C.muted }} />
            </button>
          </div>

          <span
            className="inline-block text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full mb-5"
            style={{ ...fontMono, color: C.accent, background: "rgba(0,229,168,0.08)" }}
          >
            {project.classification}
          </span>

          <div className="space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wider mb-1.5" style={{ ...fontMono, color: C.accent2 }}>
                Objective
              </div>
              <p className="text-sm leading-relaxed" style={{ ...fontSans, color: C.text }}>
                {project.objective}
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider mb-1.5" style={{ ...fontMono, color: C.accent2 }}>
                Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{ ...fontMono, color: C.muted, background: "rgba(148,163,184,0.08)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider mb-1.5" style={{ ...fontMono, color: C.accent2 }}>
                Impact
              </div>
              <p className="text-sm leading-relaxed" style={{ ...fontSans, color: C.text }}>
                {project.impact}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function IntelligenceSystems() {
  const [active, setActive] = useState(null);
  return (
    <section id="systems" className="relative py-28 px-6 md:px-10" style={{ background: C.surface }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="Field Projects"
          title="Intelligence Systems"
          sub="Active and archived dossiers. Select one to view full mission details."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.code} p={p} onOpen={setActive} />
          ))}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

/* =========================================================================
   LEADERSHIP & EXPERIENCE — TIMELINE
   ========================================================================= */

const TIMELINE = [
  {
    role: "Data Analyst Intern",
    org: "Robonic Infotech",
    period: "Jun 2026 - Present",
    icon: BarChart3,
    desc: "Built reporting dashboards and analyzed operational data to support business decisions.",
  },
  {
    role: "Placement Secretary",
    org: "Amity University Mumbai",
    period: "Aug 2025 - May 2026",
    icon: Award,
    desc: "Leading placement coordination, employer relations, and student readiness initiatives.",
  },
  {
    role: "Software Development Intern",
    org: "Progton Software",
    period: "Jun 2025 - Jul 2025",
    icon: Cpu,
    desc: "Contributed to feature development and debugging across the product's core codebase.",
  },
  {
    role: "Core Member",
    org: "Google Developer Student Club",
    period: "2024 - 2025",
    icon: Users,
    desc: "Organized technical sessions and led peer-learning initiatives within the campus chapter.",
  },
];

function Timeline() {
  return (
    <section id="experience" className="relative py-28 px-6 md:px-10" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader kicker="Service Record" title="Leadership & Experience" />

        <div className="relative pl-8 md:pl-10">
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px" style={{ background: C.border }} />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.role}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <span
                  className="absolute -left-8 md:-left-10 top-1 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: C.bg, border: `2px solid ${C.accent}` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
                </span>

                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h3 className="font-medium" style={{ ...fontSans, color: C.text }}>
                    {t.role}
                  </h3>
                  <span className="text-xs" style={{ ...fontMono, color: C.accent2 }}>
                    {t.org}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock size={12} style={{ color: C.muted }} />
                  <span className="text-xs" style={{ ...fontMono, color: C.muted }}>
                    {t.period}
                  </span>
                </div>
                <p className="text-sm leading-relaxed max-w-xl" style={{ ...fontSans, color: C.muted }}>
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   CAPABILITY NETWORK (centerpiece interactive node graph)
   ========================================================================= */

const NETWORK_NODES = [
  {
    name: "Artificial Intelligence",
    short: "AI",
    icon: Brain,
    color: C.accent,
    angle: -90,
    desc: "Designing and applying machine learning systems — from predictive models to computer vision — that convert raw signal into foresight.",
    subs: ["Machine Learning", "Deep Learning", "Computer Vision", "Predictive Analytics"],
  },
  {
    name: "Product Strategy",
    short: "Product",
    icon: Target,
    color: C.accent2,
    angle: -18,
    desc: "Turning ambiguous problems into prioritized, buildable roadmaps grounded in user insight and measurable outcomes.",
    subs: ["Product Analytics", "KPI Design", "User Insights", "Growth Strategy"],
  },
  {
    name: "Decision Science",
    short: "Decision",
    icon: Activity,
    color: C.accent,
    angle: 54,
    desc: "Using statistics, forecasting, and risk modeling to make trade-offs visible before a decision is locked in.",
    subs: ["Statistics", "Forecasting", "Risk Modeling", "Optimization"],
  },
  {
    name: "Business Intelligence",
    short: "BI",
    icon: BarChart3,
    color: C.accent2,
    angle: 126,
    desc: "Converting operational data into dashboards and narratives that change what a business does next.",
    subs: ["SQL", "Power BI", "Tableau", "Excel"],
  },
  {
    name: "Entrepreneurship",
    short: "Founder",
    icon: Rocket,
    color: C.accent,
    angle: 198,
    desc: "Testing ideas against real markets — from research to business-model design to go-to-market execution.",
    subs: ["Market Research", "Business Models", "Strategy", "Innovation"],
  },
];

function polar(cx, cy, r, angleDeg) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function subPosition(node, i, cx, cy, mainR, subR) {
  const spread = 30;
  const angle = node.angle + (i - (node.subs.length - 1) / 2) * spread * 0.5;
  const main = polar(cx, cy, mainR, node.angle);
  const sub = polar(cx, cy, subR, angle);
  return { main, sub };
}

function NetworkGraph({ active, setActive, hovered, setHovered }) {
  const cx = 320;
  const cy = 280;
  const mainR = 165;
  const subR = 255;

  return (
    <svg viewBox="0 0 640 560" className="w-full h-auto">
      {/* ring connecting the main disciplines to each other */}
      <polygon
        points={NETWORK_NODES.map((n) => {
          const p = polar(cx, cy, mainR, n.angle);
          return `${p.x},${p.y}`;
        }).join(" ")}
        fill="none"
        stroke={C.border}
        strokeWidth="1"
      />

      {/* hub -> main spokes */}
      {NETWORK_NODES.map((n) => {
        const p = polar(cx, cy, mainR, n.angle);
        const isActive = hovered === n.name || active === n.name;
        return (
          <motion.line
            key={`spoke-${n.name}`}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={isActive ? n.color : C.border}
            strokeOpacity={isActive ? 0.85 : 1}
            strokeWidth={isActive ? 1.5 : 1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        );
      })}

      {/* main -> sub spokes */}
      {NETWORK_NODES.map((n) =>
        n.subs.map((s, i) => {
          const { main, sub } = subPosition(n, i, cx, cy, mainR, subR);
          const isActive = hovered === n.name || active === n.name;
          return (
            <motion.line
              key={`${n.name}-line-${s}`}
              x1={main.x}
              y1={main.y}
              x2={sub.x}
              y2={sub.y}
              stroke={isActive ? n.color : C.border}
              strokeOpacity={isActive ? 0.75 : 0.8}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15 }}
            />
          );
        })
      )}

      {/* hub */}
      <circle cx={cx} cy={cy} r="30" fill={C.bg} stroke={C.accent} strokeWidth="1.5" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill={C.text} style={fontMono}>
        CORE
      </text>

      {/* main nodes */}
      {NETWORK_NODES.map((n) => {
        const p = polar(cx, cy, mainR, n.angle);
        const isActive = hovered === n.name || active === n.name;
        return (
          <g
            key={n.name}
            onMouseEnter={() => setHovered(n.name)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActive(active === n.name ? null : n.name)}
            style={{ cursor: "pointer" }}
          >
            <motion.circle
              cx={p.x}
              cy={p.y}
              fill={isActive ? n.color : C.surface}
              stroke={n.color}
              strokeWidth="1.5"
              animate={{ r: isActive ? 34 : 28 }}
              transition={{ duration: 0.2 }}
              style={{ filter: isActive ? `drop-shadow(0 0 14px ${n.color})` : "none" }}
            />
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="600"
              fill={isActive ? "#06140F" : C.text}
              style={{ ...fontSans, pointerEvents: "none" }}
            >
              {n.short}
            </text>
          </g>
        );
      })}

      {/* sub nodes */}
      {NETWORK_NODES.map((n) =>
        n.subs.map((s, i) => {
          const { sub } = subPosition(n, i, cx, cy, mainR, subR);
          const isActive = hovered === n.name || active === n.name;
          return (
            <g key={`${n.name}-node-${s}`}>
              <circle
                cx={sub.x}
                cy={sub.y}
                r={isActive ? 5 : 3.5}
                fill={isActive ? n.color : C.muted}
                style={{
                  filter: isActive ? `drop-shadow(0 0 6px ${n.color})` : "none",
                  transition: "all 0.2s",
                }}
              />
              <text
                x={sub.x}
                y={sub.y - 10}
                textAnchor="middle"
                fontSize="8"
                fill={isActive ? C.text : C.muted}
                style={{ ...fontMono, pointerEvents: "none" }}
              >
                {s}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
}

function NetworkEmptyPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl p-6 h-full flex flex-col items-center justify-center text-center min-h-[280px]"
      style={{ background: C.bg, border: `1px solid ${C.border}` }}
    >
      <Network size={22} style={{ color: C.muted }} className="mb-3" />
      <p className="text-xs tracking-wider" style={{ ...fontMono, color: C.muted }}>
        SELECT A NODE TO OPEN ITS FILE
      </p>
    </motion.div>
  );
}

function NetworkDetailPanel({ node, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-6 h-full min-h-[280px]"
      style={{ background: C.bg, border: `1px solid ${node.color}55` }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${node.color}1a` }}
          >
            <node.icon size={18} style={{ color: node.color }} />
          </div>
          <h3 className="font-medium leading-snug" style={{ ...fontSans, color: C.text }}>
            {node.name}
          </h3>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg shrink-0" style={{ background: "rgba(148,163,184,0.1)" }}>
          <X size={14} style={{ color: C.muted }} />
        </button>
      </div>
      <p className="text-sm leading-relaxed mb-5" style={{ ...fontSans, color: C.muted }}>
        {node.desc}
      </p>
      <div className="text-xs uppercase tracking-wider mb-2" style={{ ...fontMono, color: node.color }}>
        Connected nodes
      </div>
      <div className="flex flex-wrap gap-2">
        {node.subs.map((s) => (
          <span
            key={s}
            className="text-xs px-2.5 py-1 rounded-md"
            style={{ ...fontMono, color: C.text, background: "rgba(148,163,184,0.08)" }}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function CapabilityNetwork() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const activeNode = NETWORK_NODES.find((n) => n.name === active) || null;

  return (
    <section id="capability" className="relative py-28 px-6 md:px-10" style={{ background: C.surface }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="Centerpiece System"
          title="Capability Network"
          sub="An interconnected map of the disciplines, technologies, and ideas I use to explore complex systems."
        />
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
          <div className="rounded-2xl p-4 md:p-8" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
            <NetworkGraph active={active} setActive={setActive} hovered={hovered} setHovered={setHovered} />
            <p className="text-center text-xs mt-2 tracking-wide" style={{ ...fontMono, color: C.muted }}>
              HOVER TO TRACE CONNECTIONS — CLICK A NODE TO OPEN ITS FILE
            </p>
          </div>

          <AnimatePresence mode="wait">
            {activeNode ? (
              <NetworkDetailPanel key={activeNode.name} node={activeNode} onClose={() => setActive(null)} />
            ) : (
              <NetworkEmptyPanel key="empty" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   CONTACT — TRANSMISSION CHANNELS
   ========================================================================= */

const CHANNELS = [
  { label: "LinkedIn", icon: Linkedin, href: "#", value: "/in/suhasaleem" },
  { label: "GitHub", icon: Github, href: "#", value: "/suhasaleem" },
  { label: "Email", icon: Mail, href: "mailto:hello@suhasaleem.dev", value: "hello@suhasaleem.dev" },
];

function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 md:px-10" style={{ background: C.surface }}>
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow icon={Globe}>Transmission Channels</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ ...fontSans, color: C.text }}>
          Open a Channel
        </h2>
        <p className="mb-10 max-w-xl mx-auto leading-relaxed" style={{ ...fontSans, color: C.muted }}>
          Reach out about collaborations, internships, research, or anything systems-shaped.
        </p>

        <div className="flex items-center justify-center gap-2 mb-12">
          <StatusDot />
          <span className="text-xs tracking-widest" style={{ ...fontMono, color: C.muted }}>
            TRANSMISSION STATUS: <span style={{ color: C.accent }}>OPEN</span>
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {CHANNELS.map((c) => (
            <motion.a
              key={c.label}
              href={c.href}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 flex flex-col items-center gap-3"
              style={{ background: C.bg, border: `1px solid ${C.border}` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(0,229,168,0.1)" }}
              >
                <c.icon size={18} style={{ color: C.accent }} />
              </div>
              <span className="text-sm font-medium" style={{ ...fontSans, color: C.text }}>
                {c.label}
              </span>
              <span className="text-xs" style={{ ...fontMono, color: C.muted }}>
                {c.value}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <footer className="mt-24 pt-8 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <p className="text-xs" style={{ ...fontMono, color: C.muted }}>
          © 2026 SUHA SALEEM — CONTROL ROOM v1.0 — ALL SYSTEMS NOMINAL
        </p>
      </footer>
    </section>
  );
}

/* =========================================================================
   ROOT APP
   ========================================================================= */

export default function ControlRoomPortfolio() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen w-full relative" style={{ background: C.bg, ...fontSans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        html, body { background: ${C.bg}; }
        ::selection { background: rgba(0,229,168,0.25); }
        a { text-decoration: none; }
      `}</style>

      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>

      {loaded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Nav />
          <main>
            <Hero />
            <About />
            <IntelligenceSystems />
            <CapabilityNetwork />
            <Timeline />
            <AreasOfExploration />
            <Questions />
            <Contact />
          </main>
        </motion.div>
      )}
    </div>
  );
}
