"use client";

export default function ResultMetrics() {
  return (
    <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4">

      {/* Main metrics grid */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {/* 识别准确率 */}
        <div className="rounded-lg border border-cyan/20 bg-cyan/[0.04] p-3 text-center">
          <div className="text-[10px] text-text-muted mb-1">识别准确率</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-sm font-bold text-[#64748b] line-through">45%</span>
            <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
              <path d="M3 8h10M11 4l4 4-4 4" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" fill="none" />
            </svg>
            <span className="text-xl font-black text-cyan">90%</span>
          </div>
        </div>

        {/* 单张耗时 */}
        <div className="rounded-lg border border-cyan/20 bg-cyan/[0.04] p-3 text-center">
          <div className="text-[10px] text-text-muted mb-1">单张识别耗时</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-xl font-black text-cyan">&lt;1.5</span>
            <span className="text-xs text-text-secondary">s</span>
          </div>
        </div>

        {/* 功能渗透率 */}
        <div className="rounded-lg border border-cyan/20 bg-cyan/[0.04] p-3 text-center">
          <div className="text-[10px] text-text-muted mb-1">功能渗透率</div>
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-xl font-black text-cyan">5.3%</span>
          </div>
          <div className="text-[10px] text-text-muted mt-0.5">目标 5%</div>
        </div>
      </div>

      {/* Core selling point */}
      <div className="rounded-md bg-cyan/5 border border-cyan/10 p-3 flex items-center justify-center gap-2">
        <span className="text-lg font-black text-cyan">2</span>
        <span className="text-[10px] text-text-secondary">条产品线核心卖点</span>
      </div>
    </div>
  );
}
