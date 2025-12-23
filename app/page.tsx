"use client";

import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";

export default function Page() {
  return (
    <PageTransition>
      <LoadingScreen />
    </PageTransition>
  );
}
