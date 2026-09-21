import dedent from "dedent";

import { svgAnime } from "./anime";
import { NOTIF_BLUE } from "./decor";
import { BotEngine } from "./engine";
import type { BotFrame } from "./engine";
import {
  DEFAULT_EXPRESSION,
  EXPRESSION_BY_ID,
  EXPRESSIONS,
} from "./expressions";
import type { ExpressionId } from "./expressions";
import { SeedPRNG, hashSeed } from "./prng";
import { DEMI_VIEWBOX, RAYON } from "./repere";
import {
  COLOR_BY_ID,
  COLORS,
  DEFAULT_SHAPE,
  SHAPE_BY_ID,
  SHAPES,
} from "./skins";
import type { ShapeId } from "./skins";
import { STATE_BY_ID } from "./states";
import type { StateId } from "./states";

export interface AvatarOptions {
  animated?: boolean;
  background?: string;
  body?: string;
  color?: string;
  expression?: string;
  paper?: string;
  radius?: number;
  seed?: string;
  size?: number;
  state?: string;
}

export interface ResolvedAvatarConfig {
  animated: boolean;
  background?: string;
  colorHex: string;
  colorName: string;
  expression: ExpressionId;
  paper: string;
  radius?: number;
  seed: string;
  shape: ShapeId;
  size: number;
  state: StateId;
}

export function resolveAvatarConfig(
  options: AvatarOptions = {}
): ResolvedAvatarConfig {
  const seed = options.seed?.trim() || "agentcareer";
  const prng = new SeedPRNG(seed);

  // 1. Resolve Shape
  let shape: ShapeId;
  const rawShapeChoice = options.body;
  if (rawShapeChoice) {
    const normalized = rawShapeChoice.toLowerCase().trim() as ShapeId;
    shape = SHAPE_BY_ID.has(normalized) ? normalized : DEFAULT_SHAPE;
  } else {
    const allShapes = SHAPES.map((s) => s.id);
    shape = prng.pick(allShapes);
  }

  // 2. Resolve Color
  let colorHex = "#0a0a0c";
  let colorName = "noir";
  if (options.color) {
    const rawColor = options.color.trim();
    const normalized = rawColor.toLowerCase();

    if (COLOR_BY_ID.has(normalized)) {
      colorName = normalized;
      colorHex = COLOR_BY_ID.get(normalized)!.hex;
    } else if (/^[0-9a-fA-F]{3,6}$/.test(rawColor)) {
      colorHex = `#${rawColor.replace(/^#/, "")}`;
      colorName = "custom";
    } else if (/^#[0-9a-fA-F]{3,6}$/.test(rawColor)) {
      colorHex = rawColor;
      colorName = "custom";
    }
  } else {
    const pickedColor = prng.pick(COLORS);
    colorHex = pickedColor.hex;
    colorName = pickedColor.id;
  }

  // 3. Resolve Expression
  let expression: ExpressionId;
  if (options.expression) {
    const normalized = options.expression.toLowerCase().trim() as ExpressionId;
    expression = EXPRESSION_BY_ID.has(normalized)
      ? normalized
      : DEFAULT_EXPRESSION;
  } else {
    const allExpressions = EXPRESSIONS.map((e) => e.id);
    expression = prng.pick(allExpressions);
  }

  // 4. Resolve State
  let state: StateId = "idle";
  if (options.state && STATE_BY_ID.has(options.state as StateId)) {
    state = options.state as StateId;
  }

  // 5. General parameters
  const animated = Boolean(options.animated);
  const size = Math.min(2048, Math.max(16, Number(options.size) || 256));
  const paper =
    options.paper?.trim() === "transparent"
      ? "transparent"
      : options.paper?.trim() || "#f9f9f9";

  let background: string | undefined;
  if (options.background && options.background !== "transparent") {
    background = options.background.startsWith("#")
      ? options.background
      : `#${options.background}`;
  }

  const radius =
    options.radius !== undefined && !Number.isNaN(Number(options.radius))
      ? Math.max(0, Math.min(50, Number(options.radius)))
      : undefined;

  return {
    animated,
    background,
    colorHex,
    colorName,
    expression,
    paper,
    radius,
    seed,
    shape,
    size,
    state,
  };
}

/** Export view frame: margin around the widest shape (125 viewBox units) */
const MARGE = 1.08;
const RAYON_MAX = Math.max(...SHAPES.map((forme) => Math.max(...forme.radii)));
const DEMI_CADRE = Math.ceil(RAYON * RAYON_MAX * MARGE);

export function renderSvgTemplate(
  frame: BotFrame,
  config: ResolvedAvatarConfig,
  maskId: string
): string {
  const vb =
    config.state === "idle" || config.state === "wink"
      ? DEMI_CADRE
      : DEMI_VIEWBOX;
  const viewBoxStr = `${-vb} ${-vb} ${vb * 2} ${vb * 2}`;

  let bgRect = "";
  if (config.background) {
    const rx = config.radius === undefined ? "0" : `${config.radius}%`;
    bgRect = dedent`
      <rect x="${-vb}" y="${-vb}" width="${vb * 2}" height="${vb * 2}" fill="${config.background}" rx="${rx}" />
    `;
  }

  const eyeElements = frame.eyes
    .map(
      (eye) =>
        `<path d="${eye.d}" transform="${eye.matrix}" opacity="${eye.alpha}" fill="#000" />`
    )
    .join("");

  const notchElement = frame.notch
    ? dedent`
        <circle cx="${frame.notch.x}" cy="${frame.notch.y}" r="${frame.notch.r}" fill="#000" />
      `
    : "";

  const paperElement =
    config.paper === "transparent"
      ? ""
      : dedent`
          <path d="${frame.bodyPath}" fill="${config.paper}" />
        `;

  const notifElement = frame.notif
    ? dedent`
        <circle cx="${frame.notif.x}" cy="${frame.notif.y}" r="${frame.notif.r}" fill="${NOTIF_BLUE}" />
      `
    : "";

  // Arcs (front and back orbits)
  let arcsBack = "";
  let arcsFront = "";
  if (frame.arcs.length > 0) {
    arcsBack = dedent`
      <g fill="none" stroke-linecap="round">
        ${frame.arcs
          .map(
            (arc) =>
              `<path d="${arc.back}" stroke="${arc.grad.stops[0] ?? config.colorHex}" stroke-width="${arc.width}" opacity="${arc.opacity}" />`
          )
          .join("\n        ")}
      </g>
    `;
    arcsFront = dedent`
      <g fill="none" stroke-linecap="round">
        ${frame.arcs
          .map(
            (arc) =>
              `<path d="${arc.front}" stroke="${arc.grad.stops.at(-1) ?? config.colorHex}" stroke-width="${arc.width}" opacity="${arc.opacity}" />`
          )
          .join("\n        ")}
      </g>
    `;
  }

  // Dots / particles
  let dotsBack = "";
  let dotsFront = "";
  if (frame.dots.length > 0) {
    const dotsHtml = frame.dots
      .map((dot) =>
        dot.d
          ? `<path d="${dot.d}" fill="${dot.color ?? config.colorHex}" opacity="${dot.opacity}" />`
          : `<circle cx="${dot.x}" cy="${dot.y}" r="${dot.r}" fill="${dot.color ?? config.colorHex}" opacity="${dot.opacity}" />`
      )
      .join("\n        ");
    if (frame.dotsBehind) {
      dotsBack = dedent`
        <g>
          ${dotsHtml}
        </g>
      `;
    } else {
      dotsFront = dedent`
        <g>
          ${dotsHtml}
        </g>
      `;
    }
  }

  return dedent`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxStr}" width="${config.size}" height="${config.size}" role="img" aria-label="Avatar for ${config.seed}">
      <defs>
        <mask id="${maskId}" maskUnits="userSpaceOnUse" x="${-vb}" y="${-vb}" width="${vb * 2}" height="${vb * 2}">
          <path d="${frame.bodyPath}" fill="#fff" />
          ${eyeElements}
          ${notchElement}
        </mask>
      </defs>
      ${bgRect}
      ${arcsBack}
      ${dotsBack}
      <g opacity="${frame.bodyAlpha}">
        ${paperElement}
        <g mask="url(#${maskId})">
          <rect x="${-vb}" y="${-vb}" width="${vb * 2}" height="${vb * 2}" fill="${config.colorHex}" />
        </g>
      </g>
      ${dotsFront}
      ${notifElement}
      ${arcsFront}
    </svg>
  `;
}

export function generateAvatarSvg(options: AvatarOptions = {}): string {
  const config = resolveAvatarConfig(options);
  const shapeDef = SHAPE_BY_ID.get(config.shape);
  const exprDef = EXPRESSION_BY_ID.get(config.expression);

  const engine = new BotEngine(
    RAYON,
    config.state,
    shapeDef?.radii ?? null,
    exprDef ?? null
  );

  const uid = (hashSeed(config.seed) >>> 0).toString(36);
  const maskId = `bot-mask-${uid}`;

  if (!config.animated) {
    const frame = engine.sample(0);
    return renderSvgTemplate(frame, config, maskId);
  }

  // Generate 90 keyframes over 3.0 seconds (30 fps) for smooth eye blinking and gaze drift
  const keyframes = 90;
  const duration = 3;
  const step = duration / (keyframes - 1);
  const matrices: string[][] = [];
  let baseSvg = "";

  for (let i = 0; i < keyframes; i++) {
    const frame = engine.sample(i * step);
    if (i === 0) {
      baseSvg = renderSvgTemplate(frame, config, maskId);
    }
    matrices.push(frame.eyes.map((e) => e.matrix));
  }

  return svgAnime(baseSvg, matrices, duration);
}
