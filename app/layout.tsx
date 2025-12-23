import "./globals.css";
import type { Metadata } from "next";
import GlobalMusic from "./components/GlobalMusic";
import MusicToggle from "./components/MusicToggle";
import SnowProvider from "./components/SnowProvider";
import SnowCanvas from "./components/SnowCanvas";
import { Pacifico } from "next/font/google";
import { AnimatePresence } from "framer-motion";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "My Love Christmas 🎄",
  description: "Christmas Landing Page with Snow, Music & Animation",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pacifico.className}>
        <AnimatePresence mode="wait">
          <SnowProvider>
            <SnowCanvas />
            <GlobalMusic>
              {children}
              <MusicToggle />
            </GlobalMusic>
          </SnowProvider>
        </AnimatePresence>
      </body>
    </html>
  );
}
