import { useNavigate } from "@tanstack/react-router";
import { ClientOnly } from "@/components/client-only";
import {
  Cauldron,
  Cottage,
  Crystal,
  Dino,
  GroundDisc,
  GroundShadow,
  Pine,
  ToyScene,
} from "@/components/toys";
import { LANDMARKS, MISSIONS, PLOT_POSITIONS, SEEDS, type MissionId } from "@/lib/catalog";
import { useAcademy } from "@/lib/store";

function Landmark({ id, lit }: { id: MissionId; lit: boolean }) {
  if (id === "brew") {
    return (
      <group>
        <Cottage position={[0, 0, 0]} color="#efe8dc" roof="#c45c3e" />
        <group position={[0.7, 0, 0.7]} scale={0.45}>
          <Cauldron fill={lit ? 0.8 : 0.15} />
        </group>
      </group>
    );
  }
  if (id === "rainbow") {
    return (
      <group>
        <mesh position={[0, 0.7, 0]} rotation-z={Math.PI / 2} castShadow>
          <torusGeometry args={[0.7, 0.1, 8, 16, Math.PI]} />
          <meshStandardMaterial color={lit ? "#c45c3e" : "#b8c4b0"} roughness={0.7} flatShading />
        </mesh>
      </group>
    );
  }
  if (id === "gems") {
    return (
      <group>
        <Crystal position={[0, 0, 0]} color="#5c9eaf" lit={lit} />
        <Crystal position={[0.55, 0, 0.2]} color="#4f8a74" />
      </group>
    );
  }
  if (id === "dino") {
    return (
      <group>
        <Cottage position={[0, 0, 0]} />
        {lit ? <Dino position={[0.2, 0.55, 0]} scale={0.7} /> : null}
      </group>
    );
  }
  if (id === "meteor") {
    return <Cottage position={[0, 0, 0]} color="#4a5568" roof="#2a241c" />;
  }
  if (id === "ocean") {
    return (
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.4, 0.7, 0.9]} />
        <meshStandardMaterial
          color={lit ? "#7eb8c9" : "#9bb"}
          roughness={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>
    );
  }
  return (
    <group>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[0.9, 1, 0.2, 20]} />
        <meshStandardMaterial color="#8c6a4a" roughness={0.85} flatShading />
      </mesh>
      {lit ? <Dino position={[0, 0.2, 0]} scale={0.8} /> : null}
    </group>
  );
}

function Island({
  selectedPlot,
  onSelectPlot,
}: {
  selectedPlot: number | null;
  onSelectPlot?: (i: number) => void;
}) {
  const navigate = useNavigate();
  const contributions = useAcademy((s) => s.contributions);
  const plots = useAcademy((s) => s.plots);

  return (
    <ToyScene background="#dfeee6" halfW={7} halfD={5.5} className="h-[min(52vh,480px)]">
      <GroundDisc color="#cfe6c4" radius={9} />
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.4, 0.08, 32]} />
        <meshStandardMaterial color="#e7d7b5" roughness={0.9} flatShading />
      </mesh>
      {MISSIONS.map((mission) => {
        const pos = LANDMARKS[mission.id];
        const lit = contributions[mission.id] > 0;
        return (
          <group
            key={mission.id}
            position={pos}
            onPointerUp={(e) => {
              e.stopPropagation();
              void navigate({ to: "/play/$id", params: { id: mission.id } });
            }}
          >
            <Landmark id={mission.id} lit={lit} />
            <mesh visible={false} position={[0, 0.6, 0]}>
              <boxGeometry args={[1.8, 1.6, 1.8]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          </group>
        );
      })}
      {PLOT_POSITIONS.map((pos, i) => {
        const seed = plots[i]?.seed;
        const selected = selectedPlot === i;
        const crystal = SEEDS.find((s) => s.id === seed)?.crystal ?? "#c5d8e6";
        return (
          <group
            key={i}
            position={pos}
            onPointerUp={(e) => {
              e.stopPropagation();
              onSelectPlot?.(i);
            }}
          >
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]}>
              <circleGeometry args={[0.38, 16]} />
              <meshStandardMaterial color={selected ? "#e0b15a" : "#b79263"} roughness={0.9} flatShading />
            </mesh>
            {seed ? <Crystal position={[0, 0.02, 0]} color={crystal} /> : null}
          </group>
        );
      })}
      <Pine position={[4.6, 0, 3.4]} scale={0.8} />
      <Pine position={[-4.8, 0, -0.4]} scale={0.7} />
      <GroundShadow position={[0, 0, 0.2]} />
    </ToyScene>
  );
}

export function HubIsland({
  selectedPlot,
  onSelectPlot,
}: {
  selectedPlot: number | null;
  onSelectPlot?: (i: number) => void;
}) {
  return (
    <ClientOnly
      fallback={
        <div className="relative h-[min(52vh,480px)] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-sky">
          <canvas className="h-full w-full" aria-hidden />
        </div>
      }
    >
      <Island selectedPlot={selectedPlot} onSelectPlot={onSelectPlot} />
    </ClientOnly>
  );
}
