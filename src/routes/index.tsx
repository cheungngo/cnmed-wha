import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HubIsland } from "@/components/hub-island";
import { StarRow } from "@/components/game-ui";
import { Button } from "@/components/ui/button";
import { MISSIONS, SEEDS, type MissionId } from "@/lib/catalog";
import { todayKey } from "@/lib/game-logic";
import { t } from "@/lib/i18n";
import { useAcademy } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

const CONTRIB: Record<MissionId, string> = {
  brew: "workshop",
  rainbow: "bridge",
  gems: "garden",
  dino: "railway",
  meteor: "observatory",
  ocean: "reef",
  echo: "stage",
};

function Home() {
  const lang = useAcademy((s) => s.lang);
  const setLang = useAcademy((s) => s.setLang);
  const seedsAvailable = useAcademy((s) => s.seedsAvailable);
  const plots = useAcademy((s) => s.plots);
  const plant = useAcademy((s) => s.plant);
  const clearGarden = useAcademy((s) => s.clearGarden);
  const stars = useAcademy((s) => s.stars);
  const contributions = useAcademy((s) => s.contributions);
  const finishedOn = useAcademy((s) => s.finishedOn);
  const finishToday = useAcademy((s) => s.finishToday);
  const calmRequested = useAcademy((s) => s.calmRequested);
  const setCalm = useAcademy((s) => s.setCalm);
  const [selected, setSelected] = useState<number | null>(null);
  const done = finishedOn === todayKey();

  function plantSeed(id: (typeof SEEDS)[number]["id"]) {
    if (selected == null) return;
    plant(selected, id);
    setSelected(null);
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-5 px-4 py-6">
      <header className="flex flex-wrap items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-fg-muted">{t(lang, "app.sub")}</p>
          <h1 className="font-display text-3xl leading-tight">{t(lang, "app.title")}</h1>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant={lang === "en" ? "default" : "secondary"} onClick={() => setLang("en")}>
            EN
          </Button>
          <Button size="sm" variant={lang === "zh" ? "default" : "secondary"} onClick={() => setLang("zh")}>
            繁
          </Button>
          <Button
            size="sm"
            variant={calmRequested ? "accent" : "secondary"}
            onClick={() => setCalm(!calmRequested)}
          >
            {t(lang, "app.calm")}
          </Button>
        </div>
      </header>
      <HubIsland selectedPlot={selected} onSelectPlot={setSelected} />
      <section className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl">{t(lang, "app.garden")}</h2>
          <p className="tabular-nums text-sm text-fg-muted">
            {t(lang, "app.seeds")} {seedsAvailable}
          </p>
        </div>
        <p className="mt-1 text-sm text-fg-muted">{t(lang, "app.plantHint")}</p>
        {selected != null && seedsAvailable > 0 && !plots[selected]?.seed ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {SEEDS.map((seed) => (
              <Button key={seed.id} size="sm" variant="secondary" onClick={() => plantSeed(seed.id)}>
                {t(lang, `seed.${seed.id}`)}
              </Button>
            ))}
          </div>
        ) : null}
        {plots.every((p) => p.seed) ? (
          <p className="mt-2 text-sm">{t(lang, "app.gardenFull")}</p>
        ) : null}
        <Button className="mt-3" variant="ghost" size="sm" onClick={clearGarden}>
          {t(lang, "app.clearGarden")}
        </Button>
      </section>
      <section>
        <h2 className="font-display text-xl">{t(lang, "app.missions")}</h2>
        <ul className="mt-3 grid gap-3">
          {MISSIONS.map((mission) => (
            <li key={mission.id}>
              <Link
                to="/play/$id"
                params={{ id: mission.id }}
                className="flex items-center gap-4 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-4 shadow-soft"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight">{t(lang, `${mission.id}.name`)}</p>
                  <p className="mt-1 text-sm text-fg-muted">{t(lang, `${mission.id}.blurb`)}</p>
                  <StarRow stars={stars[mission.id]} />
                  {contributions[mission.id] > 0 ? (
                    <p className="mt-1 text-xs text-accent">{t(lang, `contrib.${CONTRIB[mission.id]}`)}</p>
                  ) : null}
                </div>
                <span className="text-sm text-primary">{t(lang, "app.play")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div className="flex flex-col gap-2 pb-8">
        {done ? (
          <p className="rounded-[var(--radius-lg)] bg-bg-subtle px-4 py-3 text-sm">{t(lang, "app.finishedDone")}</p>
        ) : (
          <Button variant="secondary" size="lg" onClick={finishToday}>
            {t(lang, "app.finished")}
          </Button>
        )}
        <p className="text-xs text-fg-subtle">{t(lang, "app.powered")}</p>
      </div>
    </main>
  );
}
