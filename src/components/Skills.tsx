"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      {/* Axure box */}
      <rect x="5" y="8" width="44" height="20" rx="4" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
      <text x="27" y="22" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="system-ui">Axure</text>
      {/* Arrow */}
      <line x1="49" y1="18" x2="85" y2="18" stroke="#06b6d4" strokeWidth="1.5" />
      <polygon points="83,14 91,18 83,22" fill="#06b6d4" />
      {/* AI box */}
      <rect x="91" y="8" width="44" height="20" rx="4" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" strokeWidth="1" />
      <text x="113" y="22" textAnchor="middle" fill="#06b6d4" fontSize="8" fontWeight="600" fontFamily="system-ui">AI 生成</text>
    </svg>
  );
}

function ScoreRing() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-auto max-w-[80px] mx-auto" aria-hidden="true">
      {/* Background ring */}
      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="6" />
      {/* Foreground arc */}
      <circle
        cx="40" cy="40" r="34"
        fill="none" stroke="#06b6d4" strokeWidth="3"
        strokeDasharray={`${(534 / 710) * 214} 214`}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
        opacity="0.7"
      />
      {/* Dot at arc end — roughly at 534/710 ≈ 75% of semicircle */}
      <circle cx="68" cy="25" r="2.5" fill="#06b6d4" />
      {/* Score */}
      <text x="40" y="44" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="700" fontFamily="system-ui">534</text>
    </svg>
  );
}

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

  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 pb-24">
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
          <div
            key={card.title}
            className="rounded-xl border border-cyan/20 bg-cyan/[0.04] p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] hover:-translate-y-1"
          >
            <span className="inline-block text-xs font-semibold tracking-wider mb-4 px-2 py-0.5 rounded bg-cyan/10 text-cyan">
              {card.title}
            </span>

            {/* Figure */}
            <div className="mb-3 w-full flex items-center justify-center">
              {card.figure}
            </div>

            {/* Big data */}
            <div className="text-2xl font-black text-text mb-1 tracking-tight">
              {card.bigText}
            </div>
            <div className="text-xs text-cyan mb-4">
              {card.subText}
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
