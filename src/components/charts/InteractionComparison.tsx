"use client";

export default function InteractionComparison() {
  return (
    <div className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4">
      <div className="text-xs font-semibold tracking-[0.2em] text-text-secondary mb-3 text-center">概念方案设计与用户测试</div>

      <p className="text-[10px] text-text-muted mb-3 text-center leading-relaxed">
        在写 PRD 前先做概念验证测试，设计两个方案让 15 名尼日用户测试对比
      </p>

      {/* Two options */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-lg border border-purple/20 bg-purple/[0.04] p-3">
          <div className="text-[11px] font-semibold text-purple mb-1">方案 A · 验证优先</div>
          <div className="flex items-center gap-1 text-[10px] text-text-secondary mb-2">
            <span className="text-text-muted">扫码</span>
            <span className="text-text-muted">→</span>
            <span>弹窗确认数字</span>
            <span className="text-text-muted">→</span>
            <span>选择支付APP</span>
            <span className="text-text-muted">→</span>
            <span>跳转</span>
          </div>
          <div className="text-[10px] text-text-muted italic">
            「像双重认证一样让我放心」
          </div>
        </div>

        <div className="rounded-lg border border-cyan/20 bg-cyan/[0.04] p-3">
          <div className="text-[11px] font-semibold text-cyan mb-1">方案 B · 效率优先</div>
          <div className="flex items-center gap-1 text-[10px] text-text-secondary mb-2">
            <span className="text-text-muted">扫码</span>
            <span className="text-text-muted">→</span>
            <span>直接选择支付APP</span>
            <span className="text-text-muted">→</span>
            <span>跳转</span>
          </div>
          <div className="text-[10px] text-text-muted italic">
            「快且无压力」
          </div>
        </div>
      </div>

      {/* Test result */}
      <div className="flex items-center justify-center gap-4 py-2 rounded-md bg-[rgba(255,255,255,0.02)]">
        <div className="text-center">
          <span className="text-lg font-black text-cyan">5</span>
          <span className="text-[10px] text-text-muted"> : </span>
          <span className="text-lg font-black text-purple">5</span>
        </div>
        <span className="text-[10px] text-text-muted">平手，各有优势</span>
      </div>
    </div>
  );
}
