import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Color, r as useThree, t as Canvas, u as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { a as ArrowLeft, i as Moon, n as Play, r as Pause } from "../_libs/lucide-react.mjs";
import { b as INGREDIENTS, i as useCalm, r as useAcademy } from "./router-r1TXw9yV.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/game-ui-ByV-gBJg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientOnly({ children, fallback }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	return ready ? children : fallback ?? null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function ToyMat({ color, emissive = "#000000", intensity = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		color,
		roughness: .78,
		metalness: .04,
		flatShading: true,
		emissive,
		emissiveIntensity: intensity
	});
}
function Eyes({ y = .22, z = .28, spread = .14, size = .08 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [[-1, 1].map((side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			side * spread,
			y,
			z
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			size,
			10,
			8
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#f7f1e8" })]
	}, `w${side}`)), [-1, 1].map((side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			side * spread,
			y,
			z + size * .7
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			size * .42,
			8,
			6
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#2a241c" })]
	}, `p${side}`))] });
}
function GroundDisc({ color = "#d3e4cc", radius = 8 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		"rotation-x": -Math.PI / 2,
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [radius, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .95,
			metalness: 0
		})]
	});
}
function GroundShadow({ position, scale = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			position[0],
			.02,
			position[2]
		],
		"rotation-x": -Math.PI / 2,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.45, 20] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#2a241c",
			transparent: true,
			opacity: .16
		})]
	});
}
function Monster({ color = "#7d6bb3", position = [
	0,
	0,
	0
], scale = 1, happy = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.85,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.55,
					14,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.35,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.42,
					14,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.28,
					1.28,
					0
				],
				rotation: [
					0,
					0,
					.4
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.12,
					.32,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#e8d9a8" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.28,
					1.28,
					0
				],
				rotation: [
					0,
					0,
					-.4
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.12,
					.32,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#e8d9a8" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyes, {
				y: .95,
				z: .42
			}),
			happy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.78,
					.46
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.12,
					.03,
					6,
					10,
					Math.PI
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#2a241c" })]
			}) : null
		]
	});
}
function Jar({ id, position, lit = false, scale = 1 }) {
	const item = INGREDIENTS.find((i) => i.id === id);
	const emissive = lit ? "#fff0a0" : "#000000";
	const intensity = lit ? .7 : 0;
	if (!item) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			item.shape === "sphere" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				position: [
					0,
					.28,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.28,
					12,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, {
					color: item.color,
					emissive,
					intensity
				})]
			}) : null,
			item.shape === "box" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				position: [
					0,
					.26,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.42,
					.42,
					.42
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, {
					color: item.color,
					emissive,
					intensity
				})]
			}) : null,
			item.shape === "octa" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				position: [
					0,
					.34,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.3] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, {
					color: item.color,
					emissive,
					intensity
				})]
			}) : null,
			item.shape === "cyl" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				position: [
					0,
					.26,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.22,
					.22,
					.42,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, {
					color: item.color,
					emissive,
					intensity
				})]
			}) : null,
			item.shape === "cone" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				position: [
					0,
					.28,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.28,
					.5,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, {
					color: item.color,
					emissive,
					intensity
				})]
			}) : null,
			item.shape === "drop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				position: [
					0,
					.3,
					0
				],
				scale: [
					1,
					1.35,
					1
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.22,
					12,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, {
					color: item.color,
					emissive,
					intensity
				})]
			}) : null
		]
	});
}
function Cauldron({ fill = 0, liquid = "#60d6c3" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.55,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.95,
				.72,
				1.05,
				20,
				1,
				true
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#5c4d66",
				roughness: .7,
				side: 2,
				flatShading: true
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.08,
				0
			],
			"rotation-x": Math.PI / 2,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.95,
				.08,
				8,
				24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#a795b7" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.18 + fill * .7,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.82,
				.82,
				.08,
				20
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, {
				color: liquid,
				emissive: liquid,
				intensity: fill > .2 ? .25 : 0
			})]
		})
	] });
}
function Crystal({ position, color = "#5c9eaf", lit = false, lift = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			position[0],
			position[1] + lift,
			position[2]
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.12,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.42,
				.5,
				.22,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#efe8f4" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.58,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.38] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, {
				color,
				emissive: lit ? "#fff0a0" : "#000",
				intensity: lit ? .85 : 0
			})]
		})]
	});
}
function Pine({ position, scale = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.45,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.12,
				.16,
				.9,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#8b5a32" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.15,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.55,
				1.1,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#4f8a74" })]
		})]
	});
}
function PerformerFigure({ id, position = [
	0,
	0,
	0
], visible = true, celebrate = false }) {
	const color = {
		fox: "#c45c3e",
		bear: "#8b5a32",
		bunny: "#e6d5bc",
		frog: "#4f8a74"
	}[id] ?? "#c45c3e";
	const ear = id === "bunny" ? "long" : id === "frog" ? "none" : id === "fox" ? "point" : "round";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		visible,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.55,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.48,
					14,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.05,
					.08
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.32,
					12,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}),
			ear === "point" ? [-1, 1].map((side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					side * .2,
					1.38,
					0
				],
				rotation: [
					0,
					0,
					side * -.4
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.1,
					.28,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}, side)) : null,
			ear === "round" ? [-1, 1].map((side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					side * .22,
					1.32,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.12,
					8,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}, side)) : null,
			ear === "long" ? [-1, 1].map((side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					side * .14,
					1.5,
					0
				],
				scale: [
					.7,
					1.6,
					.5
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.12,
					8,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}, side)) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyes, {
				y: 1.08,
				z: .3,
				spread: .12,
				size: .07
			}),
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.42,
					1.15,
					0
				],
				rotation: [
					0,
					0,
					-.6
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.06,
					.06,
					.4,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}) : null
		]
	});
}
function Train({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.15,
					.42,
					.55
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#c45c3e" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.28,
					.58,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.45,
					.32,
					.5
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#efe8dc" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.45,
					.55,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					.38,
					.28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#4f8a74" })]
			}),
			[-.32, .32].flatMap((x) => [-.22, .22].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					.12,
					z
				],
				"rotation-z": Math.PI / 2,
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.12,
					.12,
					.12,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#2a241c" })]
			}, `${x}${z}`)))
		]
	});
}
function Dino({ position, scale = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.28,
					12,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#7aa35a" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.28,
					.38,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.18,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#7aa35a" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.4,
					.36,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.08,
					.2,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#c45c3e" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyes, {
				y: .44,
				z: .18,
				spread: .08,
				size: .05
			})
		]
	});
}
function Fish({ color, striped, position, rotationY = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		"rotation-y": rotationY,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				scale: [
					1.4,
					.7,
					.55
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.28,
					12,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.42,
					0,
					0
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.16,
					.28,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
			}),
			striped ? [-.08, .08].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					.02,
					.12
				],
				scale: [
					.12,
					.42,
					.08
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1,
					1,
					1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#f7f1e8" })]
			}, x)) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.22,
					.06,
					.22
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.05,
					8,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#2a241c" })]
			})
		]
	});
}
function Courier({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.26,
					12,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#c45c3e" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.62,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.2,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#f0dcc3" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.86,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.16,
					.28,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#4f8a74" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.28,
					.38,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.18,
					.16,
					.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#e0b15a" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyes, {
				y: .64,
				z: .16,
				spread: .08,
				size: .045
			})
		]
	});
}
function Traveler({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.18,
					.28,
					6,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#e8d9a8" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.38,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.16,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#7ea0b8" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.58,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.02,
					.02,
					.22,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#e0b15a" })]
			})
		]
	});
}
function SpaceRock({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position,
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.28, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: "#8c8297" })]
	});
}
function Cottage({ position, color = "#c45c3e", roof = "#6b4b3a" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.4,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.1,
				.8,
				.9
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.95,
				0
			],
			"rotation-y": Math.PI / 4,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.85,
				.7,
				4
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyMat, { color: roof })]
		})]
	});
}
function FitCamera({ halfW = 6, halfD = 4.5 }) {
	const { size, camera } = useThree();
	(0, import_react.useLayoutEffect)(() => {
		const cam = camera;
		const aspect = Math.max(size.width / Math.max(size.height, 1), .5);
		const half = Math.max(halfD, halfW / aspect);
		cam.left = -half * aspect;
		cam.right = half * aspect;
		cam.top = half;
		cam.bottom = -half;
		cam.updateProjectionMatrix();
	}, [
		size,
		camera,
		halfW,
		halfD
	]);
	return null;
}
function PlaceCamera() {
	const { camera } = useThree();
	(0, import_react.useLayoutEffect)(() => {
		camera.position.set(7.2, 8.4, 7.2);
		camera.lookAt(0, .4, 0);
		camera.updateProjectionMatrix();
	}, [camera]);
	return null;
}
function ToyScene({ children, background = "#dfeee6", className, halfW, halfD }) {
	const calm = useCalm();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-sky", className),
		style: {
			minHeight: 240,
			height: "min(46vh, 420px)",
			touchAction: "manipulation"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
			orthographic: true,
			camera: {
				near: .1,
				far: 80,
				zoom: 1,
				position: [
					7.2,
					8.4,
					7.2
				]
			},
			shadows: !calm && {
				enabled: true,
				type: 1
			},
			dpr: [1, 1.5],
			gl: {
				antialias: true,
				alpha: false
			},
			frameloop: calm ? "demand" : "always",
			onCreated: ({ scene, gl }) => {
				scene.background = new Color(background);
				gl.setClearColor(background, 1);
				gl.shadowMap.enabled = !calm;
				gl.shadowMap.type = 1;
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCamera, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitCamera, {
					halfW,
					halfD
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
					"#fff6ea",
					"#6d7a62",
					1.15
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
					position: [
						6,
						10,
						7
					],
					intensity: calm ? 1.6 : 2.15,
					castShadow: !calm,
					"shadow-mapSize": [512, 512],
					"shadow-camera-left": -9,
					"shadow-camera-right": 9,
					"shadow-camera-top": 9,
					"shadow-camera-bottom": -9,
					"shadow-camera-near": .5,
					"shadow-camera-far": 40
				}),
				children
			]
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-transform duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-soft",
			secondary: "bg-bg-elevated text-fg border border-border-strong",
			ghost: "bg-transparent text-fg hover:bg-bg-subtle",
			accent: "bg-accent text-accent-fg",
			outline: "border border-border-strong bg-transparent text-fg"
		},
		size: {
			sm: "h-9 rounded-[var(--radius-sm)] px-3 text-sm",
			md: "h-11 rounded-[var(--radius-md)] px-4 text-sm",
			lg: "h-12 rounded-[var(--radius-md)] px-5 text-base min-w-12",
			xl: "h-14 rounded-[var(--radius-lg)] px-5 text-base min-w-14",
			icon: "size-11 rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var dict = {
	en: {
		"app.title": "Wonder Heroes Academy",
		"app.sub": "Small toy worlds for memory, attention, and planning.",
		"app.missions": "Today's missions",
		"app.garden": "Crystal garden",
		"app.seeds": "Seeds",
		"app.finished": "Finished for today",
		"app.finishedDone": "See you next time.",
		"app.powered": "A play space from Cheung Ngo Medical. Not a medical assessment.",
		"app.lang": "Language",
		"app.calm": "Calm",
		"app.calmOn": "Calm on",
		"app.pause": "Pause",
		"app.resume": "Resume",
		"app.hub": "Academy",
		"app.play": "Play",
		"app.again": "Play again",
		"app.start": "Start",
		"app.next": "Next",
		"app.back": "Back",
		"app.score": "Score",
		"app.stars": "Stars",
		"app.best": "Best",
		"app.seedEarned": "You earned a garden seed.",
		"app.gardenFull": "The garden is full — enjoy what you planted.",
		"app.plant": "Plant seed",
		"app.plantHint": "Tap an empty plot, then choose a crystal.",
		"app.clearGarden": "Clear garden",
		"app.list": "Mission list",
		"app.island": "Academy table",
		"app.practice": "Practice",
		"app.challenge": "Challenge",
		"app.watchAgain": "Watch again",
		"app.assisted": "Assisted",
		"app.unassisted": "On your own",
		"app.ack": "I am ready",
		"app.preview": "Preview",
		"app.undo": "Undo",
		"app.run": "Run",
		"app.hint": "Hint",
		"app.lives": "Hearts",
		"app.perfects": "Perfect sets",
		"skill.working-memory": "Working memory",
		"skill.inhibitory-control": "Inhibitory control",
		"skill.visuospatial-memory": "Visuospatial memory",
		"skill.planning": "Planning",
		"skill.sustained-attention": "Sustained attention",
		"skill.visual-search": "Visual search",
		"skill.nback-memory": "N-back memory",
		"contrib.workshop": "Potion workshop decorated",
		"contrib.bridge": "Rainbow bridge repaired",
		"contrib.garden": "Crystal garden grown",
		"contrib.railway": "Dinosaur passenger welcomed",
		"contrib.observatory": "Observatory display completed",
		"contrib.reef": "Reef section restored",
		"contrib.stage": "Stage performance prepared",
		"brew.name": "Magic Brew Buddies",
		"brew.blurb": "Remember the ingredients and mix a potion for a visiting monster.",
		"brew.purpose": "Momo's garden needs rain. Remember the ingredients for a cloud potion.",
		"brew.how": "Watch the recipe, then tap the jars. Learn keeps the recipe visible. Remember hides it. Sequence needs the right order.",
		"brew.learn": "Learn",
		"brew.remember": "Remember",
		"brew.sequence": "Sequence",
		"brew.watch": "Watch the recipe",
		"brew.yourTurn": "Your turn — add the ingredients.",
		"brew.showAgain": "Show recipe again",
		"brew.added": "Added to the cauldron.",
		"brew.wrong": "Not that ingredient.",
		"brew.order": "That is the wrong order.",
		"brew.done": "Potion complete!",
		"brew.repair": "Let's finish this order together.",
		"brew.outcome.rain": "A little cloud rains on the garden.",
		"brew.outcome.lantern": "The lantern glows.",
		"brew.outcome.flower": "A flower opens on the counter.",
		"brew.served": "Orders served",
		"brew.ing.berry": "Berry",
		"brew.ing.mint": "Mint",
		"brew.ing.spark": "Spark",
		"brew.ing.honey": "Honey",
		"brew.ing.petal": "Petal",
		"brew.ing.drop": "Drop",
		"rainbow.name": "Rainbow Rule Race",
		"rainbow.blurb": "Help the courier. Follow the badge: word or ink colour — not both.",
		"rainbow.purpose": "Deliver a birthday present. Choose the ink colour, not the word.",
		"rainbow.how": "Practice one rule, then a new rule appears. The 3D scene never tints to reveal the answer.",
		"rainbow.ruleWord": "Tap the WORD",
		"rainbow.ruleInk": "Tap the INK COLOUR",
		"rainbow.newRule": "New rule",
		"rainbow.delivered": "Parcels delivered",
		"rainbow.chapterDone": "This delivery is finished.",
		"gems.name": "Glowy Memory Gems",
		"gems.blurb": "Remember the crystals to wake the sleeping garden.",
		"gems.purpose": "Copy the pattern. Each complete set grows a plant.",
		"gems.how": "Crystals stay the same size. Length and speed are chosen separately. Practice can watch again.",
		"gems.length": "Length",
		"gems.speed": "Speed",
		"gems.slow": "Slow",
		"gems.steady": "Steady",
		"gems.brisk": "Brisk",
		"gems.watch": "Watch the crystals",
		"gems.repeat": "Repeat the pattern.",
		"gems.grew": "The garden grew.",
		"gems.again": "Let's watch that pattern again.",
		"dino.name": "Dino Train Rescue",
		"dino.blurb": "Set the junctions, then run the train to the right station.",
		"dino.purpose": "The baby dinosaur needs a station. Set the junctions, then press Run.",
		"dino.go": "Take the dinosaur to the {station} station.",
		"dino.how": "Practice uses one switch. The puzzle uses two. The train never starts until you press Run.",
		"dino.practice": "Routing practice",
		"dino.puzzle": "Planning puzzle",
		"dino.leaf": "Leaf",
		"dino.berry": "Berry",
		"dino.shell": "Shell",
		"dino.j1": "Junction 1",
		"dino.j2": "Junction 2",
		"dino.left": "Left",
		"dino.right": "Right",
		"dino.arrived": "You reached the station.",
		"dino.missed": "That was a different station. Adjust and run again.",
		"dino.previewing": "This is the planned path.",
		"meteor.name": "Meteor Buddy Watch",
		"meteor.blurb": "Watch the sky. Signal friendly travellers. Leave the space rocks alone.",
		"meteor.purpose": "Find the travellers crossing the window.",
		"meteor.how": "A short watch with one target type and one distractor. Objects keep a steady size.",
		"meteor.signal": "Signal",
		"meteor.start": "Start watch",
		"meteor.hits": "Found",
		"meteor.misses": "Missed",
		"meteor.fa": "Incorrect signals",
		"meteor.watch": "Signal travellers. Ignore rocks.",
		"ocean.name": "Ocean Treasure Hunt",
		"ocean.blurb": "Find the striped fish so we can photograph them for the reef journal.",
		"ocean.purpose": "Match the sample on the card. Hint lights a region, not the fish.",
		"ocean.how": "Fish stay still. Target and distractors are equally bright.",
		"ocean.found": "Matching fish found",
		"ocean.wrong": "That fish is different from the sample.",
		"ocean.restored": "The reef grew.",
		"ocean.explore": "The journal page is ready.",
		"echo.name": "Echo Echo Party",
		"echo.blurb": "Tap when this performer matches the one from one or two turns ago.",
		"echo.purpose": "Rehearse for the show. Same or different?",
		"echo.how": "Tutorial shows history. Solo hides it. The first setup appearances are not scored.",
		"echo.one": "1-back",
		"echo.two": "2-back",
		"echo.hints": "With history",
		"echo.solo": "Solo",
		"echo.same": "Same",
		"echo.diff": "Different",
		"echo.remember": "Remember this performer, then press Next.",
		"echo.ask": "Same as the performer from before, or different?",
		"echo.complete": "Rehearsal complete.",
		"seed.moon": "Moon crystal",
		"seed.ice": "Ice crystal",
		"seed.forest": "Forest crystal",
		"end.title": "Session complete",
		"end.hub": "Back to the academy"
	},
	zh: {
		"app.title": "奇蹟英雄學院",
		"app.sub": "用小型玩具世界練習記憶、專注與計劃。",
		"app.missions": "今日任務",
		"app.garden": "水晶花園",
		"app.seeds": "種子",
		"app.finished": "今天到此結束",
		"app.finishedDone": "下次見。",
		"app.powered": "由翱翔醫療提供的遊戲空間。不是醫療評估。",
		"app.lang": "語言",
		"app.calm": "安靜模式",
		"app.calmOn": "已開啟安靜模式",
		"app.pause": "暫停",
		"app.resume": "繼續",
		"app.hub": "學院",
		"app.play": "開始",
		"app.again": "再玩一次",
		"app.start": "開始",
		"app.next": "下一步",
		"app.back": "返回",
		"app.score": "分數",
		"app.stars": "星星",
		"app.best": "最佳",
		"app.seedEarned": "你獲得一顆花園種子。",
		"app.gardenFull": "花園已種滿，欣賞你種下的水晶吧。",
		"app.plant": "種下種子",
		"app.plantHint": "點選空地，再選擇水晶。",
		"app.clearGarden": "清空花園",
		"app.list": "任務列表",
		"app.island": "學院桌面",
		"app.practice": "練習",
		"app.challenge": "挑戰",
		"app.watchAgain": "再看一次",
		"app.assisted": "有提示",
		"app.unassisted": "自己完成",
		"app.ack": "我準備好了",
		"app.preview": "預覽",
		"app.undo": "復原",
		"app.run": "出發",
		"app.hint": "提示",
		"app.lives": "愛心",
		"app.perfects": "完美組數",
		"skill.working-memory": "工作記憶",
		"skill.inhibitory-control": "抑制控制",
		"skill.visuospatial-memory": "視覺空間記憶",
		"skill.planning": "計劃",
		"skill.sustained-attention": "持續專注",
		"skill.visual-search": "視覺搜尋",
		"skill.nback-memory": "N-back 記憶",
		"contrib.workshop": "藥水工房已裝飾",
		"contrib.bridge": "彩虹橋已修復",
		"contrib.garden": "水晶花園已成長",
		"contrib.railway": "恐龍乘客已抵達",
		"contrib.observatory": "觀星台展示已完成",
		"contrib.reef": "珊瑚區已修復",
		"contrib.stage": "舞台演出已準備",
		"brew.name": "魔法釀造夥伴",
		"brew.blurb": "記住材料，為來訪的小怪物調配藥水。",
		"brew.purpose": "Momo 的花園需要下雨。記住雲朵藥水的材料。",
		"brew.how": "先看食譜再點選罐子。學習模式會顯示食譜，記憶模式會隱藏，順序模式必須依正確次序。",
		"brew.learn": "學習",
		"brew.remember": "記憶",
		"brew.sequence": "順序",
		"brew.watch": "觀看食譜",
		"brew.yourTurn": "輪到你加入材料。",
		"brew.showAgain": "再看食譜",
		"brew.added": "已加入大鍋。",
		"brew.wrong": "不是這個材料。",
		"brew.order": "順序不對。",
		"brew.done": "藥水完成！",
		"brew.repair": "我們一起把這份訂單做完。",
		"brew.outcome.rain": "小雲朵在花園下雨。",
		"brew.outcome.lantern": "燈籠亮起來了。",
		"brew.outcome.flower": "櫃台上的花開了。",
		"brew.served": "完成的訂單",
		"brew.ing.berry": "莓果",
		"brew.ing.mint": "薄荷",
		"brew.ing.spark": "火花",
		"brew.ing.honey": "蜂蜜",
		"brew.ing.petal": "花瓣",
		"brew.ing.drop": "水滴",
		"rainbow.name": "彩虹規則賽",
		"rainbow.blurb": "幫助信使。依照徽章：選文字或墨水色，不要兩個都跟。",
		"rainbow.purpose": "送生日禮物。選墨水色，不是文字。",
		"rainbow.how": "先練習一條規則，再出現新規則。立體場景不會用顏色洩漏答案。",
		"rainbow.ruleWord": "選文字",
		"rainbow.ruleInk": "選墨水色",
		"rainbow.newRule": "新規則",
		"rainbow.delivered": "送出的包裹",
		"rainbow.chapterDone": "這次配送完成。",
		"gems.name": "發光記憶寶石",
		"gems.blurb": "記住水晶，喚醒沉睡的花園。",
		"gems.purpose": "重現圖案。每完成一組，植物就會長高。",
		"gems.how": "水晶大小一致。長度和速度分開選擇。練習模式可以再看一次。",
		"gems.length": "長度",
		"gems.speed": "速度",
		"gems.slow": "慢",
		"gems.steady": "穩定",
		"gems.brisk": "快",
		"gems.watch": "觀看水晶",
		"gems.repeat": "重現圖案。",
		"gems.grew": "花園長大了。",
		"gems.again": "我們再看一次這個圖案。",
		"dino.name": "恐龍火車救援",
		"dino.blurb": "先設定岔道，再讓火車開往正確車站。",
		"dino.purpose": "小恐龍要去一個車站。先設定岔道，再按出發。",
		"dino.go": "帶小恐龍到{station}站。",
		"dino.how": "練習用一個轉轍器，解謎用兩個。按下出發前，火車不會開動。",
		"dino.practice": "路線練習",
		"dino.puzzle": "計劃解謎",
		"dino.leaf": "葉子",
		"dino.berry": "莓果",
		"dino.shell": "貝殼",
		"dino.j1": "岔道 1",
		"dino.j2": "岔道 2",
		"dino.left": "左",
		"dino.right": "右",
		"dino.arrived": "抵達車站。",
		"dino.missed": "這是另一個車站。調整後再出發。",
		"dino.previewing": "這是計劃路線。",
		"meteor.name": "流星夥伴守望",
		"meteor.blurb": "守望天空。向友善旅人發信號，不要理會太空石。",
		"meteor.purpose": "找出穿過窗口的旅人。",
		"meteor.how": "短暫守望：一種目標、一種干擾。物體大小保持固定。",
		"meteor.signal": "發信號",
		"meteor.start": "開始守望",
		"meteor.hits": "找到",
		"meteor.misses": "錯過",
		"meteor.fa": "錯誤信號",
		"meteor.watch": "向旅人發信號。忽略石頭。",
		"ocean.name": "海洋尋寶",
		"ocean.blurb": "找出條紋魚，為珊瑚日誌拍照。",
		"ocean.purpose": "對照樣本卡。提示只會照亮一個區域，不會直接指出魚。",
		"ocean.how": "魚保持靜止。目標與干擾物一樣清楚。",
		"ocean.found": "找到的條紋魚",
		"ocean.wrong": "這隻魚和樣本不同。",
		"ocean.restored": "珊瑚長大了。",
		"ocean.explore": "日誌頁已完成。",
		"echo.name": "回聲派對",
		"echo.blurb": "當這位表演者與一或兩輪前相同時點選。",
		"echo.purpose": "為演出排練。相同還是不同？",
		"echo.how": "教學會顯示歷史。獨奏會隱藏。前幾個建立記憶的出場不計分。",
		"echo.one": "1-back",
		"echo.two": "2-back",
		"echo.hints": "顯示歷史",
		"echo.solo": "獨奏",
		"echo.same": "相同",
		"echo.diff": "不同",
		"echo.remember": "記住這位表演者，然後按下一步。",
		"echo.ask": "和之前的表演者相同，還是不同？",
		"echo.complete": "排練完成。",
		"seed.moon": "月光水晶",
		"seed.ice": "冰晶",
		"seed.forest": "森林水晶",
		"end.title": "這回合結束",
		"end.hub": "返回學院"
	}
};
function t(lang, key) {
	return dict[lang][key] ?? dict.en[key] ?? key;
}
function StarRow({ stars, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-2 text-sm text-fg-muted",
		"aria-label": label,
		children: [Array.from({ length: 3 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mr-1 inline-block size-3 rounded-full", i < stars ? "bg-primary" : "bg-bg-subtle") }, i)), label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-2 tabular-nums",
			children: label
		}) : null]
	});
}
function ChipRow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 flex flex-wrap gap-2",
		children
	});
}
function Chip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		size: "sm",
		variant: active ? "default" : "secondary",
		onClick,
		children
	});
}
function Meter({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 overflow-hidden rounded-full bg-bg-subtle",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-[width] duration-150", value < .2 ? "bg-primary" : "bg-accent"),
			style: { width: `${Math.max(0, Math.min(1, value)) * 100}%` }
		})
	});
}
function StartCard({ lang, mission, extra, onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: t(lang, `${mission}.name`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-fg-muted",
				children: t(lang, `${mission}.purpose`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-fg-subtle",
				children: t(lang, `${mission}.how`)
			}),
			extra,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				size: "lg",
				onClick: onStart,
				children: t(lang, "app.start")
			})
		]
	});
}
function EndCard({ lang, score, stars, best, lines, onAgain }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: t(lang, "end.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-display text-xl tabular-nums",
				children: [
					t(lang, "app.score"),
					" ",
					score
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRow, {
				stars,
				label: `${t(lang, "app.stars")} · ${t(lang, "app.best")} ${best}`
			}),
			lines,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					onClick: onAgain,
					children: t(lang, "app.again")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: t(lang, "end.hub")
					})
				})]
			})
		]
	});
}
function GameShell({ mission, screen, status, children, controls }) {
	const lang = useAcademy((s) => s.lang);
	const paused = useAcademy((s) => s.paused);
	const setPaused = useAcademy((s) => s.setPaused);
	const calmRequested = useAcademy((s) => s.calmRequested);
	const setCalm = useAcademy((s) => s.setCalm);
	const lastSeedBanner = useAcademy((s) => s.lastSeedBanner);
	const dismissBanner = useAcademy((s) => s.dismissBanner);
	const name = t(lang, `${mission}.name`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-3xl flex-col gap-3 px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						asChild: true,
						"aria-label": t(lang, "app.back"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							onClick: () => setPaused(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-lg leading-tight",
							children: name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: calmRequested ? "accent" : "secondary",
						size: "sm",
						onClick: () => setCalm(!calmRequested),
						"aria-pressed": calmRequested,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }), calmRequested ? t(lang, "app.calmOn") : t(lang, "app.calm")]
					}),
					screen === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "icon",
						onClick: () => setPaused(!paused),
						"aria-label": t(lang, paused ? "app.resume" : "app.pause"),
						children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg-muted",
				role: "status",
				"aria-live": "polite",
				children: status
			}),
			lastSeedBanner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-elevated px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: t(lang, "app.seedEarned")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: dismissBanner,
					children: t(lang, "app.next")
				})]
			}) : null,
			children,
			controls ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				"aria-label": "Game controls",
				children: controls
			}) : null,
			paused && screen === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-20 flex items-center justify-center bg-ink/40 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: t(lang, "app.pause")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setPaused(false),
							children: t(lang, "app.resume")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								onClick: () => setPaused(false),
								children: t(lang, "app.hub")
							})
						})]
					})]
				})
			}) : null
		]
	});
}
//#endregion
export { ToyScene as C, t as D, cn as E, StartCard as S, Traveler as T, Monster as _, ClientOnly as a, SpaceRock as b, Crystal as c, Fish as d, GameShell as f, Meter as g, Jar as h, ChipRow as i, Dino as l, GroundShadow as m, Cauldron as n, Cottage as o, GroundDisc as p, Chip as r, Courier as s, Button as t, EndCard as u, PerformerFigure as v, Train as w, StarRow as x, Pine as y };
