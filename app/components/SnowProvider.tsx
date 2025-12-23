"use client";

import { createContext, useContext, useState } from "react";

type SnowMode = "normal" | "storm" | "calm";

type SnowContextType = {
  mode: SnowMode;
  setMode: (mode: SnowMode) => void;
};

const SnowContext = createContext<SnowContextType | null>(null);

export function useSnow() {
  const ctx = useContext(SnowContext);
  if (!ctx) throw new Error("useSnow must be used inside SnowProvider");
  return ctx;
}

export default function SnowProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<SnowMode>("normal");

  return (
    <SnowContext.Provider value={{ mode, setMode }}>
      {children}
    </SnowContext.Provider>
  );
}
