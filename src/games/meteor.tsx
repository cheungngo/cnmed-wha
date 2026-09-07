import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Object3D, type InstancedMesh } from "three";
import { ClientOnly } from "@/components/client-only";
import { EndCard, GameShell, Meter, StartCard } from "@/components/game-ui";
import { Button } from "@/components/ui/button";
import { Cottage, GroundDisc, SpaceRock, ToyScene, Traveler } from "@/components/toys";
import { useGameLoop } from "@/hooks/use-game-loop";
import { starsFor } from "@/lib/game-logic";
import { t } from "@/lib/i18n";
import { useAcademy } from "@/lib/store";

const TRIALS = [true, false, true, false, true, false, true, false, true, false];

export function MeteorGame() {
  const lang = useAcademy((s) => s.lang);
  const recordSession = useAcademy((s) => s.recordSession);
  const best = useAcademy((s) => s.best.meteor);
  const [screen, setScreen] = useState<"start" | "idle" | "trial" | "end">("start");
  const [index, setIndex] = useState(0);
  const [isTarget, setIsTarget] = useState(true);
  const [x, setX] = useState(-4);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [fa, setFa] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [status, setStatus] = useState(t(lang, "meteor.purpose"));
  const [remain, setRemain] = useState(1);
  const signaled = useRef(false);
  const done = useRef(false);
  const elapsed = useRef(0);

  function reset() {
    setHits(0);
    setMisses(0);
    setFa(0);
    setScore(0);
    setIndex(0);
    setScreen("idle");
    setStatus(t(lang, "meteor.watch"));
  }

  function startTrial(i: number) {
    setIndex(i);
    setIsTarget(TRIALS[i]!);
    setX(-4);
    setRemain(1);
    signaled.current = false;
    done.current = false;
    elapsed.current = 0;
    setScreen("trial");
  }

  function finishTrial(target: boolean, hit: boolean, nextHits: number, nextMiss: number, nextFa: number, nextScore: number) {
    const n = index + 1;
    if (n >= TRIALS.length) {
      const earned = starsFor(nextHits, 4, 7);
      setStars(earned);
      recordSession({ mission: "meteor", score: nextScore, stars: earned });
      setScreen("end");
      setStatus(t(lang, "end.title"));
      return;
    }
    setScreen("idle");
    window.setTimeout(() => startTrial(n), 400);
  }

  useGameLoop(screen === "trial", (dt) => {
    if (done.current) return;
    elapsed.current += dt;
    const u = Math.min(1, elapsed.current / 3);
    setX(-4 + u * 8);
    setRemain(1 - u);
    if (u >= 1) {
      done.current = true;
      const hit = signaled.current;
      let nextHits = hits;
      let nextMiss = misses;
      let nextFa = fa;
      let nextScore = score;
      if (isTarget && hit) {
        nextHits += 1;
        nextScore += 12;
      } else if (isTarget && !hit) nextMiss += 1;
      else if (!isTarget && hit) nextFa += 1;
      setHits(nextHits);
      setMisses(nextMiss);
      setFa(nextFa);
      setScore(nextScore);
      finishTrial(hit, isTarget, nextHits, nextMiss, nextFa, nextScore);
    }
  });

  function signal() {
    if (screen !== "trial" || signaled.current) return;
    signaled.current = true;
  }

  return (
    <GameShell
      mission="meteor"
      screen={screen === "start" ? "start" : screen === "end" ? "end" : "play"}
      status={status}
    >
      {screen === "start" ? <StartCard lang={lang} mission="meteor" onStart={reset} /> : null}
      {screen !== "start" && screen !== "end" ? (
        <>
          <ClientOnly fallback={<div className="h-[42vh] rounded-[var(--radius-xl)] bg-sky" />}>
            <ToyScene background="#1a2436">
              <NightSky x={x} isTarget={isTarget} visible={screen === "trial"} onSignal={signal} />
            </ToyScene>
          </ClientOnly>
          <Meter value={remain} />
          <div className="flex gap-2">
            {screen === "idle" && index === 0 ? (
              <Button size="lg" onClick={() => startTrial(0)}>
                {t(lang, "meteor.start")}
              </Button>
            ) : (
              <Button size="lg" disabled={screen !== "trial"} onClick={signal}>
                {t(lang, "meteor.signal")}
              </Button>
            )}
          </div>
          <p className="text-sm tabular-nums text-fg-muted">
            {t(lang, "meteor.hits")} {hits} · {t(lang, "meteor.misses")} {misses} · {t(lang, "meteor.fa")} {fa}
          </p>
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
              {t(lang, "meteor.hits")} {hits} · {t(lang, "meteor.misses")} {misses} · {t(lang, "meteor.fa")} {fa}
            </p>
          }
        />
      ) : null}
    </GameShell>
  );
}

function NightSky({
  x,
  isTarget,
  visible,
  onSignal,
}: {
  x: number;
  isTarget: boolean;
  visible: boolean;
  onSignal: () => void;
}) {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useRef(new Object3D());

  useFrame(() => {
    if (!mesh.current) return;
    for (let i = 0; i < 60; i++) {
      dummy.current.position.set(-5 + ((i * 37) % 100) / 10, 2.2 + ((i * 19) % 28) / 10, -3.2);
      dummy.current.scale.setScalar(0.4);
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <GroundDisc color="#121a28" radius={9} />
      <instancedMesh ref={mesh} args={[undefined, undefined, 60]}>
        <icosahedronGeometry args={[0.06, 0]} />
        <meshBasicMaterial color="#cdd7ff" />
      </instancedMesh>
      <Cottage position={[0, 0, 2.4]} color="#2c3548" roof="#c45c3e" />
      <group
        visible={visible}
        position={[x, 1.15, 0]}
        onPointerUp={(e) => {
          e.stopPropagation();
          onSignal();
        }}
      >
        {isTarget ? <Traveler position={[0, 0, 0]} /> : <SpaceRock position={[0, 0, 0]} />}
        <mesh visible={false}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </>
  );
}
