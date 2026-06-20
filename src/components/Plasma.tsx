"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle, Vec3 } from "ogl";

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

function hexToVec3(hex: string): Vec3 {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return new Vec3(r, g, b);
}

export default function Plasma({
  color = "#B497CF",
  speed = 1,
  direction = "forward",
  scale = 1,
  opacity = 1,
  mouseInteractive = false,
}: PlasmaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const vert = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const frag = /* glsl */ `
    precision highp float;
    uniform float iTime;
    uniform vec3 iResolution;
    uniform vec3 uColor;
    uniform float uSpeed;
    uniform float uScale;
    uniform float uOpacity;
    uniform float uMouseX;
    uniform float uMouseY;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float dir = ${direction === "forward" ? "1.0" : "-1.0"};
      float t = iTime * uSpeed * dir;

      float cx = uv.x * uScale + sin(t * 0.7) * 0.3 + uMouseX * 0.1;
      float cy = uv.y * uScale + cos(t * 0.6) * 0.3 + uMouseY * 0.1;

      float v1 = sin(cx * 8.0 + t);
      float v2 = sin(cy * 6.0 + t * 1.3);
      float v3 = sin((cx + cy) * 5.0 + t * 0.8);
      float v4 = sin(sqrt(cx * cx + cy * cy) * 10.0 - t * 1.5);

      float plasma = v1 + v2 + v3 + v4 + 2.0;
      plasma /= 8.0;
      plasma = smoothstep(0.2, 0.8, plasma);

      vec3 baseColor = uColor;
      vec3 darkColor = uColor * 0.15;
      vec3 finalColor = mix(darkColor, baseColor, plasma);

      float alpha = plasma * uOpacity * 0.5;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Vec3(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uColor: { value: hexToVec3(color) },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + "px";
      gl.canvas.style.height = height + "px";
      program.uniforms.iResolution.value.set(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }
    window.addEventListener("resize", resize);
    resize();

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteractive || !container) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", handleMouseMove);

    let rafId: number;
    const update = (t: number) => {
      rafId = requestAnimationFrame(update);
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.uColor.value = hexToVec3(color);
      program.uniforms.uSpeed.value = speed;
      program.uniforms.uScale.value = scale;
      program.uniforms.uOpacity.value = opacity;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      program.uniforms.uMouseX.value = mouseX;
      program.uniforms.uMouseY.value = mouseY;

      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
