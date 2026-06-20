"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const elements = el.querySelectorAll<HTMLElement>(".split-item");

      gsap.fromTo(elements, from, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start: `top bottom+=${rootMargin}`,
          toggleActions: "play none none none",
        },
        onComplete: () => {
          onLetterAnimationComplete?.();
        },
      });
    },
    { scope: containerRef }
  );

  const items =
    splitType === "chars"
      ? text.split("").map((char, i) =>
          char === " " ? (
            <span key={i} className="split-item inline-block" style={{ width: "0.3em" }}>
              &nbsp;
            </span>
          ) : (
            <span
              key={i}
              className="split-item inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          )
        )
      : splitType === "words"
        ? text.split(" ").map((word, i) => (
            <span key={i} className="split-item inline-block" style={{ willChange: "transform, opacity", marginRight: "0.3em" }}>
              {word}
            </span>
          ))
        : text.split("\n").map((line, i) => (
            <div key={i} className="split-item block" style={{ willChange: "transform, opacity" }}>
              {line}
            </div>
          ));

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign }}
    >
      {items}
    </div>
  );
}
