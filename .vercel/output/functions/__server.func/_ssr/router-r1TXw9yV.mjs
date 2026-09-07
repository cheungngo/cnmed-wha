import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-r1TXw9yV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var MISSION_IDS = [
	"brew",
	"rainbow",
	"gems",
	"dino",
	"meteor",
	"ocean",
	"echo"
];
var MISSIONS = [
	{
		id: "brew",
		skill: "working-memory",
		contribution: "workshop",
		sky: "#f0dcc3"
	},
	{
		id: "rainbow",
		skill: "inhibitory-control",
		contribution: "bridge",
		sky: "#c5def0"
	},
	{
		id: "gems",
		skill: "visuospatial-memory",
		contribution: "garden",
		sky: "#d5e4dc"
	},
	{
		id: "dino",
		skill: "planning",
		contribution: "railway",
		sky: "#d7e6c4"
	},
	{
		id: "meteor",
		skill: "sustained-attention",
		contribution: "observatory",
		sky: "#1a2436"
	},
	{
		id: "ocean",
		skill: "visual-search",
		contribution: "reef",
		sky: "#9ad0d8"
	},
	{
		id: "echo",
		skill: "nback-memory",
		contribution: "stage",
		sky: "#efe3d2"
	}
];
function isMissionId(id) {
	return MISSION_IDS.includes(id);
}
var INGREDIENTS = [
	{
		id: "berry",
		color: "#c45c3e",
		shape: "sphere"
	},
	{
		id: "mint",
		color: "#4f8a74",
		shape: "box"
	},
	{
		id: "spark",
		color: "#e0b15a",
		shape: "octa"
	},
	{
		id: "honey",
		color: "#d3923b",
		shape: "cyl"
	},
	{
		id: "petal",
		color: "#d67a8c",
		shape: "cone"
	},
	{
		id: "drop",
		color: "#5a9ec2",
		shape: "drop"
	}
];
var PERFORMERS = [
	{
		id: "fox",
		color: "#c45c3e",
		ear: "point"
	},
	{
		id: "bear",
		color: "#8b5a32",
		ear: "round"
	},
	{
		id: "bunny",
		color: "#d8c4a8",
		ear: "long"
	},
	{
		id: "frog",
		color: "#4f8a74",
		ear: "none"
	}
];
var SEEDS = [
	{
		id: "moon",
		color: "#7ea0b8",
		crystal: "#c5d8e6"
	},
	{
		id: "ice",
		color: "#6cb3c4",
		crystal: "#d7f3f7"
	},
	{
		id: "forest",
		color: "#4f8a74",
		crystal: "#c8e6c0"
	}
];
var LANDMARKS = {
	brew: [
		-3.4,
		0,
		-2.2
	],
	rainbow: [
		0,
		0,
		-3.1
	],
	gems: [
		3.3,
		0,
		-2.2
	],
	dino: [
		-3.6,
		0,
		1.6
	],
	meteor: [
		.2,
		0,
		3.2
	],
	ocean: [
		3.4,
		0,
		1.8
	],
	echo: [
		0,
		0,
		.2
	]
};
var PLOT_POSITIONS = [
	[
		-1.4,
		0,
		2.2
	],
	[
		-.4,
		0,
		2.2
	],
	[
		.6,
		0,
		2.2
	],
	[
		-1.4,
		0,
		3.1
	],
	[
		-.4,
		0,
		3.1
	],
	[
		.6,
		0,
		3.1
	]
];
var STATIONS = [
	{
		id: "leaf",
		color: "#4f8a74",
		pos: [
			3.4,
			0,
			-2.1
		]
	},
	{
		id: "berry",
		color: "#c45c3e",
		pos: [
			3.4,
			0,
			0
		]
	},
	{
		id: "shell",
		color: "#5a9ec2",
		pos: [
			3.4,
			0,
			2.1
		]
	}
];
var INK_COLORS = [
	{
		id: "red",
		hex: "#b42318",
		word: {
			en: "RED",
			zh: "紅"
		}
	},
	{
		id: "blue",
		hex: "#175cd3",
		word: {
			en: "BLUE",
			zh: "藍"
		}
	},
	{
		id: "green",
		hex: "#18713c",
		word: {
			en: "GREEN",
			zh: "綠"
		}
	}
];
function shuffle(items, rng = Math.random) {
	const next = [...items];
	for (let i = next.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[next[i], next[j]] = [next[j], next[i]];
	}
	return next;
}
function pick(items, count, rng = Math.random) {
	return shuffle(items, rng).slice(0, Math.min(count, items.length));
}
function todayKey(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function canAwardSeed(awardedOn, mission, day = todayKey()) {
	return !(awardedOn[day] ?? []).includes(mission);
}
function starsFor(value, twoAt = 6, threeAt = 10) {
	if (value >= threeAt) return 3;
	if (value >= twoAt) return 2;
	return value >= Math.max(1, Math.floor(twoAt / 2)) ? 1 : 0;
}
function checkBrewTap(mode, recipe, added, tap) {
	if (added.includes(tap)) return {
		ok: false,
		reason: "duplicate"
	};
	if (mode === "sequence") return tap === recipe[added.length] ? { ok: true } : {
		ok: false,
		reason: "out-of-order"
	};
	return recipe.includes(tap) ? { ok: true } : {
		ok: false,
		reason: "not-in-recipe"
	};
}
function gemSequence(length, cells = 9, rng = Math.random) {
	const out = [];
	for (let i = 0; i < length; i++) {
		let cell = Math.floor(rng() * cells);
		while (out.length > 0 && cell === out[out.length - 1]) cell = Math.floor(rng() * cells);
		out.push(cell);
	}
	return out;
}
function gemSpeed(kind) {
	if (kind === "slow") return .9;
	if (kind === "brisk") return .48;
	return .65;
}
function nextGemLength(perfects, base = 3, max = 7) {
	return Math.min(max, base + Math.floor(Math.max(0, perfects) / 2));
}
function junctionStation(j1, j2) {
	if (j1 === "L" && j2 === "L") return 0;
	if (j1 === "R" && j2 === "R") return 2;
	return 1;
}
function nbackSequence(pool, length, n, rng = Math.random) {
	const out = [];
	for (let i = 0; i < length; i++) if (i >= n && rng() < .35) out.push(out[i - n]);
	else out.push(pool[Math.floor(rng() * pool.length)]);
	return out;
}
function scoreEcho(seq, index, n, action) {
	if (index < n) return "setup";
	const match = seq[index] === seq[index - n];
	if (match && action === "same") return "hit";
	if (!match && action === "wait") return "correct-reject";
	if (!match && action === "same") return "false-alarm";
	return "miss";
}
function echoAccuracy(results) {
	const scored = results.filter((r) => r !== "setup");
	if (scored.length === 0) return 0;
	return scored.filter((r) => r === "hit" || r === "correct-reject").length / scored.length;
}
function randomStroop(rng = Math.random) {
	const word = INK_COLORS[Math.floor(rng() * INK_COLORS.length)].id;
	let ink = INK_COLORS[Math.floor(rng() * INK_COLORS.length)].id;
	if (ink === word) ink = INK_COLORS[(INK_COLORS.findIndex((c) => c.id === word) + 1) % INK_COLORS.length].id;
	return {
		word,
		ink
	};
}
function lerpPath(points, t) {
	if (points.length < 2) return points[0] ?? [
		0,
		0,
		0
	];
	const n = points.length - 1;
	const scaled = t * n;
	const i = Math.min(n - 1, Math.floor(scaled));
	const a = scaled - i;
	const from = points[i];
	const to = points[i + 1];
	return [
		from[0] + (to[0] - from[0]) * a,
		from[1] + (to[1] - from[1]) * a,
		from[2] + (to[2] - from[2]) * a
	];
}
function emptyScores() {
	return Object.fromEntries(MISSION_IDS.map((id) => [id, 0]));
}
function emptyPlots() {
	return Array.from({ length: 6 }, () => ({ seed: null }));
}
var useAcademy = create()(persist((set, get) => ({
	version: 1,
	lang: "en",
	calmRequested: false,
	paused: false,
	seedsAvailable: 0,
	awardedOn: {},
	plots: emptyPlots(),
	finishedOn: null,
	stars: emptyScores(),
	best: emptyScores(),
	contributions: emptyScores(),
	lastSeedBanner: null,
	setLang: (lang) => set({ lang }),
	setCalm: (calmRequested) => set({ calmRequested }),
	setPaused: (paused) => set({ paused }),
	finishToday: () => set({ finishedOn: todayKey() }),
	dismissBanner: () => set({ lastSeedBanner: null }),
	plant: (plot, seed) => {
		const { plots, seedsAvailable } = get();
		if (seedsAvailable <= 0) return false;
		const current = plots[plot];
		if (!current || current.seed) return false;
		set({
			plots: plots.map((p, i) => i === plot ? { seed } : p),
			seedsAvailable: seedsAvailable - 1
		});
		return true;
	},
	clearGarden: () => set({ plots: emptyPlots() }),
	recordSession: ({ mission, score, stars }) => {
		const state = get();
		const day = todayKey();
		const seedAwarded = canAwardSeed(state.awardedOn, mission, day);
		const awardedOn = { ...state.awardedOn };
		if (seedAwarded) awardedOn[day] = [...awardedOn[day] ?? [], mission];
		set({
			stars: {
				...state.stars,
				[mission]: Math.max(state.stars[mission], stars)
			},
			best: {
				...state.best,
				[mission]: Math.max(state.best[mission], score)
			},
			contributions: {
				...state.contributions,
				[mission]: state.contributions[mission] + 1
			},
			awardedOn,
			seedsAvailable: state.seedsAvailable + (seedAwarded ? 1 : 0),
			lastSeedBanner: seedAwarded ? `${day}:${mission}` : state.lastSeedBanner
		});
		return { seedAwarded };
	}
}), {
	name: "wonder-heroes-academy",
	version: 1,
	partialize: (s) => ({
		version: s.version,
		lang: s.lang,
		calmRequested: s.calmRequested,
		seedsAvailable: s.seedsAvailable,
		awardedOn: s.awardedOn,
		plots: s.plots,
		finishedOn: s.finishedOn,
		stars: s.stars,
		best: s.best,
		contributions: s.contributions
	}),
	migrate: (raw) => {
		const t = raw ?? {};
		return {
			version: 1,
			lang: t.lang === "zh" ? "zh" : "en",
			calmRequested: !!t.calmRequested,
			seedsAvailable: Number(t.seedsAvailable) || 0,
			awardedOn: t.awardedOn ?? {},
			plots: Array.isArray(t.plots) && t.plots.length === 6 ? t.plots : emptyPlots(),
			finishedOn: t.finishedOn ?? null,
			stars: {
				...emptyScores(),
				...t.stars
			},
			best: {
				...emptyScores(),
				...t.best
			},
			contributions: {
				...emptyScores(),
				...t.contributions
			}
		};
	}
}));
function usePaused() {
	return useAcademy((s) => s.paused);
}
function useCalm() {
	const requested = useAcademy((s) => s.calmRequested);
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReduced(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);
	return requested || reduced;
}
function CalmRoot({ children }) {
	const calm = useCalm();
	(0, import_react.useEffect)(() => {
		const el = document.documentElement;
		if (calm) el.setAttribute("data-calm", "true");
		else el.removeAttribute("data-calm");
	}, [calm]);
	return children;
}
var styles_default = "/assets/styles-8sxD5I8W.css";
var APP_NAME = "Wonder Heroes Academy";
var Route$2 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#C45C3E"
			},
			{
				name: "description",
				content: "Small toy worlds for memory, attention, and planning."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Fredoka:wght@500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalmRoot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$1 = () => import("./routes--UXfcLhW.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./play._id-r9r4uBdc.mjs");
var Route = createFileRoute("/play/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	PlayIdRoute: Route.update({
		id: "/play/$id",
		path: "/play/$id",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { MISSIONS as C, STATIONS as D, SEEDS as E, isMissionId as O, LANDMARKS as S, PLOT_POSITIONS as T, shuffle as _, usePaused as a, INGREDIENTS as b, gemSequence as c, lerpPath as d, nbackSequence as f, scoreEcho as g, randomStroop as h, useCalm as i, gemSpeed as l, pick as m, Route as n, checkBrewTap as o, nextGemLength as p, useAcademy as r, echoAccuracy as s, router_exports as t, junctionStation as u, starsFor as v, PERFORMERS as w, INK_COLORS as x, todayKey as y };
