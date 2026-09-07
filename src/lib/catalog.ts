export const MISSION_IDS = [
  "brew",
  "rainbow",
  "gems",
  "dino",
  "meteor",
  "ocean",
  "echo",
] as const;

export type MissionId = (typeof MISSION_IDS)[number];

export type Mission = {
  id: MissionId;
  skill: string;
  contribution: string;
  sky: string;
};

export const MISSIONS: Mission[] = [
  { id: "brew", skill: "working-memory", contribution: "workshop", sky: "#f0dcc3" },
  { id: "rainbow", skill: "inhibitory-control", contribution: "bridge", sky: "#c5def0" },
  { id: "gems", skill: "visuospatial-memory", contribution: "garden", sky: "#d5e4dc" },
  { id: "dino", skill: "planning", contribution: "railway", sky: "#d7e6c4" },
  { id: "meteor", skill: "sustained-attention", contribution: "observatory", sky: "#1a2436" },
  { id: "ocean", skill: "visual-search", contribution: "reef", sky: "#9ad0d8" },
  { id: "echo", skill: "nback-memory", contribution: "stage", sky: "#efe3d2" },
];

export function isMissionId(id: string): id is MissionId {
  return (MISSION_IDS as readonly string[]).includes(id);
}

export type Ingredient = {
  id: string;
  color: string;
  shape: "sphere" | "box" | "octa" | "cyl" | "cone" | "drop";
};

export const INGREDIENTS: Ingredient[] = [
  { id: "berry", color: "#c45c3e", shape: "sphere" },
  { id: "mint", color: "#4f8a74", shape: "box" },
  { id: "spark", color: "#e0b15a", shape: "octa" },
  { id: "honey", color: "#d3923b", shape: "cyl" },
  { id: "petal", color: "#d67a8c", shape: "cone" },
  { id: "drop", color: "#5a9ec2", shape: "drop" },
];

export type Performer = {
  id: "fox" | "bear" | "bunny" | "frog";
  color: string;
  ear: "point" | "round" | "long" | "none";
};

export const PERFORMERS: Performer[] = [
  { id: "fox", color: "#c45c3e", ear: "point" },
  { id: "bear", color: "#8b5a32", ear: "round" },
  { id: "bunny", color: "#d8c4a8", ear: "long" },
  { id: "frog", color: "#4f8a74", ear: "none" },
];

export type Seed = {
  id: "moon" | "ice" | "forest";
  color: string;
  crystal: string;
};

export const SEEDS: Seed[] = [
  { id: "moon", color: "#7ea0b8", crystal: "#c5d8e6" },
  { id: "ice", color: "#6cb3c4", crystal: "#d7f3f7" },
  { id: "forest", color: "#4f8a74", crystal: "#c8e6c0" },
];

export const LANDMARKS: Record<MissionId, [number, number, number]> = {
  brew: [-3.4, 0, -2.2],
  rainbow: [0, 0, -3.1],
  gems: [3.3, 0, -2.2],
  dino: [-3.6, 0, 1.6],
  meteor: [0.2, 0, 3.2],
  ocean: [3.4, 0, 1.8],
  echo: [0, 0, 0.2],
};

export const PLOT_POSITIONS: [number, number, number][] = [
  [-1.4, 0, 2.2],
  [-0.4, 0, 2.2],
  [0.6, 0, 2.2],
  [-1.4, 0, 3.1],
  [-0.4, 0, 3.1],
  [0.6, 0, 3.1],
];

export const STATIONS = [
  { id: "leaf", color: "#4f8a74", pos: [3.4, 0, -2.1] as [number, number, number] },
  { id: "berry", color: "#c45c3e", pos: [3.4, 0, 0] as [number, number, number] },
  { id: "shell", color: "#5a9ec2", pos: [3.4, 0, 2.1] as [number, number, number] },
];

export const INK_COLORS = [
  { id: "red", hex: "#b42318", word: { en: "RED", zh: "紅" } },
  { id: "blue", hex: "#175cd3", word: { en: "BLUE", zh: "藍" } },
  { id: "green", hex: "#18713c", word: { en: "GREEN", zh: "綠" } },
] as const;

export type InkId = (typeof INK_COLORS)[number]["id"];
