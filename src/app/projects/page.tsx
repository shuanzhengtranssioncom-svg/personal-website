"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import ProjectCase from "@/components/ProjectCase";
import Footer from "@/components/Footer";
import PaymentScene from "@/components/charts/PaymentScene";
import CompetitorAnalysis from "@/components/charts/CompetitorAnalysis";
import SolutionFlow from "@/components/charts/SolutionFlow";
import TechComparison from "@/components/charts/TechComparison";
import InteractionComparison from "@/components/charts/InteractionComparison";
import ResultMetrics from "@/components/charts/ResultMetrics";
import Image from "next/image";
import {
  ErrorRateChart,
  ErrorFrequencyChart,
  SampleStat,
} from "@/components/charts/NigeriaDataCharts";
import {
  AlarmPainPointChart,
  AlarmInterestChart,
  AlarmContentChart,
} from "@/components/charts/AlarmSurveyChart";
import { useLang } from "@/lib/i18n";


const nigeriaProject = {
  title: "",
  summary: "",
  highlights: [],
  tag: "",
  tagColor: "cyan" as const,
  pages: [
    {
      question: "WHY",
      content: "",
      visual: (
        <div className="space-y-6">
          {/* 用户痛点 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-cyan shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">用户痛点</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed mb-3">
              James，尼日利亚技工，几乎每天都需要转账给商户，每次需要手动输入 10 位号码，流程繁琐费时费力，很容易输入错误，因此感到焦虑和痛苦。
            </p>
            <PaymentScene />
          </section>

          {/* 用户调研 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-cyan shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">用户调研</span>
            </div>
            <div className="space-y-2">
              <SampleStat />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4 glass-hover flex flex-col items-center">
                  <span className="text-xs text-text-muted mb-2">输入错误率</span>
                  <ErrorRateChart />
                </div>
                <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4 glass-hover flex flex-col items-center">
                  <span className="text-xs text-text-muted mb-2">错误频次分布</span>
                  <ErrorFrequencyChart />
                </div>
              </div>
            </div>
          </section>

          {/* 竞品分析 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-purple shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">竞品分析</span>
            </div>
            <CompetitorAnalysis />
          </section>
        </div>
      ),
    },
    {
      question: "WHAT",
      content: "",
      visual: (
        <div className="space-y-6">
          {/* 解决方案 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-cyan shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">解决方案</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border border-border overflow-hidden">
                <Image
                  src="/solution-flow.jpg"
                  alt="AI OCR 识别支付流程"
                  width={1200}
                  height={654}
                  className="w-full h-auto"
                />
              </div>
              <SolutionFlow />
            </div>
          </section>

          {/* 概念验证 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-purple shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">概念验证</span>
            </div>
            <div className="rounded-lg bg-purple/5 border border-purple/10 p-3 space-y-2">
              <InteractionComparison />
              <div className="rounded-lg bg-purple/5 border border-purple/10 p-3">
                <p className="text-[10px] text-text-secondary leading-relaxed text-center">
                  测试结果 5:5 平手后，决定采用方案 B 的快速流转体验，同时保留方案 A 的编辑能力——用户可以在扫码后点击编辑修正数字。这既满足了效率需求，也消除了安全感顾虑。
                </p>
              </div>
            </div>
          </section>

          {/* 技术落地 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-cyan shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">技术落地</span>
            </div>
            <div className="rounded-lg bg-cyan/5 border border-cyan/10 p-3 space-y-2">
              <TechComparison />
              <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4 glass-hover">
                <div className="flex items-center justify-center gap-2 mb-3">
                  {["用户纠错", "置信度低", "样本回收", "模型迭代"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="rounded-lg bg-cyan/10 border border-cyan/20 px-3 py-1.5 text-[11px] font-semibold text-cyan">{step}</div>
                      {i < 3 && <span className="text-text-muted text-xs">→</span>}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-black text-cyan">1,000+</span>
                  <span className="text-[10px] text-text-secondary">第一期回收有效样本</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      ),
    },
    {
      question: "HOW",
      content: "",
      visual: (
        <div className="space-y-6">
          {/* 核心数据 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-cyan shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">核心数据</span>
            </div>
            <ResultMetrics />
          </section>

          {/* 增长策略 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-purple shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">增长策略</span>
            </div>
            <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4 glass-hover">
              <p className="text-[10px] text-text-secondary leading-relaxed">
                设计首次使用功能引导，在支付页弹框引导使用，让用户快速感知产品价值，累计跳转率 <span className="font-bold text-cyan">83%</span>。
              </p>
            </div>
          </section>

          {/* 如果重来 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-[rgba(255,255,255,0.2)] shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text-muted">如果重来</span>
            </div>
            <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4 glass-hover">
              <p className="text-[10px] text-text-secondary leading-relaxed">
                增长策略应该在项目初期就和产品方案同步设计。当时把注意力集中在 OCR 准确率上，增长策略是后期才加上的。如果一开始就设计 A/B 测试对比引导转化差异，渗透率可能能推得更高。Concept A/B 测试样本量只有 15 人且都是内部员工，应该在正式开发前做更大规模的外部用户测试。
              </p>
            </div>
          </section>
        </div>
      ),
    },
  ] as const,
};

const alarmProject = {
  title: "AI 语音播报 · 闹钟场景升级",
  summary: "",
  highlights: ["用户调研", "竞品分析", "方案设计", "交互设计", "跨团队协作"],
  tag: "",
  tagColor: "purple" as const,
  pages: [
    {
      question: "WHY",
      content: "",
      visual: (
        <div className="space-y-6">
          {/* 产品背景 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-purple shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">产品背景</span>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-purple/20 bg-purple/[0.04] p-3 text-center">
                  <div className="text-xl font-black text-purple">6000w+</div>
                  <div className="text-[10px] text-text-muted">时钟日活（传音排名第六）</div>
                </div>
                <div className="rounded-lg border border-purple/20 bg-purple/[0.04] p-3 text-center">
                  <div className="text-xl font-black text-purple">4500w+</div>
                  <div className="text-[10px] text-text-muted">闹钟日活（渗透率 70%）</div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-3">
                <p className="text-[10px] text-text-secondary leading-relaxed">
                  痛点：仅支持 30+ 铃声，音色粗糙生硬；用户晨起后需在时钟、天气、记事本、日历等多 APP 间频繁切换。更紧迫的是——友商 H/M/O/V 均已提供语音播报，传音处于「人有我无」的状态。
                </p>
              </div>
            </div>
          </section>

          {/* 用户调研 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-purple shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">用户调研</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-lg font-black text-purple">2,092</span>
                <span className="text-[10px] text-text-secondary">有效样本（印度、尼日、加纳、巴基斯坦）</span>
              </div>
              <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-3">
                <AlarmPainPointChart />
              </div>
              <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-3">
                <AlarmInterestChart />
              </div>
              <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-3">
                <AlarmContentChart />
              </div>
            </div>
          </section>
        </div>
      ),
    },
    {
      question: "WHAT",
      content: "",
      visual: (
        <div className="space-y-6">
          {/* 竞品分析 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-purple shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">竞品分析</span>
            </div>
            <div className="rounded-lg bg-purple/5 border border-purple/10 p-3 space-y-3">
              <p className="text-[10px] text-text-secondary leading-relaxed">
                系统分析 6 家厂商（H/O/V/S/M + 传音）在 7 个维度的表现
              </p>

              {/* 厂商比较矩阵 */}
              <div className="overflow-x-auto">
                <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-px text-center text-[9px] min-w-[380px]">
                  {/* Header */}
                  <div className="text-text-muted text-left pr-2" />
                  {["华为", "OPPO", "vivo", "三星", "小米", "传音"].map((b) => (
                    <div key={b} className={`font-semibold px-1 ${b === "传音" ? "text-purple" : "text-text-muted"}`}>{b}</div>
                  ))}

                  {/* 语音助手依赖 */}
                  <div className="text-text-muted text-left py-1 pr-2">语音助手</div>
                  {["依赖", "依赖", "依赖", "依赖", "依赖", "无依赖"].map((v, i) => (
                    <div key={i} className={`py-1 ${v === "无依赖" ? "text-purple font-semibold rounded bg-purple/10" : "text-text-muted"}`}>{v}</div>
                  ))}

                  {/* 播报时机 */}
                  <div className="text-text-muted text-left py-1 pr-2">播报时机</div>
                  {["关后", "关后", "关后", "伴随", "伴随", "—"].map((v, i) => (
                    <div key={i} className={`py-1 ${v === "—" ? "text-purple font-semibold" : "text-text-muted"}`}>{v}</div>
                  ))}

                  {/* 内容丰富度 */}
                  <div className="text-text-muted text-left py-1 pr-2">内容丰富度</div>
                  {["★★☆", "★★★", "★★☆", "★☆☆", "★☆☆", "—"].map((v, i) => (
                    <div key={i} className={`py-1 ${v === "—" ? "text-purple font-semibold" : "text-text-muted"}`}>{v}</div>
                  ))}

                  {/* 自定义音色 */}
                  <div className="text-text-muted text-left py-1 pr-2">自定义音色</div>
                  {["✗", "✗", "✗", "✗", "✗", "✓"].map((v, i) => (
                    <div key={i} className={`py-1 ${v === "✓" ? "text-purple font-semibold rounded bg-purple/10" : "text-text-muted"}`}>{v}</div>
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-text-secondary leading-relaxed text-center">
                传音是唯一无语音助手依赖的厂商，且有机会在自定义音色上建立差异化
              </p>
            </div>
          </section>

          {/* 方案设计 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-purple shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">方案设计</span>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)] p-3">
                  <div className="text-[11px] font-semibold text-text-muted mb-1">方案一 · 时钟主导</div>
                  <div className="text-[10px] text-text-muted leading-relaxed mb-2">
                    时钟自己定义播报时机和内容，Ella 只提供 TTS
                  </div>
                  <div className="text-[10px] text-text-muted">工作量大，时钟跟随 OS 大版本走无法自升级</div>
                </div>
                <div className="rounded-lg border border-purple/30 bg-purple/[0.06] p-3 relative">
                  <div className="absolute -top-2 right-3 text-[9px] font-semibold text-purple bg-[#080810] px-1.5 py-0.5 rounded">最终选择</div>
                  <div className="text-[11px] font-semibold text-purple mb-1">方案二 · Ella 主导</div>
                  <div className="text-[10px] text-text-secondary leading-relaxed mb-2">
                    时钟只提供开关入口，播报内容、音色、规则全部由 Ella 侧定义
                  </div>
                  <div className="text-[10px] text-text-secondary">Ella 支持自升级，能力拓展更敏捷</div>
                </div>
              </div>
              <div className="rounded-lg bg-purple/5 border border-purple/10 p-3">
                <p className="text-[10px] text-text-secondary leading-relaxed text-center">
                  核心判断：语音播报的长期竞争壁垒在内容丰富度和音色体验，时钟作为入口不应承担超出架构定位的复杂度。
                </p>
              </div>
            </div>
          </section>

          {/* 交互设计 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-purple shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">交互设计</span>
            </div>
            <div className="rounded-lg bg-purple/5 border border-purple/10 p-3 space-y-1.5">
              {[
                "创建闹钟页面新增「Ella 播报」开关，与铃声二选一",
                "播报内容优先级：开场白 → 时间 → 天气 → 日程/待办 → 未接来电/短信 → 结束语",
                "播报背景音乐根据天气变化（阴雨/晴天），音量由弱变强",
                "支持自定义音色（英/法语）",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] text-purple shrink-0 mt-0.5">{i + 1}.</span>
                  <span className="text-[10px] text-text-secondary leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      ),
    },
    {
      question: "HOW",
      content: "",
      visual: (
        <div className="space-y-6">
          {/* 核心数据 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-purple shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">核心数据</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-purple/20 bg-purple/[0.04] p-3 text-center">
                <div className="text-[10px] text-text-muted mb-1">操作步骤</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm font-bold text-[#64748b] line-through">多步</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
                    <path d="M3 8h10M11 4l4 4-4 4" stroke="rgba(168,85,247,0.6)" strokeWidth="1.5" fill="none" />
                  </svg>
                  <span className="text-xl font-black text-purple">1步</span>
                </div>
              </div>
              <div className="rounded-lg border border-purple/20 bg-purple/[0.04] p-3 text-center">
                <div className="text-[10px] text-text-muted mb-1">功能渗透率</div>
                <div className="text-xl font-black text-purple">4.6%</div>
                <div className="text-[10px] text-text-muted mt-0.5">目标 4%</div>
              </div>
            </div>
          </section>

          {/* 如果重来 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-[rgba(255,255,255,0.2)] shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text-muted">如果重来</span>
            </div>
            <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4 glass-hover">
              <p className="text-[10px] text-text-secondary leading-relaxed">
                竞品分析应该在日常就建立持续监控机制，而不是等到立项后才做。如果更早发现友商已经全面覆盖语音播报功能，可以提前 1-2 个月启动，抢占窗口期。播报内容的首批选择（时间+天气）虽然数据支撑充分，但错过了日程/待办的差异化机会——这部分用户需求后来被验证很强，但当时出于上线速度考虑被排到了二期。
              </p>
            </div>
          </section>
        </div>
      ),
    },
  ] as const,
};

const anxinProject = {
  title: "安心 · AI 心理产品",
  summary: "",
  highlights: [],
  tag: "",
  tagColor: "warm" as const,
  pages: [
    // Page 1: 初心 & 场景
    {
      question: "问题定义",
      content: "",
      visual: (
        <div className="space-y-6">
          {/* 为什么选这个方向 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-warm shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">为什么选这个方向</span>
            </div>
            <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4 glass-hover">
              <p className="text-xs text-text-secondary leading-relaxed">
                作为一名心理学研究生，我深知当前心理健康问题的普遍性。而心理亚健康人群目前被系统性地忽视了——左边是心理健康的人，右边是达到临床诊断标准的患者，中间那群亚健康人群几乎很少被关注。他们面临一个两难困境：可能没到去看心理咨询师的地步，况且一次咨询 200-800 元，还要承受「我是不是有病」的污名化压力；不去看，深夜情绪崩溃的时候，找朋友，怕消耗人情，找家人，开不了口，只能硬扛。这让我开始思考：AI 在这个领域能不能扮演一个角色，不是替代心理咨询师，而是在硬扛和去咨询之间找到一个中间值？
              </p>
            </div>
          </section>

          {/* 触发场景 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-[rgba(255,255,255,0.2)] shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text-muted">触发场景</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-border overflow-hidden">
                <Image
                  src="/anxin-scene.png"
                  alt="深夜城市出租屋，年轻人独自面对手机屏幕"
                  width={1200}
                  height={654}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                凌晨 1 点，加完班回到家，打开灯，屋子里又空又安静。白天和研发 battle 完，又看了一眼年中 KPI 进度。打开手机，老妈发来一条 60 秒的催婚语音。心里像灌了铅一样沉。而这种感受，已经持续了很久。即使反复翻通讯录，手机放下一会儿又拿起来——也不知道能跟谁开口。
              </p>
            </div>
          </section>

          {/* 三个核心障碍 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-warm shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">三个核心障碍</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: "费用高", value: "200-800 元/次", sub: "专业咨询门槛" },
                { label: "病耻感", value: "去了医院就是有病", sub: "社会污名化" },
                { label: "即时性差", value: "痛苦不能等 72h 排期", sub: "深夜没人可以说话" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-warm/20 bg-warm/[0.04] p-3 text-center">
                  <div className="text-[10px] font-semibold text-warm mb-1">{item.label}</div>
                  <div className="text-sm font-black text-warm">{item.value}</div>
                  <div className="text-[10px] text-text-muted mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 核心洞察 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-warm shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">核心洞察</span>
            </div>
            <div className="rounded-lg bg-warm/5 border border-warm/10 p-4">
              <p className="text-[10px] text-text-secondary leading-relaxed text-center mb-3">
                三个障碍中「即时可得性」最被忽视但最致命。一个痛苦的人不能等 72 小时排期。
              </p>
              <div className="rounded-lg bg-warm/10 border border-warm/20 p-3">
                <p className="text-xs text-text leading-relaxed text-center font-semibold">
                  安心不是在和心理咨询师竞争，是在和「深夜一个人硬扛」竞争。
                </p>
              </div>
            </div>
          </section>
        </div>
      ),
    },
    // Page 2: 思考一 — 现有产品满足诉求了吗？
    {
      question: "思考一",
      content: "",
      visual: (
        <div className="space-y-6">
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-warm shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">现有产品满足诉求了吗？</span>
            </div>
            <p className="text-[10px] text-text-muted leading-relaxed mb-3">
              通用 AI 的优化目标是「回答越全面越好」，而心理咨询需要「一次只推进一小步」。现有产品在这个矛盾上，各自选择了不同的路径。
            </p>

            {/* 两列对比 */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              {/* 通用 AI */}
              <div>
                <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)] p-2.5 mb-2">
                  <div className="text-[10px] font-semibold text-text-muted mb-1.5">通用 AI 做法</div>
                  <div className="text-[10px] text-text-muted leading-relaxed mb-1.5">
                    用 prompt 包装角色：「你是一个心理咨询师」，但回答内容"长篇大论"，不像真正的咨询师
                  </div>
                  <div className="text-[9px] text-warm">一次回答完所有问题，无法控制节奏</div>
                </div>
                <div className="rounded-xl overflow-hidden border border-border max-w-[160px] mx-auto">
                  <video
                    src="/anxin-deepseek-demo.mp4"
                    controls
                    preload="metadata"
                    className="w-full h-auto block"
                    poster="/anxin-deepseek-cover.png"
                  />
                </div>
              </div>
              {/* 头部平台 */}
              <div>
                <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)] p-2.5 mb-2">
                  <div className="text-[10px] font-semibold text-text-muted mb-1.5">头部心理平台做法</div>
                  <div className="text-[10px] text-text-muted leading-relaxed mb-1.5">
                    真人供给，24 小时即时倾诉，真人倾听师 ¥30-200/次
                  </div>
                  <div className="text-[9px] text-warm">供需错配，深夜高峰时段最难匹配</div>
                </div>
                <div className="rounded-xl overflow-hidden border border-border max-w-[160px] mx-auto">
                  <video
                    src="/competitor-app-demo.mp4"
                    controls
                    preload="metadata"
                    className="w-full h-auto block"
                    poster="/competitor-app-cover.jpeg"
                  />
                </div>
              </div>
            </div>

            {/* 发现 */}
            <div className="rounded-lg bg-warm/5 border border-warm/10 p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-warm">我的发现</span>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed">
                即使在 prompt 里写「每次只推进一小步，不要一次给太多建议」，LLM 在处理复杂对话时，prompt 的影响会随着对话轮次增加而衰减。到了第 5 轮、第 10 轮，模型可能就"忘"了最初的约束，开始一次性输出三段分析加五条建议。
                <br /><br />
                头部平台的真人倾听师虽然解决了对话质量问题，但深夜高峰时段的供需错配是结构性的——你不知道凌晨一点用户会不会崩溃，但你知道你雇不了那么多值夜班的人。
                <br /><br />
                <span className="text-warm font-semibold">这两个方案都没有真正解决「凌晨一点、即时可得、对话质量可控」这个三角。</span>
              </p>
            </div>
          </section>
        </div>
      ),
    },
    // Page 3: 思考二 — 如何让 AI 像咨询师一样对话？
    {
      question: "思考二",
      content: "",
      visual: (
        <div className="space-y-6">
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-warm shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">如何让 AI 像咨询师一样对话？</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-3">
              我的方案：用一个四阶段状态机来强制执行对话节奏。设计依据来自《心理咨询与心理治疗》——真正的咨询不是随便聊天，它有固定的阶段结构。我把这个结构变成了代码。
            </p>

            {/* 四阶段卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {[
                {
                  stage: "S0 承接",
                  action: "情感反映 + 正常化",
                  example: "「被当众否定之后那种僵住的感觉，任何人都会有。你不需要为此责备自己。」",
                },
                {
                  stage: "S1 展开",
                  action: "识别自动思维 + 信息反馈",
                  example: "「在被否定的那一瞬间，你脑子里闪过什么念头？哪怕只是一瞬间。」",
                },
                {
                  stage: "S2 重构",
                  action: "温和对峙 + 替代视角",
                  example: "「你说你不在乎，但你又反复想起这件事——这两件事好像不太一致？」",
                },
                {
                  stage: "S3 收束",
                  action: "共同总结 + 锚定带走",
                  example: "「你刚才说的一句话特别好——这不是我的错，是那个情况本身就不公平。把这句话带走吧。」",
                },
              ].map((s) => (
                <div key={s.stage} className="rounded-lg border border-warm/20 bg-warm/[0.04] p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-warm">{s.stage}</span>
                    <span className="text-[10px] text-text-muted">{s.action}</span>
                  </div>
                  <p className="text-[10px] text-text-secondary leading-relaxed italic">
                    {s.example}
                  </p>
                </div>
              ))}
            </div>

            {/* 视频 */}
            <div className="rounded-xl overflow-hidden border border-warm/20 max-w-[320px] mx-auto mb-3">
              <video
                src="/anxin-full-demo.mp4"
                controls
                preload="metadata"
                className="w-full h-auto block"
                poster="/anxin-demo-cover.png"
              />
            </div>

            {/* 我放弃了什么 */}
            <div className="rounded-lg bg-warm/5 border border-warm/10 p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-warm">我放弃了什么</span>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed">
                状态机方案的最大代价是早期迭代速度。用 prompt 方案半天能验证一个对话策略，状态机需要改代码、测回归、重新部署。但我的判断是：心理咨询的体验容错率极低，一次糟糕的 AI 回复就能让用户永久离开。前期的架构投入是值得的——用工程约束保证对话质量，而不是祈祷 prompt 不偏离。
              </p>
            </div>
          </section>
        </div>
      ),
    },
    // Page 4: 思考三 & 反思
    {
      question: "思考三 & 反思",
      content: "",
      visual: (
        <div className="space-y-6">
          {/* 思考三：怎么商业化？ */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-warm shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text">如何让这件事可持续？</span>
            </div>
            <p className="text-[10px] text-text-muted leading-relaxed mb-3">
              心理健康产品有一个伦理难点：在用户情绪最脆弱的时候收钱，会摧毁信任。所以「倾诉」本身不能收费——这是信任的锚点。
            </p>

            <div className="rounded-lg bg-warm/5 border border-warm/10 p-3 mb-3">
              <p className="text-[10px] text-text-secondary leading-relaxed text-center mb-2">
                核心判断：从「陪我聊」到「让我练」。不为情绪收费，为成长收费。关注心理健康应该是一种生活方式。
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "倾诉 · 每天3次免费", desc: "信任入口，深夜高峰不限次" },
                  { label: "健身包 · ¥29.9/包", desc: "第一练免费，按需购买不订阅" },
                  { label: "测评 · 免费基础版", desc: "引导对应主题健身包" },
                ].map((tier) => (
                  <div key={tier.label} className="rounded bg-[rgba(255,255,255,0.02)] p-2.5 text-center">
                    <div className="text-[10px] font-semibold text-warm mb-1">{tier.label}</div>
                    <div className="text-[10px] text-text-muted leading-relaxed">{tier.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-warm/5 border border-warm/10 p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-warm">我放弃了什么</span>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed">
                放弃了订阅制（至少现阶段）。用户是来解决一个具体议题（比如「职场委屈」），5 次练习完成后这段旅程结束，下次遇到新议题再回来。订阅制反而会制造「我又被扣费了」的焦虑。定价锚点也放弃了对标心理咨询（¥200-800），改为一杯奶茶（¥25）vs 一次结构化训练（¥29.9）。
              </p>
            </div>
          </section>

          {/* 反思 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-4 rounded-full bg-[rgba(255,255,255,0.2)] shrink-0" />
              <span className="text-sm font-bold tracking-[0.1em] text-text-muted">反思</span>
            </div>

            <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4 glass-hover space-y-4">
              {/* 已验证的 */}
              <div>
                <div className="text-[10px] font-semibold text-text mb-2">已验证的技术可行性</div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  跑通了安全检测 → 状态机 → Prompt 组装 → 输出校验的完整链路。状态机确实能约束 LLM 的对话节奏，安全审核层独立于大模型的架构决策在 Benchmark 中被验证。
                </p>
              </div>

              {/* 还没做的 */}
              <div>
                <div className="text-[10px] font-semibold text-text mb-2">还没做的</div>
                <div className="space-y-1.5">
                  {[
                    { item: "真实用户测试", reason: "原型阶段，priority 是展示产品思维而非获取 DAU" },
                    { item: "支付接入", reason: "转化率测算应在用户验证通过之后" },
                    { item: "语音对话", reason: "MVP 先用文字验证状态机逻辑，语音是体验优化而非核心假设" },
                  ].map((item) => (
                    <div key={item.item} className="flex items-start gap-2">
                      <span className="text-[10px] text-warm shrink-0 mt-0.5">—</span>
                      <span className="text-[10px] text-text-muted leading-relaxed">
                        <span className="text-text">{item.item}</span>：{item.reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 如果重来 */}
              <div>
                <div className="text-[10px] font-semibold text-text mb-2">如果重来</div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  会在产品早期就找 5-10 个目标用户做深度访谈验证付费意愿，而不是先搭产品框架。但话说回来——如果不先搭出状态机原型，可能也说不清楚这个产品到底是什么。如果再来一次，我会同时做：用一个周末搭最简原型，下周就拿去给 5 个人看，根据反馈决定要不要投入状态机架构。
                </p>
              </div>
            </div>
          </section>
        </div>
      ),
    },
  ] as const,
};

export default function ProjectsPage() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "尼日扫码支付", project: nigeriaProject, color: "cyan" as const },
    { label: "语音播报", project: alarmProject, color: "purple" as const },
    { label: "安心 · AI 心理产品", project: anxinProject, color: "warm" as const, badge: "自研中" },
  ];

  const activeColor = tabs[activeTab].color;

  const tabStyles = {
    cyan: {
      active: "text-cyan bg-cyan/10 border-cyan/30",
      bar: "bg-cyan",
    },
    purple: {
      active: "text-purple bg-purple/10 border-purple/30",
      bar: "bg-purple",
    },
    warm: {
      active: "text-warm bg-warm/10 border-warm/30",
      bar: "bg-warm",
    },
  };

  return (
    <>
      <NavBar />
      <main className="flex-1 pt-24">
        <section className="mx-auto max-w-5xl px-6 pb-24">
          {/* Tab bar */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-1 gap-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`text-xs font-semibold tracking-wider px-5 py-2.5 rounded-md transition-all cursor-pointer ${
                    i === activeTab
                      ? `${tabStyles[tab.color].active} border`
                      : "text-text-muted border border-transparent hover:text-text-secondary"
                  }`}
                >
                  {tab.label}
                  {"badge" in tab && (
                    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-warm/15 text-warm">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Color accent bar */}
          <div className={`h-0.5 rounded-full mb-6 ${tabStyles[activeColor].bar} w-16 mx-auto opacity-60`} />

          {/* Active project */}
          <ProjectCase {...tabs[activeTab].project} />
        </section>
        <Footer />
      </main>
    </>
  );
}
