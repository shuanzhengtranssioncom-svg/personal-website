"use client";

import { useLang } from "@/lib/i18n";
import MagicBento from "@/components/MagicBento";

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

export default function Skills() {
  const { t } = useLang();

  const cards = [
    {
      color: "rgba(6,182,212,0.05)",
      label: t.skills.userResearch,
      title: "10,000+",
      description: t.skills.userResearchDesc,
      figure: <PeopleDensity />,
      bigText: "10,000+",
      subText: t.skills.userResearchSub,
      desc: t.skills.userResearchDesc,
    },
    {
      color: "rgba(6,182,212,0.05)",
      label: t.skills.aiPrototype,
      title: "Axure → AI",
      description: t.skills.aiPrototypeDesc,
      figure: <ToolTransition />,
      bigText: "Axure → AI",
      subText: t.skills.aiPrototypeSub,
      desc: t.skills.aiPrototypeDesc,
    },
    {
      color: "rgba(6,182,212,0.05)",
      label: t.skills.english,
      title: "534",
      description: t.skills.englishDesc,
      figure: <ScoreRing />,
      bigText: "534",
      subText: t.skills.englishSub,
      desc: t.skills.englishDesc,
    },
  ];

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 pb-24">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-5">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan/40" />
          <h2 className="text-lg font-bold tracking-[0.15em] text-text">
            {t.skills.title}
          </h2>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyan/40" />
        </div>
      </div>

      <div className="skills-bento">
        <MagicBento
          cards={cards}
        textAutoHide={false}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt
        enableMagnetism
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="132, 0, 255"
        disableAnimations={false}
        renderCard={(card: any) => (
          <div className="flex flex-col items-center text-center w-full h-full justify-center gap-2 px-2">
            <span className="text-xs font-semibold tracking-wider px-2 py-0.5 rounded bg-cyan/10 text-cyan">
              {card.label}
            </span>
            <div className="w-full flex items-center justify-center">
              {card.figure}
            </div>
            <div className="text-2xl font-black text-text tracking-tight">
              {card.bigText}
            </div>
            <div className="text-xs text-cyan">
              {card.subText}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {card.desc}
            </p>
          </div>
        )}
      />
      </div>
    </section>
  );
}
