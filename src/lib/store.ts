import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState, type ReactNode } from "react";

import { MISSION_IDS, type MissionId, type Seed } from "./catalog";
import { canAwardSeed, todayKey } from "./game-logic";

export type Lang = "en" | "zh";

type Plot = { seed: Seed["id"] | null };

type Scores = Record<MissionId, number>;

type AcademyState = {
  version: number;
  lang: Lang;
  calmRequested: boolean;
  paused: boolean;
  seedsAvailable: number;
  awardedOn: Record<string, string[]>;
  plots: Plot[];
  finishedOn: string | null;
  stars: Scores;
  best: Scores;
  contributions: Scores;
  lastSeedBanner: string | null;
  setLang: (lang: Lang) => void;
  setCalm: (on: boolean) => void;
  setPaused: (on: boolean) => void;
  finishToday: () => void;
  dismissBanner: () => void;
  plant: (plot: number, seed: Seed["id"]) => boolean;
  clearGarden: () => void;
  recordSession: (input: { mission: MissionId; score: number; stars: number }) => { seedAwarded: boolean };
};

function emptyScores(): Scores {
  return Object.fromEntries(MISSION_IDS.map((id) => [id, 0])) as Scores;
}

function emptyPlots(): Plot[] {
  return Array.from({ length: 6 }, () => ({ seed: null }));
}

export const useAcademy = create<AcademyState>()(
  persist(
    (set, get) => ({
      version: 1,
      lang: "en",
      calmRequested: false,
      paused: false,
      seedsAvailable: 0,
      awardedOn: {},
      plots: emptyPlots(),
      finishedOn: null,
      stars: emptyScores(),
      best: emptyScores(),
      contributions: emptyScores(),
      lastSeedBanner: null,
      setLang: (lang) => set({ lang }),
      setCalm: (calmRequested) => set({ calmRequested }),
      setPaused: (paused) => set({ paused }),
      finishToday: () => set({ finishedOn: todayKey() }),
      dismissBanner: () => set({ lastSeedBanner: null }),
      plant: (plot, seed) => {
        const { plots, seedsAvailable } = get();
        if (seedsAvailable <= 0) return false;
        const current = plots[plot];
        if (!current || current.seed) return false;
        set({
          plots: plots.map((p, i) => (i === plot ? { seed } : p)),
          seedsAvailable: seedsAvailable - 1,
        });
        return true;
      },
      clearGarden: () => set({ plots: emptyPlots() }),
      recordSession: ({ mission, score, stars }) => {
        const state = get();
        const day = todayKey();
        const seedAwarded = canAwardSeed(state.awardedOn, mission, day);
        const awardedOn = { ...state.awardedOn };
        if (seedAwarded) awardedOn[day] = [...(awardedOn[day] ?? []), mission];
        set({
          stars: { ...state.stars, [mission]: Math.max(state.stars[mission], stars) },
          best: { ...state.best, [mission]: Math.max(state.best[mission], score) },
          contributions: { ...state.contributions, [mission]: state.contributions[mission] + 1 },
          awardedOn,
          seedsAvailable: state.seedsAvailable + (seedAwarded ? 1 : 0),
          lastSeedBanner: seedAwarded ? `${day}:${mission}` : state.lastSeedBanner,
        });
        return { seedAwarded };
      },
    }),
    {
      name: "wonder-heroes-academy",
      version: 1,
      partialize: (s) => ({
        version: s.version,
        lang: s.lang,
        calmRequested: s.calmRequested,
        seedsAvailable: s.seedsAvailable,
        awardedOn: s.awardedOn,
        plots: s.plots,
        finishedOn: s.finishedOn,
        stars: s.stars,
        best: s.best,
        contributions: s.contributions,
      }),
      migrate: (raw) => {
        const t = (raw ?? {}) as Partial<AcademyState>;
        const lang: Lang = t.lang === "zh" ? "zh" : "en";
        return {
          version: 1,
          lang,
          calmRequested: !!t.calmRequested,
          seedsAvailable: Number(t.seedsAvailable) || 0,
          awardedOn: t.awardedOn ?? {},
          plots: Array.isArray(t.plots) && t.plots.length === 6 ? t.plots : emptyPlots(),
          finishedOn: t.finishedOn ?? null,
          stars: { ...emptyScores(), ...t.stars },
          best: { ...emptyScores(), ...t.best },
          contributions: { ...emptyScores(), ...t.contributions },
        };
      },
    },
  ),
);

export function usePaused() {
  return useAcademy((s) => s.paused);
}

export function useCalm(): boolean {
  const requested = useAcademy((s) => s.calmRequested);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return requested || reduced;
}

export function CalmRoot({ children }: { children: ReactNode }) {
  const calm = useCalm();
  useEffect(() => {
    const el = document.documentElement;
    if (calm) el.setAttribute("data-calm", "true");
    else el.removeAttribute("data-calm");
  }, [calm]);
  return children;
}
