"use client";

import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

type Item = {
  id: number;
  src: string;
  title: string;
};

const items: Item[] = [
  {
    id: 1,
    src: "https://w7.pngwing.com/pngs/49/608/png-transparent-characters-communication-example-green-hands-request-completed-shaking.png",
    title: "That winter night",
  },
  {
    id: 2,
    src: "https://w7.pngwing.com/pngs/267/386/png-transparent-blue-characters-communication-example-hands-request-completed-shaking-thumbnail.png",
    title: "Snow was falling softly",
  },
  {
    id: 3,
    src: "https://w7.pngwing.com/pngs/433/122/png-transparent-manual-handling-of-loads-patient-safety-health-care-hospital-others-miscellaneous-hand-handle.png",
    title: "Just you and me",
  },
];

function ParallaxItem({ item }: { item: Item }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yImage = useParallax(scrollYProgress, 120);
  const yText = useParallax(scrollYProgress, 240);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  return (
    <section ref={ref} className="parallax-section">
      <motion.img
        src={item.src}
        alt=""
        className="parallax-image"
        style={{ y: yImage }}
      />

      <motion.h2
        className="parallax-index font-pacifico"
        style={{ y: yText, opacity }}
      >
        {item.title}
      </motion.h2>
    </section>
  );
}

export default function RomanticParallax({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLElement>;
}) {
  // 🔥 THEO DÕI ĐÚNG SCROLL CONTAINER
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  const [currentIndex, setCurrentIndex] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const i = Math.round(latest * (items.length - 1)) + 1;
    setCurrentIndex(i);
  });

  return (
    <>
      <div
        className="parallax-root"
        style={{ height: `${items.length * 100}vh` }}
      >
        {items.map((item) => (
          <section key={item.id} className="parallax-section">
            <motion.img src={item.src} alt="" className="parallax-image" />
            <motion.h2 className="parallax-index font-pacifico">
              {item.title}
            </motion.h2>
          </section>
        ))}
      </div>

      {/* PROGRESS */}
      <div className="mini-progress">
        <span className="mini-progress-text">
          #{String(currentIndex).padStart(3, "0")}
        </span>

        <div className="mini-progress-bar">
          <motion.div className="mini-progress-fill" style={{ scaleX }} />
        </div>
      </div>
    </>
  );
}
