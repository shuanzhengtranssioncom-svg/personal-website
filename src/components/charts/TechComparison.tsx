"use client";

export default function TechComparison() {
  return (
    <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4">
      <div className="text-xs font-semibold tracking-[0.2em] text-text-secondary mb-3 text-center">技术方案选型（协同算法团队）</div>

      {/* Two options side by side */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Option 1 */}
        <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)] p-3">
          <div className="text-[11px] font-semibold text-text-muted mb-2">方案一 · Google ML Kit</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-lg font-black text-warm">45%</span>
            <span className="text-[10px] text-text-muted">整体准确率</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <div className="text-sm font-bold text-text-muted">78%</div>
              <div className="text-[10px] text-text-muted">打印体</div>
            </div>
            <div>
              <div className="text-sm font-bold text-warm">12%</div>
              <div className="text-[10px] text-text-muted">手写体</div>
            </div>
          </div>
          <div className="text-[10px] text-text-muted">谷歌自研，很难优化迭代</div>
        </div>

        {/* Option 2 - selected */}
        <div className="rounded-lg border border-cyan/30 bg-cyan/[0.06] p-3 relative">
          <div className="absolute -top-2 right-3 text-[9px] font-semibold text-cyan bg-[#080810] px-1.5 py-0.5 rounded">最终选择</div>
          <div className="text-[11px] font-semibold text-cyan mb-2">方案二 · 传音自研</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-lg font-black text-cyan">67%</span>
            <span className="text-[10px] text-text-muted">整体准确率</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <div className="text-sm font-bold text-text-secondary">72%</div>
              <div className="text-[10px] text-text-muted">打印体</div>
            </div>
            <div>
              <div className="text-sm font-bold text-cyan">61%</div>
              <div className="text-[10px] text-text-muted">手写体</div>
            </div>
          </div>
          <div className="text-[10px] text-text-secondary">自主迭代，不受谷歌约束</div>
        </div>
      </div>

      {/* Rationale */}
      <div className="rounded-md bg-cyan/5 border border-cyan/10 p-3 mb-3">
        <p className="text-[10px] text-text-secondary leading-relaxed">
          核心判断：传音自研整体 67% 显著优于 Google ML Kit 的 45%，且自主可控，可通过采集本地样本持续迭代优化。
        </p>
      </div>

      {/* PM-driven optimization */}
      <div className="rounded-md bg-[rgba(255,255,255,0.02)] p-3">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg font-black text-cyan shrink-0">3,000+</span>
          <span className="text-[10px] text-text-secondary leading-relaxed">
            本地样本采集，协同算法团队训练模型
          </span>
        </div>
        <p className="text-[10px] text-text-muted leading-relaxed">
          67% 的基线准确率不够，根据尼日本地数字写法特征以及不同角度/光线/背景的拍摄场景、手写体与打印体的样本配比，协同算法团队定向采集 3,000+ 样本并标注，将端侧准确率从 67% 提升至 90%+（打印体 95%，手写体 85%）。
        </p>
      </div>
    </div>
  );
}
