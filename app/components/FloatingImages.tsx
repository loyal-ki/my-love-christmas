"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type FloatingImagesProps = {
  count?: number;
  speed?: number;
  amplitude?: number;
};

const IMAGE_POOL = [
  "/floating/floating-1.png",
  "/floating/floating-2.png",
  "/floating/floating-3.png",
  "/floating/floating-4.png",
  "/floating/floating-5.png",
];

type FloatingItem = {
  id: number;
  src: string;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  rotate: number;
};

function generateItems(count: number, speed: number): FloatingItem[] {
  const rand = () => Math.random();

  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    src: IMAGE_POOL[i % IMAGE_POOL.length],
    size: 40 + rand() * 60,
    top: `${rand() * 90}%`,
    left: `${rand() * 90}%`,
    duration: (8 + rand() * 8) * speed,
    delay: rand() * 2,
    rotate: -5 + rand() * 10,
  }));
}

export default function FloatingImages({
  count = 10,
  speed = 0.45,
  amplitude = 35,
}: FloatingImagesProps) {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    setItems(generateItems(count, speed));
  }, [count, speed]);

  if (items.length === 0) return null;

  return (
    <div className="floating-layer">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="floating-item"
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
          }}
          animate={{
            y: [0, -amplitude, 0],
            rotate: [item.rotate, -item.rotate],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <Image
            src={item.src}
            alt="floating decoration"
            fill
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
