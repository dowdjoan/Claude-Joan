// Timeline del edit "Joan P2P Inmobiliarias" (mismo método que
// remotion/src/coachEdit/timeline.ts: ver ese archivo para el detalle
// completo de cómo se calculan los SPEECH_SEGMENTS a partir de
// `ffmpeg silencedetect` y por qué el timing de palabras dentro de cada
// subtítulo es una estimación proporcional, no forced-alignment).

import { CameraKeyframe } from "../shared/camera";
import { Caption, AccentStinger } from "../shared/Captions";
import { SfxCue } from "../shared/SfxTrack";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SOURCE_VIDEO = "footage/joan_p2p_raw.mov";

export const SPEECH_SEGMENTS: { sourceStart: number; sourceEnd: number }[] = [
  { sourceStart: 1.423, sourceEnd: 3.489 },
  { sourceStart: 3.569, sourceEnd: 11.568 },
  { sourceStart: 11.648, sourceEnd: 13.375 },
  { sourceStart: 13.455, sourceEnd: 16.75 },
  { sourceStart: 16.83, sourceEnd: 20.849 },
  { sourceStart: 20.929, sourceEnd: 29.707 },
  { sourceStart: 29.787, sourceEnd: 31.99 },
  { sourceStart: 32.07, sourceEnd: 39.636 },
  { sourceStart: 39.716, sourceEnd: 40.48 },
  { sourceStart: 40.56, sourceEnd: 43.335 },
  { sourceStart: 43.415, sourceEnd: 45.306 },
  { sourceStart: 45.386, sourceEnd: 49.118 },
  { sourceStart: 49.198, sourceEnd: 49.671 },
  { sourceStart: 49.751, sourceEnd: 54.818 },
];

export const SPEECH_TOTAL = SPEECH_SEGMENTS.reduce(
  (acc, s) => acc + (s.sourceEnd - s.sourceStart),
  0,
);

export const OUTRO_HOLD = 0.9;
export const TOTAL_DURATION = SPEECH_TOTAL + OUTRO_HOLD;
export const TOTAL_FRAMES = Math.round(TOTAL_DURATION * FPS);

// ---------------------------------------------------------------------------
// Subtítulos. Vacíos donde un motion graphic / placa full-screen ya trae su
// propio texto grande (para no repetir/solapar, igual que en coachEdit).
// ---------------------------------------------------------------------------
export const CAPTIONS: Caption[] = [
  { from: 0.0, to: 0.63, lines: ["ÉL ES JOAN"], emphasis: ["JOAN"] },
  { from: 0.63, to: 1.2, lines: ["Y PASÓ DE SER"] },
  { from: 1.2, to: 1.83, lines: ["PROGRAMADOR"] },
  // 1.83-6.76: placa transformación (DE $600-800 A $20.000)
  { from: 6.76, to: 7.38, lines: ["Y ENCIMA"] },
  // 7.38-9.74: gráfico "muy pocos clientes, high ticket"
  // 9.74-16.87: placa "¿CÓMO MIERDA HIZO JOAN?"
  { from: 16.87, to: 17.25, lines: ["ESTAMOS"] },
  { from: 17.25, to: 18.12, lines: ["HABLANDO DE ESTO"] },
  // 18.12-27.81: full screen "el sistema" (P2P + marketing/ventas/IA)
  // 27.81-33.38: full screen flujo (personas que no te conocen -> te pagan -> vuelven a pagarte)
  { from: 33.38, to: 33.96, lines: ["LO EMPEZÓ A"] },
  { from: 33.96, to: 34.97, lines: ["INSERTAR EN"] },
  // 34.97-38.26: placa "aplicado a inmobiliarias" (UI de teléfono)
  { from: 38.26, to: 38.95, lines: ["Y ASÍ ES QUE"] },
  { from: 38.95, to: 39.63, lines: ["LE PAGAN TICKETS"] },
  // 39.63-41.38: gráfico tickets $6.000 / $12.000
  { from: 41.38, to: 42.05, lines: ["ES UNA LOCURA"] },
  // 42.05-43.9: placa testimonial "ES UNA LOCURA LA PLATA..."
  { from: 43.9, to: 44.57, lines: ["Y LO SENCILLO"] },
  { from: 44.57, to: 45.39, lines: ["Y SIMPLE QUE ES"] },
  // 45.39-46.26: placa "NO ES FÁCIL"
  { from: 46.26, to: 46.85, lines: ["SI VOS QUERÉS"] },
  { from: 46.85, to: 47.54, lines: ["SABER CÓMO"] },
  { from: 47.54, to: 48.26, lines: ["JOAN LO HIZO"] },
  { from: 48.26, to: 49.47, lines: ["Y CÓMO PODÉS"] },
  { from: 49.47, to: 50.14, lines: ["APLICARLO"] },
  // 50.14-52.36: CTA P2P
];

export const ACCENT_STINGERS: AccentStinger[] = [];

// ---------------------------------------------------------------------------
// Placas / motion graphics full-screen
// ---------------------------------------------------------------------------
export const TRANSFORMATION_CARD = { from: 1.83, to: 6.76 };
export const FUNNEL_GRAPHIC = { from: 7.38, to: 9.74 };
export const QUESTION_CARD = { from: 9.74, to: 16.87 };
export const SYSTEM_FULLSCREEN = { from: 18.12, to: 27.81 };
export const FLOW_FULLSCREEN = { from: 27.81, to: 33.38 };
export const PHONE_MOCK_CARD = { from: 34.97, to: 38.26 };
export const TICKETS_GRAPHIC = { from: 39.63, to: 41.38 };
export const QUOTE_CARD = { from: 42.05, to: 43.9 };
export const REALITY_CARD = { from: 45.39, to: 46.26 };
export const CTA_P2P = { from: 50.14, to: SPEECH_TOTAL };
export const OUTRO_CTA = { from: SPEECH_TOTAL, to: TOTAL_DURATION };

// ---------------------------------------------------------------------------
// Cámara: punch-ins/reencuadres del speaker entre secciones
// ---------------------------------------------------------------------------
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0.0, scale: 100 },
  { at: 0.63, scale: 105 },
  { at: 6.76, scale: 100 },
  { at: 9.74, scale: 106 },
  { at: 16.87, scale: 108 },
  { at: 33.38, scale: 105 },
  { at: 38.26, scale: 106 },
  { at: 41.38, scale: 104 },
  { at: 42.05, scale: 107 },
  { at: 43.9, scale: 105 },
  { at: 45.39, scale: 110 },
  { at: 46.26, scale: 105 },
  { at: 50.14, scale: 104 },
];

// ---------------------------------------------------------------------------
// SFX
// ---------------------------------------------------------------------------
export const SFX_CUES: SfxCue[] = [
  { at: 0.0, sfx: "click", volume: 0.5 },
  { at: 1.83, sfx: "whoosh", volume: 0.45 },
  { at: 2.57, sfx: "impact", volume: 0.5 },
  { at: 5.65, sfx: "impact", volume: 0.5 },
  { at: 6.76, sfx: "click_soft", volume: 0.4 },
  { at: 7.38, sfx: "click", volume: 0.45 },
  { at: 8.3, sfx: "click", volume: 0.45 },
  { at: 9.74, sfx: "whoosh", volume: 0.45 },
  { at: 10.03, sfx: "impact", volume: 0.5 },
  { at: 18.12, sfx: "whoosh", volume: 0.5 },
  { at: 19.77, sfx: "impact", volume: 0.5 },
  { at: 20.98, sfx: "click", volume: 0.45 },
  { at: 22.57, sfx: "click", volume: 0.45 },
  { at: 26.61, sfx: "click", volume: 0.45 },
  { at: 27.81, sfx: "whoosh", volume: 0.45 },
  { at: 28.7, sfx: "click_soft", volume: 0.4 },
  { at: 31.02, sfx: "click_soft", volume: 0.4 },
  { at: 32.42, sfx: "click_soft", volume: 0.4 },
  { at: 33.38, sfx: "click", volume: 0.45 },
  { at: 34.97, sfx: "whoosh", volume: 0.45 },
  { at: 38.26, sfx: "click_soft", volume: 0.4 },
  { at: 39.63, sfx: "click", volume: 0.5 },
  { at: 40.35, sfx: "click", volume: 0.5 },
  { at: 40.69, sfx: "click", volume: 0.5 },
  { at: 42.05, sfx: "impact", volume: 0.45 },
  { at: 45.39, sfx: "whoosh", volume: 0.4 },
  { at: 46.26, sfx: "click_soft", volume: 0.4 },
  { at: 50.14, sfx: "riser", volume: 0.35 },
  { at: 50.57, sfx: "whoosh", volume: 0.5 },
  { at: SPEECH_TOTAL, sfx: "whoosh", volume: 0.45 },
];

export const WHITE_FLASHES: number[] = [1.83, 9.74, 18.12, 27.81, 45.39];
export const VIOLET_FLASHES: number[] = [6.76, 34.97, 50.14];
