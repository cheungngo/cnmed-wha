import { useMemo, useRef, useState } from "react";
import { ClientOnly } from "@/components/client-only";
import { Chip, ChipRow, EndCard, GameShell, StartCard } from "@/components/game-ui";
import { Button } from "@/components/ui/button";
import { Crystal, GroundDisc, GroundShadow, Pine, ToyScene } from "@/components/toys";
import { useGameLoop } from "@/hooks/use-game-loop";
import { gemSequence, gemSpeed, nextGemLength, starsFor } from "@/lib/game-logic";
import { t } from "@/lib/i18n";
import { useAcademy, useCalm } from "@/lib/store";

const CELLS = Array.from({ length: 9 }, (_, i) => ({
  i,
  x: (i % 3 - 1) * 1.7,
  z: (Math.floor(i / 3) - 1) * 1.45,
}));

export function GemsGame() {
  const lang = useAcademy((s) => s.lang);
  const recordSession = useAcademy((s) => s.recordSession);
  const best = useAcademy((s) => s.best.gems);
  const [mode, setMode] = useState<"practice" | "challenge">("practice");
  const [length, setLength] = useState(3);
  const [speedKind, setSpeedKind] = useState<"slow" | "steady" | "brisk">("steady");
  const [screen, setScreen] = useState<"start" | "watch" | "recall" | "end">("start");
  const [seq, setSeq] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [perfects, setPerfects] = useState(0);
  const [lives, setLives] = useState(3);
  const [rewatch, setRewatch] = useState(false);
  const [sets, setSets] = useState(0);
  const [stars, setStars] = useState(0);
  const [status, setStatus] = useState(t(lang, "gems.purpose"));
  const [plant, setPlant] = useState(0.45);
  const elapsed = useRef(0);
  const showI = useRef(0);
  const calm = useCalm();
  const pace = gemSpeed(speedKind);

  function deal(len = length, again = false) {
    setSeq(gemSequence(len));
    setStep(0);
    setLit(null);
    setRewatch(again);
    setScreen("watch");
    setStatus(t(lang, "gems.watch"));
    elapsed.current = 0;
    showI.current = 0;
  }

  function startRun() {
    setScore(0);
    setPerfects(0);
    setLives(3);
    setSets(0);
    setPlant(0.45);
    setStars(0);
    deal(length, false);
  }

  function finish(finalScore: number, perfect: number) {
    const earned = starsFor(perfect, 2, 4);
    setStars(earned);
    recordSession({ mission: "gems", score: finalScore, stars: earned });
    setScreen("end");
    setStatus(t(lang, "end.title"));
  }

  useGameLoop(screen === "watch", (dt) => {
    elapsed.current += dt;
    const on = pace * 0.7;
    const i = showI.current;
    if (i >= seq.length) {
      setLit(null);
      setScreen("recall");
      setStatus(t(lang, "gems.repeat"));
      return;
    }
    const start = i * pace;
    if (elapsed.current < start + on) {
      const cell = seq[i]!;
      setLit((prev) => (prev === cell ? prev : cell));
    } else {
      if (elapsed.current >= start + pace) showI.current = i + 1;
      setLit(null);
    }
  });

  function pick(cell: number) {
    if (screen !== "recall") return;
    if (cell !== seq[step]) {
      if (mode === "practice") {
        setStatus(t(lang, "gems.again"));
        deal(seq.length, true);
        return;
      }
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        finish(score, perfects);
        return;
      }
      deal(seq.length, false);
      return;
    }
    const next = step + 1;
    setStep(next);
    if (next === seq.length) {
      const gain = rewatch ? 8 : 20 + seq.length * 5;
      const nextScore = score + gain;
      const nextPerfect = perfects + (rewatch ? 0 : 1);
      const nextSets = sets + 1;
      setScore(nextScore);
      setPerfects(nextPerfect);
      setSets(nextSets);
      setPlant((p) => Math.min(1.2, p + 0.18));
      setStatus(t(lang, "gems.grew"));
      if (nextSets >= 4 || (mode === "challenge" && nextPerfect >= 5)) {
        finish(nextScore, nextPerfect);
        return;
      }
      const nextLen = mode === "challenge" ? nextGemLength(nextPerfect, length) : length;
      window.setTimeout(() => deal(nextLen, false), 500);
    } else {
      setStatus(t(lang, "gems.repeat"));
    }
  }

  const lift = useMemo(() => (calm ? 0 : 0.12), [calm]);

  return (
    <GameShell
      mission="gems"
      screen={screen === "start" ? "start" : screen === "end" ? "end" : "play"}
      status={status}
    >
      {screen === "end" ? null : (
        <ClientOnly fallback={<div className="h-[42vh] rounded-[var(--radius-xl)] bg-sky" />}>
          <ToyScene background="#d5e4dc">
            <GemGarden lit={screen === "start" ? null : lit} plant={plant} lift={lift} onPick={pick} />
          </ToyScene>
        </ClientOnly>
      )}
      {screen === "start" ? (
        <StartCard
          lang={lang}
          mission="gems"
          onStart={startRun}
          extra={
            <>
              <ChipRow>
                <Chip active={mode === "practice"} onClick={() => setMode("practice")}>
                  {t(lang, "app.practice")}
                </Chip>
                <Chip active={mode === "challenge"} onClick={() => setMode("challenge")}>
                  {t(lang, "app.challenge")}
                </Chip>
              </ChipRow>
              <ChipRow>
                {[3, 4, 5].map((n) => (
                  <Chip key={n} active={length === n} onClick={() => setLength(n)}>
                    {t(lang, "gems.length")} {n}
                  </Chip>
                ))}
              </ChipRow>
              <ChipRow>
                {(["slow", "steady", "brisk"] as const).map((s) => (
                  <Chip key={s} active={speedKind === s} onClick={() => setSpeedKind(s)}>
                    {t(lang, `gems.${s}`)}
                  </Chip>
                ))}
              </ChipRow>
            </>
          }
        />
      ) : null}
      {screen !== "start" && screen !== "end" ? (
        <>
          <div className="grid grid-cols-3 gap-2 pb-2">
            {CELLS.map((cell) => (
              <Button
                key={cell.i}
                variant="secondary"
                size="lg"
                disabled={screen !== "recall"}
                onClick={() => pick(cell.i)}
              >
                {cell.i + 1}
              </Button>
            ))}
          </div>
          {mode === "practice" && screen === "recall" ? (
            <Button variant="outline" onClick={() => deal(seq.length, true)}>
              {t(lang, "app.watchAgain")}
            </Button>
          ) : null}
        </>
      ) : null}
      {screen === "end" ? (
        <EndCard
          lang={lang}
          score={score}
          stars={stars}
          best={Math.max(best, score)}
          onAgain={() => setScreen("start")}
          lines={
            <p className="mt-2 text-sm text-fg-muted">
              {t(lang, "app.perfects")} {perfects}
            </p>
          }
        />
      ) : null}
    </GameShell>
  );
}

function GemGarden({
  lit,
  plant,
  lift,
  onPick,
}: {
  lit: number | null;
  plant: number;
  lift: number;
  onPick: (i: number) => void;
}) {
  return (
    <>
      <GroundDisc color="#c9dcc8" />
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[6.2, 0.16, 5.2]} />
        <meshStandardMaterial color="#c7b6a3" roughness={0.9} flatShading />
      </mesh>
      {CELLS.map((cell) => (
        <group
          key={cell.i}
          onPointerUp={(e) => {
            e.stopPropagation();
            onPick(cell.i);
          }}
        >
          <Crystal position={[cell.x, 0.16, cell.z]} lit={lit === cell.i} lift={lit === cell.i ? lift : 0} />
          <mesh position={[cell.x, 0.55, cell.z]} visible={false}>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </group>
      ))}
      <Pine position={[3.6, 0, -2.2]} scale={plant} />
      <GroundShadow position={[3.6, 0, -2.2]} scale={plant} />
    </>
  );
}
