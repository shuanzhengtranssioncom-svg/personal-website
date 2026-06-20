"use client";

import { useRef } from "react";
import { animate, stagger } from "motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "chars";
  direction?: "top" | "bottom" | "left" | "right";
  onAnimationComplete?: () => void;
  className?: string;
}

const directionOffset = {
  top: { y: -30, x: 0 },
  bottom: { y: 30, x: 0 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
};

export default function BlurText({
  text,
  delay = 200,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
}: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    containerRef.current = el;

    const items = el.querySelectorAll<HTMLElement>(".blur-item");
    const offset = directionOffset[direction];

    animate(
      items,
      { filter: ["blur(12px)", "blur(0px)"], opacity: [0, 1], x: [offset.x, 0], y: [offset.y, 0] },
      { delay: stagger(delay / 1000), duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    ).finished.then(() => {
      onAnimationComplete?.();
    });
  };

  const items =
    animateBy === "chars"
      ? text.split("").map((char, i) =>
          char === " " ? (
            <span key={i} className="blur-item inline-block" style={{ width: "0.3em" }}>{" "}</span>
          ) : (
            <span key={i} className="blur-item inline-block">{char}</span>
          )
        )
      : text.split(" ").map((word, i) => (
          <span key={i} className="blur-item inline-block" style={{ marginRight: "0.3em" }}>
            {word}
          </span>
        ));

  return (
    <div ref={handleRef} className={className}>
      {items}
    </div>
  );
}
