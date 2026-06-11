"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useLang } from "@/lib/i18n";

export default function HeroBand() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Character stagger reveal
      gsap.fromTo(
        ".hero-char",
        { y: 40, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: "back.out(1.4)",
        }
      );

      // 2. Subtitle
      gsap.fromTo(
        ".hero-sub",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.6,
          ease: "power3.out",
        }
      );

      // 3. Contact row
      gsap.fromTo(
        ".hero-contact",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.8,
          ease: "power3.out",
        }
      );

      // 4. CTA
      gsap.fromTo(
        ".hero-cta",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 1.0,
          ease: "power3.out",
        }
      );

      // 5. Photos stagger reveal
      gsap.fromTo(
        ".hero-photo",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.4,
          ease: "power3.out",
        }
      );

      // 6. Background pulse
      gsap.to(bgRef.current, {
        scale: 1.08,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [t]);

  const belief = t.hero.belief;
  const chars = belief.split("").map((char, i) => (
    <span
      key={i}
      className="hero-char inline-block"
      style={{ willChange: "transform, opacity" }}
    >
      {char === " " ? " " : char}
    </span>
  ));

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-[90vh] items-center justify-center px-6 pt-14 overflow-hidden"
    >
      {/* Animated background glow — mesh gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none mesh-bg"
      />
      <div className="absolute top-[-100px] left-1/2 w-[500px] h-[500px] -translate-x-1/2 pointer-events-none bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,transparent_70%)] blur-[80px]" />

      <div className="relative w-full max-w-4xl flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        {/* Left: Text content — 2/3 */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-[clamp(32px,6vw,56px)] font-black tracking-[0.06em] mb-6 leading-tight">
            <span className="bg-gradient-to-br from-text via-purple-300 to-purple inline-block text-transparent bg-clip-text">
              {chars}
            </span>
          </h1>

          <p className="hero-sub text-xl lg:text-2xl font-medium tracking-[0.04em] text-text/90 mb-4">
            郑爽
            <span className="ml-1.5">· {t.hero.title}</span>
          </p>

          {/* Contact row */}
          <div className="hero-contact flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5 mb-8 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-text-muted">
                <path d="M8 0C5.2 0 3 2.2 3 5c0 3.5 5 11 5 11s5-7.5 5-11c0-2.8-2.2-5-5-5zm0 7.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              重庆
            </span>
            <span className="w-px h-3 bg-[rgba(255,255,255,0.1)]" />
            <a href="mailto:1664154699@qq.com" className="inline-flex items-center gap-1.5 hover:text-cyan transition-colors">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-text-muted">
                <path d="M0 3a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V3zm2 0l6 4 6-4H2zm0 10h12V5l-6 4-6-4v8z" />
              </svg>
              1664154699@qq.com
            </a>
            <span className="w-px h-3 bg-[rgba(255,255,255,0.1)]" />
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-text-muted">
                <path d="M3.5 1a1 1 0 00-1 1v12a1 1 0 001 1h9a1 1 0 001-1V2a1 1 0 00-1-1h-9zm0 1h9v10h-9V2zm4 11a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              </svg>
              17264385420
            </span>
          </div>

          {/* CTA */}
          <div className="hero-cta">
            <button
              onClick={() =>
                document.getElementById("growth")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-5 py-2 text-sm font-medium rounded-lg bg-cyan/15 text-cyan hover:bg-cyan/25 transition-colors cursor-pointer"
            >
              {t.hero.cta}
            </button>
          </div>
        </div>

        {/* Right: Photos — 1/3 */}
        <div className="hidden lg:flex flex-col gap-3 w-[280px] shrink-0">
          <div className="hero-photo relative aspect-[4/3] rounded-xl overflow-hidden border border-cyan/15 shadow-[0_0_30px_rgba(6,182,212,0.08)]">
            <img
              src="/hike-20km.jpg"
              alt="徒步20km — 周末在山上"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-6">
              <span className="text-[11px] text-white/80 font-medium">徒步 20km</span>
            </div>
          </div>
          <div className="hero-photo relative aspect-[4/3] rounded-xl overflow-hidden border border-cyan/15 shadow-[0_0_30px_rgba(6,182,212,0.08)]">
            <img
              src="/climb.jpeg"
              alt="登山 — 海拔1000m"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-6">
              <span className="text-[11px] text-white/80 font-medium">海拔 1000m</span>
            </div>
          </div>
        </div>

        {/* Mobile: photos below text */}
        <div className="flex lg:hidden flex-row gap-2 w-full max-w-xs">
          <div className="hero-photo relative flex-1 aspect-[4/3] rounded-xl overflow-hidden border border-cyan/15 shadow-[0_0_20px_rgba(6,182,212,0.06)]">
            <img
              src="/hike-20km.jpg"
              alt="徒步20km"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-4">
              <span className="text-[10px] text-white/80 font-medium">徒步 20km</span>
            </div>
          </div>
          <div className="hero-photo relative flex-1 aspect-[4/3] rounded-xl overflow-hidden border border-cyan/15 shadow-[0_0_20px_rgba(6,182,212,0.06)]">
            <img
              src="/climb.jpeg"
              alt="登山"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-4">
              <span className="text-[10px] text-white/80 font-medium">海拔 1000m</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
