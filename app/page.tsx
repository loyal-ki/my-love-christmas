import type { Metadata, Viewport } from "next";
import RootClient from "./RootClient";

export const metadata: Metadata = {
  title: "MyLove",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return <RootClient />;
}
