"use client";

import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Love Christmas",
};

export default function Page() {
  return (
    <PageTransition>
      <LoadingScreen />
    </PageTransition>
  );
}
