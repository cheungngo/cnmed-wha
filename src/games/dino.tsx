import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { ClientOnly } from "@/components/client-only";
import { Chip, ChipRow, EndCard, GameShell, StartCard } from "@/components/game-ui";
import { Button } from "@/components/ui/button";
import { Cottage, Dino, GroundDisc, GroundShadow, Train, ToyScene } from "@/components/toys";
import { STATIONS } from "@/lib/catalog";
import { junctionStation, lerpPath, starsFor } from "@/lib/game-logic";
import { t } from "@/lib/i18n";
import { useAcademy, useCalm } from "@/lib/store";

function pathPoints(j1: "L" | "R", j2: "L" | "R", practice: boolean): [number, number, number][] {
  const start: [number, number, number] = [-4.2, 0.2, 0];
  const mid: [number, number, number] = [-0.6, 0.2, j1 === "L" ? -1.1 : 1.1];
  if (practice) {
    const end = j1 === "L" ? STATIONS[0]!.pos : STATIONS[2]!.pos;
    return [start, [0.4, 0.2, j1 === "L" ? -1.1 : 1.1], [end[0], 0.2, end[2]]];
  }
  const dest = STATIONS[junctionStation(j1, j2)]!.pos;
  return [start, mid, [1.4, 0.2, dest[2] * 0.55], [dest[0], 0.2, dest[2]]];
}

export function DinoGame() {
  const lang = useAcademy((s) => s.lang);
  const recordSession = useAcademy((s) => s.recordSession);
  const best = useAcademy((s) => s.best.dino);
  const [mode, setMode] = useState<"practice" | "puzzle">("puzzle");
  const [screen, setScreen] = useState<"start" | "plan" | "run" | "end">("start");
  const [j1, setJ1] = useState<"L" | "R">("L");
  const [j2, setJ2] = useState<"L" | "R">("L");
  const [goal, setGoal] = useState(0);
  const [preview, setPreview] = useState(false);
  const [score, setScore] = useState(0);
  const [arrivals, setArrivals] = useState(0);
  const [stars, setStars] = useState(0);
  const [status, setStatus] = useState(t(lang, "dino.purpose"));
  const [runKey, setRunKey] = useState(0);
  const [arrived, setArrived] = useState<number | null>(null);

  function stationName(i: number) {
    return t(lang, i === 0 ? "dino.leaf" : i === 1 ? "dino.berry" : "dino.shell");
  }
  function goText(i: number) {
    return t(lang, "dino.go").replace("{station}", stationName(i));
  }

  function deal() {
    setScore(0);
    setArrivals(0);
    setJ1("L");
    setJ2("L");
    const g = mode === "practice" ? 0 : Math.floor(Math.random() * 3);
    setGoal(g);
    setPreview(false);
    setArrived(null);
    setScreen("plan");
    setStatus(goText(g));
  }

  function toggle(which: 1 | 2) {
    if (screen !== "plan") return;
    if (which === 1) setJ1((v) => (v === "L" ? "R" : "L"));
    else setJ2((v) => (v === "L" ? "R" : "L"));
  }

  function undo() {
    if (screen !== "plan") return;
    if (mode === "practice") {
      setJ1("L");
      return;
    }
    setJ2("L");
  }

  function run() {
    if (screen !== "plan") return;
    setPreview(false);
    setScreen("run");
    setRunKey((k) => k + 1);
    setStatus(t(lang, "app.run"));
  }

  function onArrive() {
    const dest = mode === "practice" ? (j1 === "L" ? 0 : 2) : junctionStation(j1, j2);
    setArrived(dest);
    if (dest === goal) {
      const nextScore = score + 30;
      const nextArrivals = arrivals + 1;
      setScore(nextScore);
      setArrivals(nextArrivals);
      setStatus(t(lang, "dino.arrived"));
      if (nextArrivals >= 4) {
        const earned = starsFor(nextArrivals, 2, 4);
        setStars(earned);
        recordSession({ mission: "dino", score: nextScore, stars: earned });
        setScreen("end");
        return;
      }
      const nextGoal = mode === "practice" ? (Math.random() < 0.5 ? 0 : 2) : Math.floor(Math.random() * 3);
      setGoal(nextGoal);
      setStatus(goText(nextGoal));
      setScreen("plan");
    } else {
      setStatus(`${t(lang, "dino.missed")} ${goText(goal)}`);
      setScreen("plan");
    }
  }

  const points = useMemo(() => pathPoints(j1, j2, mode === "practice"), [j1, j2, mode]);

  return (
    <GameShell
      mission="dino"
      screen={screen === "start" ? "start" : screen === "end" ? "end" : "play"}
      status={status}
    >
      {screen === "start" ? (
        <StartCard
          lang={lang}
          mission="dino"
          onStart={deal}
          extra={
            <ChipRow>
              <Chip active={mode === "practice"} onClick={() => setMode("practice")}>
                {t(lang, "dino.practice")}
              </Chip>
              <Chip active={mode === "puzzle"} onClick={() => setMode("puzzle")}>
                {t(lang, "dino.puzzle")}
              </Chip>
            </ChipRow>
          }
        />
      ) : null}
      {screen !== "start" && screen !== "end" ? (
        <>
          <ClientOnly fallback={<div className="h-[42vh] rounded-[var(--radius-xl)] bg-sky" />}>
            <ToyScene background="#d7e6c4">
              <TrackWorld
                j1={j1}
                j2={j2}
                practice={mode === "practice"}
                points={points}
                preview={preview}
                running={screen === "run"}
                runKey={runKey}
                goal={goal}
                arrived={arrived}
                onArrive={onArrive}
              />
            </ToyScene>
          </ClientOnly>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" disabled={screen !== "plan"} onClick={() => toggle(1)}>
              {t(lang, "dino.j1")}: {t(lang, j1 === "L" ? "dino.left" : "dino.right")}
            </Button>
            {mode === "puzzle" ? (
              <Button variant="secondary" disabled={screen !== "plan"} onClick={() => toggle(2)}>
                {t(lang, "dino.j2")}: {t(lang, j2 === "L" ? "dino.left" : "dino.right")}
              </Button>
            ) : null}
            <Button variant="outline" disabled={screen !== "plan"} onClick={() => setPreview(true)}>
              {t(lang, "app.preview")}
            </Button>
            <Button variant="outline" disabled={screen !== "plan"} onClick={undo}>
              {t(lang, "app.undo")}
            </Button>
            <Button disabled={screen !== "plan"} onClick={run}>
              {t(lang, "app.run")}
            </Button>
          </div>
          <p className="text-sm text-fg-muted">{goText(goal)}</p>
        </>
      ) : null}
      {screen === "end" ? (
        <EndCard lang={lang} score={score} stars={stars} best={Math.max(best, score)} onAgain={() => setScreen("start")} />
      ) : null}
    </GameShell>
  );
}

function TrackWorld({
  j1,
  j2,
  practice,
  points,
  preview,
  running,
  runKey,
  goal,
  arrived,
  onArrive,
}: {
  j1: "L" | "R";
  j2: "L" | "R";
  practice: boolean;
  points: [number, number, number][];
  preview: boolean;
  running: boolean;
  runKey: number;
  goal: number;
  arrived: number | null;
  onArrive: () => void;
}) {
  const calm = useCalm();
  const tRef = useRef(0);
  const done = useRef(false);
  const group = useRef<Group>(null);
  const keyRef = useRef(runKey);

  useFrame((_, delta) => {
    if (keyRef.current !== runKey) {
      keyRef.current = runKey;
      tRef.current = 0;
      done.current = false;
    }
    if (!running || !group.current) {
      if (group.current && points[0]) group.current.position.set(...points[0]);
      return;
    }
    const dt = Math.min(delta, 0.1);
    tRef.current += calm ? dt * 1.8 : dt;
    const u = Math.min(1, tRef.current / 2.4);
    const pos = lerpPath(points, u);
    group.current.position.set(...pos);
    if (u >= 1 && !done.current) {
      done.current = true;
      onArrive();
    }
  });

  const dest = practice ? (j1 === "L" ? 0 : 2) : junctionStation(j1, j2);

  return (
    <>
      <GroundDisc color="#cfe3b8" />
      <Rail from={[-4.4, 0.08, 0]} to={[-0.6, 0.08, 0]} />
      <Rail from={[-0.6, 0.08, 0]} to={[-0.6, 0.08, j1 === "L" ? -1.2 : 1.2]} />
      {practice ? (
        <Rail from={[-0.6, 0.08, j1 === "L" ? -1.2 : 1.2]} to={[3.2, 0.08, j1 === "L" ? -2.1 : 2.1]} />
      ) : (
        <>
          <Rail
            from={[-0.6, 0.08, j1 === "L" ? -1.2 : 1.2]}
            to={[1.4, 0.08, dest === 0 ? -2 : dest === 2 ? 2 : 0]}
          />
          <Rail from={[1.4, 0.08, dest === 0 ? -2 : dest === 2 ? 2 : 0]} to={[3.2, 0.08, STATIONS[dest]!.pos[2]]} />
        </>
      )}
      {STATIONS.map((st, i) => (
        <group key={st.id}>
          <Cottage position={st.pos} color={st.color} roof={i === goal ? "#e0b15a" : "#6b4b3a"} />
          <mesh position={[st.pos[0], 0.06, st.pos[2]]}>
            <boxGeometry args={[1.3, 0.08, 1.1]} />
            <meshStandardMaterial color={st.color} roughness={0.85} flatShading />
          </mesh>
        </group>
      ))}
      <SwitchArm position={[-0.6, 0.45, 0]} left={j1 === "L"} />
      {practice ? null : <SwitchArm position={[1.4, 0.45, 0]} left={j2 === "L"} />}
      {preview
        ? points.map((p, i) => (
            <mesh key={i} position={[p[0], 0.35, p[2]]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial color="#e0b15a" flatShading />
            </mesh>
          ))
        : null}
      <group ref={group} position={points[0]}>
        <Train position={[0, 0, 0]} />
        <Dino position={[0.15, 0.55, 0]} scale={0.85} />
      </group>
      <GroundShadow position={points[0] ?? [-4.2, 0, 0]} />
      {arrived === goal ? <Dino position={[STATIONS[goal]!.pos[0], 0.2, STATIONS[goal]!.pos[2] + 0.8]} /> : null}
    </>
  );
}

function SwitchArm({ position, left }: { position: [number, number, number]; left: boolean }) {
  return (
    <group position={position} rotation-y={left ? 0.55 : -0.55}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.12, 0.12]} />
        <meshStandardMaterial color="#c45c3e" roughness={0.7} flatShading />
      </mesh>
    </group>
  );
}

function Rail({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const mid: [number, number, number] = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2];
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  return (
    <mesh position={mid} rotation-y={Math.atan2(dx, dz)} receiveShadow>
      <boxGeometry args={[0.38, 0.08, Math.max(0.2, Math.hypot(dx, dz))]} />
      <meshStandardMaterial color="#6d7278" roughness={0.8} flatShading />
    </mesh>
  );
}
