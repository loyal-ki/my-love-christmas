import type { Metadata, Viewport } from "next";
import { WordsPage } from "./PageClient";

export const metadata: Metadata = {
  title: "Words",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return <WordsPage />;
}
