"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type MusicContextType = {
  muted: boolean;
  toggle: () => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside GlobalMusic");
  return ctx;
}

export default function GlobalMusic({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [muted, setMuted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/audio/christmas.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;
    audioRef.current.muted = false;
  }, []);

  useEffect(() => {
    const unlock = () => {
      if (!audioRef.current || initialized) return;

      audioRef.current.play().catch(() => {});
      setInitialized(true);
    };

    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [initialized]);

  const toggle = () => {
    if (!audioRef.current) return;
    const next = !muted;
    setMuted(next);
    audioRef.current.muted = next;
  };

  return (
    <MusicContext.Provider value={{ muted, toggle }}>
      {children}
    </MusicContext.Provider>
  );
}
