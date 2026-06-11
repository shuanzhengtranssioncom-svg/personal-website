"use client";

import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      id="contact"
      className="mx-auto max-w-3xl px-6 pb-16 pt-8 border-t border-[rgba(255,255,255,0.06)] text-center"
    >
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">{t.footer.title}</h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          {t.footer.desc}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-text-secondary mb-4">
        <a
          href="mailto:1664154699@qq.com"
          className="text-cyan hover:text-cyan-dim transition-colors"
        >
          1664154699@qq.com
        </a>
        <span className="hidden sm:inline text-text-muted">·</span>
        <span>17264385420</span>
      </div>

      <p className="text-xs text-text-muted mt-6">{t.footer.status}</p>
    </footer>
  );
}
