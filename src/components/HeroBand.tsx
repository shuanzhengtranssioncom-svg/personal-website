"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useLang } from "@/lib/i18n";
import BlurText from "@/components/BlurText";
import Particles from "@/components/Particles";
export default function HeroBand() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Contact row
      gsap.fromTo(
        ".hero-contact",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
          ease: "power3.out",
        }
      );

      // 3. CTA
      gsap.fromTo(
        ".hero-cta",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.6,
          ease: "power3.out",
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-[90vh] items-center justify-center px-6 pt-14 overflow-hidden"
    >
      {/* Particles background — full hero */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={300}
          particleSpread={15}
          speed={0.1}
          particleColors={["#ffffff"]}
          moveParticlesOnHover
          particleHoverFactor={1}
          alphaParticles={false}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-1 w-full max-w-3xl mx-auto">
        {/* Text content */}
        <div className="flex flex-col items-center text-center">
          <BlurText
            text={`郑爽 · ${t.hero.title}`}
            delay={150}
            animateBy="words"
            direction="top"
            className="hero-sub text-2xl lg:text-3xl font-medium tracking-[0.04em] text-text/90 mb-4"
          />

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

      </div>
    </section>
  );
}
