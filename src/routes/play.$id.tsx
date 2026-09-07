import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BrewGame } from "@/games/brew";
import { DinoGame } from "@/games/dino";
import { EchoGame } from "@/games/echo";
import { GemsGame } from "@/games/gems";
import { MeteorGame } from "@/games/meteor";
import { OceanGame } from "@/games/ocean";
import { RainbowGame } from "@/games/rainbow";
import { isMissionId } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import { useAcademy } from "@/lib/store";

export const Route = createFileRoute("/play/$id")({ component: Play });

function Play() {
  const { id } = Route.useParams();
  const lang = useAcademy((s) => s.lang);
  if (!isMissionId(id)) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-3 p-6 text-center">
        <p>{t(lang, "app.hub")}</p>
        <Button asChild>
          <Link to="/">{t(lang, "end.hub")}</Link>
        </Button>
      </main>
    );
  }
  if (id === "brew") return <BrewGame />;
  if (id === "rainbow") return <RainbowGame />;
  if (id === "gems") return <GemsGame />;
  if (id === "dino") return <DinoGame />;
  if (id === "meteor") return <MeteorGame />;
  if (id === "ocean") return <OceanGame />;
  return <EchoGame />;
}
