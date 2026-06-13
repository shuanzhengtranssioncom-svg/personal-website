"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/i18n";

/* ── Data ─────────────────────────────────────────────── */

const methodology = {
  zh: [
    {
      title: "用户调研 SOP",
      steps: ["锁定核心假设", "设计问卷/访谈提纲", "线上问卷投放", "清洗无效样本", "输出用户画像"],
      evidence:
        "尼日利亚项目发放 2,092 份问卷（印度/尼日/加纳/巴基斯坦四国），输出闹钟播报内容优先级排序，最终功能渗透率 4.6% 超目标。扫码支付项目通过用户访谈锁定「输错号码焦虑」核心痛点。",
      value:
        "公司若需要快速建立用户认知，我可以把模糊的「用户需要什么」变成可执行的产品需求，经 1 万+ 调研样本验证。",
    },
    {
      title: "AI 功能落地框架",
      steps: ["挖掘用户场景·为什么是AI不是规则", "确定人机边界·AI做什么/人做什么", "模型策略·延迟/成本/准确率如何取舍", "容错机制·AI错了用户怎么办", "验收标准·上线前怎么判断够好了", "增长闭环·数据怎么回来让AI更好"],
      evidence:
        "尼日利亚 OCR：从「输错号码焦虑」场景出发，端侧识别+用户可编辑结果作为容错，通过「用户纠错→样本回收→模型重训」闭环回收 1,000+ 样本，准确率 45%→90%。安心：锁定「深夜一个人硬扛」场景，云端 API 策略，状态机+安全检测双保险，Benchmark（3 模型×6 场景×2 轮）验证可行性。",
      value:
        "公司若有 AI 功能要落地，我能用这套框架从场景出发走完全程——不止是「接入一个模型」，而是设计完整的容错、验证和增长机制。",
    },
    {
      title: "心理学驱动的产品设计方法",
      steps: ["信息呈现·米勒定律", "行为引导·登门槛效应", "体验感知·峰终定律", "习惯养成·强化学习"],
      evidence:
        "OCR 扫一扫：将「手动输入 10 位数字」压缩为「扫一下」，降低操作负荷。闹钟播报：晨起从「刺耳铃声」变为「温柔语音+天气时间」，改变了体验的终点感受。安心：免费倾诉→付费健身包，登门槛效应让转化更自然；S0 承接阶段用正常化技术降低用户心理防御。",
      value:
        "普通 PM 靠直觉做设计决策。公司如果需要 PM 在信息架构、体验设计和行为引导上做出有心理学依据的判断，我能用心理学的方法让产品决策都有理论支撑，同时结合数据表现，做有理有据的决策，而不是靠直觉行事。",
    },
    {
      title: "多语言 / 多市场产品适配清单",
      steps: ["语言层·英+当地语言", "视觉层·图标排版", "功能层·弱网离线"],
      evidence:
        "传音产品覆盖印度、尼日利亚、加纳、巴基斯坦等多市场。闹钟语音播报支持英/法语自定义音色。尼日利亚扫码支付在多语言下完成支付流程适配。",
      value:
        "公司若有需要覆盖多市场的 C 端产品，我可以用这套清单快速排查本地化遗漏点，避免上线后才发现某个市场文案溢出或功能不可用。",
      optional: true,
    },
    {
      title: "Google Play 上架 & 海外合规实操",
      steps: ["应用描述本地化", "权限最小化声明", "隐私弹框·先同意后采集", "数据采集·最小必要原则"],
      evidence:
        "目前产品更新迭代均需要完成 Google Play 上架。",
      value:
        "公司若需要一个在上架和合规上有实操经验的 PM——不需要等法务催了才补隐私弹框，我会在产品设计阶段就把这些纳入 checklist。",
      optional: true,
    },
  ],
  en: [
    {
      title: "User Research SOP",
      steps: ["Lock hypotheses", "Design survey guide", "Online survey", "Clean invalid data", "Output personas"],
      evidence:
        "Nigeria: 2,092 responses across India, Nigeria, Ghana, Pakistan. Alarm broadcast content ranking drove 4.6% penetration (above 4% target). QR payment: interviews pinpointed 'number-entry anxiety' as the core pain point.",
      value:
        "If your team needs to rapidly build user understanding, I turn vague questions into actionable product requirements — validated across 10k+ survey samples.",
    },
    {
      title: "AI Feature Launch Framework",
      steps: ["User scenario·why AI not rules", "Human-AI boundary·what each does", "Model strategy·latency/cost/accuracy", "Fault tolerance·when AI gets it wrong", "Acceptance criteria·how good is good enough", "Growth loop·data back to improve AI"],
      evidence:
        "Nigeria OCR: 'number-entry anxiety' → on-device recognition + editable results as fault tolerance → 'user edit → sample collection → retraining' loop, 1,000+ samples, accuracy 45%→90%. Anxin: 'coping alone at midnight' scenario → cloud API strategy → state machine + safety detection → Benchmark validated (3 models × 6 scenarios × 2 rounds).",
      value:
        "If your company is shipping AI features, I bring a battle-tested framework — not just 'connect to an API', but design the full fault tolerance, validation, and growth loop around it.",
    },
    {
      title: "Psychology-Driven Product Design",
      steps: ["Information display·Miller's Law", "Behavior guidance·foot-in-the-door", "Experience perception·peak-end rule", "Habit formation·reinforcement learning"],
      evidence:
        "OCR: compressed 'type 10 digits' into 'scan once' — reducing operational load. Alarm: transformed morning from 'harsh alarm' to 'gentle voice + weather/time' — changed the endpoint of the experience. Anxin: free session → paid fitness pack via foot-in-the-door effect; S0 normalization technique reduces psychological defensiveness.",
      value:
        "Most PMs design by gut feel. If your team needs a PM who makes psychologically-informed decisions about information architecture, experience design, and behavior guidance — I combine psychological methods with data to drive reasoned product decisions, not intuition.",
    },
    {
      title: "Multi-Market Product Adaptation Checklist",
      steps: ["Language·EN+local", "Visual·icons+layout", "Functional·weak network"],
      evidence:
        "Transsion products across India, Nigeria, Ghana, Pakistan. Alarm broadcast: English/French custom voice. Nigeria QR payment: multi-language payment flow adaptation.",
      value:
        "If your team ships across markets, I can use this checklist to catch localization gaps fast — no more post-launch text overflow surprises.",
      optional: true,
    },
    {
      title: "Google Play Listing & Compliance Basics",
      steps: ["Localize store listing", "Minimal permissions", "Privacy dialog·consent first", "Minimal data collection"],
      evidence:
        "All ongoing product iterations require Google Play listing completion.",
      value:
        "If your team needs a PM with hands-on listing & compliance experience — someone who builds privacy into the design phase rather than waiting for legal to flag it.",
      optional: true,
    },
  ],
};

/* ── SVG Icons ─────────────────────────────────────────── */

const icons = [
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5"/><circle cx="19" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M20 18l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 4h18L14 13v5l-4 2v-7L3 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.5"/><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="4" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.5 4 10.5 9 12 5-1.5 9-6.5 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

/* ── Component ─────────────────────────────────────────── */

export default function ThoughtsPage() {
  const { t, lang } = useLang();
  const items = lang === "zh" ? methodology.zh : methodology.en;
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <>
      <NavBar />
      <main className="flex-1 pt-24 relative overflow-hidden">
        {/* ── Background atmosphere ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-cyan/[0.025] blur-[140px]" />
          <div className="absolute top-[30%] -left-32 w-[500px] h-[500px] rounded-full bg-purple/[0.025] blur-[120px]" />
          <div className="absolute top-[60%] right-1/4 w-[350px] h-[350px] rounded-full bg-cyan/[0.015] blur-[100px]" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.012]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        {/* ── Content ── */}
        <section className="relative mx-auto max-w-[720px] px-6 pb-24">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-cyan/60 mb-4 uppercase">
              {lang === "zh" ? "Product Methodology" : "Product Methodology"}
            </p>
            <h1 className="text-2xl font-bold tracking-[0.08em] text-text mb-4">
              {t.thoughts.title}
            </h1>
            <p className="text-sm text-text-muted leading-relaxed max-w-md mx-auto">
              {lang === "zh"
                ? "三个核心方法 + 两个可选模块，均经真实项目验证，可直接复用。"
                : "Three core methods + two optional modules, all battle-tested and ready to deploy."}
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {items.map((item, i) => {
              const isOpen = expanded === i;
              return (
                <motion.div
                  key={i}
                  layout
                  className={`relative rounded-2xl border transition-colors overflow-hidden ${
                    isOpen
                      ? "border-cyan/15 bg-[rgba(255,255,255,0.025)] shadow-[0_0_40px_-12px_rgba(6,182,212,0.06)]"
                      : "border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.008)] hover:border-[rgba(255,255,255,0.08)]"
                  }`}
                >
                  {/* ── Collapsed header ── */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer group"
                  >
                    {/* Number */}
                    <span className={`text-[13px] font-black font-mono tracking-tight shrink-0 transition-colors ${
                      isOpen ? "text-cyan" : "text-text-muted/25"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon ring */}
                    <span className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                      isOpen
                        ? "border-cyan/20 bg-cyan/[0.06] text-cyan"
                        : "border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] text-text-muted/40 group-hover:text-text-muted/60"
                    }`}>
                      {icons[i]}
                    </span>

                    {/* Title */}
                    <span className="text-sm font-semibold text-text flex-1">
                      {item.title}
                      {"optional" in item && (
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border border-[rgba(255,255,255,0.08)] text-text-muted/50">
                          {lang === "zh" ? "可选" : "Optional"}
                        </span>
                      )}
                    </span>

                    {/* Chevron */}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-7 h-7 rounded-lg border border-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0"
                    >
                      <svg width="10" height="10" viewBox="0 0 16 16">
                        <path d="M4 6l4 4 4-4" stroke={isOpen ? "rgba(6,182,212,0.7)" : "rgba(255,255,255,0.25)"} strokeWidth="1.5" fill="none"/>
                      </svg>
                    </motion.span>
                  </button>

                  {/* ── Expanded content ── */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          {/* Divider */}
                          <div className="h-px bg-gradient-to-r from-cyan/10 via-[rgba(255,255,255,0.04)] to-transparent mb-5" />

                          <div className="grid grid-cols-1 lg:grid-cols-7 gap-5">
                            {/* Left column: Steps + Evidence */}
                            <div className="lg:col-span-4 space-y-5">
                              {/* SOP Flow */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="w-1 h-3 rounded-full bg-cyan shrink-0" />
                                  <span className="text-[11px] font-semibold text-cyan tracking-wider uppercase">
                                    {lang === "zh" ? "操作方法" : "Method"}
                                  </span>
                                </div>
                                {/* Step pills */}
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {item.steps.map((step, si) => (
                                    <span key={si} className="flex items-center gap-1.5">
                                      <span className="text-[11px] font-medium text-text-secondary bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-full px-3 py-1.5 whitespace-nowrap">
                                        {step}
                                      </span>
                                      {si < item.steps.length - 1 && (
                                        <span className="text-text-muted/25 text-[10px]">→</span>
                                      )}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Evidence */}
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="w-1 h-3 rounded-full bg-text-muted/30 shrink-0" />
                                  <span className="text-[11px] font-semibold text-text-muted tracking-wider uppercase">
                                    {lang === "zh" ? "实战验证" : "Evidence"}
                                  </span>
                                </div>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                  {item.evidence}
                                </p>
                              </div>
                            </div>

                            {/* Right column: Value */}
                            <div className="lg:col-span-3">
                              <div className="relative rounded-xl bg-purple/[0.05] border border-purple/15 p-4 h-full flex flex-col overflow-hidden">
                                {/* Inner glow */}
                                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-purple/[0.06] blur-[30px]" />
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/15 to-transparent" />

                                <div className="flex items-center gap-2 mb-2 relative">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-purple shrink-0">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                                    <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                  </svg>
                                  <span className="text-[10px] font-semibold text-purple tracking-wider uppercase">
                                    {lang === "zh" ? "对下个团队的价值" : "Value to your team"}
                                  </span>
                                </div>
                                <p className="text-xs text-text-secondary leading-relaxed relative">
                                  {item.value}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="text-center text-[11px] text-text-muted/50 mt-12">
            {lang === "zh"
              ? "以上方法论均来自真实项目，非理论推演。"
              : "All methods above are derived from real projects, not theory."}
          </p>
        </section>
        <Footer />
      </main>
    </>
  );
}
