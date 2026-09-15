// Timeline del testimonio corto de Dylan para ads de Meta.
//
// Fuente: entrevista completa de ~21.5 min (Testimonio_DYLAN-2.mp4,
// 1920x1080 horizontal). El usuario pasó la transcripción completa con
// timestamps minuto:segundo; a partir de ahí se eligieron 4 pasajes
// (hook, resultado, cambio de mentalidad, recomendación) que funcionan
// como pieza autocontenida sin necesitar el resto de la entrevista.
//
// Dentro de cada pasaje, los MICRO-cortes (pausas/respiraciones) salen de
// `ffmpeg silencedetect` sobre ese rango exacto del archivo (no estimados),
// apretando cada pausa >=0.25s a ~0.08s sin tocar nunca una palabra — mismo
// método que coachEdit/joanEdit. El timing de las PALABRAS dentro de cada
// subtítulo sí es una estimación proporcional (no hay ASR disponible en
// este sandbox), apoyada en los timestamps minuto:segundo que ya traía la
// transcripción del usuario (mucho más finos que en los otros edits).

import { CameraKeyframe } from "../shared/camera";
import { Caption, AccentStinger } from "../shared/Captions";
import { SfxCue } from "../shared/SfxTrack";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SOURCE_VIDEO = "footage/dylan_testimonio_raw.mp4";

export const SPEECH_SEGMENTS: { sourceStart: number; sourceEnd: number }[] = [
  // hook: "soy Dylan, tengo 21 y empecé hace menos de tres meses..." (0:21-0:28)
  { sourceStart: 21.5, sourceEnd: 24.162 },
  { sourceStart: 24.242, sourceEnd: 25.483 },
  { sourceStart: 25.563, sourceEnd: 28.6 },
  // resultado: "vendí 120 unidades... terminé en 2 millones." (11:44-11:59)
  { sourceStart: 704.2, sourceEnd: 706.852 },
  { sourceStart: 706.932, sourceEnd: 709.104 },
  { sourceStart: 709.184, sourceEnd: 712.231 },
  { sourceStart: 712.311, sourceEnd: 715.333 },
  { sourceStart: 715.413, sourceEnd: 717.199 },
  { sourceStart: 717.279, sourceEnd: 719.3 },
  // cambio de mentalidad (19:35-19:50)
  { sourceStart: 1175.4, sourceEnd: 1175.952 },
  { sourceStart: 1176.032, sourceEnd: 1177.423 },
  { sourceStart: 1177.503, sourceEnd: 1178.333 },
  { sourceStart: 1178.413, sourceEnd: 1181.072 },
  { sourceStart: 1181.152, sourceEnd: 1183.671 },
  { sourceStart: 1183.751, sourceEnd: 1188.133 },
  { sourceStart: 1188.213, sourceEnd: 1190.3 },
  // recomendación (20:03-20:11)
  { sourceStart: 1203.216, sourceEnd: 1211.7 },
];

export const SPEECH_TOTAL = 44.8635;

export const OUTRO_HOLD = 0.8;
export const TOTAL_DURATION = SPEECH_TOTAL + OUTRO_HOLD;
export const TOTAL_FRAMES = Math.round(TOTAL_DURATION * FPS);

export const MACRO_BOUNDS = {
  hook: { from: 0.0, to: 6.94 },
  result: { from: 7.02, to: 21.72 },
  mindset: { from: 21.8, to: 36.22 },
  recommend: { from: 36.3, to: 44.78 },
};

export const CAPTIONS: Caption[] = [
  // hook
  { from: 0.0, to: 1.09, lines: ["SOY DYLAN,"], emphasis: ["DYLAN,"] },
  { from: 1.09, to: 1.98, lines: ["TENGO 21"], emphasis: ["21"] },
  { from: 1.98, to: 3.37, lines: ["Y EMPECÉ HACE"] },
  { from: 3.37, to: 5.35, lines: ["MENOS DE TRES MESES"] },
  { from: 5.35, to: 6.94, lines: ["CON MI NEGOCIO"] },
  // resultado
  { from: 7.02, to: 7.79, lines: ["VENDÍ 120"], emphasis: ["120"] },
  { from: 7.79, to: 8.56, lines: ["UNIDADES."] },
  { from: 8.56, to: 9.64, lines: ["ES UNA BANDA"] },
  { from: 9.64, to: 10.41, lines: ["Y DESPUÉS"] },
  { from: 10.41, to: 11.64, lines: ["DE AHÍ ME FUI"] },
  { from: 11.64, to: 12.41, lines: ["A LA NOCHE,"] },
  { from: 12.41, to: 13.41, lines: ["TAMBIÉN TUVE"] },
  { from: 13.41, to: 14.49, lines: ["OTRA ENTREGA,"] },
  { from: 14.49, to: 15.56, lines: ["Y ESA ENTREGA"] },
  { from: 15.56, to: 16.79, lines: ["FUE LA QUE HICE"] },
  {
    from: 16.79,
    to: 17.95,
    lines: ["500 MIL PESOS,"],
    emphasis: ["500", "MIL", "PESOS,"],
  },
  { from: 17.95, to: 18.87, lines: ["MÁS LO OTRO"] },
  { from: 18.87, to: 19.64, lines: ["QUE HICE,"] },
  { from: 19.64, to: 20.57, lines: ["AHÍ TERMINÉ"] },
  {
    from: 20.57,
    to: 21.72,
    lines: ["EN 2 MILLONES."],
    emphasis: ["2", "MILLONES."],
  },
  // cambio de mentalidad
  { from: 21.8, to: 22.95, lines: ["ESTAS COSITAS ASÍ,"] },
  { from: 22.95, to: 24.41, lines: ["VOS SABÉS QUE ME CAMBIÓ"] },
  {
    from: 24.41,
    to: 25.56,
    lines: ["UN MIL POR CIENTO"],
    emphasis: ["MIL", "POR", "CIENTO"],
  },
  { from: 25.56, to: 26.04, lines: ["BOLUDO."] },
  { from: 26.04, to: 27.37, lines: ["CAMBIÉ DE MENTALIDAD,"] },
  { from: 27.37, to: 28.53, lines: ["CAMBIÉ DE HÁBITOS."] },
  { from: 28.53, to: 29.31, lines: ["Y NADA, ESO:"] },
  { from: 29.31, to: 30.34, lines: ["LA FE Y VOLUMEN,"] },
  { from: 30.34, to: 31.43, lines: ["VOLUMEN, VOLUMEN."] },
  { from: 31.43, to: 32.65, lines: ["Y SI TE GUSTA ALGO,"] },
  { from: 32.65, to: 34.04, lines: ["MANDALE PARA ADELANTE,"] },
  { from: 34.04, to: 35.31, lines: ["PORQUE ES COMO DIGO,"] },
  { from: 35.31, to: 36.22, lines: ["ES EL DESTINO."] },
  // recomendación
  { from: 36.3, to: 37.66, lines: ["SÍ, TOTALMENTE."] },
  { from: 37.66, to: 38.85, lines: ["ES MÁS, YO NO ESTOY"] },
  { from: 38.85, to: 40.29, lines: ["EN LA VIP,"] },
  { from: 40.29, to: 41.56, lines: ["YO ESTOY EN LA PAGA"] },
  { from: 41.56, to: 42.49, lines: ["NOMÁS"] },
  { from: 42.49, to: 43.34, lines: ["Y A MÍ ME ESTÁ"] },
  { from: 43.34, to: 44.78, lines: ["YENDO BIEN."] },
];

export const ACCENT_STINGERS: AccentStinger[] = [];

// Badges de números clave (lower-third chico, no reemplaza al speaker —
// en un testimonio real la cara siempre tiene que estar visible).
export type StatBadge = { from: number; to: number; text: string };
export const STAT_BADGES: StatBadge[] = [
  { from: 0.4, to: 3.0, text: "21 AÑOS · 3 MESES DE NEGOCIO" },
  { from: 20.7, to: 24.2, text: "$2.000.000 EN UN DÍA" },
  { from: 24.5, to: 27.5, text: "+1000% DE MENTALIDAD" },
];

// OJO: la fuente es horizontal (1920x1080) dentro de un frame vertical
// 1080x1920, así que `object-fit: cover` YA hace un zoom fuerte de por sí
// (recorta a ~31% del ancho original para llenar el alto). Estos punch-ins
// son sutiles a propósito, no como en los edits con fuente vertical.
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0.0, scale: 104 },
  { at: 1.09, scale: 108 },
  { at: 5.35, scale: 104 },
  { at: 7.02, scale: 105 },
  { at: 16.79, scale: 109 },
  { at: 20.57, scale: 113 },
  { at: 21.8, scale: 104 },
  { at: 24.41, scale: 109 },
  { at: 29.31, scale: 105 },
  { at: 36.3, scale: 106 },
];

export const SFX_CUES: SfxCue[] = [
  { at: 0.0, sfx: "click", volume: 0.45 },
  { at: 1.09, sfx: "click_soft", volume: 0.4 },
  { at: 7.02, sfx: "whoosh", volume: 0.4 },
  { at: 16.79, sfx: "click", volume: 0.45 },
  { at: 20.57, sfx: "impact", volume: 0.5 },
  { at: 21.8, sfx: "whoosh", volume: 0.4 },
  { at: 24.41, sfx: "click", volume: 0.45 },
  { at: 36.3, sfx: "click_soft", volume: 0.4 },
  { at: SPEECH_TOTAL, sfx: "whoosh", volume: 0.4 },
];

export const WHITE_FLASHES: number[] = [7.02, 21.8, 36.3];
export const VIOLET_FLASHES: number[] = [20.57];
