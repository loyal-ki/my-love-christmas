"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type ChaosItem = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotate: number;
  vr: number;
  size: number;
  src: string;
};

type Props = {
  count?: number;
};

const IMAGE_POOL = [
  "/floating/nghia.png",
  "/floating/huong.png",
];

export default function ChaosFloatingImages({ count = 4 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<ChaosItem[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();

    itemsRef.current = Array.from({ length: count }).map((_, i) => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        rotate: Math.random() * 360,
        vr: (Math.random() - 0.5) * 0.4,
        size: 40 + Math.random() * 60,
        src: IMAGE_POOL[i % IMAGE_POOL.length],
      };
    });

    let rafId: number;

    const animate = () => {
      itemsRef.current.forEach((item) => {
        item.x += item.vx;
        item.y += item.vy;
        item.rotate += item.vr;

        // bounce on edges
        if (item.x < 0 || item.x > width - item.size) item.vx *= -1;
        if (item.y < 0 || item.y > height - item.size) item.vy *= -1;
      });

      // apply transforms
      itemsRef.current.forEach((item, i) => {
        const el = container.children[i] as HTMLElement;
        if (el) {
          el.style.transform = `
            translate3d(${item.x}px, ${item.y}px, 0)
            rotate(${item.rotate}deg)
          `;
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [count]);

  return (
    <div ref={containerRef} className="chaos-layer">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="chaos-item">
          <Image
            src={IMAGE_POOL[i % IMAGE_POOL.length]}
            alt="chaos"
            width={120}
            height={120}
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </div>
  );
}
