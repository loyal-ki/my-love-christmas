"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import PageTransition from "../components/PageTransition";
import { useState } from "react";
import Lightbox from "../components/WinterLightbox";

const images = [
  "/memories/1.jpg",
  "/memories/2.jpg",
  "/memories/3.jpg",
  "/memories/4.jpg",
  "/memories/5.jpg",
  "/memories/6.jpg",
  "/memories/7.jpg",
  "/memories/8.jpg",
  "/memories/9.jpg",
  "/memories/10.jpg",
  "/memories/11.jpg",
  "/memories/12.jpg",
  "/memories/13.jpg",
  "/memories/14.jpg",
  "/memories/15.jpg",
  "/memories/16.jpg",
  "/memories/17.jpg",
  "/memories/18.jpg",
  "/memories/19.jpg",
  "/memories/20.jpg",
  "/memories/21.jpg",
  "/memories/22.jpg",
  "/memories/23.jpg",
  "/memories/24.jpg",
  "/memories/25.jpg",
  "/memories/26.jpg",
  "/memories/27.jpg",
  "/memories/28.jpg",
  "/memories/29.jpg",
  "/memories/30.jpg",
  "/memories/31.jpg",
  "/memories/32.jpg",
  "/memories/33.jpg",
  "/memories/34.jpg",
  "/memories/35.jpg",
  "/memories/36.jpg",
  "/memories/37.jpg",
  "/memories/38.jpg",
  "/memories/39.jpg",
  "/memories/40.jpg",
  "/memories/41.jpg",
  "/memories/42.jpg",
  "/memories/43.jpg",
];

export default function MemoriesPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <PageTransition>
      <section className="memories-root">
        <div className="memories-scroll">
          <motion.div
            className="memories-grid"
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.18 },
              },
            }}
          >
            {images.map((src) => (
              <motion.div
                key={src}
                className="memories-item"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                onClick={() => setActiveImage(src)}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="memories-image"
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {activeImage && (
              <Lightbox
                src={activeImage}
                onClose={() => setActiveImage(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
