"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectPage {
  question: string;
  content: string;
  visual?: ReactNode;
}

interface ProjectCaseProps {
  title: string;
  summary: string;
  pages: readonly ProjectPage[];
  tag?: string;
  tagColor?: "cyan" | "purple" | "warm";
  highlights?: readonly string[];
  period?: string;
}

const tagColors = {
  cyan: "bg-cyan/15 text-cyan",
  purple: "bg-purple/15 text-purple",
  warm: "bg-warm/15 text-warm",
};

const dotColors = {
  cyan: "bg-cyan",
  purple: "bg-purple",
  warm: "bg-warm",
};

export default function ProjectCase({
  title,
  summary,
  pages,
  tag,
  tagColor = "cyan",
  highlights,
  period,
}: ProjectCaseProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goNext = () => {
    if (page < pages.length - 1) {
      setDirection(1);
      setPage(page + 1);
    }
  };

  const goPrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage(page - 1);
    }
  };

  const goTo = (i: number) => {
    setDirection(i > page ? 1 : -1);
    setPage(i);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] overflow-hidden glass-hover">
      {/* Header */}
      {(tag || title || summary || (highlights && highlights.length > 0)) && (
        <div className="px-6 pt-4 pb-3 border-b border-[rgba(255,255,255,0.04)]">
          {tag && (
            <span
              className={`inline-block text-xs font-semibold tracking-wider mb-2 px-2 py-0.5 rounded ${tagColors[tagColor]}`}
            >
              {tag}
            </span>
          )}
          {title && (
            <h3 className="text-lg font-bold mb-1.5">
              {title}
              {period && (
                <span className="text-xs font-normal text-text-muted ml-3">{period}</span>
              )}
            </h3>
          )}
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{summary}</p>
          {highlights && highlights.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {highlights.map((h, i) => (
                <div key={h} className="flex items-center gap-2">
                  {i > 0 && (
                    <svg width="12" height="12" viewBox="0 0 16 16" className="shrink-0">
                      <path d="M6 3l5 5-5 5" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" fill="none" />
                    </svg>
                  )}
                  <span className="text-[11px] font-semibold tracking-wide text-purple bg-purple/10 px-2 py-1 rounded-md border border-purple/20">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Top navigation */}
      <div className="px-6 pt-2 flex items-center justify-end gap-1">
        <button
          onClick={goPrev}
          disabled={page === 0}
          className="p-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] hover:border-cyan/30 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" className="stroke-text-secondary" />
          </svg>
        </button>
        <button
          onClick={goNext}
          disabled={page === pages.length - 1}
          className="p-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] hover:border-cyan/30 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" className="stroke-text-secondary" />
          </svg>
        </button>
      </div>

      {/* Page content */}
      <div className="px-6 pt-1 pb-4 min-h-[280px] relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {pages[page].content}
            </div>
            {pages[page].visual && (
              <div className="mt-3">{pages[page].visual}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-4 flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={page === 0}
          className="p-2 rounded-lg border border-[rgba(255,255,255,0.1)] hover:border-cyan/30 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" className="stroke-text-secondary" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === page
                  ? `w-5 h-2 ${dotColors[tagColor]}`
                  : "w-2 h-2 bg-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.25)]"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={page === pages.length - 1}
          className="p-2 rounded-lg border border-[rgba(255,255,255,0.1)] hover:border-cyan/30 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" className="stroke-text-secondary" />
          </svg>
        </button>
      </div>
    </div>
  );
}
