import { useState } from "react";
import { ClientOnly } from "@/components/client-only";
import { EndCard, GameShell, StartCard } from "@/components/game-ui";
import { Button } from "@/components/ui/button";
import { Fish, GroundDisc, ToyScene } from "@/components/toys";
import { cn } from "@/lib/cn";
import { shuffle, starsFor } from "@/lib/game-logic";
import { t } from "@/lib/i18n";
import { useAcademy } from "@/lib/store";

const POS: [number, number, number][] = [
  [-2.4, 0.4, -0.6],
  [0, 0.5, -0.2],
  [2.4, 0.35, -0.8],
  [-2.2, 0.4, 1.6],
  [0.3, 0.45, 1.8],
  [2.3, 0.38, 1.4],
];

export function OceanGame() {
  const lang = useAcademy((s) => s.lang);
  const recordSession = useAcademy((s) => s.recordSession);
  const best = useAcademy((s) => s.best.ocean);
  const [types, setTypes] = useState(() => shuffle(["a", "a", "a", "b", "b", "b"]));
  const [screen, setScreen] = useState<"start" | "play" | "end">("start");
  const [found, setFound] = useState<number[]>([]);
  const [hint, setHint] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [status, setStatus] = useState(t(lang, "ocean.purpose"));
  const [shake, setShake] = useState(false);

  function startRun() {
    setTypes(shuffle(["a", "a", "a", "b", "b", "b"]));
    setFound([]);
    setHint(null);
    setScore(0);
    setShake(false);
    setScreen("play");
    setStatus(t(lang, "ocean.purpose"));
  }

  function pick(i: number) {
    if (screen !== "play" || found.includes(i)) return;
    if (types[i] !== "a") {
      setStatus(t(lang, "ocean.wrong"));
      setShake(true);
      window.setTimeout(() => setShake(false), 280);
      return;
    }
    const next = [...found, i];
    const nextScore = score + 20;
    setFound(next);
    setScore(nextScore);
    setHint(null);
    if (next.length >= 3) {
      const earned = starsFor(3, 2, 3);
      setStars(earned);
      recordSession({ mission: "ocean", score: nextScore, stars: earned });
      setStatus(t(lang, "ocean.restored"));
      setScreen("end");
    } else {
      setStatus(`${t(lang, "ocean.found")} ${next.length} / 3`);
    }
  }

  function showHint() {
    const first = types
      .map((kind, i) => (kind === "a" && !found.includes(i) ? i : -1))
      .filter((i) => i >= 0)[0];
    if (first != null) setHint(first % 3);
  }

  const coral = 0.35 + found.length * 0.28;

  return (
    <GameShell mission="ocean" screen={screen} status={status}>
      {screen === "start" ? <StartCard lang={lang} mission="ocean" onStart={startRun} /> : null}
      {screen !== "start" && screen !== "end" ? (
        <>
          <ClientOnly fallback={<div className="h-[42vh] rounded-[var(--radius-xl)] bg-sky" />}>
            <ToyScene background="#9ad0d8">
              <Reef types={types} found={found} hint={hint} coral={coral} onPick={pick} />
            </ToyScene>
          </ClientOnly>
          <div
            className={cn(
              "rounded-[var(--radius-lg)] border border-border bg-bg-elevated px-4 py-3",
              shake ? "shake-error" : "",
            )}
          >
            <p className="text-sm text-fg-muted">{t(lang, "ocean.purpose")}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="size-12">
                <svg viewBox="0 0 40 24" aria-hidden="true">
                  <ellipse cx="18" cy="12" rx="12" ry="7" fill="#c45c3e" />
                  <rect x="12" y="8" width="3" height="8" fill="#f7f1e8" />
                  <rect x="18" y="8" width="3" height="8" fill="#f7f1e8" />
                  <polygon points="4,12 10,8 10,16" fill="#c45c3e" />
                </svg>
              </div>
              <p className="text-sm">
                {t(lang, "ocean.found")} {found.length} / 3
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {types.map((_, i) => (
              <Button key={i} variant="secondary" size="lg" disabled={found.includes(i)} onClick={() => pick(i)}>
                {i + 1}
              </Button>
            ))}
          </div>
          <Button variant="outline" onClick={showHint}>
            {t(lang, "app.hint")}
          </Button>
        </>
      ) : null}
      {screen === "end" ? (
        <EndCard lang={lang} score={score} stars={stars} best={Math.max(best, score)} onAgain={() => setScreen("start")} />
      ) : null}
    </GameShell>
  );
}

function Reef({
  types,
  found,
  hint,
  coral,
  onPick,
}: {
  types: string[];
  found: number[];
  hint: number | null;
  coral: number;
  onPick: (i: number) => void;
}) {
  return (
    <>
      <GroundDisc color="#e7d6ad" />
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[8, 0.1, 5.2]} />
        <meshStandardMaterial color="#7eb8c9" roughness={0.7} />
      </mesh>
      {hint === null ? null : (
        <mesh position={[hint === 0 ? -2.2 : hint === 1 ? 0.2 : 2.2, 0.12, 0.5]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[1.4, 20]} />
          <meshBasicMaterial color="#e0b15a" transparent opacity={0.28} />
        </mesh>
      )}
      {types.map((kind, i) => {
        const pos = POS[i]!;
        const striped = kind === "a";
        return (
          <group
            key={i}
            position={pos}
            onPointerUp={(e) => {
              e.stopPropagation();
              onPick(i);
            }}
          >
            <Fish color={striped ? "#c45c3e" : "#4f8a74"} striped={striped} position={[0, 0, 0]} rotationY={0.4} />
            {found.includes(i) ? (
              <mesh rotation-x={-Math.PI / 2} position={[0, -0.25, 0]}>
                <torusGeometry args={[0.45, 0.04, 8, 20]} />
                <meshStandardMaterial color="#e0b15a" flatShading />
              </mesh>
            ) : null}
            <mesh visible={false}>
              <boxGeometry args={[1.3, 1, 1]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[3.6, 0.2, -1.8]} scale={coral} castShadow>
        <coneGeometry args={[0.5, 1.3, 7]} />
        <meshStandardMaterial color="#d578a1" roughness={0.8} flatShading />
      </mesh>
      <Fish color="#c45c3e" striped position={[0, 1.7, -3.1]} rotationY={Math.PI / 2} />
      <mesh position={[0, 1.45, -3.15]}>
        <boxGeometry args={[1.6, 0.08, 0.7]} />
        <meshStandardMaterial color="#f7f1e8" />
      </mesh>
    </>
  );
}
