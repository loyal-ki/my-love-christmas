"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const COUNTDOWN = ["Closer", "With You", "Forever"];

export default function ExplodingTypewriter({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < COUNTDOWN.length) {
      const t = setTimeout(() => setIndex((i) => i + 1), 1800);
      return () => clearTimeout(t);
    } else {
      onComplete?.();
    }
  }, [index, onComplete]);

  if (index >= COUNTDOWN.length) return null;

  const text = COUNTDOWN[index];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 300,
          letterSpacing: 4,
          pointerEvents: "none",
          fontFamily: "var(--font-pacifico)",
        }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: Math.random() * -80 - 20,
              x: Math.random() * 80 - 40,
              rotate: Math.random() * 40 - 20,
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
