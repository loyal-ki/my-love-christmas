"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Stage = 0 | 1 | 2;
// 0 = closed (small)
// 1 = centered, front only
// 2 = open (inside)

export default function ChristmasCard({
  closed,
  onOpen,
  onClose,
  text,
  path,
  small,
  title,
}: {
  closed?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  text: string;
  path: string;
  small: string;
  title: string;
}) {
  const [stage, setStage] = useState<Stage>(0);

  // 🔊 audio refs
  const openSound = useRef<HTMLAudioElement | null>(null);
  const closeSound = useRef<HTMLAudioElement | null>(null);

  const chars = text.split("");
  const [visibleCount, setVisibleCount] = useState(0);
  const typingIntervalRef = useRef<number | null>(null);

  // refs to each character span to measure position
  const charRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const insideTextRef = useRef<HTMLDivElement | null>(null);

  // pen position (px from left of inside container)
  const [penLeft, setPenLeft] = useState(4); // small offset initially
  const [penTop, setPenTop] = useState(0);
  const [penVisible, setPenVisible] = useState(false);

  // preload sounds once
  useEffect(() => {
    openSound.current = new Audio("/audio/paper-open.mp3");
    closeSound.current = new Audio("/audio/paper-close.mp3");

    openSound.current.volume = 1;
    closeSound.current.volume = 1;

    return () => {
      openSound.current = null;
      closeSound.current = null;
    };
  }, []);

  // handle closed -> center logic
  useEffect(() => {
    if (!closed) {
      setStage(1); // move to centered front state
      setVisibleCount(0);
      setPenVisible(false);
      // ESC handling
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (stage === 2) {
            closeSound.current?.play().catch(() => {});
          }
          setStage(0);
          setTimeout(() => onClose?.(), 700);
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else {
      setStage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closed]);

  // start typing when stage becomes 2 (open)
  useEffect(() => {
    if (stage === 2) {
      // reset
      setVisibleCount(0);
      setPenVisible(true);

      // small delay to ensure DOM spans exist & layout stabilized
      const startTimeout = window.setTimeout(() => {
        const typingSpeed = 45; // ms per char (adjustable)
        let i = 0;

        // ensure pen initially at start pos
        requestAnimationFrame(() => updatePenPosition(0));

        typingIntervalRef.current = window.setInterval(() => {
          i += 1;
          setVisibleCount(i);
          updatePenPosition(i);

          if (i >= chars.length) {
            // done
            if (typingIntervalRef.current) {
              window.clearInterval(typingIntervalRef.current);
              typingIntervalRef.current = null;
            }
            // hide pen after short delay
            window.setTimeout(() => setPenVisible(false), 700);
          }
        }, typingSpeed);
      }, 200); // small delay before starting typing

      return () => {
        window.clearTimeout(startTimeout);
        if (typingIntervalRef.current) {
          window.clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
      };
    } else {
      // leaving open state -> cleanup
      if (typingIntervalRef.current) {
        window.clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      setPenVisible(false);
      setVisibleCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const updatePenPosition = (count: number) => {
    const container = insideTextRef.current;
    if (!container) return;

    const idx = Math.max(0, Math.min(count - 1, chars.length - 1));
    const target = charRefs.current[idx];

    if (target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const left = targetRect.right - containerRect.left + 24;
      const top = targetRect.bottom - containerRect.top - 42;
      setPenLeft(left);
      setPenTop(top);
    } else {
      // fallback to left start
      setPenLeft(8);
      setPenTop(12);
    }
  };

  // click handler on open wrapper (sequence: stage1->2->0)
  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stage === 1) {
      // click 2 -> open (start typing)
      openSound.current?.play().catch(() => {});
      setStage(2);
    } else if (stage === 2) {
      // click 3 -> close
      closeSound.current?.play().catch(() => {});
      setStage(0);
      setTimeout(() => onClose?.(), 700);
    }
  };

  /* ================= CLOSED CARD (IMAGE PREVIEW) ================= */
  if (closed) {
    return (
      <motion.div
        className="word-preview-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOpen}
        role="button"
        aria-label="Open Christmas Card"
      >
        <Image
          src={small}
          alt="Christmas card preview"
          fill
          style={{ objectFit: "cover" }}
          priority
        />

        <div className="word-preview-overlay" />

        <div className="word-preview-text">
          <h3>{title}</h3>
          <p>Nhấn để mở</p>
        </div>
      </motion.div>
    );
  }

  /* ================= OPEN VIEW ================= */
  return (
    <motion.div
      className="xmas-open-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        if (stage === 2) {
          closeSound.current?.play().catch(() => {});
        }
        setStage(0);
        setTimeout(() => onClose?.(), 700);
      }}
    >
      <motion.div
        className="xmas-open-wrapper"
        initial={{ scale: 0.86, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.86, y: 20, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleWrapperClick}
      >
        <div className="xmas-perspective">
          <div className="xmas-card-3d">
            {/* ================= INSIDE PAGE ================= */}
            <motion.div
              className="xmas-inner-back"
              initial={{ rotateY: 180 }}
              animate={stage === 2 ? { rotateY: 0 } : { rotateY: 180 }}
              transition={{
                duration: 4.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
              style={{ transformOrigin: "left center" }}
            >
              <div className="inside-content">
                <h2 className="inside-title">{title}</h2>

                <div
                  className="inside-text"
                  ref={(el) => {
                    insideTextRef.current = el;
                  }}
                >
                  {chars.map((ch, i) => {
                    const visible = i < visibleCount;
                    // newline handling: keep span for newline but render <br/>
                    if (ch === "\n") {
                      return (
                        <span
                          key={i}
                          ref={(el) => (charRefs.current[i] = el)}
                          className="char-span"
                          aria-hidden={!visible}
                        >
                          <br />
                        </span>
                      );
                    }
                    return (
                      <span
                        key={i}
                        ref={(el) => (charRefs.current[i] = el)}
                        className={`char-span ${
                          visible ? "char-visible" : "char-hidden"
                        }`}
                        aria-hidden={!visible}
                      >
                        {visible ? ch : ""}
                      </span>
                    );
                  })}

                  {/* PEN: absolute inside wrapper, animated via inline styles */}
                  {penVisible && (
                    <motion.img
                      src="/icons/pen.png"
                      alt="pen"
                      className="typing-pen"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        left: penLeft,
                        top: penTop,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      style={{ position: "absolute", pointerEvents: "none" }}
                    />
                  )}
                </div>
              </div>
            </motion.div>

            {/* ================= FRONT COVER ================= */}
            <motion.div
              className="xmas-front-cover"
              initial={{
                rotateY: 0,
                boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
              }}
              animate={
                stage === 2
                  ? {
                      rotateY: -170,
                      boxShadow: "0 60px 140px rgba(0,0,0,0.55)",
                    }
                  : {
                      rotateY: 0,
                      boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                    }
              }
              transition={{
                rotateY: {
                  duration: 2.2,
                  ease: [0.22, 1, 0.36, 1],
                },
                boxShadow: {
                  duration: 2.2,
                  ease: "easeInOut",
                },
              }}
              style={{
                transformOrigin: "left center",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={path}
                alt="Christmas Card Cover"
                fill
                priority
                style={{ objectFit: "cover" }}
              />

              <div className="card-front-overlay" />

              <div className="cover-content">
                <h3 className="cover-title">{title}</h3>
                <div className="cover-sub">
                  {stage === 1 ? "Nhấn để mở" : "Nhấn để đóng"}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
