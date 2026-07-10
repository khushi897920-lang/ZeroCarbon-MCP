"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Internal sync component: drives Lenis via GSAP ticker so ScrollTrigger
// reads smooth-scroll positions instead of native scroll positions.
// This avoids the double-RAF problem and keeps everything at exactly 60fps.
function GSAPLenisSync() {
  const lenis = useLenis();
  const tickerRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    if (!lenis) return;

    // Sync Lenis scroll events to ScrollTrigger so pinned/scrubbed
    // animations get the correct virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's unified ticker instead of its own RAF loop.
    // This ensures one single RAF loop drives both systems at the same time,
    // preventing stutters from two competing requestAnimationFrame callbacks.
    const ticker = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is seconds; Lenis expects ms
    };
    tickerRef.current = ticker;
    gsap.ticker.add(ticker);

    // Disable GSAP lag smoothing — it introduces artificial timing offsets
    // that fight against Lenis's own easing, causing micro-jitter.
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current);
      }
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // lerp: interpolation factor — lower = more smoothing (butter)
        // 0.08 gives a longer, silkier deceleration tail than the default 0.1
        lerp: 0.08,

        // duration for programmatic scrollTo calls
        duration: 1.2,

        // Expo easing for natural deceleration curve (fast start, soft landing)
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),

        // Smooth mouse wheel scrolling
        smoothWheel: true,

        // Sync touch devices so mobile also gets smooth inertia
        // syncTouch: true creates a silky feel on iOS/Android
        syncTouch: true,
        syncTouchLerp: 0.06,
        touchMultiplier: 28,

        // autoRaf: false — GSAP ticker drives the loop (see GSAPLenisSync above)
        // This is critical: without this, two RAF loops compete and stutter
        autoRaf: false,

        // Keep anchor link handling working
        anchors: true,

        // Allow nested scrollable containers (e.g. mcp-flow) to scroll independently
        allowNestedScroll: true,
      }}
    >
      <GSAPLenisSync />
      {children}
    </ReactLenis>
  );
}
