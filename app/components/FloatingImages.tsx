"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

type FloatingImagesProps = {
  count?: number; // số lượng ảnh
  speed?: number; // hệ số tốc độ (càng nhỏ càng nhanh)
  amplitude?: number; // biên độ bay (px)
};

const IMAGE_POOL = [
  "/floating/floating-1.png",
  "/floating/floating-2.png",
  "/floating/floating-3.png",
  "/floating/floating-4.png",
  "/floating/floating-5.png",
  "/floating/floating-3.png",
  "/floating/floating-4.png",
];

export default function FloatingImages({
  count = 10,
  speed = 0.45,
  amplitude = 35,
}: FloatingImagesProps) {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const img = IMAGE_POOL[i % IMAGE_POOL.length];

      return {
        id: i,
        src: img,
        size: 40 + Math.random() * 60, // 40 → 100
        top: Math.random() * 90 + "%",
        left: Math.random() * 90 + "%",
        duration: (8 + Math.random() * 8) * speed, // nhanh/chậm
        delay: Math.random() * 2,
        rotate: -5 + Math.random() * 10,
      };
    });
  }, [count, speed]);

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
