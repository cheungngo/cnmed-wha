import { useRef, useState } from "react";
import { ClientOnly } from "@/components/client-only";
import { Chip, ChipRow, EndCard, GameShell, StartCard } from "@/components/game-ui";
import { Button } from "@/components/ui/button";
import { GroundDisc, PerformerFigure, ToyScene } from "@/components/toys";
import { PERFORMERS } from "@/lib/catalog";
import { echoAccuracy, nbackSequence, scoreEcho, starsFor, type EchoResult } from "@/lib/game-logic";
import { t } from "@/lib/i18n";
import { useAcademy } from "@/lib/store";

const IDS = PERFORMERS.map((p) => p.id);
const LENGTH = 10;

export function EchoGame() {
  const lang = useAcademy((s) => s.lang);
  const recordSession = useAcademy((s) => s.recordSession);
  const best = useAcademy((s) => s.best.echo);
  const [n, setN] = useState(2);
  const [hints, setHints] = useState(false);
  const [screen, setScreen] = useState<"start" | "play" | "end">("start");
  const [seq, setSeq] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<EchoResult[]>([]);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [status, setStatus] = useState(t(lang, "echo.purpose"));
  const [celebrate, setCelebrate] = useState(false);
  const run = useRef(0);

  function startRun() {
    run.current += 1;
    setSeq(nbackSequence(IDS, LENGTH, n));
    setIndex(0);
    setResults([]);
    setScore(0);
    setCelebrate(false);
    setScreen("play");
    setStatus(t(lang, "echo.remember"));
  }

  function wrap(nextResults: EchoResult[], nextScore: number) {
    const acc = echoAccuracy(nextResults);
    const earned = starsFor(Math.round(acc * 10), 6, 9);
    setStars(earned);
    recordSession({ mission: "echo", score: nextScore, stars: earned });
    setCelebrate(true);
    setScreen("end");
    setStatus(t(lang, "echo.complete"));
  }

  function answer(action: "same" | "wait") {
    if (screen !== "play" || index < n) return;
    const result = scoreEcho(seq, index, n, action);
    const nextResults = [...results, result];
    const nextScore = score + (result === "hit" || result === "correct-reject" ? 20 : 0);
    setResults(nextResults);
    setScore(nextScore);
    const nextIndex = index + 1;
    if (nextIndex >= seq.length) {
      wrap(nextResults, nextScore);
      return;
    }
    setIndex(nextIndex);
    setStatus(t(lang, "echo.ask"));
  }

  function nextSetup() {
    if (index >= n) return;
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setStatus(nextIndex < n ? t(lang, "echo.remember") : t(lang, "echo.ask"));
  }

  const current = seq[index];
  const history = seq.slice(0, index + 1);

  return (
    <GameShell mission="echo" screen={screen} status={status}>
      {screen === "start" ? (
        <StartCard
          lang={lang}
          mission="echo"
          onStart={startRun}
          extra={
            <>
              <ChipRow>
                <Chip active={n === 1} onClick={() => setN(1)}>
                  {t(lang, "echo.one")}
                </Chip>
                <Chip active={n === 2} onClick={() => setN(2)}>
                  {t(lang, "echo.two")}
                </Chip>
              </ChipRow>
              <ChipRow>
                <Chip active={hints} onClick={() => setHints(true)}>
                  {t(lang, "echo.hints")}
                </Chip>
                <Chip active={!hints} onClick={() => setHints(false)}>
                  {t(lang, "echo.solo")}
                </Chip>
              </ChipRow>
            </>
          }
        />
      ) : null}
      {screen !== "start" && screen !== "end" ? (
        <>
          <ClientOnly fallback={<div className="h-[42vh] rounded-[var(--radius-xl)] bg-sky" />}>
            <ToyScene background="#efe3d2">
              <Stage current={current} celebrate={false} />
            </ToyScene>
          </ClientOnly>
          {hints ? (
            <ol className="flex flex-wrap gap-2 text-sm">
              {history.map((id, i) => (
                <li
                  key={`${id}-${i}`}
                  className={`rounded-full border border-border px-3 py-1 ${i === index ? "bg-primary text-primary-fg" : "bg-bg-elevated"}`}
                >
                  {id}
                </li>
              ))}
            </ol>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {index < n ? (
              <Button size="lg" onClick={nextSetup}>
                {t(lang, "app.next")}
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={() => answer("same")}>
                  {t(lang, "echo.same")}
                </Button>
                <Button size="lg" variant="secondary" onClick={() => answer("wait")}>
                  {t(lang, "echo.diff")}
                </Button>
              </>
            )}
          </div>
        </>
      ) : null}
      {screen === "end" ? (
        <>
          <ClientOnly>
            <ToyScene background="#efe3d2">
              <Stage current={seq[seq.length - 1]} celebrate={celebrate} />
            </ToyScene>
          </ClientOnly>
          <EndCard
            lang={lang}
            score={score}
            stars={stars}
            best={Math.max(best, score)}
            onAgain={() => setScreen("start")}
            lines={<p className="mt-2 text-sm text-fg-muted">{Math.round(echoAccuracy(results) * 100)}%</p>}
          />
        </>
      ) : null}
    </GameShell>
  );
}

function Stage({ current, celebrate }: { current?: string; celebrate: boolean }) {
  return (
    <>
      <GroundDisc color="#e7d7c4" />
      <mesh position={[0, 0.18, 0]} receiveShadow>
        <cylinderGeometry args={[2.4, 2.6, 0.32, 28]} />
        <meshStandardMaterial color="#8c6a4a" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[-3.4, 1.2, -1.6]} castShadow>
        <boxGeometry args={[0.2, 2.4, 2.2]} />
        <meshStandardMaterial color="#c45c3e" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[3.4, 1.2, -1.6]} castShadow>
        <boxGeometry args={[0.2, 2.4, 2.2]} />
        <meshStandardMaterial color="#c45c3e" roughness={0.8} flatShading />
      </mesh>
      {PERFORMERS.map((p) => (
        <PerformerFigure
          key={p.id}
          id={p.id}
          visible={current === p.id}
          celebrate={celebrate && current === p.id}
          position={[0, 0.2, 0]}
        />
      ))}
    </>
  );
}
