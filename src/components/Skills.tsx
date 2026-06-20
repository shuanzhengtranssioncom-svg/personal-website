"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { useLang } from "@/lib/i18n";

function PeopleDensity() {
  const rows = 3;
  const cols = 7;
  const total = rows * cols;
  return (
    <svg viewBox="0 0 140 48" className="w-full h-auto" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = col * 20 + 2;
        const y = row * 16 + 2;
        const opacity = 0.25 + (i / total) * 0.45;
        return (
          <g key={i} opacity={opacity}>
            <circle cx={x + 5} cy={y + 2} r="2.5" fill="#06b6d4" />
            <ellipse cx={x + 5} cy={y + 8} rx="4" ry="3.5" fill="#06b6d4" />
          </g>
        );
      })}
    </svg>
  );
}

function ToolTransition() {
  return (
    <svg viewBox="0 0 140 36" className="w-full h-auto" aria-hidden="true">
      <rect x="5" y="8" width="44" height="20" rx="4" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
      <text x="27" y="22" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="system-ui">Axure</text>
      <line x1="49" y1="18" x2="85" y2="18" stroke="#06b6d4" strokeWidth="1.5" />
      <polygon points="83,14 91,18 83,22" fill="#06b6d4" />
      <rect x="91" y="8" width="44" height="20" rx="4" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" strokeWidth="1" />
      <text x="113" y="22" textAnchor="middle" fill="#06b6d4" fontSize="8" fontWeight="600" fontFamily="system-ui">AI 生成</text>
    </svg>
  );
}

function ScoreRing() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-auto max-w-[80px] mx-auto" aria-hidden="true">
      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="6" />
      <circle
        cx="40" cy="40" r="34"
        fill="none" stroke="#06b6d4" strokeWidth="3"
        strokeDasharray={`${(534 / 710) * 214} 214`}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
        opacity="0.7"
      />
      <circle cx="68" cy="25" r="2.5" fill="#06b6d4" />
      <text x="40" y="44" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="700" fontFamily="system-ui">534</text>
    </svg>
  );
}

// ── Glow card with border glow + particle stars + click ripple ──

function createParticle(x: number, y: number) {
  const el = document.createElement("div");
  el.style.cssText = `
    position: absolute;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(6,182,212,1);
    box-shadow: 0 0 6px rgba(6,182,212,0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px; top: ${y}px;
  `;
  return el;
}

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const particlesRef = useRef<{ el: HTMLDivElement; x: number; y: number; angle: number; speed: number }[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Particle animation loop
  const animateParticles = useCallback(() => {
    if (!hoveringRef.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();

    particlesRef.current.forEach((p) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.el.style.left = `${p.x}px`;
      p.el.style.top = `${p.y}px`;

      // Wrap around edges
      if (p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.angle = Math.random() * Math.PI * 2;
      }
    });

    animFrameRef.current = requestAnimationFrame(animateParticles);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    hoveringRef.current = true;
    const { width, height } = cardRef.current.getBoundingClientRect();

    // Spawn initial particles
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const el = createParticle(x, y);
      cardRef.current.appendChild(el);

      gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });

      particlesRef.current.push({
        el, x, y,
        angle: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
      });
    }

    // Slowly spawn more particles
    const interval = setInterval(() => {
      if (!hoveringRef.current || !cardRef.current) {
        clearInterval(interval);
        return;
      }
      const w = cardRef.current.getBoundingClientRect().width;
      const h = cardRef.current.getBoundingClientRect().height;
      const ex = Math.random() * w;
      const ey = Math.random() * h;
      const el = createParticle(ex, ey);
      cardRef.current.appendChild(el);
      gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
      particlesRef.current.push({
        el, x: ex, y: ey,
        angle: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
      });
    }, 500);
    timeoutsRef.current.push(interval);

    animFrameRef.current = requestAnimationFrame(animateParticles);
  }, [animateParticles]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--glow-x", `${x}%`);
    el.style.setProperty("--glow-y", `${y}%`);
    el.style.setProperty("--glow-intensity", "1");
    el.style.setProperty("--glow-radius", "300px");
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    hoveringRef.current = false;
    el.style.setProperty("--glow-intensity", "0");

    cancelAnimationFrame(animFrameRef.current);
    timeoutsRef.current.forEach(clearInterval);
    timeoutsRef.current = [];

    // Fade out and remove all particles
    particlesRef.current.forEach((p) => {
      gsap.to(p.el, {
        scale: 0, opacity: 0, duration: 0.3, ease: "back.in(1.7)",
        onComplete: () => p.el.parentNode?.removeChild(p.el),
      });
    });
    particlesRef.current = [];
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const maxDist = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height)
    );

    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: absolute;
      width: ${maxDist * 2}px;
      height: ${maxDist * 2}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(6,182,212,0.1) 30%, transparent 70%);
      left: ${x - maxDist}px;
      top: ${y - maxDist}px;
      pointer-events: none;
      z-index: 10;
      animation: ripple-expand 0.8s ease-out forwards;
    `;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

// ── Main Skills component ──

export default function Skills() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      title: t.skills.userResearch,
      figure: <PeopleDensity />,
      bigText: "10,000+",
      subText: t.skills.userResearchSub,
      desc: t.skills.userResearchDesc,
    },
    {
      title: t.skills.aiPrototype,
      figure: <ToolTransition />,
      bigText: "Axure → AI",
      subText: t.skills.aiPrototypeSub,
      desc: t.skills.aiPrototypeDesc,
    },
    {
      title: t.skills.english,
      figure: <ScoreRing />,
      bigText: "534",
      subText: t.skills.englishSub,
      desc: t.skills.englishDesc,
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Global spotlight following mouse over skills section
  useEffect(() => {
    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (inside) {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
        spotlight.style.opacity = "1";
      } else {
        spotlight.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="mx-auto max-w-3xl px-6 pb-24 relative">
      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed z-50 opacity-0 transition-opacity duration-300"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, rgba(6,182,212,0.05) 15%, rgba(6,182,212,0.02) 30%, rgba(6,182,212,0.01) 50%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-5">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan/40" />
          <h2 className="text-lg font-bold tracking-[0.15em] text-text">
            {t.skills.title}
          </h2>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyan/40" />
        </div>
      </div>

      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {cards.map((card) => (
          <GlowCard
            key={card.title}
            className="rounded-xl border border-white/8 bg-cyan/[0.04] p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-white/15 hover:-translate-y-1"
          >
            <span className="inline-block text-xs font-semibold tracking-wider mb-4 px-2 py-0.5 rounded bg-cyan/10 text-cyan">
              {card.title}
            </span>

            <div className="mb-3 w-full flex items-center justify-center">
              {card.figure}
            </div>

            <div className="text-2xl font-black text-text mb-1 tracking-tight">
              {card.bigText}
            </div>
            <div className="text-xs text-cyan mb-4">
              {card.subText}
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              {card.desc}
            </p>
          </GlowCard>
        ))}
      </motion.div>
    </section>
  );
}
