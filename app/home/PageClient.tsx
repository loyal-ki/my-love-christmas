"use client";

import { useEffect, useState } from "react";
import { useSnow } from "../components/SnowProvider";
import NeumorphismCard from "../components/NeumorphismCard";
import PageTransition from "../components/PageTransition";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import FloatingImages from "../components/FloatingImages";
import ChaosFloatingImages from "../components/ChaosFloatingImages";
import { BetterHeartSVG, BetterHeartSmallSVG } from "../components/BetterHeart";

const ROUTES: Record<string, string> = {
  words: "/words",
  memories: "/memories",
  quiz: "/quiz",
};

export function HomePage() {
  const { setMode } = useSnow();
  const router = useRouter();

  const [active, setActive] = useState<string | null>(null);
  const [showHeart, setShowHeart] = useState(false);
  const [confettiSeed, setConfettiSeed] = useState(0);

  useEffect(() => {
    setMode("calm");
  }, [setMode]);

  const handleSelect = (id: string) => {
    setActive(id);
    setTimeout(() => {
      router.push(ROUTES[id]);
    }, 900);
  };

  const handleHeartClick = () => {
    setShowHeart(true);
    setConfettiSeed((s) => s + 1);

    setTimeout(() => {
      setShowHeart(false);
    }, 1400);
  };

  return (
    <PageTransition>
      <main className="home-root" style={{ position: "relative" }}>
        <div className="home-content" style={{ position: "relative" }}>
          <FloatingImages />
          <ChaosFloatingImages />

          {/* ================= MENU ================= */}
          <AnimatePresence>
            {!active && (
              <motion.div
                className="neo-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 28,
                }}
              >
                <NeumorphismCard
                  id="words"
                  icon="/icons/heart.png"
                  title="Những tâm tư dành cho em"
                  onSelect={() => handleSelect("words")}
                />

                <NeumorphismCard
                  id="memories"
                  icon="/icons/memory.png"
                  title="Khoảnh khắc"
                  onSelect={() => handleSelect("memories")}
                />

                <NeumorphismCard
                  id="quiz"
                  icon="/icons/quiz.png"
                  title="Làm tý câu hỏi nha"
                  onSelect={() => handleSelect("quiz")}
                />

                <NeumorphismCard
                  id="heart"
                  icon="/icons/heart.png"
                  title="Bấm nhẹ nhẹ nha, nó lag web á!"
                  onSelect={handleHeartClick}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= CARD EXPAND TRANSITION ================= */}
          <AnimatePresence>
            {active && (
              <motion.div
                layoutId={`card-${active}`}
                className="card-expand"
                initial={{ scale: 1, opacity: 0.35 }}
                animate={{ scale: 14, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 3.6, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ================= BIG HEART POP ================= */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              key={`heart-${confettiSeed}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 9999,
              }}
            >
              <motion.div
                layoutId="heart-quiz"
                initial={{ scale: 0.22, rotate: -12 }}
                animate={{
                  scale: [0.22, 1.55, 1.15, 0.05],
                  rotate: [-12, 0, 6, 18],
                  opacity: [1, 1, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.45, 0.78, 1],
                  ease: "easeOut",
                }}
                style={{
                  width: 220,
                  height: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transformOrigin: "center",
                }}
              >
                <BetterHeartSmallSVG />
              </motion.div>

              <Confetti seed={confettiSeed} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
}

/* ================= CONFETTI ================= */
function Confetti({ seed }: { seed: number }) {
  const pieces = 18;
  const colors = ["#ff6b6b", "#ffd93d", "#6be5b6", "#74a8ff"];

  return (
    <>
      {Array.from({ length: pieces }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const rotate = Math.random() * 360;
        const size = 6 + Math.random() * 12;

        return (
          <motion.div
            key={`${seed}-${i}`}
            initial={{ opacity: 0, y: -30, rotate }}
            animate={{
              opacity: 1,
              y: 420 + Math.random() * 120,
              rotate: rotate + 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              delay,
              duration: 1.6 + Math.random() * 0.6,
              ease: "easeOut",
            }}
            style={{
              position: "fixed",
              left: `${left}%`,
              top: -20 - Math.random() * 40,
              width: size,
              height: size * 1.3,
              background: colors[(i + seed) % colors.length],
              borderRadius: 3,
              zIndex: 9998,
            }}
          />
        );
      })}
    </>
  );
}
