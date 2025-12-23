"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  id: string;
  icon: string;
  title: string;
  onSelect: (id: string) => void;
};

export default function NeumorphismCard({ id, icon, title, onSelect }: Props) {
  return (
    <motion.button
      layoutId={`card-${id}`}
      className="neo-card"
      onClick={() => onSelect(id)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="neo-icon">
        <Image src={icon} alt="" width={36} height={36} />
      </div>

      <div className="neo-text">
        <span className="neo-title">{title}</span>
      </div>
    </motion.button>
  );
}
