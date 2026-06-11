"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/lib/i18n";

const milestones = [
  {
    company: "美团",
    role: "用户研究",
    date: "2022.12 – 2023.03",
    insight: "学会「听」",
    description:
      "怎么从用户散乱的反馈中提炼可执行的洞察。通过访谈和问卷，把模糊的「体验不好」翻译成可量化的产品输入。",
    icon: "/meituan-logo.png",
  },
  {
    company: "京东",
    role: "网页产品经理",
    date: "2023.03 – 2023.08",
    insight: "学会「做」",
    description:
      "第一次负责产品优化，理解了曝光→点击→转化的全链路。京东首页快报优化后资源位曝光提升 21.3%。",
    icon: "/jd-logo.png",
  },
  {
    company: "传音",
    role: "C端工具产品经理",
    date: "2024.07 – 至今",
    insight: "学会「扛」",
    description:
      "曾独立负责5款产品，从发现痛点到项目落地全流程。产品 DAU 累计提升 15% 以上。",
    icon: "/transsion-logo.jpg",
  },
];

export default function GrowthPath() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="growth" className="mx-auto max-w-3xl px-6 pt-24 pb-24">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-5">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan/40" />
          <h2 className="text-lg font-bold tracking-[0.15em] text-text">
            {t.growth.title}
          </h2>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyan/40" />
        </div>
      </div>

      <div ref={ref} className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan to-purple to-transparent hidden sm:block" />

        <div className="flex flex-col gap-24">
          {milestones.map((m, i) => (
            <motion.div
              key={m.company}
              className="relative flex items-start gap-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              {/* Left: Company info */}
              <div className="hidden sm:flex flex-1 flex-col items-end text-right pr-8 pt-2">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <Image
                    src={m.icon}
                    alt={m.company}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-lg object-contain"
                  />
                  <div>
                    <div className="text-base font-bold text-text">{m.company}</div>
                    <div className="text-xs text-text-muted mt-0.5">
                      {m.role}
                    </div>
                    <div className="text-xs text-text-muted">
                      {m.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="hidden sm:flex shrink-0 relative z-2 pt-2.5">
                <div
                  className="w-3 h-3 rounded-full border-2 border-[#080810] bg-cyan"
                  style={{ boxShadow: "0 0 12px rgba(6,182,212,0.5)" }}
                />
              </div>

              {/* Right: Learned */}
              <div className="hidden sm:flex flex-1 flex-col items-start pl-8 pt-2">
                <span className="text-sm font-semibold mb-2 text-cyan">
                  {m.insight}
                </span>
                <p className="text-sm text-text-secondary leading-relaxed max-w-[260px]">
                  {m.description}
                </p>
              </div>

              {/* Mobile layout */}
              <div className="sm:hidden flex-1 rounded-xl border border-border bg-[rgba(255,255,255,0.03)] p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={m.icon}
                    alt={m.company}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-lg object-contain"
                  />
                  <div>
                    <div className="text-base font-bold">{m.company}</div>
                    <div className="text-xs text-text-muted">
                      {m.role} · {m.date}
                    </div>
                  </div>
                </div>
                <span className="inline-block text-xs font-semibold mb-2 text-cyan">
                  {m.insight}
                </span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {m.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
