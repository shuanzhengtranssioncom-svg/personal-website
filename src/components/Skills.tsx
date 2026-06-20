"use client";

import { useLang } from "@/lib/i18n";
import MagicBento from "@/components/MagicBento";

export default function Skills() {
  const { t } = useLang();

  const cards = [
    {
      label: t.skills.userResearch,
      title: "10,000+",
      description: t.skills.userResearchDesc,
      color: "#0d0d1a",
    },
    {
      label: t.skills.aiPrototype,
      title: "Axure → AI",
      description: t.skills.aiPrototypeDesc,
      color: "#0d0d1a",
    },
    {
      label: t.skills.english,
      title: "534",
      description: t.skills.englishDesc,
      color: "#0d0d1a",
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

      <MagicBento
        cards={cards}
        textAutoHide={true}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="6, 182, 212"
        disableAnimations={false}
      />
    </section>
  );
}
