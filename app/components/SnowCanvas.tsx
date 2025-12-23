"use client";

import { useEffect, useRef } from "react";
import { useSnow } from "./SnowProvider";

type Snow = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
};

export default function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snows = useRef<Snow[]>([]);
  const { mode } = useSnow();

  const target = useRef({
    density: 1,
    speed: 1,
  });

  useEffect(() => {
    if (mode === "storm") {
      target.current = { density: 6, speed: 4 };
    } else if (mode === "calm") {
      target.current = { density: 0.8, speed: 0.8 };
    } else {
      target.current = { density: 0.5, speed: 0.5 };
    }
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let density = 1;
    let speed = 1;

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // smooth interpolate
      density += (target.current.density - density) * 0.03;
      speed += (target.current.speed - speed) * 0.03;

      // spawn snow
      const spawn = Math.floor(2 * density);
      for (let i = 0; i < spawn; i++) {
        snows.current.push(createSnow(canvas));
      }

      for (const s of snows.current) {
        s.x += s.vx * speed;
        s.y += s.vy * speed;
        s.alpha -= 0.001;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      snows.current = snows.current.filter(
        (s) => s.alpha > 0 && s.y < canvas.height + 20
      );

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
      }}
    />
  );
}

function createSnow(canvas: HTMLCanvasElement): Snow {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    r: Math.random() * 2 + 1,
    vx: Math.random() * 0.4 - 0.2,
    vy: Math.random() * 1.6 + 0.6,
    alpha: Math.random() * 0.6 + 0.4,
  };
}
