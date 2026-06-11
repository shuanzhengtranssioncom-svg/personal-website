"use client";

export default function SolutionFlow() {
  const steps = [
    { label: "扫码", sub: "识别商户码" },
    { label: "AI OCR", sub: "提取10位账号" },
    { label: "自动填充", sub: "跳转支付APP" },
    { label: "快捷支付", sub: "一键确认" },
  ];

  return (
    <div className="rounded-lg border border-cyan/20 bg-cyan/[0.04] p-4">
      <div className="flex items-center justify-between gap-1">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1">
            <div className="flex flex-col items-center text-center shrink-0">
              <div className="w-14 h-14 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-1.5">
                <span className="text-xs font-bold text-cyan">{step.label}</span>
              </div>
              <span className="text-[10px] text-text-muted">{step.sub}</span>
            </div>
            {i < steps.length - 1 && (
              <svg width="24" height="14" viewBox="0 0 24 14" className="shrink-0 -mt-4">
                <path d="M2 7h18" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
                <polygon points="18,3 22,7 18,11" fill="rgba(6,182,212,0.3)" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
