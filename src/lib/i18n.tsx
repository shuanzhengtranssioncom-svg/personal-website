"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "zh" | "en";

const dict = {
  zh: {
    nav: { about: "关于", growth: "成长", projects: "项目", thoughts: "沉淀与方法" },
    hero: { title: "C端产品经理", belief: "理解用户，成为用户", cta: "开始探索 ↓" },
    growth: { title: "成长路径" },
    skills: {
      title: "我的技能",
      userResearch: "用户调研",
      userResearchSub: "用户调研样本",
      userResearchDesc: "心理学硕士背景，擅长从散乱反馈中提炼可执行的产品洞察。",
      aiPrototype: "AI 原型设计",
      aiPrototypeSub: "智能替代手绘，加速方案验证",
      aiPrototypeDesc: "擅长使用 Gemini、CC 等工具，快速将想法转化为可交互方案。",
      english: "英语六级",
      englishSub: "CET-6",
      englishDesc: "能撰写/阅读英文需求文档，同时与海外用户进行访谈。",
    },
    projects: { title: "我做了什么？" },
    thoughts: { title: "沉淀与方法", placeholder: "内容整理中，敬请期待。" },
    footer: {
      title: "期待和你聊聊",
      desc: "如果你也在寻找一个能用心理学视角做产品的 PM，欢迎联系我。",
      status: "目前正在寻找 C 端产品经理机会",
    },
    contact: "联系我",
  },
  en: {
    nav: { about: "About", growth: "Growth", projects: "Projects", thoughts: "Methods" },
    hero: { title: "C-End Product Manager", belief: "Understand users, become users", cta: "Explore ↓" },
    growth: { title: "Growth Path" },
    skills: {
      title: "Skills",
      userResearch: "User Research",
      userResearchSub: "user research samples",
      userResearchDesc: "Master's in Applied Psychology. Skilled at distilling actionable insights from scattered user feedback.",
      aiPrototype: "AI Prototyping",
      aiPrototypeSub: "AI replaces hand-drawn, faster validation",
      aiPrototypeDesc: "Proficient with Gemini, CC, and other tools to quickly turn ideas into interactive prototypes.",
      english: "CET-6 English",
      englishSub: "CET-6",
      englishDesc: "Able to read/write English requirement documents and conduct interviews with overseas users.",
    },
    projects: { title: "What have I built?" },
    thoughts: { title: "Methods & Frameworks", placeholder: "Coming soon." },
    footer: {
      title: "Let's talk",
      desc: "If you're looking for a PM who brings a psychology lens to product, I'd love to connect.",
      status: "Currently open to C-end PM opportunities",
    },
    contact: "Contact",
  },
};

type Dict = typeof dict.zh;

const LangContext = createContext<{
  lang: Lang;
  toggleLang: () => void;
  t: Dict;
} | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  const toggleLang = () => setLang((prev) => (prev === "zh" ? "en" : "zh"));

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
