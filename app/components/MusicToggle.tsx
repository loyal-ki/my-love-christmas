"use client";

import { useMusic } from "./GlobalMusic";
import { motion } from "framer-motion";

export default function MusicToggle() {
  const { muted, toggle } = useMusic();

  return (
    <motion.button
      onClick={toggle}
      className={`music-toggle ${muted ? "off" : "on"}`}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      animate={
        muted
          ? {}
          : {
              scale: [1, 1.08, 1],
            }
      }
      transition={
        muted
          ? { duration: 0.2 }
          : {
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      aria-label="Toggle music"
    >
      <span className="icon">{muted ? "🔇" : "🎵"}</span>
      {!muted && <span className="ring" />}
    </motion.button>
  );
}
