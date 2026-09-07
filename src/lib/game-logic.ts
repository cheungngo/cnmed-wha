import type { InkId } from "./catalog";
import { INK_COLORS } from "./catalog";

export function shuffle<T>(items: T[], rng: () => number = Math.random): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [next[i], next[j]] = [next[j]!, next[i]!];
  }
  return next;
}

export function pick<T>(items: T[], count: number, rng: () => number = Math.random): T[] {
  return shuffle(items, rng).slice(0, Math.min(count, items.length));
}

export function todayKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function canAwardSeed(
  awardedOn: Record<string, string[]>,
  mission: string,
  day = todayKey(),
): boolean {
  return !(awardedOn[day] ?? []).includes(mission);
}

export function starsFor(value: number, twoAt = 6, threeAt = 10): number {
  if (value >= threeAt) return 3;
  if (value >= twoAt) return 2;
  return value >= Math.max(1, Math.floor(twoAt / 2)) ? 1 : 0;
}

export type BrewMode = "learn" | "remember" | "sequence";

export function checkBrewTap(
  mode: BrewMode,
  recipe: string[],
  added: string[],
  tap: string,
): { ok: boolean; reason?: "duplicate" | "out-of-order" | "not-in-recipe" } {
  if (added.includes(tap)) return { ok: false, reason: "duplicate" };
  if (mode === "sequence") {
    return tap === recipe[added.length] ? { ok: true } : { ok: false, reason: "out-of-order" };
  }
  return recipe.includes(tap) ? { ok: true } : { ok: false, reason: "not-in-recipe" };
}

export function gemSequence(length: number, cells = 9, rng: () => number = Math.random): number[] {
  const out: number[] = [];
  for (let i = 0; i < length; i++) {
    let cell = Math.floor(rng() * cells);
    while (out.length > 0 && cell === out[out.length - 1]) {
      cell = Math.floor(rng() * cells);
    }
    out.push(cell);
  }
  return out;
}

export function gemSpeed(kind: "slow" | "steady" | "brisk"): number {
  if (kind === "slow") return 0.9;
  if (kind === "brisk") return 0.48;
  return 0.65;
}

export function nextGemLength(perfects: number, base = 3, max = 7): number {
  return Math.min(max, base + Math.floor(Math.max(0, perfects) / 2));
}

export function junctionStation(j1: "L" | "R", j2: "L" | "R"): number {
  if (j1 === "L" && j2 === "L") return 0;
  if (j1 === "R" && j2 === "R") return 2;
  return 1;
}

export function nbackSequence<T>(pool: T[], length: number, n: number, rng: () => number = Math.random): T[] {
  const out: T[] = [];
  for (let i = 0; i < length; i++) {
    if (i >= n && rng() < 0.35) out.push(out[i - n]!);
    else out.push(pool[Math.floor(rng() * pool.length)]!);
  }
  return out;
}

export type EchoAction = "same" | "wait";
export type EchoResult = "setup" | "hit" | "correct-reject" | "false-alarm" | "miss";

export function scoreEcho<T>(seq: T[], index: number, n: number, action: EchoAction): EchoResult {
  if (index < n) return "setup";
  const match = seq[index] === seq[index - n];
  if (match && action === "same") return "hit";
  if (!match && action === "wait") return "correct-reject";
  if (!match && action === "same") return "false-alarm";
  return "miss";
}

export function echoAccuracy(results: EchoResult[]): number {
  const scored = results.filter((r) => r !== "setup");
  if (scored.length === 0) return 0;
  return scored.filter((r) => r === "hit" || r === "correct-reject").length / scored.length;
}

export function randomStroop(rng: () => number = Math.random): { word: InkId; ink: InkId } {
  const word = INK_COLORS[Math.floor(rng() * INK_COLORS.length)]!.id;
  let ink = INK_COLORS[Math.floor(rng() * INK_COLORS.length)]!.id;
  if (ink === word) {
    const idx = INK_COLORS.findIndex((c) => c.id === word);
    ink = INK_COLORS[(idx + 1) % INK_COLORS.length]!.id;
  }
  return { word, ink };
}

export function lerpPath(points: [number, number, number][], t: number): [number, number, number] {
  if (points.length < 2) return points[0] ?? [0, 0, 0];
  const n = points.length - 1;
  const scaled = t * n;
  const i = Math.min(n - 1, Math.floor(scaled));
  const a = scaled - i;
  const from = points[i]!;
  const to = points[i + 1]!;
  return [
    from[0] + (to[0] - from[0]) * a,
    from[1] + (to[1] - from[1]) * a,
    from[2] + (to[2] - from[2]) * a,
  ];
}
