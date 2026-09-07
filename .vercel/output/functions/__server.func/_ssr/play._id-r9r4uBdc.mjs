import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ExtrudeGeometry, n as useFrame, o as Object3D, s as Shape, u as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { D as STATIONS, O as isMissionId, _ as shuffle, a as usePaused, b as INGREDIENTS, c as gemSequence, d as lerpPath, f as nbackSequence, g as scoreEcho, h as randomStroop, i as useCalm, l as gemSpeed, m as pick, n as Route, o as checkBrewTap, p as nextGemLength, r as useAcademy, s as echoAccuracy, u as junctionStation, v as starsFor, w as PERFORMERS, x as INK_COLORS } from "./router-r1TXw9yV.mjs";
import { C as ToyScene, D as t, E as cn, S as StartCard, T as Traveler, _ as Monster, a as ClientOnly, b as SpaceRock, c as Crystal, d as Fish, f as GameShell, g as Meter, h as Jar, i as ChipRow, l as Dino, m as GroundShadow, n as Cauldron, o as Cottage, p as GroundDisc, r as Chip, s as Courier, t as Button, u as EndCard, v as PerformerFigure, w as Train, y as Pine } from "./game-ui-ByV-gBJg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play._id-r9r4uBdc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useGameLoop(active, onTick) {
	const paused = usePaused();
	const pausedRef = (0, import_react.useRef)(paused);
	pausedRef.current = paused;
	const tickRef = (0, import_react.useRef)(onTick);
	tickRef.current = onTick;
	(0, import_react.useEffect)(() => {
		if (!active) return;
		let raf = 0;
		let last = performance.now();
		const frame = (now) => {
			const dt = Math.min(.1, Math.max(0, (now - last) / 1e3));
			last = now;
			if (!document.hidden && !pausedRef.current) tickRef.current(dt);
			raf = requestAnimationFrame(frame);
		};
		const onVis = () => {
			last = performance.now();
		};
		document.addEventListener("visibilitychange", onVis);
		raf = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(raf);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [active]);
}
var OUTCOMES = [
	"rain",
	"lantern",
	"flower"
];
var IDS$1 = INGREDIENTS.map((i) => i.id);
function BrewGame() {
	const lang = useAcademy((s) => s.lang);
	const recordSession = useAcademy((s) => s.recordSession);
	const best = useAcademy((s) => s.best.brew);
	const [mode, setMode] = (0, import_react.useState)("remember");
	const [screen, setScreen] = (0, import_react.useState)("start");
	const [recipe, setRecipe] = (0, import_react.useState)([]);
	const [added, setAdded] = (0, import_react.useState)([]);
	const [grid, setGrid] = (0, import_react.useState)([]);
	const [lit, setLit] = (0, import_react.useState)(null);
	const [fill, setFill] = (0, import_react.useState)(0);
	const [happy, setHappy] = (0, import_react.useState)(false);
	const [outcome, setOutcome] = (0, import_react.useState)(null);
	const [orders, setOrders] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [assisted, setAssisted] = (0, import_react.useState)(false);
	const [showRecipe, setShowRecipe] = (0, import_react.useState)(false);
	const [stars, setStars] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)(t(lang, "brew.purpose"));
	const elapsed = (0, import_react.useRef)(0);
	const step = (0, import_react.useRef)(0);
	function begin(nextMode = mode) {
		const rec = pick(IDS$1, 3);
		const extras = IDS$1.filter((id) => !rec.includes(id));
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
	function finish(finalScore, served) {
		const earned = starsFor(served, 2, 3);
		setStars(earned);
		recordSession({
			mission: "brew",
			score: finalScore,
			stars: earned
		});
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
		const start = n * .95;
		if (elapsed.current < start + .65) setLit(recipe[n] ?? null);
		else {
			if (elapsed.current >= start + .95) step.current = n + 1;
			setLit(null);
		}
	});
	function tap(id) {
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
			const kind = OUTCOMES[orders % 3];
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameShell, {
		mission: "brew",
		screen: screen === "start" ? "start" : screen === "end" ? "end" : "play",
		status,
		children: [
			screen === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartCard, {
				lang,
				mission: "brew",
				onStart: startRun,
				extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
					"learn",
					"remember",
					"sequence"
				].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: mode === m,
					onClick: () => setMode(m),
					children: t(lang, `brew.${m}`)
				}, m)) })
			}) : null,
			screen !== "start" && screen !== "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[42vh] rounded-[var(--radius-xl)] bg-sky" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyScene, {
						background: "#f0dcc3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrewTable, {
							grid,
							lit,
							fill,
							happy,
							outcome,
							pickable: screen === "recall",
							onPick: tap
						})
					})
				}),
				recipeVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					"data-recipe": recipe.join(","),
					children: recipe.map((id) => t(lang, `brew.ing.${id}`)).join(" → ")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg-subtle",
					children: t(lang, "brew.yourTurn")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: grid.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "lg",
						disabled: screen !== "recall" || added.includes(id),
						onClick: () => tap(id),
						children: t(lang, `brew.ing.${id}`)
					}, id))
				}),
				mode !== "learn" && screen === "recall" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => {
						setShowRecipe(true);
						setAssisted(true);
					},
					children: t(lang, "brew.showAgain")
				}) : null
			] }) : null,
			screen === "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
				lang,
				score,
				stars,
				best: Math.max(best, score),
				onAgain: () => setScreen("start"),
				lines: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-fg-muted",
					children: [
						t(lang, "brew.served"),
						" ",
						orders
					]
				})
			}) : null
		]
	});
}
function BrewTable({ grid, lit, fill, happy, outcome, pickable, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundDisc, { color: "#e6d3b4" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.08,
				.4
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				8.2,
				.16,
				4.2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c9a57a",
				roughness: .85,
				flatShading: true
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monster, {
			position: [
				0,
				0,
				-2.1
			],
			happy,
			color: "#6d7a9c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cauldron, {
			fill,
			liquid: outcome === "flower" ? "#d67a8c" : outcome === "lantern" ? "#e0b15a" : "#60d6c3"
		}),
		grid.map((id, i) => {
			const x = i % 3 * 2.2 - 2.2;
			const z = 2.15 + Math.floor(i / 3) * 1.15;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				onPointerUp: (e) => {
					e.stopPropagation();
					if (pickable) onPick(id);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jar, {
					id,
					position: [
						x,
						0,
						z
					],
					lit: lit === id
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						.06,
						z
					],
					"rotation-x": -Math.PI / 2,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.38, 16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#efe8dc",
						roughness: .9
					})]
				})]
			}, id);
		}),
		outcome === "flower" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.6,
				.4,
				-.2
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.25,
				.5,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d67a8c",
				flatShading: true
			})]
		}) : null,
		outcome === "lantern" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-1.6,
				.7,
				-.4
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.16,
				.16,
				.4,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e0b15a",
				emissive: "#e0b15a",
				emissiveIntensity: .6,
				flatShading: true
			})]
		}) : null,
		outcome === "rain" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				2.1,
				-1.4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.35,
				10,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#9bb8c9",
				transparent: true,
				opacity: .7,
				flatShading: true
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundShadow, { position: [
			0,
			0,
			-2.1
		] })
	] });
}
function pathPoints(j1, j2, practice) {
	const start = [
		-4.2,
		.2,
		0
	];
	const mid = [
		-.6,
		.2,
		j1 === "L" ? -1.1 : 1.1
	];
	if (practice) {
		const end = j1 === "L" ? STATIONS[0].pos : STATIONS[2].pos;
		return [
			start,
			[
				.4,
				.2,
				j1 === "L" ? -1.1 : 1.1
			],
			[
				end[0],
				.2,
				end[2]
			]
		];
	}
	const dest = STATIONS[junctionStation(j1, j2)].pos;
	return [
		start,
		mid,
		[
			1.4,
			.2,
			dest[2] * .55
		],
		[
			dest[0],
			.2,
			dest[2]
		]
	];
}
function DinoGame() {
	const lang = useAcademy((s) => s.lang);
	const recordSession = useAcademy((s) => s.recordSession);
	const best = useAcademy((s) => s.best.dino);
	const [mode, setMode] = (0, import_react.useState)("puzzle");
	const [screen, setScreen] = (0, import_react.useState)("start");
	const [j1, setJ1] = (0, import_react.useState)("L");
	const [j2, setJ2] = (0, import_react.useState)("L");
	const [goal, setGoal] = (0, import_react.useState)(0);
	const [preview, setPreview] = (0, import_react.useState)(false);
	const [score, setScore] = (0, import_react.useState)(0);
	const [arrivals, setArrivals] = (0, import_react.useState)(0);
	const [stars, setStars] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)(t(lang, "dino.purpose"));
	const [runKey, setRunKey] = (0, import_react.useState)(0);
	const [arrived, setArrived] = (0, import_react.useState)(null);
	function stationName(i) {
		return t(lang, i === 0 ? "dino.leaf" : i === 1 ? "dino.berry" : "dino.shell");
	}
	function goText(i) {
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
	function toggle(which) {
		if (screen !== "plan") return;
		if (which === 1) setJ1((v) => v === "L" ? "R" : "L");
		else setJ2((v) => v === "L" ? "R" : "L");
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
		const dest = mode === "practice" ? j1 === "L" ? 0 : 2 : junctionStation(j1, j2);
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
				recordSession({
					mission: "dino",
					score: nextScore,
					stars: earned
				});
				setScreen("end");
				return;
			}
			const nextGoal = mode === "practice" ? Math.random() < .5 ? 0 : 2 : Math.floor(Math.random() * 3);
			setGoal(nextGoal);
			setStatus(goText(nextGoal));
			setScreen("plan");
		} else {
			setStatus(`${t(lang, "dino.missed")} ${goText(goal)}`);
			setScreen("plan");
		}
	}
	const points = (0, import_react.useMemo)(() => pathPoints(j1, j2, mode === "practice"), [
		j1,
		j2,
		mode
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameShell, {
		mission: "dino",
		screen: screen === "start" ? "start" : screen === "end" ? "end" : "play",
		status,
		children: [
			screen === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartCard, {
				lang,
				mission: "dino",
				onStart: deal,
				extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChipRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: mode === "practice",
					onClick: () => setMode("practice"),
					children: t(lang, "dino.practice")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: mode === "puzzle",
					onClick: () => setMode("puzzle"),
					children: t(lang, "dino.puzzle")
				})] })
			}) : null,
			screen !== "start" && screen !== "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[42vh] rounded-[var(--radius-xl)] bg-sky" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyScene, {
						background: "#d7e6c4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackWorld, {
							j1,
							j2,
							practice: mode === "practice",
							points,
							preview,
							running: screen === "run",
							runKey,
							goal,
							arrived,
							onArrive
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							disabled: screen !== "plan",
							onClick: () => toggle(1),
							children: [
								t(lang, "dino.j1"),
								": ",
								t(lang, j1 === "L" ? "dino.left" : "dino.right")
							]
						}),
						mode === "puzzle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							disabled: screen !== "plan",
							onClick: () => toggle(2),
							children: [
								t(lang, "dino.j2"),
								": ",
								t(lang, j2 === "L" ? "dino.left" : "dino.right")
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: screen !== "plan",
							onClick: () => setPreview(true),
							children: t(lang, "app.preview")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: screen !== "plan",
							onClick: undo,
							children: t(lang, "app.undo")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: screen !== "plan",
							onClick: run,
							children: t(lang, "app.run")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg-muted",
					children: goText(goal)
				})
			] }) : null,
			screen === "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
				lang,
				score,
				stars,
				best: Math.max(best, score),
				onAgain: () => setScreen("start")
			}) : null
		]
	});
}
function TrackWorld({ j1, j2, practice, points, preview, running, runKey, goal, arrived, onArrive }) {
	const calm = useCalm();
	const tRef = (0, import_react.useRef)(0);
	const done = (0, import_react.useRef)(false);
	const group = (0, import_react.useRef)(null);
	const keyRef = (0, import_react.useRef)(runKey);
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
		const dt = Math.min(delta, .1);
		tRef.current += calm ? dt * 1.8 : dt;
		const u = Math.min(1, tRef.current / 2.4);
		const pos = lerpPath(points, u);
		group.current.position.set(...pos);
		if (u >= 1 && !done.current) {
			done.current = true;
			onArrive();
		}
	});
	const dest = practice ? j1 === "L" ? 0 : 2 : junctionStation(j1, j2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundDisc, { color: "#cfe3b8" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
			from: [
				-4.4,
				.08,
				0
			],
			to: [
				-.6,
				.08,
				0
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
			from: [
				-.6,
				.08,
				0
			],
			to: [
				-.6,
				.08,
				j1 === "L" ? -1.2 : 1.2
			]
		}),
		practice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
			from: [
				-.6,
				.08,
				j1 === "L" ? -1.2 : 1.2
			],
			to: [
				3.2,
				.08,
				j1 === "L" ? -2.1 : 2.1
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
			from: [
				-.6,
				.08,
				j1 === "L" ? -1.2 : 1.2
			],
			to: [
				1.4,
				.08,
				dest === 0 ? -2 : dest === 2 ? 2 : 0
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
			from: [
				1.4,
				.08,
				dest === 0 ? -2 : dest === 2 ? 2 : 0
			],
			to: [
				3.2,
				.08,
				STATIONS[dest].pos[2]
			]
		})] }),
		STATIONS.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cottage, {
			position: st.pos,
			color: st.color,
			roof: i === goal ? "#e0b15a" : "#6b4b3a"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				st.pos[0],
				.06,
				st.pos[2]
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.3,
				.08,
				1.1
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: st.color,
				roughness: .85,
				flatShading: true
			})]
		})] }, st.id)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchArm, {
			position: [
				-.6,
				.45,
				0
			],
			left: j1 === "L"
		}),
		practice ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchArm, {
			position: [
				1.4,
				.45,
				0
			],
			left: j2 === "L"
		}),
		preview ? points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				p[0],
				.35,
				p[2]
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.12,
				8,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e0b15a",
				flatShading: true
			})]
		}, i)) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: group,
			position: points[0],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Train, { position: [
				0,
				0,
				0
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dino, {
				position: [
					.15,
					.55,
					0
				],
				scale: .85
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundShadow, { position: points[0] ?? [
			-4.2,
			0,
			0
		] }),
		arrived === goal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dino, { position: [
			STATIONS[goal].pos[0],
			.2,
			STATIONS[goal].pos[2] + .8
		] }) : null
	] });
}
function SwitchArm({ position, left }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position,
		"rotation-y": left ? .55 : -.55,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.7,
				.12,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c45c3e",
				roughness: .7,
				flatShading: true
			})]
		})
	});
}
function Rail({ from, to }) {
	const mid = [
		(from[0] + to[0]) / 2,
		(from[1] + to[1]) / 2,
		(from[2] + to[2]) / 2
	];
	const dx = to[0] - from[0];
	const dz = to[2] - from[2];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: mid,
		"rotation-y": Math.atan2(dx, dz),
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.38,
			.08,
			Math.max(.2, Math.hypot(dx, dz))
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#6d7278",
			roughness: .8,
			flatShading: true
		})]
	});
}
var IDS = PERFORMERS.map((p) => p.id);
var LENGTH = 10;
function EchoGame() {
	const lang = useAcademy((s) => s.lang);
	const recordSession = useAcademy((s) => s.recordSession);
	const best = useAcademy((s) => s.best.echo);
	const [n, setN] = (0, import_react.useState)(2);
	const [hints, setHints] = (0, import_react.useState)(false);
	const [screen, setScreen] = (0, import_react.useState)("start");
	const [seq, setSeq] = (0, import_react.useState)([]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [results, setResults] = (0, import_react.useState)([]);
	const [score, setScore] = (0, import_react.useState)(0);
	const [stars, setStars] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)(t(lang, "echo.purpose"));
	const [celebrate, setCelebrate] = (0, import_react.useState)(false);
	const run = (0, import_react.useRef)(0);
	function startRun() {
		run.current += 1;
		setSeq(nbackSequence(IDS, LENGTH, n));
		setIndex(0);
		setResults([]);
		setScore(0);
		setCelebrate(false);
		setScreen("play");
		setStatus(t(lang, "echo.remember"));
	}
	function wrap(nextResults, nextScore) {
		const acc = echoAccuracy(nextResults);
		const earned = starsFor(Math.round(acc * 10), 6, 9);
		setStars(earned);
		recordSession({
			mission: "echo",
			score: nextScore,
			stars: earned
		});
		setCelebrate(true);
		setScreen("end");
		setStatus(t(lang, "echo.complete"));
	}
	function answer(action) {
		if (screen !== "play" || index < n) return;
		const result = scoreEcho(seq, index, n, action);
		const nextResults = [...results, result];
		const nextScore = score + (result === "hit" || result === "correct-reject" ? 20 : 0);
		setResults(nextResults);
		setScore(nextScore);
		const nextIndex = index + 1;
		if (nextIndex >= seq.length) {
			wrap(nextResults, nextScore);
			return;
		}
		setIndex(nextIndex);
		setStatus(t(lang, "echo.ask"));
	}
	function nextSetup() {
		if (index >= n) return;
		const nextIndex = index + 1;
		setIndex(nextIndex);
		setStatus(nextIndex < n ? t(lang, "echo.remember") : t(lang, "echo.ask"));
	}
	const current = seq[index];
	const history = seq.slice(0, index + 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameShell, {
		mission: "echo",
		screen,
		status,
		children: [
			screen === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartCard, {
				lang,
				mission: "echo",
				onStart: startRun,
				extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChipRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: n === 1,
					onClick: () => setN(1),
					children: t(lang, "echo.one")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: n === 2,
					onClick: () => setN(2),
					children: t(lang, "echo.two")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChipRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: hints,
					onClick: () => setHints(true),
					children: t(lang, "echo.hints")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: !hints,
					onClick: () => setHints(false),
					children: t(lang, "echo.solo")
				})] })] })
			}) : null,
			screen !== "start" && screen !== "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[42vh] rounded-[var(--radius-xl)] bg-sky" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyScene, {
						background: "#efe3d2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
							current,
							celebrate: false
						})
					})
				}),
				hints ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex flex-wrap gap-2 text-sm",
					children: history.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: `rounded-full border border-border px-3 py-1 ${i === index ? "bg-primary text-primary-fg" : "bg-bg-elevated"}`,
						children: id
					}, `${id}-${i}`))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: index < n ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: nextSetup,
						children: t(lang, "app.next")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: () => answer("same"),
						children: t(lang, "echo.same")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "secondary",
						onClick: () => answer("wait"),
						children: t(lang, "echo.diff")
					})] })
				})
			] }) : null,
			screen === "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyScene, {
				background: "#efe3d2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
					current: seq[seq.length - 1],
					celebrate
				})
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
				lang,
				score,
				stars,
				best: Math.max(best, score),
				onAgain: () => setScreen("start"),
				lines: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-fg-muted",
					children: [Math.round(echoAccuracy(results) * 100), "%"]
				})
			})] }) : null
		]
	});
}
function Stage({ current, celebrate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundDisc, { color: "#e7d7c4" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.18,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				2.4,
				2.6,
				.32,
				28
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#8c6a4a",
				roughness: .8,
				flatShading: true
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-3.4,
				1.2,
				-1.6
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.2,
				2.4,
				2.2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c45c3e",
				roughness: .8,
				flatShading: true
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				3.4,
				1.2,
				-1.6
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.2,
				2.4,
				2.2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c45c3e",
				roughness: .8,
				flatShading: true
			})]
		}),
		PERFORMERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformerFigure, {
			id: p.id,
			visible: current === p.id,
			celebrate: celebrate && current === p.id,
			position: [
				0,
				.2,
				0
			]
		}, p.id))
	] });
}
var CELLS = Array.from({ length: 9 }, (_, i) => ({
	i,
	x: (i % 3 - 1) * 1.7,
	z: (Math.floor(i / 3) - 1) * 1.45
}));
function GemsGame() {
	const lang = useAcademy((s) => s.lang);
	const recordSession = useAcademy((s) => s.recordSession);
	const best = useAcademy((s) => s.best.gems);
	const [mode, setMode] = (0, import_react.useState)("practice");
	const [length, setLength] = (0, import_react.useState)(3);
	const [speedKind, setSpeedKind] = (0, import_react.useState)("steady");
	const [screen, setScreen] = (0, import_react.useState)("start");
	const [seq, setSeq] = (0, import_react.useState)([]);
	const [step, setStep] = (0, import_react.useState)(0);
	const [lit, setLit] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [perfects, setPerfects] = (0, import_react.useState)(0);
	const [lives, setLives] = (0, import_react.useState)(3);
	const [rewatch, setRewatch] = (0, import_react.useState)(false);
	const [sets, setSets] = (0, import_react.useState)(0);
	const [stars, setStars] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)(t(lang, "gems.purpose"));
	const [plant, setPlant] = (0, import_react.useState)(.45);
	const elapsed = (0, import_react.useRef)(0);
	const showI = (0, import_react.useRef)(0);
	const calm = useCalm();
	const pace = gemSpeed(speedKind);
	function deal(len = length, again = false) {
		setSeq(gemSequence(len));
		setStep(0);
		setLit(null);
		setRewatch(again);
		setScreen("watch");
		setStatus(t(lang, "gems.watch"));
		elapsed.current = 0;
		showI.current = 0;
	}
	function startRun() {
		setScore(0);
		setPerfects(0);
		setLives(3);
		setSets(0);
		setPlant(.45);
		setStars(0);
		deal(length, false);
	}
	function finish(finalScore, perfect) {
		const earned = starsFor(perfect, 2, 4);
		setStars(earned);
		recordSession({
			mission: "gems",
			score: finalScore,
			stars: earned
		});
		setScreen("end");
		setStatus(t(lang, "end.title"));
	}
	useGameLoop(screen === "watch", (dt) => {
		elapsed.current += dt;
		const on = pace * .7;
		const i = showI.current;
		if (i >= seq.length) {
			setLit(null);
			setScreen("recall");
			setStatus(t(lang, "gems.repeat"));
			return;
		}
		const start = i * pace;
		if (elapsed.current < start + on) {
			const cell = seq[i];
			setLit((prev) => prev === cell ? prev : cell);
		} else {
			if (elapsed.current >= start + pace) showI.current = i + 1;
			setLit(null);
		}
	});
	function pick(cell) {
		if (screen !== "recall") return;
		if (cell !== seq[step]) {
			if (mode === "practice") {
				setStatus(t(lang, "gems.again"));
				deal(seq.length, true);
				return;
			}
			const nextLives = lives - 1;
			setLives(nextLives);
			if (nextLives <= 0) {
				finish(score, perfects);
				return;
			}
			deal(seq.length, false);
			return;
		}
		const next = step + 1;
		setStep(next);
		if (next === seq.length) {
			const gain = rewatch ? 8 : 20 + seq.length * 5;
			const nextScore = score + gain;
			const nextPerfect = perfects + (rewatch ? 0 : 1);
			const nextSets = sets + 1;
			setScore(nextScore);
			setPerfects(nextPerfect);
			setSets(nextSets);
			setPlant((p) => Math.min(1.2, p + .18));
			setStatus(t(lang, "gems.grew"));
			if (nextSets >= 4 || mode === "challenge" && nextPerfect >= 5) {
				finish(nextScore, nextPerfect);
				return;
			}
			const nextLen = mode === "challenge" ? nextGemLength(nextPerfect, length) : length;
			window.setTimeout(() => deal(nextLen, false), 500);
		} else setStatus(t(lang, "gems.repeat"));
	}
	const lift = (0, import_react.useMemo)(() => calm ? 0 : .12, [calm]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameShell, {
		mission: "gems",
		screen: screen === "start" ? "start" : screen === "end" ? "end" : "play",
		status,
		children: [
			screen === "end" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[42vh] rounded-[var(--radius-xl)] bg-sky" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyScene, {
					background: "#d5e4dc",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GemGarden, {
						lit: screen === "start" ? null : lit,
						plant,
						lift,
						onPick: pick
					})
				})
			}),
			screen === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartCard, {
				lang,
				mission: "gems",
				onStart: startRun,
				extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChipRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: mode === "practice",
						onClick: () => setMode("practice"),
						children: t(lang, "app.practice")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: mode === "challenge",
						onClick: () => setMode("challenge"),
						children: t(lang, "app.challenge")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: length === n,
						onClick: () => setLength(n),
						children: [
							t(lang, "gems.length"),
							" ",
							n
						]
					}, n)) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
						"slow",
						"steady",
						"brisk"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: speedKind === s,
						onClick: () => setSpeedKind(s),
						children: t(lang, `gems.${s}`)
					}, s)) })
				] })
			}) : null,
			screen !== "start" && screen !== "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2 pb-2",
				children: CELLS.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "lg",
					disabled: screen !== "recall",
					onClick: () => pick(cell.i),
					children: cell.i + 1
				}, cell.i))
			}), mode === "practice" && screen === "recall" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => deal(seq.length, true),
				children: t(lang, "app.watchAgain")
			}) : null] }) : null,
			screen === "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
				lang,
				score,
				stars,
				best: Math.max(best, score),
				onAgain: () => setScreen("start"),
				lines: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-fg-muted",
					children: [
						t(lang, "app.perfects"),
						" ",
						perfects
					]
				})
			}) : null
		]
	});
}
function GemGarden({ lit, plant, lift, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundDisc, { color: "#c9dcc8" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.08,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				6.2,
				.16,
				5.2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c7b6a3",
				roughness: .9,
				flatShading: true
			})]
		}),
		CELLS.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			onPointerUp: (e) => {
				e.stopPropagation();
				onPick(cell.i);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
				position: [
					cell.x,
					.16,
					cell.z
				],
				lit: lit === cell.i,
				lift: lit === cell.i ? lift : 0
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					cell.x,
					.55,
					cell.z
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.2,
					1.2,
					1.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					transparent: true,
					opacity: 0
				})]
			})]
		}, cell.i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pine, {
			position: [
				3.6,
				0,
				-2.2
			],
			scale: plant
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundShadow, {
			position: [
				3.6,
				0,
				-2.2
			],
			scale: plant
		})
	] });
}
var TRIALS = [
	true,
	false,
	true,
	false,
	true,
	false,
	true,
	false,
	true,
	false
];
function MeteorGame() {
	const lang = useAcademy((s) => s.lang);
	const recordSession = useAcademy((s) => s.recordSession);
	const best = useAcademy((s) => s.best.meteor);
	const [screen, setScreen] = (0, import_react.useState)("start");
	const [index, setIndex] = (0, import_react.useState)(0);
	const [isTarget, setIsTarget] = (0, import_react.useState)(true);
	const [x, setX] = (0, import_react.useState)(-4);
	const [hits, setHits] = (0, import_react.useState)(0);
	const [misses, setMisses] = (0, import_react.useState)(0);
	const [fa, setFa] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [stars, setStars] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)(t(lang, "meteor.purpose"));
	const [remain, setRemain] = (0, import_react.useState)(1);
	const signaled = (0, import_react.useRef)(false);
	const done = (0, import_react.useRef)(false);
	const elapsed = (0, import_react.useRef)(0);
	function reset() {
		setHits(0);
		setMisses(0);
		setFa(0);
		setScore(0);
		setIndex(0);
		setScreen("idle");
		setStatus(t(lang, "meteor.watch"));
	}
	function startTrial(i) {
		setIndex(i);
		setIsTarget(TRIALS[i]);
		setX(-4);
		setRemain(1);
		signaled.current = false;
		done.current = false;
		elapsed.current = 0;
		setScreen("trial");
	}
	function finishTrial(target, hit, nextHits, nextMiss, nextFa, nextScore) {
		const n = index + 1;
		if (n >= TRIALS.length) {
			const earned = starsFor(nextHits, 4, 7);
			setStars(earned);
			recordSession({
				mission: "meteor",
				score: nextScore,
				stars: earned
			});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameShell, {
		mission: "meteor",
		screen: screen === "start" ? "start" : screen === "end" ? "end" : "play",
		status,
		children: [
			screen === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartCard, {
				lang,
				mission: "meteor",
				onStart: reset
			}) : null,
			screen !== "start" && screen !== "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[42vh] rounded-[var(--radius-xl)] bg-sky" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyScene, {
						background: "#1a2436",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightSky, {
							x,
							isTarget,
							visible: screen === "trial",
							onSignal: signal
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: remain }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: screen === "idle" && index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: () => startTrial(0),
						children: t(lang, "meteor.start")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						disabled: screen !== "trial",
						onClick: signal,
						children: t(lang, "meteor.signal")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm tabular-nums text-fg-muted",
					children: [
						t(lang, "meteor.hits"),
						" ",
						hits,
						" · ",
						t(lang, "meteor.misses"),
						" ",
						misses,
						" · ",
						t(lang, "meteor.fa"),
						" ",
						fa
					]
				})
			] }) : null,
			screen === "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
				lang,
				score,
				stars,
				best: Math.max(best, score),
				onAgain: () => setScreen("start"),
				lines: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-fg-muted",
					children: [
						t(lang, "meteor.hits"),
						" ",
						hits,
						" · ",
						t(lang, "meteor.misses"),
						" ",
						misses,
						" · ",
						t(lang, "meteor.fa"),
						" ",
						fa
					]
				})
			}) : null
		]
	});
}
function NightSky({ x, isTarget, visible, onSignal }) {
	const mesh = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useRef)(new Object3D());
	useFrame(() => {
		if (!mesh.current) return;
		for (let i = 0; i < 60; i++) {
			dummy.current.position.set(-5 + i * 37 % 100 / 10, 2.2 + i * 19 % 28 / 10, -3.2);
			dummy.current.scale.setScalar(.4);
			dummy.current.updateMatrix();
			mesh.current.setMatrixAt(i, dummy.current.matrix);
		}
		mesh.current.instanceMatrix.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundDisc, {
			color: "#121a28",
			radius: 9
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
			ref: mesh,
			args: [
				void 0,
				void 0,
				60
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.06, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#cdd7ff" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cottage, {
			position: [
				0,
				0,
				2.4
			],
			color: "#2c3548",
			roof: "#c45c3e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			visible,
			position: [
				x,
				1.15,
				0
			],
			onPointerUp: (e) => {
				e.stopPropagation();
				onSignal();
			},
			children: [isTarget ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Traveler, { position: [
				0,
				0,
				0
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpaceRock, { position: [
				0,
				0,
				0
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.2,
					1.2,
					1.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					transparent: true,
					opacity: 0
				})]
			})]
		})
	] });
}
var POS = [
	[
		-2.4,
		.4,
		-.6
	],
	[
		0,
		.5,
		-.2
	],
	[
		2.4,
		.35,
		-.8
	],
	[
		-2.2,
		.4,
		1.6
	],
	[
		.3,
		.45,
		1.8
	],
	[
		2.3,
		.38,
		1.4
	]
];
function OceanGame() {
	const lang = useAcademy((s) => s.lang);
	const recordSession = useAcademy((s) => s.recordSession);
	const best = useAcademy((s) => s.best.ocean);
	const [types, setTypes] = (0, import_react.useState)(() => shuffle([
		"a",
		"a",
		"a",
		"b",
		"b",
		"b"
	]));
	const [screen, setScreen] = (0, import_react.useState)("start");
	const [found, setFound] = (0, import_react.useState)([]);
	const [hint, setHint] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [stars, setStars] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)(t(lang, "ocean.purpose"));
	const [shake, setShake] = (0, import_react.useState)(false);
	function startRun() {
		setTypes(shuffle([
			"a",
			"a",
			"a",
			"b",
			"b",
			"b"
		]));
		setFound([]);
		setHint(null);
		setScore(0);
		setShake(false);
		setScreen("play");
		setStatus(t(lang, "ocean.purpose"));
	}
	function pick(i) {
		if (screen !== "play" || found.includes(i)) return;
		if (types[i] !== "a") {
			setStatus(t(lang, "ocean.wrong"));
			setShake(true);
			window.setTimeout(() => setShake(false), 280);
			return;
		}
		const next = [...found, i];
		const nextScore = score + 20;
		setFound(next);
		setScore(nextScore);
		setHint(null);
		if (next.length >= 3) {
			const earned = starsFor(3, 2, 3);
			setStars(earned);
			recordSession({
				mission: "ocean",
				score: nextScore,
				stars: earned
			});
			setStatus(t(lang, "ocean.restored"));
			setScreen("end");
		} else setStatus(`${t(lang, "ocean.found")} ${next.length} / 3`);
	}
	function showHint() {
		const first = types.map((kind, i) => kind === "a" && !found.includes(i) ? i : -1).filter((i) => i >= 0)[0];
		if (first != null) setHint(first % 3);
	}
	const coral = .35 + found.length * .28;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameShell, {
		mission: "ocean",
		screen,
		status,
		children: [
			screen === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartCard, {
				lang,
				mission: "ocean",
				onStart: startRun
			}) : null,
			screen !== "start" && screen !== "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[42vh] rounded-[var(--radius-xl)] bg-sky" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyScene, {
						background: "#9ad0d8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reef, {
							types,
							found,
							hint,
							coral,
							onPick: pick
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("rounded-[var(--radius-lg)] border border-border bg-bg-elevated px-4 py-3", shake ? "shake-error" : ""),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg-muted",
						children: t(lang, "ocean.purpose")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 40 24",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
										cx: "18",
										cy: "12",
										rx: "12",
										ry: "7",
										fill: "#c45c3e"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "12",
										y: "8",
										width: "3",
										height: "8",
										fill: "#f7f1e8"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "18",
										y: "8",
										width: "3",
										height: "8",
										fill: "#f7f1e8"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
										points: "4,12 10,8 10,16",
										fill: "#c45c3e"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [
								t(lang, "ocean.found"),
								" ",
								found.length,
								" / 3"
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: types.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "lg",
						disabled: found.includes(i),
						onClick: () => pick(i),
						children: i + 1
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: showHint,
					children: t(lang, "app.hint")
				})
			] }) : null,
			screen === "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
				lang,
				score,
				stars,
				best: Math.max(best, score),
				onAgain: () => setScreen("start")
			}) : null
		]
	});
}
function Reef({ types, found, hint, coral, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundDisc, { color: "#e7d6ad" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.06,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				8,
				.1,
				5.2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7eb8c9",
				roughness: .7
			})]
		}),
		hint === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				hint === 0 ? -2.2 : hint === 1 ? .2 : 2.2,
				.12,
				.5
			],
			"rotation-x": -Math.PI / 2,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [1.4, 20] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#e0b15a",
				transparent: true,
				opacity: .28
			})]
		}),
		types.map((kind, i) => {
			const pos = POS[i];
			const striped = kind === "a";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: pos,
				onPointerUp: (e) => {
					e.stopPropagation();
					onPick(i);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fish, {
						color: striped ? "#c45c3e" : "#4f8a74",
						striped,
						position: [
							0,
							0,
							0
						],
						rotationY: .4
					}),
					found.includes(i) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						"rotation-x": -Math.PI / 2,
						position: [
							0,
							-.25,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
							.45,
							.04,
							8,
							20
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e0b15a",
							flatShading: true
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.3,
							1,
							1
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							transparent: true,
							opacity: 0
						})]
					})
				]
			}, i);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				3.6,
				.2,
				-1.8
			],
			scale: coral,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.5,
				1.3,
				7
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d578a1",
				roughness: .8,
				flatShading: true
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fish, {
			color: "#c45c3e",
			striped: true,
			position: [
				0,
				1.7,
				-3.1
			],
			rotationY: Math.PI / 2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.45,
				-3.15
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.6,
				.08,
				.7
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#f7f1e8" })]
		})
	] });
}
function RainbowGame() {
	const lang = useAcademy((s) => s.lang);
	const recordSession = useAcademy((s) => s.recordSession);
	const best = useAcademy((s) => s.best.rainbow);
	const [screen, setScreen] = (0, import_react.useState)("start");
	const [rule, setRule] = (0, import_react.useState)("ink");
	const [pendingRule, setPendingRule] = (0, import_react.useState)("ink");
	const [card, setCard] = (0, import_react.useState)({
		word: "blue",
		ink: "red"
	});
	const [choices, setChoices] = (0, import_react.useState)([
		"red",
		"blue",
		"green"
	]);
	const [trial, setTrial] = (0, import_react.useState)(0);
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [stars, setStars] = (0, import_react.useState)(0);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)(t(lang, "rainbow.purpose"));
	const [courierX, setCourierX] = (0, import_react.useState)(-3.2);
	function deal(nextRule) {
		const next = randomStroop();
		setCard(next);
		setChoices(shuffle(INK_COLORS.map((c) => c.id)));
		setRule(nextRule);
		setStatus(nextRule === "ink" ? t(lang, "rainbow.ruleInk") : t(lang, "rainbow.ruleWord"));
	}
	function startRun() {
		setTrial(0);
		setCorrect(0);
		setScore(0);
		setCourierX(-3.2);
		setLocked(false);
		setScreen("play");
		deal("ink");
	}
	function pick(id) {
		if (screen !== "play" || locked) return;
		const ok = id === (rule === "ink" ? card.ink : card.word);
		setLocked(true);
		const nextTrial = trial + 1;
		const nextCorrect = correct + (ok ? 1 : 0);
		const nextScore = score + (ok ? 15 : 0);
		setTrial(nextTrial);
		setCorrect(nextCorrect);
		setScore(nextScore);
		if (ok) setCourierX(-3.2 + nextCorrect * 1.15);
		if (nextTrial === 4 && rule === "ink") {
			setPendingRule("word");
			setScreen("pause-rule");
			setStatus(t(lang, "rainbow.newRule"));
			setLocked(false);
			return;
		}
		if (nextTrial >= 8) {
			const earned = starsFor(nextCorrect, 5, 7);
			setStars(earned);
			recordSession({
				mission: "rainbow",
				score: nextScore,
				stars: earned
			});
			setScreen("end");
			setStatus(t(lang, "rainbow.chapterDone"));
			setLocked(false);
			return;
		}
		deal(rule);
		setLocked(false);
	}
	const word = INK_COLORS.find((c) => c.id === card.word);
	const ink = INK_COLORS.find((c) => c.id === card.ink);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameShell, {
		mission: "rainbow",
		screen: screen === "start" ? "start" : screen === "end" ? "end" : "play",
		status,
		children: [
			screen === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartCard, {
				lang,
				mission: "rainbow",
				onStart: startRun
			}) : null,
			screen !== "start" && screen !== "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[42vh] rounded-[var(--radius-xl)] bg-sky" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyScene, {
						background: "#c5def0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RainbowWorld, { courierX })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-lg)] border border-border bg-bg-elevated px-4 py-3 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg-muted",
						children: rule === "ink" ? t(lang, "rainbow.ruleInk") : t(lang, "rainbow.ruleWord")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl",
						style: { color: ink?.hex },
						children: word?.word[lang]
					})]
				}),
				screen === "pause-rule" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					onClick: () => {
						setScreen("play");
						deal(pendingRule);
					},
					children: t(lang, "app.ack")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: choices.map((id) => {
						const c = INK_COLORS.find((x) => x.id === id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "xl",
							disabled: locked,
							onClick: () => pick(id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-4 rounded-full",
								style: { background: c.hex }
							}), c.word[lang]]
						}, id);
					})
				})
			] }) : null,
			screen === "end" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
				lang,
				score,
				stars,
				best: Math.max(best, score),
				onAgain: () => setScreen("start"),
				lines: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-fg-muted",
					children: [
						t(lang, "rainbow.delivered"),
						" ",
						correct
					]
				})
			}) : null
		]
	});
}
function RainbowWorld({ courierX }) {
	const bands = [
		"#e55252",
		"#efb431",
		"#47995d",
		"#4f8a74",
		"#5a9ec2"
	];
	const geos = (0, import_react.useMemo)(() => bands.map((color, i) => {
		const outer = 2.3 - i * .22;
		const inner = outer - .16;
		const shape = new Shape();
		shape.absarc(0, 0, outer, 0, Math.PI, false);
		shape.absarc(0, 0, inner, Math.PI, 0, true);
		const geo = new ExtrudeGeometry(shape, {
			depth: .32,
			bevelEnabled: false,
			curveSegments: 20
		});
		geo.translate(0, 0, -.16);
		return {
			color,
			geo
		};
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundDisc, { color: "#dce9d2" }),
		geos.map((band) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: band.geo,
			position: [
				0,
				.02,
				-1.6
			],
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: band.color,
				roughness: .7,
				flatShading: true
			})
		}, band.color)),
		Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-3.5 + i,
				.08,
				1.15
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.85,
				.14,
				1.05
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f1dfc1",
				roughness: .9,
				flatShading: true
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cottage, {
			position: [
				4.2,
				0,
				1.15
			],
			color: "#efe8dc",
			roof: "#c45c3e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Courier, { position: [
			courierX,
			0,
			1.15
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroundShadow, { position: [
			courierX,
			0,
			1.15
		] })
	] });
}
function Play() {
	const { id } = Route.useParams();
	const lang = useAcademy((s) => s.lang);
	if (!isMissionId(id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-3 p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "app.hub") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: t(lang, "end.hub")
			})
		})]
	});
	if (id === "brew") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrewGame, {});
	if (id === "rainbow") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RainbowGame, {});
	if (id === "gems") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GemsGame, {});
	if (id === "dino") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DinoGame, {});
	if (id === "meteor") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeteorGame, {});
	if (id === "ocean") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OceanGame, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoGame, {});
}
//#endregion
export { Play as component };
