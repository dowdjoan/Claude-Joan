// Timeline del testimonio corto de Feli para ads de Meta.
//
// Fuente: entrevista completa de ~10.7 min (FELI_-_TESTIMONIO_-2.mp4,
// 1920x1080 horizontal, videollamada partida en dos paneles — Feli a la
// izquierda, Juanfran a la derecha). El usuario pasó la transcripción
// completa con timestamps minuto:segundo; a partir de ahí se eligieron 5
// pasajes (identidad/hook, el techo del closer, el salto a 30%, "4 días",
// cierre/recomendación) que funcionan como pieza autocontenida, mismo
// método que dylanEdit.
//
// Dentro de cada pasaje, los MICRO-cortes (pausas/respiraciones) salen de
// `ffmpeg silencedetect` sobre ese rango exacto del archivo (no estimados),
// apretando cada pausa >=0.25s a ~0.08s (BUFFER=0.04s a cada lado) sin
// tocar nunca una palabra. El timing de las PALABRAS dentro de cada
// subtítulo es una estimación proporcional por cantidad de palabras (no
// hay ASR disponible en este sandbox), apoyada en los timestamps
// minuto:segundo de la transcripción del usuario.

import { CameraKeyframe } from "../shared/camera";
import { Caption, AccentStinger } from "../shared/Captions";
import { SfxCue } from "../shared/SfxTrack";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SOURCE_VIDEO = "footage/feli_testimonio_raw.mp4";

// Feli está en el panel IZQUIERDO de la videollamada (0 a ~50% del ancho
// fuente); object-fit:cover con una fuente 1920x1080 en un frame 1080x1920
// ya hace un zoom fuerte, así que object-position centra el recorte sobre
// su cara dentro de ese panel izquierdo (~13%, verificado con stills).
export const OBJECT_POSITION = "13% 50%";

export const SPEECH_SEGMENTS: { sourceStart: number; sourceEnd: number }[] = [
  // HOOK / identidad (00:25-00:46)
  { sourceStart: 23.8067, sourceEnd: 24.6381 },
  { sourceStart: 25.1696, sourceEnd: 29.7846 },
  { sourceStart: 30.2721, sourceEnd: 33.1852 },
  { sourceStart: 33.9852, sourceEnd: 35.9353 },
  { sourceStart: 36.738, sourceEnd: 39.1485 },
  { sourceStart: 39.9765, sourceEnd: 42.7635 },
  { sourceStart: 44.2481, sourceEnd: 45.31 },
  // EL TECHO del closer (01:45-02:05)
  { sourceStart: 105.257, sourceEnd: 105.646 },
  { sourceStart: 105.891, sourceEnd: 108.207 },
  { sourceStart: 108.706, sourceEnd: 117.319 },
  { sourceStart: 117.758, sourceEnd: 121.532 },
  { sourceStart: 121.975, sourceEnd: 123.646 },
  // EL SALTO a 30% (05:02-05:17)
  { sourceStart: 303.155, sourceEnd: 304.611 },
  { sourceStart: 304.985, sourceEnd: 307.657 },
  { sourceStart: 308.094, sourceEnd: 308.835 },
  { sourceStart: 309.274, sourceEnd: 310.417 },
  { sourceStart: 311.154, sourceEnd: 312.993 },
  { sourceStart: 313.249, sourceEnd: 314.378 },
  { sourceStart: 314.637, sourceEnd: 317.86 },
  // "CUATRO DÍAS" (09:27-09:36)
  { sourceStart: 567.852, sourceEnd: 571.468 },
  { sourceStart: 571.985, sourceEnd: 573.295 },
  { sourceStart: 573.615, sourceEnd: 574.349 },
  { sourceStart: 574.62, sourceEnd: 578.953 },
  // CIERRE / recomendación (08:34-08:47)
  { sourceStart: 513.64, sourceEnd: 516.191 },
  { sourceStart: 517.704, sourceEnd: 520.65 },
];

export const SPEECH_TOTAL = 61.025;
export const OUTRO_HOLD = 0.8;
export const TOTAL_DURATION = SPEECH_TOTAL + OUTRO_HOLD;
export const TOTAL_FRAMES = Math.round(TOTAL_DURATION * FPS);

export const MACRO_BOUNDS = {
  hook: { from: 0.0, to: 16.569 },
  techo: { from: 16.569, to: 33.332 },
  resultado: { from: 33.332, to: 45.535 },
  cuatroDias: { from: 45.535, to: 55.528 },
  cierre: { from: 55.528, to: SPEECH_TOTAL },
};

export const CAPTIONS: Caption[] = [
  // HOOK / IDENTIDAD
  { from: 0.0, to: 0.831, lines: ["SOY CHILENO."], emphasis: ["CHILENO."] },
  { from: 0.831, to: 1.797, lines: ["TENGO 29 AÑOS,"], emphasis: ["29"] },
  { from: 1.797, to: 2.762, lines: ["Y NADA, ANTES"] },
  { from: 2.762, to: 3.727, lines: ["DE ENTRAR EN"] },
  { from: 3.973, to: 4.71, lines: ["EL MUNDO"] },
  { from: 4.71, to: 5.446, lines: ["DE LOS"] },
  { from: 5.446, to: 6.417, lines: ["NEGOCIOS DIGITALES, ME"] },
  { from: 6.417, to: 7.388, lines: ["DESEMPEÑABA COMO INGENIERO"], emphasis: ["INGENIERO"] },
  { from: 7.388, to: 8.36, lines: ["Y CONSTRUCTOR. INGENIERÍA"], emphasis: ["CONSTRUCTOR."] },
  { from: 8.36, to: 9.335, lines: ["EN CONSTRUCCIÓN, TRABAJABA"] },
  { from: 9.335, to: 10.31, lines: ["COMO CONTRATISTA, ME"] },
  { from: 10.31, to: 11.343, lines: ["CANSÉ DE ESO"] },
  { from: 11.343, to: 12.031, lines: ["Y MUTÉ"] },
  { from: 12.031, to: 12.72, lines: ["AL MUNDO"] },
  { from: 12.72, to: 13.765, lines: ["DE LO QUE"] },
  { from: 13.765, to: 14.81, lines: ["ES EL CLOSING."], emphasis: ["CLOSING."] },
  { from: 14.81, to: 15.507, lines: ["CLOSING DE"] },
  { from: 15.507, to: 16.569, lines: ["VENTAS HIGH TICKET."], emphasis: ["HIGH", "TICKET."] },
  // EL TECHO DEL CLOSER
  { from: 16.569, to: 16.958, lines: ["TOTAL, TOTAL."], emphasis: ["TOTAL."] },
  { from: 16.958, to: 17.31, lines: ["UN PUNTO"] },
  { from: 17.49, to: 18.255, lines: ["NÚMERO UNO POR"] },
  { from: 18.255, to: 18.764, lines: ["EL TEMA"] },
  { from: 18.764, to: 19.274, lines: ["DE LA"] },
  { from: 19.274, to: 20.069, lines: ["COMISIÓN. POR EJEMPLO,"] },
  { from: 20.069, to: 20.864, lines: ["SI CERRABA UNA"] },
  { from: 20.864, to: 21.66, lines: ["DE 2.500, ME"] },
  { from: 21.66, to: 22.455, lines: ["DABAN EL 8%."], emphasis: ["8%."] },
  { from: 22.455, to: 22.985, lines: ["SI CERRABA"] },
  { from: 23.218, to: 23.983, lines: ["UNA DE MENOS"] },
  { from: 23.983, to: 24.747, lines: ["DE 1.200, ME"] },
  { from: 24.747, to: 25.512, lines: ["DABAN EL 10%."], emphasis: ["10%."] },
  { from: 25.512, to: 26.276, lines: ["ENTONCES ERA COMO"] },
  { from: 26.276, to: 26.786, lines: ["QUE JUGABAN"] },
  { from: 26.786, to: 27.296, lines: ["CON ESO."] },
  { from: 27.525, to: 27.887, lines: ["NOSOTROS"] },
  { from: 27.887, to: 28.703, lines: ["TODOS TENEMOS 24"] },
  { from: 28.703, to: 29.52, lines: ["HORAS Y COMO"] },
  { from: 29.52, to: 30.064, lines: ["YO COBRABA"] },
  { from: 30.064, to: 30.608, lines: ["POR LO"] },
  { from: 30.815, to: 31.661, lines: ["QUE IBA HACIENDO,"] },
  { from: 31.661, to: 32.496, lines: ["TENÍA CLARAMENTE UN"] },
  { from: 32.496, to: 33.332, lines: ["LÍMITE, UN TECHO."], emphasis: ["TECHO."] },
  // EL SALTO A 30%
  { from: 33.332, to: 33.956, lines: ["SIGO LLEVÁNDOME EL"] },
  { from: 33.956, to: 34.372, lines: ["10 DE"] },
  { from: 34.372, to: 34.788, lines: ["CLOSER PERO"] },
  { from: 34.788, to: 35.456, lines: ["AHORA ME LLEVO"] },
  { from: 35.456, to: 36.124, lines: ["ADEMÁS EL 20%"], emphasis: ["20%"] },
  { from: 36.124, to: 36.792, lines: ["COMO CONSULTOR, O"] },
  { from: 36.792, to: 37.46, lines: ["SEA QUE ME"] },
  { from: 37.46, to: 38.201, lines: ["LLEVO EL 30%"], emphasis: ["30%"] },
  { from: 38.201, to: 38.887, lines: ["POR CIENTO EN"] },
  { from: 38.887, to: 39.344, lines: ["TOTAL. O"], emphasis: ["TOTAL."] },
  { from: 39.344, to: 40.034, lines: ["SEA, DE UN"] },
  { from: 40.034, to: 40.723, lines: ["CIERRE DE MIL"], emphasis: ["MIL"] },
  { from: 40.723, to: 41.183, lines: ["DÓLARES, VOS"], emphasis: ["DÓLARES,"] },
  { from: 41.183, to: 41.86, lines: ["TE LLEVAS 300"], emphasis: ["300"] },
  { from: 41.86, to: 42.312, lines: ["DÓLARES. ME"], emphasis: ["DÓLARES."] },
  { from: 42.312, to: 42.957, lines: ["LLEVO, ES UNA"] },
  { from: 42.957, to: 43.601, lines: ["LOCURA, AMIGO, ME"] },
  { from: 43.601, to: 44.246, lines: ["LLEVO 300 DÓLARES."], emphasis: ["300", "DÓLARES."] },
  { from: 44.246, to: 44.89, lines: ["ANTES ME LLEVABA"] },
  { from: 44.89, to: 45.535, lines: ["MENOS DE 100."], emphasis: ["100."] },
  // CUATRO DÍAS
  { from: 45.535, to: 47.705, lines: ["ME ACUERDO PATENTE,"] },
  { from: 47.705, to: 49.151, lines: ["EN CUATRO"], emphasis: ["CUATRO"] },
  { from: 49.151, to: 50.461, lines: ["DÍAS TUVISTE"], emphasis: ["DÍAS"] },
  { from: 50.461, to: 51.195, lines: ["LA"] },
  { from: 51.195, to: 51.618, lines: ["WIN."], emphasis: ["WIN."] },
  { from: 51.83, to: 53.116, lines: ["CUATRO DÍAS,"], emphasis: ["CUATRO", "DÍAS,"] },
  { from: 53.276, to: 55.528, lines: ["LITERAL. CUATRO DÍAS."], emphasis: ["CUATRO", "DÍAS."] },
  // CIERRE
  { from: 55.528, to: 56.075, lines: ["UNA COMPLETA LOCURA,"] },
  { from: 56.075, to: 56.621, lines: ["TOTALMENTE DIFERENTE A"] },
  { from: 56.621, to: 57.168, lines: ["LO QUE ERA"] },
  { from: 57.168, to: 57.715, lines: ["ANTES. TEMA DE"] },
  { from: 57.715, to: 58.079, lines: ["DECIR, NO"] },
  { from: 58.079, to: 58.601, lines: ["NECESITO, O SEA,"] },
  { from: 58.601, to: 59.124, lines: ["NO TENGO MIEDO"] },
  { from: 59.124, to: 59.646, lines: ["MÁS DE QUEDARME"] },
  { from: 59.646, to: 60.168, lines: ["SIN TRABAJO, ES"] },
  { from: 60.529, to: 61.025, lines: ["QUE ES IMPOSIBLE."], emphasis: ["IMPOSIBLE."] },
];

export const ACCENT_STINGERS: AccentStinger[] = [];

// Badges de números clave (lower-third chico, no reemplaza al speaker).
export type StatBadge = { from: number; to: number; text: string };
export const STAT_BADGES: StatBadge[] = [
  { from: 22.2, to: 26.0, text: "8% – 10% POR CIERRE" },
  { from: 35.9, to: 39.2, text: "30% EN TOTAL" },
  { from: 47.6, to: 55.5, text: "LA WIN EN 4 DÍAS" },
];

// Fuente horizontal (1920x1080) split-screen dentro de un frame vertical:
// object-fit cover ya hace un zoom fuerte de por sí, así que estos
// punch-ins son sutiles (mismo criterio que dylanEdit).
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0.0, scale: 106 },
  { at: 16.569, scale: 108 },
  { at: 22.34, scale: 112 },
  { at: 25.362, scale: 113 },
  { at: 33.332, scale: 106 },
  { at: 35.994, scale: 111 },
  { at: 37.99, scale: 115 },
  { at: 45.535, scale: 107 },
  { at: 47.678, scale: 112 },
  { at: 55.528, scale: 106 },
  { at: 59.701, scale: 110 },
];

export const SFX_CUES: SfxCue[] = [
  { at: 0.0, sfx: "click", volume: 0.45 },
  { at: 16.569, sfx: "whoosh", volume: 0.4 },
  { at: 22.34, sfx: "click", volume: 0.45 },
  { at: 25.362, sfx: "click", volume: 0.45 },
  { at: 33.332, sfx: "whoosh", volume: 0.4 },
  { at: 37.99, sfx: "impact", volume: 0.55 },
  { at: 45.535, sfx: "whoosh", volume: 0.4 },
  { at: 47.678, sfx: "click", volume: 0.45 },
  { at: 53.392, sfx: "click_soft", volume: 0.4 },
  { at: 55.528, sfx: "whoosh", volume: 0.4 },
  { at: 59.701, sfx: "click_soft", volume: 0.4 },
  { at: SPEECH_TOTAL, sfx: "whoosh", volume: 0.4 },
];

export const WHITE_FLASHES: number[] = [16.569, 33.332, 45.535, 55.528];
export const VIOLET_FLASHES: number[] = [37.99];
