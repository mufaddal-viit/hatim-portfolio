import type {
  BorderStyle,
  ChartMode,
  ChartVariant,
  NeutralColor,
  ScalingSize,
  Schemes,
  SolidStyle,
  SolidType,
  SurfaceStyle,
  Theme,
  TransitionStyle,
} from "@once-ui-system/core";
import type { DataStyleConfig, EffectsConfig, StyleConfig } from "@/types";

/**
 * ---------------------------------------------------------------------------
 * THEME CONFIGURATION — single source of truth for the site's look and feel.
 * ---------------------------------------------------------------------------
 *
 * Everything visual is driven from this file: colors, borders, surfaces,
 * scaling, background effects and chart styling. Nothing here is hardcoded
 * anywhere else in the app.
 *
 * These values are consumed in three places, all of which read from this file:
 *   1. `Providers.tsx`   — the React ThemeProvider (runtime / client state)
 *   2. `layout.tsx`      — the pre-hydration script (prevents theme flash)
 *   3. `ThemeToggle.tsx` — user-facing light/dark switching
 *
 * Values are persisted to localStorage under `data-*` keys, so a user's choice
 * survives reloads and overrides the defaults below.
 */

/**
 * Allowed values for each token, re-exported for use across the app.
 * These come from Once UI — assigning anything outside these unions is a
 * compile-time error rather than a silent visual failure.
 */
export const THEME_OPTIONS = {
  theme: ["dark", "light", "system"],
  neutral: ["sand", "gray", "slate"],
  scheme: [
    "blue",
    "indigo",
    "violet",
    "magenta",
    "pink",
    "red",
    "orange",
    "yellow",
    "moss",
    "green",
    "emerald",
    "aqua",
    "cyan",
  ],
  solid: ["color", "contrast", "inverse"],
  solidStyle: ["flat", "plastic"],
  border: ["rounded", "playful", "conservative"],
  surface: ["filled", "translucent"],
  transition: ["all", "micro", "macro", "none"],
  scaling: ["90", "95", "100", "105", "110"],
  chartVariant: ["flat", "gradient", "outline"],
  chartMode: ["categorical", "divergent", "sequential"],
} as const satisfies {
  theme: readonly Theme[];
  neutral: readonly NeutralColor[];
  scheme: readonly Schemes[];
  solid: readonly SolidType[];
  solidStyle: readonly SolidStyle[];
  border: readonly BorderStyle[];
  surface: readonly SurfaceStyle[];
  transition: readonly TransitionStyle[];
  scaling: readonly ScalingSize[];
  chartVariant: readonly ChartVariant[];
  chartMode: readonly ChartMode[];
};

/**
 * Core visual identity — the primary knobs to turn when rebranding the site.
 *
 * `brand` drives primary actions and highlights; `accent` drives secondary
 * emphasis; `neutral` sets the greyscale foundation for text and surfaces.
 */
export const style: StyleConfig = {
  /** Light-first: warm, airy interior-design aesthetic. */
  theme: "light",
  /** "sand" is the warm greyscale — the light-brown foundation. */
  neutral: "sand",
  /**
   * "custom" routes brand to the --scheme-brand-* ramp in custom.css,
   * which defines the dark brown. Once UI ships no brown preset.
   */
  brand: "custom",
  /** Muted secondary emphasis, also warm. */
  accent: "orange",
  /** How solid (filled) elements derive their color. */
  solid: "contrast",
  /** Flat solids suit the editorial, print-like look. */
  solidStyle: "flat",
  /** Squarer corners read more architectural than "playful". */
  border: "conservative",
  /** Whether raised surfaces are opaque or translucent. */
  surface: "translucent",
  /** Scope of CSS transitions applied across the UI. */
  transition: "all",
  /** Global type and spacing scale, as a percentage. */
  scaling: "100",
};

/**
 * Decorative background layers rendered behind all page content.
 *
 * Each layer is independent — toggle `display` to enable it. `mask` follows
 * the cursor when `cursor` is true, otherwise it sits at the given x/y.
 * Colors accept any Once UI design token, so they adapt to the active theme.
 */
export const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: false,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

/**
 * Chart and data-visualisation defaults.
 * Axis and tick colors use design tokens so charts follow the active theme.
 */
export const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  /** Default chart height in pixels. */
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

/**
 * The `data-*` attribute map applied to <html>.
 *
 * This is the bridge between the config above and the DOM. Both the
 * pre-hydration script and the ThemeProvider derive their values from here,
 * which keeps server-rendered markup and client state in agreement — the
 * usual cause of theme flashing and hydration mismatches.
 *
 * Note: `theme` is intentionally excluded. It is resolved at runtime, since
 * "system" depends on a media query only the browser can evaluate.
 */
export const themeDataAttributes: Record<string, string> = {
  brand: style.brand,
  accent: style.accent,
  neutral: style.neutral,
  solid: style.solid,
  "solid-style": style.solidStyle,
  border: style.border,
  surface: style.surface,
  transition: style.transition,
  scaling: style.scaling,
  "viz-style": dataStyle.variant,
};

/** localStorage key holding the visitor's chosen color mode. */
export const THEME_STORAGE_KEY = "data-theme";

/** Fallback color mode if theme resolution throws in the browser. */
export const THEME_FALLBACK: Exclude<Theme, "system"> = "dark";
