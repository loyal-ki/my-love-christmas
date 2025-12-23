import type { Metadata, Viewport } from "next";
import { HomePage } from "./PageClient";

export const metadata: Metadata = {
  title: "Home",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return <HomePage />;
}
