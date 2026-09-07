import { useRef, useState } from "react";
import { ClientOnly } from "@/components/client-only";
import { Chip, ChipRow, EndCard, GameShell, StartCard } from "@/components/game-ui";
import { Button } from "@/components/ui/button";
import { Cauldron, GroundDisc, GroundShadow, Jar, Monster, ToyScene } from "@/components/toys";
import { useGameLoop } from "@/hooks/use-game-loop";
import { INGREDIENTS } from "@/lib/catalog";
import { checkBrewTap, pick, starsFor, type BrewMode } from "@/lib/game-logic";
import { t } from "@/lib/i18n";
import { useAcademy } from "@/lib/store";

const OUTCOMES = ["rain", "lantern", "flower"] as const;
const IDS = INGREDIENTS.map((i) => i.id);

export function BrewGame() {
  const lang = useAcademy((s) => s.lang);
  const recordSession = useAcademy((s) => s.recordSession);
  const best = useAcademy((s) => s.best.brew);
  const [mode, setMode] = useState<BrewMode>("remember");
  const [screen, setScreen] = useState<"start" | "watch" | "recall" | "end">("start");
  const [recipe, setRecipe] = useState<string[]>([]);
  const [added, setAdded] = useState<string[]>([]);
  const [grid, setGrid] = useState<string[]>([]);
  const [lit, setLit] = useState<string | null>(null);
  const [fill, setFill] = useState(0);
  const [happy, setHappy] = useState(false);
  const [outcome, setOutcome] = useState<(typeof OUTCOMES)[number] | null>(null);
  const [orders, setOrders] = useState(0);
  const [score, setScore] = useState(0);
  const [assisted, setAssisted] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [stars, setStars] = useState(0);
  const [status, setStatus] = useState(t(lang, "brew.purpose"));
  const elapsed = useRef(0);
  const step = useRef(0);

  function begin(nextMode = mode) {
    const rec = pick(IDS, 3);
    const extras = IDS.filter((id) => !rec.includes(id));
    const nextGrid = pick([...rec, ...extras.slice(0, 3)], 6);
    setRecipe(rec);
    setGrid(nextGrid);
    setAdded([]);
    setFill(0);
    setHappy(false);
    setOutcome(null);
    setLit(null);
    setAssisted(false);
    setShowRecipe(nextMode === "learn");
    elapsed.current = 0;
    step.current = 0;
    setScreen("watch");
    setStatus(t(lang, "brew.watch"));
  }

  function startRun() {
    setScore(0);
    setOrders(0);
    begin(mode);
  }

  function finish(finalScore: number, served: number) {
    const earned = starsFor(served, 2, 3);
    setStars(earned);
    recordSession({ mission: "brew", score: finalScore, stars: earned });
    setScreen("end");
    setStatus(t(lang, "end.title"));
  }

  useGameLoop(screen === "watch", (dt) => {
    elapsed.current += dt;
    const n = step.current;
    if (n >= recipe.length) {
      setLit(null);
      setScreen("recall");
      setShowRecipe(mode === "learn");
      setStatus(t(lang, "brew.yourTurn"));
      return;
    }
    const start = n * 0.95;
    if (elapsed.current < start + 0.65) setLit(recipe[n] ?? null);
    else {
      if (elapsed.current >= start + 0.95) step.current = n + 1;
      setLit(null);
    }
  });

  function tap(id: string) {
    if (screen !== "recall") return;
    const result = checkBrewTap(mode, recipe, added, id);
    if (!result.ok) {
      setStatus(result.reason === "out-of-order" ? t(lang, "brew.order") : t(lang, "brew.wrong"));
      if (mode === "learn") {
        setStatus(t(lang, "brew.repair"));
        setShowRecipe(true);
        setAssisted(true);
      }
      return;
    }
    const next = [...added, id];
    setAdded(next);
    setFill(next.length / recipe.length);
    setStatus(t(lang, "brew.added"));
    if (next.length === recipe.length) {
      const kind = OUTCOMES[orders % 3]!;
      setOutcome(kind);
      setHappy(true);
      const nextScore = score + (assisted ? 20 : 40);
      const nextOrders = orders + 1;
      setScore(nextScore);
      setOrders(nextOrders);
      setStatus(t(lang, `brew.outcome.${kind}`));
      if (nextOrders >= 3) window.setTimeout(() => finish(nextScore, nextOrders), 700);
      else window.setTimeout(() => begin(mode), 900);
    }
  }

  const recipeVisible = showRecipe || mode === "learn";

  return (
    <GameShell
      mission="brew"
      screen={screen === "start" ? "start" : screen === "end" ? "end" : "play"}
      status={status}
    >
      {screen === "start" ? (
        <StartCard
          lang={lang}
          mission="brew"
          onStart={startRun}
          extra={
            <ChipRow>
              {(["learn", "remember", "sequence"] as const).map((m) => (
                <Chip key={m} active={mode === m} onClick={() => setMode(m)}>
                  {t(lang, `brew.${m}`)}
                </Chip>
              ))}
            </ChipRow>
          }
        />
      ) : null}
      {screen !== "start" && screen !== "end" ? (
        <>
          <ClientOnly fallback={<div className="h-[42vh] rounded-[var(--radius-xl)] bg-sky" />}>
            <ToyScene background="#f0dcc3">
              <BrewTable
                grid={grid}
                lit={lit}
                fill={fill}
                happy={happy}
                outcome={outcome}
                pickable={screen === "recall"}
                onPick={tap}
              />
            </ToyScene>
          </ClientOnly>
          {recipeVisible ? (
            <p className="text-sm" data-recipe={recipe.join(",")}>
              {recipe.map((id) => t(lang, `brew.ing.${id}`)).join(" → ")}
            </p>
          ) : (
            <p className="text-sm text-fg-subtle">{t(lang, "brew.yourTurn")}</p>
          )}
          <div className="grid grid-cols-3 gap-2">
            {grid.map((id) => (
              <Button
                key={id}
                variant="secondary"
                size="lg"
                disabled={screen !== "recall" || added.includes(id)}
                onClick={() => tap(id)}
              >
                {t(lang, `brew.ing.${id}`)}
              </Button>
            ))}
          </div>
          {mode !== "learn" && screen === "recall" ? (
            <Button
              variant="outline"
              onClick={() => {
                setShowRecipe(true);
                setAssisted(true);
              }}
            >
              {t(lang, "brew.showAgain")}
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
              {t(lang, "brew.served")} {orders}
            </p>
          }
        />
      ) : null}
    </GameShell>
  );
}

function BrewTable({
  grid,
  lit,
  fill,
  happy,
  outcome,
  pickable,
  onPick,
}: {
  grid: string[];
  lit: string | null;
  fill: number;
  happy: boolean;
  outcome: (typeof OUTCOMES)[number] | null;
  pickable: boolean;
  onPick: (id: string) => void;
}) {
  return (
    <>
      <GroundDisc color="#e6d3b4" />
      <mesh position={[0, 0.08, 0.4]} receiveShadow>
        <boxGeometry args={[8.2, 0.16, 4.2]} />
        <meshStandardMaterial color="#c9a57a" roughness={0.85} flatShading />
      </mesh>
      <Monster position={[0, 0, -2.1]} happy={happy} color="#6d7a9c" />
      <Cauldron fill={fill} liquid={outcome === "flower" ? "#d67a8c" : outcome === "lantern" ? "#e0b15a" : "#60d6c3"} />
      {grid.map((id, i) => {
        const x = (i % 3) * 2.2 - 2.2;
        const z = 2.15 + Math.floor(i / 3) * 1.15;
        return (
          <group
            key={id}
            onPointerUp={(e) => {
              e.stopPropagation();
              if (pickable) onPick(id);
            }}
          >
            <Jar id={id} position={[x, 0, z]} lit={lit === id} />
            <mesh position={[x, 0.06, z]} rotation-x={-Math.PI / 2}>
              <circleGeometry args={[0.38, 16]} />
              <meshStandardMaterial color="#efe8dc" roughness={0.9} />
            </mesh>
          </group>
        );
      })}
      {outcome === "flower" ? (
        <mesh position={[1.6, 0.4, -0.2]} castShadow>
          <coneGeometry args={[0.25, 0.5, 8]} />
          <meshStandardMaterial color="#d67a8c" flatShading />
        </mesh>
      ) : null}
      {outcome === "lantern" ? (
        <mesh position={[-1.6, 0.7, -0.4]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.4, 10]} />
          <meshStandardMaterial color="#e0b15a" emissive="#e0b15a" emissiveIntensity={0.6} flatShading />
        </mesh>
      ) : null}
      {outcome === "rain" ? (
        <mesh position={[0, 2.1, -1.4]}>
          <sphereGeometry args={[0.35, 10, 8]} />
          <meshStandardMaterial color="#9bb8c9" transparent opacity={0.7} flatShading />
        </mesh>
      ) : null}
      <GroundShadow position={[0, 0, -2.1]} />
    </>
  );
}
