import { useMemo, useState } from "react";
import { ExtrudeGeometry, Shape } from "three";
import { ClientOnly } from "@/components/client-only";
import { EndCard, GameShell, StartCard } from "@/components/game-ui";
import { Button } from "@/components/ui/button";
import { Cottage, Courier, GroundDisc, GroundShadow, ToyScene } from "@/components/toys";
import { INK_COLORS } from "@/lib/catalog";
import { randomStroop, shuffle, starsFor } from "@/lib/game-logic";
import { t } from "@/lib/i18n";
import { useAcademy } from "@/lib/store";

export function RainbowGame() {
  const lang = useAcademy((s) => s.lang);
  const recordSession = useAcademy((s) => s.recordSession);
  const best = useAcademy((s) => s.best.rainbow);
  const [screen, setScreen] = useState<"start" | "play" | "pause-rule" | "end">("start");
  const [rule, setRule] = useState<"ink" | "word">("ink");
  const [pendingRule, setPendingRule] = useState<"ink" | "word">("ink");
  const [card, setCard] = useState<{ word: (typeof INK_COLORS)[number]["id"]; ink: (typeof INK_COLORS)[number]["id"] }>({
    word: "blue",
    ink: "red",
  });
  const [choices, setChoices] = useState(["red", "blue", "green"]);
  const [trial, setTrial] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [locked, setLocked] = useState(false);
  const [status, setStatus] = useState(t(lang, "rainbow.purpose"));
  const [courierX, setCourierX] = useState(-3.2);

  function deal(nextRule: "ink" | "word") {
    const next = randomStroop();
    setCard(next);
    setChoices(shuffle(INK_COLORS.map((c) => c.id)));
    setRule(nextRule);
    setStatus(nextRule === "ink" ? t(lang, "rainbow.ruleInk") : t(lang, "rainbow.ruleWord"));
  }

  function startRun() {
    setTrial(0);
    setCorrect(0);
    setScore(0);
    setCourierX(-3.2);
    setLocked(false);
    setScreen("play");
    deal("ink");
  }

  function pick(id: string) {
    if (screen !== "play" || locked) return;
    const target = rule === "ink" ? card.ink : card.word;
    const ok = id === target;
    setLocked(true);
    const nextTrial = trial + 1;
    const nextCorrect = correct + (ok ? 1 : 0);
    const nextScore = score + (ok ? 15 : 0);
    setTrial(nextTrial);
    setCorrect(nextCorrect);
    setScore(nextScore);
    if (ok) setCourierX(-3.2 + nextCorrect * 1.15);
    if (nextTrial === 4 && rule === "ink") {
      setPendingRule("word");
      setScreen("pause-rule");
      setStatus(t(lang, "rainbow.newRule"));
      setLocked(false);
      return;
    }
    if (nextTrial >= 8) {
      const earned = starsFor(nextCorrect, 5, 7);
      setStars(earned);
      recordSession({ mission: "rainbow", score: nextScore, stars: earned });
      setScreen("end");
      setStatus(t(lang, "rainbow.chapterDone"));
      setLocked(false);
      return;
    }
    deal(rule);
    setLocked(false);
  }

  const word = INK_COLORS.find((c) => c.id === card.word);
  const ink = INK_COLORS.find((c) => c.id === card.ink);

  return (
    <GameShell
      mission="rainbow"
      screen={screen === "start" ? "start" : screen === "end" ? "end" : "play"}
      status={status}
    >
      {screen === "start" ? <StartCard lang={lang} mission="rainbow" onStart={startRun} /> : null}
      {screen !== "start" && screen !== "end" ? (
        <>
          <ClientOnly fallback={<div className="h-[42vh] rounded-[var(--radius-xl)] bg-sky" />}>
            <ToyScene background="#c5def0">
              <RainbowWorld courierX={courierX} />
            </ToyScene>
          </ClientOnly>
          <div className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated px-4 py-3 text-center">
            <p className="text-sm text-fg-muted">
              {rule === "ink" ? t(lang, "rainbow.ruleInk") : t(lang, "rainbow.ruleWord")}
            </p>
            <p className="font-display text-4xl" style={{ color: ink?.hex }}>
              {word?.word[lang]}
            </p>
          </div>
          {screen === "pause-rule" ? (
            <Button
              size="lg"
              onClick={() => {
                setScreen("play");
                deal(pendingRule);
              }}
            >
              {t(lang, "app.ack")}
            </Button>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {choices.map((id) => {
                const c = INK_COLORS.find((x) => x.id === id)!;
                return (
                  <Button key={id} variant="secondary" size="xl" disabled={locked} onClick={() => pick(id)}>
                    <span className="size-4 rounded-full" style={{ background: c.hex }} />
                    {c.word[lang]}
                  </Button>
                );
              })}
            </div>
          )}
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
              {t(lang, "rainbow.delivered")} {correct}
            </p>
          }
        />
      ) : null}
    </GameShell>
  );
}

function RainbowWorld({ courierX }: { courierX: number }) {
  const bands = ["#e55252", "#efb431", "#47995d", "#4f8a74", "#5a9ec2"];
  const geos = useMemo(
    () =>
      bands.map((color, i) => {
        const outer = 2.3 - i * 0.22;
        const inner = outer - 0.16;
        const shape = new Shape();
        shape.absarc(0, 0, outer, 0, Math.PI, false);
        shape.absarc(0, 0, inner, Math.PI, 0, true);
        const geo = new ExtrudeGeometry(shape, { depth: 0.32, bevelEnabled: false, curveSegments: 20 });
        geo.translate(0, 0, -0.16);
        return { color, geo };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <GroundDisc color="#dce9d2" />
      {geos.map((band) => (
        <mesh key={band.color} geometry={band.geo} position={[0, 0.02, -1.6]} castShadow>
          <meshStandardMaterial color={band.color} roughness={0.7} flatShading />
        </mesh>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[-3.5 + i, 0.08, 1.15]} receiveShadow>
          <boxGeometry args={[0.85, 0.14, 1.05]} />
          <meshStandardMaterial color="#f1dfc1" roughness={0.9} flatShading />
        </mesh>
      ))}
      <Cottage position={[4.2, 0, 1.15]} color="#efe8dc" roof="#c45c3e" />
      <Courier position={[courierX, 0, 1.15]} />
      <GroundShadow position={[courierX, 0, 1.15]} />
    </>
  );
}
