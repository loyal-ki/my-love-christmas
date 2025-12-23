import type { Metadata, Viewport } from "next";
import { MemoriesPage } from "./PageClient";

export const metadata: Metadata = {
  title: "Memories",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return <MemoriesPage />;
}
