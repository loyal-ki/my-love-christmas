"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/christmas-tree.json";
import { useSnow } from "./SnowProvider";
import SnowCanvas from "./SnowCanvas";

export default function LoadingScreen() {
  const router = useRouter();
  const { setMode } = useSnow();

  const [started, setStarted] = useState(false);

  const begin = () => {
    if (started) return;
    setStarted(true);

    setMode("storm");

    setTimeout(() => {
      router.push("/home");
    }, 2400);
  };

  return (
    <div
      className="loading-container"
      onClick={begin}
      style={{ cursor: "pointer" }}
    >
      <SnowCanvas />

      <motion.div
        className="content"
        animate={{
          opacity: started ? 0 : 1,
          scale: started ? 0.94 : 1,
          filter: started ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="font-pacifico"
          style={{ fontSize: 48, color: "#ffffff" }}
        >
          Winter, With You
        </h1>

        <motion.p
          className="font-soft"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: 14, marginTop: 8, color: "#ffffff" }}
        >
          tap to begin
        </motion.p>

        <div className="lottie-wrapper">
          <Lottie animationData={animationData} loop autoplay />
        </div>
      </motion.div>
    </div>
  );
}
