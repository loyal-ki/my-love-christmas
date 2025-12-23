"use client";

import { useEffect, useState } from "react";
import { useSnow } from "../components/SnowProvider";
import NeumorphismCard from "../components/NeumorphismCard";
import PageTransition from "../components/PageTransition";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import FloatingImages from "../components/FloatingImages";
import ChaosFloatingImages from "../components/ChaosFloatingImages";

const ROUTES: Record<string, string> = {
  winter: "/winter",
  words: "/words",
  memories: "/memories",
  together: "/together",
};

export function HomePage() {
  const { setMode } = useSnow();
  const router = useRouter();

  const [active, setActive] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setActive(id);

    setTimeout(() => {
      router.push(ROUTES[id]);
    }, 1000);
  };

  useEffect(() => {
    setMode("calm");
  }, [setMode]);

  return (
    <PageTransition>
      <main className="home-root">
        <div className="home-content">
          <FloatingImages />
          <ChaosFloatingImages />

          <AnimatePresence>
            {!active && (
              <motion.div
                className="neo-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NeumorphismCard
                  id="words"
                  icon="/icons/heart.png"
                  title="Những tâm từ"
                  onSelect={handleSelect}
                />
                <NeumorphismCard
                  id="memories"
                  icon="/icons/memory.png"
                  title="Khoảnh khắc"
                  onSelect={handleSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {active && (
              <motion.div
                layoutId={`card-${active}`}
                className="card-expand"
                initial={{
                  scale: 1,
                  opacity: 0.4,
                }}
                animate={{ scale: 16, opacity: 0, filter: "blur(4px)" }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </PageTransition>
  );
}
