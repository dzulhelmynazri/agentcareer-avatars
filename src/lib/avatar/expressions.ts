import { EYE_H, EYE_SPLIT, EYE_W, REST_GAZE } from "./face";
import type { HeadGaze } from "./face";
import { lerp } from "./math";
import type { EyeCfg } from "./states";

/**
 * Expression de repos du bot.
 *
 * Le visage ne tient qu'à deux gélules, donc tout se joue sur quatre leviers :
 * l'orientation de la tête, l'écart des yeux, leurs proportions, et
 * l'inclinaison propre de chaque œil. C'est ce dernier qui permet la colère et
 * la tristesse : elles demandent des inclinaisons EN MIROIR (les hauts qui
 * convergent ou divergent), impossible avec le seul roulis de tête qui incline
 * les deux yeux du même côté.
 *
 * Seul l'état de repos porte cette expression. Les états expressifs de la vidéo
 * (clin d'œil, yeux écarquillés, notification) gardent la leur : c'est elle
 * qu'on est venu reproduire.
 *
 * Les amplitudes s'appuient sur bible-strong-avatar-lab, qui expose le même
 * modèle (tête X/Y/Z, largeur et hauteur par œil, écart, angle par œil) : chez
 * eux la largeur va de 0,8 à 2,7 fois le neutre, la hauteur de 0,3 à 1,5, et
 * les angles jusqu'à ±80°. On reste dans cette enveloppe.
 */
/** Enumeres pour que la couche i18n verifie leurs traductions a la compilation. */
export type ExpressionId =
  | "neutre"
  | "attentif"
  | "surpris"
  | "excite"
  | "heureux"
  | "hilare"
  | "colere"
  | "triste"
  | "effraye"
  | "mefiant"
  | "confus"
  | "curieux"
  | "fier"
  | "timide"
  | "blase"
  | "somnolent";

export interface BotExpression {
  id: ExpressionId;
  gaze: HeadGaze;
  split: number;
  eyes: [EyeCfg, EyeCfg];
}

/** `tilt` en degrés, positif = le haut de la gélule part vers la droite. */
const eye = (w: number, h: number, tilt = 0, open = 1): EyeCfg => ({
  h,
  open,
  tilt,
  w,
});

/** Les deux yeux identiques, inclinaisons en miroir si `tilt` est fourni. */
const pair = (w: number, h: number, tilt = 0, open = 1): [EyeCfg, EyeCfg] => [
  eye(w, h, tilt, open),
  eye(w, h, -tilt, open),
];

export const EXPRESSIONS: BotExpression[] = [
  {
    // la pose relevée image par image sur la vidéo de référence
    id: "neutre",
    gaze: { ...REST_GAZE },
    split: EYE_SPLIT,
    eyes: [eye(EYE_W, EYE_H), eye(EYE_W, EYE_H)],
  },
  {
    eyes: pair(0.21, 0.44),
    gaze: { pitch: 5, roll: -4, yaw: 4 },
    id: "attentif",
    split: 16,
  },
  {
    eyes: pair(0.45, 0.47),
    gaze: { pitch: -3, roll: 0, yaw: 3 },
    id: "surpris",
    split: 19,
  },
  {
    eyes: pair(0.4, 0.56, -10),
    gaze: { pitch: -14, roll: 0, yaw: 6 },
    id: "excite",
    split: 19.5,
  },
  {
    // yeux plissés en arc : les hauts convergent légèrement
    id: "heureux",
    gaze: { pitch: 9, roll: 0, yaw: 5 },
    split: 17,
    eyes: pair(0.27, 0.17, 14),
  },
  {
    eyes: pair(0.34, 0.13, 20),
    gaze: { pitch: 14, roll: 0, yaw: 4 },
    id: "hilare",
    split: 18,
  },
  {
    // hauts des yeux qui convergent fort vers le centre + yeux étrécis
    id: "colere",
    gaze: { pitch: 7, roll: 0, yaw: 3 },
    split: 17,
    eyes: pair(0.34, 0.15, 30),
  },
  {
    // l'inverse : les hauts divergent, et le regard tombe
    id: "triste",
    gaze: { pitch: -13, roll: 0, yaw: 3 },
    split: 16,
    eyes: pair(0.22, 0.4, -28),
  },
  {
    eyes: pair(0.4, 0.6),
    gaze: { pitch: -20, roll: 0, yaw: 2 },
    id: "effraye",
    split: 20.5,
  },
  {
    // un œil franchement plus fermé que l'autre
    id: "mefiant",
    gaze: { pitch: 6, roll: -6, yaw: 12 },
    split: 16,
    eyes: [eye(0.21, 0.4), eye(0.22, 0.15)],
  },
  {
    // asymétrique sur les deux axes : tailles ET inclinaisons dépareillées.
    // L'œil plissé est volontairement plat (rapport 1,6) : à un rapport proche
    // de 1 il serait rond, et son inclinaison ne se verrait pas.
    id: "confus",
    gaze: { pitch: 3, roll: 8, yaw: -14 },
    split: 16.5,
    eyes: [eye(0.2, 0.44, -18), eye(0.28, 0.17, 14)],
  },
  {
    // la tête penche : c'est le roulis qui porte la curiosité
    id: "curieux",
    gaze: { pitch: -9, roll: -15, yaw: 16 },
    split: 16.5,
    eyes: [eye(0.24, 0.46, -8), eye(0.2, 0.38, -8)],
  },
  {
    eyes: pair(0.3, 0.15, 18),
    gaze: { pitch: 17, roll: 0, yaw: 5 },
    id: "fier",
    split: 17,
  },
  {
    eyes: pair(0.17, 0.3),
    gaze: { pitch: -14, roll: -7, yaw: -19 },
    id: "timide",
    split: 14,
  },
  {
    // fentes horizontales et regard qui part sur le côté
    id: "blase",
    gaze: { pitch: 2, roll: 0, yaw: -22 },
    split: 16,
    eyes: pair(0.3, 0.12),
  },
  {
    // paupières à moitié tombées : on passe par `open`, donc l'écrasement
    // vertical à l'écran, le même mécanisme que le clignement
    id: "somnolent",
    gaze: { pitch: -9, roll: -3, yaw: 6 },
    split: 16,
    eyes: pair(0.2, 0.42, 0, 0.42),
  },
];

export const EXPRESSION_BY_ID = new Map<string, BotExpression>(
  EXPRESSIONS.map((e) => [e.id, e])
);
export const DEFAULT_EXPRESSION = "neutre";

const lerpEyeCfg = (a: EyeCfg, b: EyeCfg, t: number): EyeCfg => ({
  h: lerp(a.h, b.h, t),
  open: lerp(a.open, b.open, t),
  tilt: lerp(a.tilt ?? 0, b.tilt ?? 0, t),
  w: lerp(a.w, b.w, t),
});

/** Interpolation de deux expressions : le changement se fait en glissant. */
export function blendExpression(
  a: BotExpression,
  b: BotExpression,
  t: number
): BotExpression {
  return {
    eyes: [
      lerpEyeCfg(a.eyes[0], b.eyes[0], t),
      lerpEyeCfg(a.eyes[1], b.eyes[1], t),
    ],
    gaze: {
      pitch: lerp(a.gaze.pitch, b.gaze.pitch, t),
      roll: lerp(a.gaze.roll, b.gaze.roll, t),
      yaw: lerp(a.gaze.yaw, b.gaze.yaw, t),
    },
    id: b.id,
    split: lerp(a.split, b.split, t),
  };
}
