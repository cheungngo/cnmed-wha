import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { C as MISSIONS, E as SEEDS, S as LANDMARKS, T as PLOT_POSITIONS, r as useAcademy, y as todayKey } from "./router-r1TXw9yV.mjs";
import { C as ToyScene, D as t, a as ClientOnly, c as Crystal, l as Dino, m as GroundShadow, n as Cauldron, o as Cottage, p as GroundDisc, t as Button, x as StarRow, y as Pine } from "./game-ui-ByV-gBJg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes--UXfcLhW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Landmark({ id, lit }) {
	if (id === "brew") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cottage, {
		position: [
			0,
			0,
			0
		],
		color: "#efe8dc",
		roof: "#c45c3e"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			.7,
			0,
			.7
		],
		scale: .45,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cauldron, { fill: lit ? .8 : .15 })
	})] });
	if (id === "rainbow") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			.7,
			0
		],
		"rotation-z": Math.PI / 2,
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
			.7,
			.1,
			8,
			16,
			Math.PI
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: lit ? "#c45c3e" : "#b8c4b0",
			roughness: .7,
			flatShading: true
		})]
	}) });
	if (id === "gems") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
		position: [
			0,
			0,
			0
		],
		color: "#5c9eaf",
		lit
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
		position: [
			.55,
			0,
			.2
		],
		color: "#4f8a74"
	})] });
	if (id === "dino") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cottage, { position: [
		0,
		0,
		0
	] }), lit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dino, {
		position: [
			.2,
			.55,
			0
		],
		scale: .7
	}) : null] });
	if (id === "meteor") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cottage, {
		position: [
			0,
			0,
			0
		],
		color: "#4a5568",
		roof: "#2a241c"
	});
	if (id === "ocean") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			.35,
			0
		],
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			1.4,
			.7,
			.9
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: lit ? "#7eb8c9" : "#9bb",
			roughness: .4,
			transparent: true,
			opacity: .7
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			.12,
			0
		],
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			.9,
			1,
			.2,
			20
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#8c6a4a",
			roughness: .85,
			flatShading: true
		})]
	}), lit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dino, {
		position: [
			0,
			.2,
			0
		],
		scale: .8
	}) : null] });
}
function Island({ selectedPlot, onSelectPlot }) {
	const navigate = useNavigate();
	const contributions = useAcademy((s) => s.contributions);
	const plots = useAcademy((s) => s.plots);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToyScene, {
		background: "#dfeee6",
		halfW: 7,
		halfD: 5.5,
		className: "h-[min(52vh,480px)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundDisc, {
				color: "#cfe6c4",
				radius: 9
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.04,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					3.2,
					3.4,
					.08,
					32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e7d7b5",
					roughness: .9,
					flatShading: true
				})]
			}),
			MISSIONS.map((mission) => {
				const pos = LANDMARKS[mission.id];
				const lit = contributions[mission.id] > 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: pos,
					onPointerUp: (e) => {
						e.stopPropagation();
						navigate({
							to: "/play/$id",
							params: { id: mission.id }
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, {
						id: mission.id,
						lit
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						visible: false,
						position: [
							0,
							.6,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.8,
							1.6,
							1.8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							transparent: true,
							opacity: 0
						})]
					})]
				}, mission.id);
			}),
			PLOT_POSITIONS.map((pos, i) => {
				const seed = plots[i]?.seed;
				const selected = selectedPlot === i;
				const crystal = SEEDS.find((s) => s.id === seed)?.crystal ?? "#c5d8e6";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: pos,
					onPointerUp: (e) => {
						e.stopPropagation();
						onSelectPlot?.(i);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						"rotation-x": -Math.PI / 2,
						position: [
							0,
							.03,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.38, 16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: selected ? "#e0b15a" : "#b79263",
							roughness: .9,
							flatShading: true
						})]
					}), seed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
						position: [
							0,
							.02,
							0
						],
						color: crystal
					}) : null]
				}, i);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pine, {
				position: [
					4.6,
					0,
					3.4
				],
				scale: .8
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pine, {
				position: [
					-4.8,
					0,
					-.4
				],
				scale: .7
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundShadow, { position: [
				0,
				0,
				.2
			] })
		]
	});
}
function HubIsland({ selectedPlot, onSelectPlot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-[min(52vh,480px)] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-sky",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				className: "h-full w-full",
				"aria-hidden": true
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Island, {
			selectedPlot,
			onSelectPlot
		})
	});
}
var CONTRIB = {
	brew: "workshop",
	rainbow: "bridge",
	gems: "garden",
	dino: "railway",
	meteor: "observatory",
	ocean: "reef",
	echo: "stage"
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
	const [selected, setSelected] = (0, import_react.useState)(null);
	const done = finishedOn === todayKey();
	function plantSeed(id) {
		if (selected == null) return;
		plant(selected, id);
		setSelected(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-3xl flex-col gap-5 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg-muted",
						children: t(lang, "app.sub")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl leading-tight",
						children: t(lang, "app.title")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: lang === "en" ? "default" : "secondary",
							onClick: () => setLang("en"),
							children: "EN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: lang === "zh" ? "default" : "secondary",
							onClick: () => setLang("zh"),
							children: "繁"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: calmRequested ? "accent" : "secondary",
							onClick: () => setCalm(!calmRequested),
							children: t(lang, "app.calm")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubIsland, {
				selectedPlot: selected,
				onSelectPlot: setSelected
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: t(lang, "app.garden")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-sm text-fg-muted",
							children: [
								t(lang, "app.seeds"),
								" ",
								seedsAvailable
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-fg-muted",
						children: t(lang, "app.plantHint")
					}),
					selected != null && seedsAvailable > 0 && !plots[selected]?.seed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: SEEDS.map((seed) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => plantSeed(seed.id),
							children: t(lang, `seed.${seed.id}`)
						}, seed.id))
					}) : null,
					plots.every((p) => p.seed) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: t(lang, "app.gardenFull")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "ghost",
						size: "sm",
						onClick: clearGarden,
						children: t(lang, "app.clearGarden")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: t(lang, "app.missions")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-3",
				children: MISSIONS.map((mission) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/play/$id",
					params: { id: mission.id },
					className: "flex items-center gap-4 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-4 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg leading-tight",
								children: t(lang, `${mission.id}.name`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-fg-muted",
								children: t(lang, `${mission.id}.blurb`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRow, { stars: stars[mission.id] }),
							contributions[mission.id] > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-accent",
								children: t(lang, `contrib.${CONTRIB[mission.id]}`)
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-primary",
						children: t(lang, "app.play")
					})]
				}) }, mission.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 pb-8",
				children: [done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-[var(--radius-lg)] bg-bg-subtle px-4 py-3 text-sm",
					children: t(lang, "app.finishedDone")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "lg",
					onClick: finishToday,
					children: t(lang, "app.finished")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-fg-subtle",
					children: t(lang, "app.powered")
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
