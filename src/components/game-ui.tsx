import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Moon, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import type { MissionId } from "@/lib/catalog";
import type { Lang } from "@/lib/store";
import { useAcademy } from "@/lib/store";

export function StarRow({ stars, label }: { stars: number; label?: string }) {
  return (
    <p className="mt-2 text-sm text-fg-muted" aria-label={label}>
      {Array.from({ length: 3 }, (_, i) => (
        <span
          key={i}
          className={cn("mr-1 inline-block size-3 rounded-full", i < stars ? "bg-primary" : "bg-bg-subtle")}
        />
      ))}
      {label ? <span className="ml-2 tabular-nums">{label}</span> : null}
    </p>
  );
}

export function ChipRow({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex flex-wrap gap-2">{children}</div>;
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Button type="button" size="sm" variant={active ? "default" : "secondary"} onClick={onClick}>
      {children}
    </Button>
  );
}

export function Meter({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-bg-subtle">
      <div
        className={cn("h-full rounded-full transition-[width] duration-150", value < 0.2 ? "bg-primary" : "bg-accent")}
        style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
      />
    </div>
  );
}

export function StartCard({
  lang,
  mission,
  extra,
  onStart,
}: {
  lang: Lang;
  mission: MissionId;
  extra?: ReactNode;
  onStart: () => void;
}) {
  return (
    <section className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 shadow-soft">
      <h2 className="font-display text-2xl">{t(lang, `${mission}.name`)}</h2>
      <p className="mt-2 text-fg-muted">{t(lang, `${mission}.purpose`)}</p>
      <p className="mt-2 text-sm text-fg-subtle">{t(lang, `${mission}.how`)}</p>
      {extra}
      <Button className="mt-4 w-full" size="lg" onClick={onStart}>
        {t(lang, "app.start")}
      </Button>
    </section>
  );
}

export function EndCard({
  lang,
  score,
  stars,
  best,
  lines,
  onAgain,
}: {
  lang: Lang;
  score: number;
  stars: number;
  best: number;
  lines?: ReactNode;
  onAgain: () => void;
}) {
  return (
    <section className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 shadow-soft">
      <h2 className="font-display text-2xl">{t(lang, "end.title")}</h2>
      <p className="mt-3 font-display text-xl tabular-nums">
        {t(lang, "app.score")} {score}
      </p>
      <StarRow stars={stars} label={`${t(lang, "app.stars")} · ${t(lang, "app.best")} ${best}`} />
      {lines}
      <div className="mt-4 flex flex-col gap-2">
        <Button size="lg" onClick={onAgain}>
          {t(lang, "app.again")}
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/">{t(lang, "end.hub")}</Link>
        </Button>
      </div>
    </section>
  );
}

export function GameShell({
  mission,
  screen,
  status,
  children,
  controls,
}: {
  mission: MissionId;
  screen: "start" | "play" | "end";
  status: string;
  children: ReactNode;
  controls?: ReactNode;
}) {
  const lang = useAcademy((s) => s.lang);
  const paused = useAcademy((s) => s.paused);
  const setPaused = useAcademy((s) => s.setPaused);
  const calmRequested = useAcademy((s) => s.calmRequested);
  const setCalm = useAcademy((s) => s.setCalm);
  const lastSeedBanner = useAcademy((s) => s.lastSeedBanner);
  const dismissBanner = useAcademy((s) => s.dismissBanner);
  const name = t(lang, `${mission}.name`);

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-3 px-4 py-4">
      <header className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild aria-label={t(lang, "app.back")}>
          <Link to="/" onClick={() => setPaused(false)}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg leading-tight">{name}</p>
        </div>
        <Button
          variant={calmRequested ? "accent" : "secondary"}
          size="sm"
          onClick={() => setCalm(!calmRequested)}
          aria-pressed={calmRequested}
        >
          <Moon className="size-4" />
          {calmRequested ? t(lang, "app.calmOn") : t(lang, "app.calm")}
        </Button>
        {screen === "play" ? (
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setPaused(!paused)}
            aria-label={t(lang, paused ? "app.resume" : "app.pause")}
          >
            {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </Button>
        ) : null}
      </header>
      <p className="text-sm text-fg-muted" role="status" aria-live="polite">
        {status}
      </p>
      {lastSeedBanner ? (
        <div className="flex items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-elevated px-4 py-3">
          <p className="text-sm">{t(lang, "app.seedEarned")}</p>
          <Button variant="ghost" size="sm" onClick={dismissBanner}>
            {t(lang, "app.next")}
          </Button>
        </div>
      ) : null}
      {children}
      {controls ? (
        <div className="flex flex-wrap gap-2" aria-label="Game controls">
          {controls}
        </div>
      ) : null}
      {paused && screen === "play" ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-sm rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-soft">
            <h2 className="font-display text-2xl">{t(lang, "app.pause")}</h2>
            <div className="mt-4 flex flex-col gap-2">
              <Button onClick={() => setPaused(false)}>{t(lang, "app.resume")}</Button>
              <Button variant="secondary" asChild>
                <Link to="/" onClick={() => setPaused(false)}>
                  {t(lang, "app.hub")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
