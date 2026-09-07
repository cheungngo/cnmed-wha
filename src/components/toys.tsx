import { Canvas, useThree } from "@react-three/fiber";
import { useLayoutEffect, type ReactNode } from "react";
import { Color, PCFShadowMap, type OrthographicCamera as OrthoCam } from "three";
import { INGREDIENTS } from "@/lib/catalog";
import { useCalm } from "@/lib/store";
import { cn } from "@/lib/cn";

type Vec3 = [number, number, number];

function ToyMat({
  color,
  emissive = "#000000",
  intensity = 0,
}: {
  color: string;
  emissive?: string;
  intensity?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.78}
      metalness={0.04}
      flatShading
      emissive={emissive}
      emissiveIntensity={intensity}
    />
  );
}

function Eyes({ y = 0.22, z = 0.28, spread = 0.14, size = 0.08 }: { y?: number; z?: number; spread?: number; size?: number }) {
  return (
    <group>
      {[-1, 1].map((side) => (
        <mesh key={`w${side}`} position={[side * spread, y, z]}>
          <sphereGeometry args={[size, 10, 8]} />
          <ToyMat color="#f7f1e8" />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <mesh key={`p${side}`} position={[side * spread, y, z + size * 0.7]}>
          <sphereGeometry args={[size * 0.42, 8, 6]} />
          <ToyMat color="#2a241c" />
        </mesh>
      ))}
    </group>
  );
}

export function GroundDisc({ color = "#d3e4cc", radius = 8 }: { color?: string; radius?: number }) {
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <circleGeometry args={[radius, 48]} />
      <meshStandardMaterial color={color} roughness={0.95} metalness={0} />
    </mesh>
  );
}

export function GroundShadow({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <mesh position={[position[0], 0.02, position[2]]} rotation-x={-Math.PI / 2} scale={scale}>
      <circleGeometry args={[0.45, 20]} />
      <meshBasicMaterial color="#2a241c" transparent opacity={0.16} />
    </mesh>
  );
}

export function Monster({
  color = "#7d6bb3",
  position = [0, 0, 0],
  scale = 1,
  happy = false,
}: {
  color?: string;
  position?: Vec3;
  scale?: number;
  happy?: boolean;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.55, 14, 12]} />
        <ToyMat color={color} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.42, 14, 10]} />
        <ToyMat color={color} />
      </mesh>
      <mesh position={[-0.28, 1.28, 0]} rotation={[0, 0, 0.4]} castShadow>
        <coneGeometry args={[0.12, 0.32, 8]} />
        <ToyMat color="#e8d9a8" />
      </mesh>
      <mesh position={[0.28, 1.28, 0]} rotation={[0, 0, -0.4]} castShadow>
        <coneGeometry args={[0.12, 0.32, 8]} />
        <ToyMat color="#e8d9a8" />
      </mesh>
      <Eyes y={0.95} z={0.42} />
      {happy ? (
        <mesh position={[0, 0.78, 0.46]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12, 0.03, 6, 10, Math.PI]} />
          <ToyMat color="#2a241c" />
        </mesh>
      ) : null}
    </group>
  );
}

export function Jar({ id, position, lit = false, scale = 1 }: { id: string; position: Vec3; lit?: boolean; scale?: number }) {
  const item = INGREDIENTS.find((i) => i.id === id);
  const emissive = lit ? "#fff0a0" : "#000000";
  const intensity = lit ? 0.7 : 0;
  if (!item) return null;
  return (
    <group position={position} scale={scale}>
      {item.shape === "sphere" ? (
        <mesh castShadow position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.28, 12, 10]} />
          <ToyMat color={item.color} emissive={emissive} intensity={intensity} />
        </mesh>
      ) : null}
      {item.shape === "box" ? (
        <mesh castShadow position={[0, 0.26, 0]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <ToyMat color={item.color} emissive={emissive} intensity={intensity} />
        </mesh>
      ) : null}
      {item.shape === "octa" ? (
        <mesh castShadow position={[0, 0.34, 0]}>
          <octahedronGeometry args={[0.3]} />
          <ToyMat color={item.color} emissive={emissive} intensity={intensity} />
        </mesh>
      ) : null}
      {item.shape === "cyl" ? (
        <mesh castShadow position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.42, 14]} />
          <ToyMat color={item.color} emissive={emissive} intensity={intensity} />
        </mesh>
      ) : null}
      {item.shape === "cone" ? (
        <mesh castShadow position={[0, 0.28, 0]}>
          <coneGeometry args={[0.28, 0.5, 10]} />
          <ToyMat color={item.color} emissive={emissive} intensity={intensity} />
        </mesh>
      ) : null}
      {item.shape === "drop" ? (
        <mesh castShadow position={[0, 0.3, 0]} scale={[1, 1.35, 1]}>
          <sphereGeometry args={[0.22, 12, 10]} />
          <ToyMat color={item.color} emissive={emissive} intensity={intensity} />
        </mesh>
      ) : null}
    </group>
  );
}

export function Cauldron({ fill = 0, liquid = "#60d6c3" }: { fill?: number; liquid?: string }) {
  return (
    <group>
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.95, 0.72, 1.05, 20, 1, true]} />
        <meshStandardMaterial color="#5c4d66" roughness={0.7} side={2} flatShading />
      </mesh>
      <mesh position={[0, 1.08, 0]} rotation-x={Math.PI / 2} castShadow>
        <torusGeometry args={[0.95, 0.08, 8, 24]} />
        <ToyMat color="#a795b7" />
      </mesh>
      <mesh position={[0, 0.18 + fill * 0.7, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.08, 20]} />
        <ToyMat color={liquid} emissive={liquid} intensity={fill > 0.2 ? 0.25 : 0} />
      </mesh>
    </group>
  );
}

export function Crystal({
  position,
  color = "#5c9eaf",
  lit = false,
  lift = 0,
}: {
  position: Vec3;
  color?: string;
  lit?: boolean;
  lift?: number;
}) {
  return (
    <group position={[position[0], position[1] + lift, position[2]]}>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[0.42, 0.5, 0.22, 12]} />
        <ToyMat color="#efe8f4" />
      </mesh>
      <mesh position={[0, 0.58, 0]} castShadow>
        <octahedronGeometry args={[0.38]} />
        <ToyMat color={color} emissive={lit ? "#fff0a0" : "#000"} intensity={lit ? 0.85 : 0} />
      </mesh>
    </group>
  );
}

export function Pine({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 0.9, 8]} />
        <ToyMat color="#8b5a32" />
      </mesh>
      <mesh position={[0, 1.15, 0]} castShadow>
        <coneGeometry args={[0.55, 1.1, 8]} />
        <ToyMat color="#4f8a74" />
      </mesh>
    </group>
  );
}

export function PerformerFigure({
  id,
  position = [0, 0, 0],
  visible = true,
  celebrate = false,
}: {
  id: string;
  position?: Vec3;
  visible?: boolean;
  celebrate?: boolean;
}) {
  const colors: Record<string, string> = {
    fox: "#c45c3e",
    bear: "#8b5a32",
    bunny: "#e6d5bc",
    frog: "#4f8a74",
  };
  const color = colors[id] ?? "#c45c3e";
  const ear = id === "bunny" ? "long" : id === "frog" ? "none" : id === "fox" ? "point" : "round";
  return (
    <group position={position} visible={visible}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.48, 14, 12]} />
        <ToyMat color={color} />
      </mesh>
      <mesh position={[0, 1.05, 0.08]} castShadow>
        <sphereGeometry args={[0.32, 12, 10]} />
        <ToyMat color={color} />
      </mesh>
      {ear === "point"
        ? [-1, 1].map((side) => (
            <mesh key={side} position={[side * 0.2, 1.38, 0]} rotation={[0, 0, side * -0.4]} castShadow>
              <coneGeometry args={[0.1, 0.28, 8]} />
              <ToyMat color={color} />
            </mesh>
          ))
        : null}
      {ear === "round"
        ? [-1, 1].map((side) => (
            <mesh key={side} position={[side * 0.22, 1.32, 0]} castShadow>
              <sphereGeometry args={[0.12, 8, 8]} />
              <ToyMat color={color} />
            </mesh>
          ))
        : null}
      {ear === "long"
        ? [-1, 1].map((side) => (
            <mesh key={side} position={[side * 0.14, 1.5, 0]} scale={[0.7, 1.6, 0.5]} castShadow>
              <sphereGeometry args={[0.12, 8, 8]} />
              <ToyMat color={color} />
            </mesh>
          ))
        : null}
      <Eyes y={1.08} z={0.3} spread={0.12} size={0.07} />
      {celebrate ? (
        <mesh position={[0.42, 1.15, 0]} rotation={[0, 0, -0.6]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.4, 8]} />
          <ToyMat color={color} />
        </mesh>
      ) : null}
    </group>
  );
}

export function Train({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[1.15, 0.42, 0.55]} />
        <ToyMat color="#c45c3e" />
      </mesh>
      <mesh position={[0.28, 0.58, 0]} castShadow>
        <boxGeometry args={[0.45, 0.32, 0.5]} />
        <ToyMat color="#efe8dc" />
      </mesh>
      <mesh position={[-0.45, 0.55, 0]} castShadow>
        <boxGeometry args={[0.28, 0.38, 0.28]} />
        <ToyMat color="#4f8a74" />
      </mesh>
      {[-0.32, 0.32].flatMap((x) =>
        [-0.22, 0.22].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.12, z]} rotation-z={Math.PI / 2} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 10]} />
            <ToyMat color="#2a241c" />
          </mesh>
        )),
      )}
    </group>
  );
}

export function Dino({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <sphereGeometry args={[0.28, 12, 10]} />
        <ToyMat color="#7aa35a" />
      </mesh>
      <mesh position={[0.28, 0.38, 0]} castShadow>
        <sphereGeometry args={[0.18, 10, 8]} />
        <ToyMat color="#7aa35a" />
      </mesh>
      <mesh position={[0.4, 0.36, 0]} castShadow>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <ToyMat color="#c45c3e" />
      </mesh>
      <Eyes y={0.44} z={0.18} spread={0.08} size={0.05} />
    </group>
  );
}

export function Fish({
  color,
  striped,
  position,
  rotationY = 0,
}: {
  color: string;
  striped: boolean;
  position: Vec3;
  rotationY?: number;
}) {
  return (
    <group position={position} rotation-y={rotationY}>
      <mesh castShadow scale={[1.4, 0.7, 0.55]}>
        <sphereGeometry args={[0.28, 12, 10]} />
        <ToyMat color={color} />
      </mesh>
      <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <coneGeometry args={[0.16, 0.28, 8]} />
        <ToyMat color={color} />
      </mesh>
      {striped
        ? [-0.08, 0.08].map((x) => (
            <mesh key={x} position={[x, 0.02, 0.12]} scale={[0.12, 0.42, 0.08]}>
              <boxGeometry args={[1, 1, 1]} />
              <ToyMat color="#f7f1e8" />
            </mesh>
          ))
        : null}
      <mesh position={[0.22, 0.06, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <ToyMat color="#2a241c" />
      </mesh>
    </group>
  );
}

export function Courier({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <sphereGeometry args={[0.26, 12, 10]} />
        <ToyMat color="#c45c3e" />
      </mesh>
      <mesh position={[0, 0.62, 0]} castShadow>
        <sphereGeometry args={[0.2, 10, 8]} />
        <ToyMat color="#f0dcc3" />
      </mesh>
      <mesh position={[0, 0.86, 0]} castShadow>
        <coneGeometry args={[0.16, 0.28, 8]} />
        <ToyMat color="#4f8a74" />
      </mesh>
      <mesh position={[0.28, 0.38, 0]} castShadow>
        <boxGeometry args={[0.18, 0.16, 0.18]} />
        <ToyMat color="#e0b15a" />
      </mesh>
      <Eyes y={0.64} z={0.16} spread={0.08} size={0.045} />
    </group>
  );
}

export function Traveler({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <capsuleGeometry args={[0.18, 0.28, 6, 10]} />
        <ToyMat color="#e8d9a8" />
      </mesh>
      <mesh position={[0, 0.38, 0]} castShadow>
        <sphereGeometry args={[0.16, 10, 8]} />
        <ToyMat color="#7ea0b8" />
      </mesh>
      <mesh position={[0, 0.58, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.22, 6]} />
        <ToyMat color="#e0b15a" />
      </mesh>
    </group>
  );
}

export function SpaceRock({ position }: { position: Vec3 }) {
  return (
    <mesh position={position} castShadow>
      <icosahedronGeometry args={[0.28, 0]} />
      <ToyMat color="#8c8297" />
    </mesh>
  );
}

export function Cottage({
  position,
  color = "#c45c3e",
  roof = "#6b4b3a",
}: {
  position: Vec3;
  color?: string;
  roof?: string;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.1, 0.8, 0.9]} />
        <ToyMat color={color} />
      </mesh>
      <mesh position={[0, 0.95, 0]} rotation-y={Math.PI / 4} castShadow>
        <coneGeometry args={[0.85, 0.7, 4]} />
        <ToyMat color={roof} />
      </mesh>
    </group>
  );
}

function FitCamera({ halfW = 6, halfD = 4.5 }: { halfW?: number; halfD?: number }) {
  const { size, camera } = useThree();
  useLayoutEffect(() => {
    const cam = camera as OrthoCam;
    const aspect = Math.max(size.width / Math.max(size.height, 1), 0.5);
    const half = Math.max(halfD, halfW / aspect);
    cam.left = -half * aspect;
    cam.right = half * aspect;
    cam.top = half;
    cam.bottom = -half;
    cam.updateProjectionMatrix();
  }, [size, camera, halfW, halfD]);
  return null;
}

function PlaceCamera() {
  const { camera } = useThree();
  useLayoutEffect(() => {
    camera.position.set(7.2, 8.4, 7.2);
    camera.lookAt(0, 0.4, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

export function ToyScene({
  children,
  background = "#dfeee6",
  className,
  halfW,
  halfD,
}: {
  children: ReactNode;
  background?: string;
  className?: string;
  halfW?: number;
  halfD?: number;
}) {
  const calm = useCalm();
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-sky",
        className,
      )}
      style={{ minHeight: 240, height: "min(46vh, 420px)", touchAction: "manipulation" }}
    >
      <Canvas
        orthographic
        camera={{ near: 0.1, far: 80, zoom: 1, position: [7.2, 8.4, 7.2] }}
        shadows={!calm && { enabled: true, type: PCFShadowMap }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        frameloop={calm ? "demand" : "always"}
        onCreated={({ scene, gl }) => {
          scene.background = new Color(background);
          gl.setClearColor(background, 1);
          gl.shadowMap.enabled = !calm;
          gl.shadowMap.type = PCFShadowMap;
        }}
      >
        <PlaceCamera />
        <FitCamera halfW={halfW} halfD={halfD} />
        <hemisphereLight args={["#fff6ea", "#6d7a62", 1.15]} />
        <directionalLight
          position={[6, 10, 7]}
          intensity={calm ? 1.6 : 2.15}
          castShadow={!calm}
          shadow-mapSize={[512, 512]}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={9}
          shadow-camera-bottom={-9}
          shadow-camera-near={0.5}
          shadow-camera-far={40}
        />
        {children}
      </Canvas>
    </div>
  );
}
