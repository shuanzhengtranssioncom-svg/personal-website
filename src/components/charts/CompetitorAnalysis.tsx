"use client";

const competitors = [
  {
    name: "iPhone",
    features: [
      { label: "扫码识别", ok: true },
      { label: "自动填充", ok: false },
      { label: "识别准确", ok: false },
      { label: "入口显性", ok: true },
    ],
    note: "不支持自动填充，相册入口用户心智弱",
  },
  {
    name: "OPPO",
    features: [
      { label: "扫码识别", ok: true },
      { label: "自动填充", ok: false },
      { label: "识别准确", ok: false },
      { label: "入口显性", ok: true },
    ],
    note: "识别反应慢，无法自动填充到支付界面",
  },
  {
    name: "三星",
    features: [
      { label: "扫码识别", ok: true },
      { label: "自动填充", ok: false },
      { label: "识别准确", ok: false },
      { label: "入口显性", ok: true },
    ],
    note: "扫码结果无法自动跳转，识别不够敏感",
  },
];

const opportunities = [
  "将识别嵌入更显性、支付心智更强的入口",
  "打通系统与三方支付链路，实现自动填充",
  "提升识别准确率，解决用户信任问题",
];

export default function CompetitorAnalysis() {
  return (
    <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4">
      {/* Feature comparison grid */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {/* Header row */}
        <div className="text-[10px] text-text-muted py-1" />
        {competitors.map((c) => (
          <div
            key={c.name}
            className="text-[10px] font-semibold text-text-secondary text-center py-1"
          >
            {c.name}
          </div>
        ))}

        {/* Feature rows */}
        {["扫码识别", "自动填充", "识别准确", "入口显性"].map((feature) => (
          <div key={feature} className="contents">
            <div className="text-[10px] text-text-muted py-1.5 flex items-center">
              {feature}
            </div>
            {competitors.map((c) => {
              const f = c.features.find((x) => x.label === feature);
              return (
                <div key={c.name} className="flex items-center justify-center py-1.5">
                  {f?.ok ? (
                    <svg width="12" height="12" viewBox="0 0 16 16" className="fill-cyan/60">
                      <path d="M6 11.5L2.5 8 4 6.5l2 2 6-6L13.5 4z" />
                    </svg>
                  ) : (
                    <span className="text-[10px] text-warm/50">—</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Competitor notes */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {competitors.map((c) => (
          <div key={c.name} className="text-[10px] text-text-muted text-center leading-relaxed">
            {c.note}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-md bg-warm/5 border border-warm/10 p-3 mb-3">
        <p className="text-[10px] text-warm leading-relaxed text-center">
          三家均不支持自动填充、识别准确率不足。体验差距是共同的突破口。
        </p>
      </div>

      {/* Opportunities */}
      <div className="text-[10px] text-cyan font-semibold mb-2">机会点</div>
      {opportunities.map((op, i) => (
        <div key={i} className="flex items-start gap-2 mb-1.5">
          <span className="text-[10px] text-cyan shrink-0 mt-0.5">{i + 1}.</span>
          <span className="text-[10px] text-text-secondary leading-relaxed">{op}</span>
        </div>
      ))}
    </div>
  );
}
