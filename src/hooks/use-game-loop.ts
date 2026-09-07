import { useEffect, useRef } from "react";
import { usePaused } from "@/lib/store";

export function useGameLoop(active: boolean, onTick: (dt: number) => void) {
  const paused = usePaused();
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const tickRef = useRef(onTick);
  tickRef.current = onTick;

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
      last = now;
      if (!document.hidden && !pausedRef.current) tickRef.current(dt);
      raf = requestAnimationFrame(frame);
    };
    const onVis = () => {
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [active]);
}
