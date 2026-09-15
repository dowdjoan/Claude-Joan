// Timeline del short "Caso Dylan / Océano Azul" (mismo método que los
// otros edits: ver coachEdit/timeline.ts para el detalle completo de cómo
// se calculan los SPEECH_SEGMENTS a partir de `ffmpeg silencedetect` y por
// qué el timing de palabras es una estimación proporcional).
//
// LIMITACIÓN IMPORTANTE: el brief pedía usar una foto real de Dylan y el
// creativo P2P ya diseñado como assets reales. Ninguno de los dos llegó
// como archivo accesible en este sandbox (solo como contenido visual
// dentro del chat, igual que pasó antes con la captura de Instagram de
// Joan) — así que donde el brief pide "FOTO REAL DE DYLAN" se usa un
// placeholder estilizado (silueta + glow, sin foto real) hasta que se
// suba el archivo.

import { CameraKeyframe } from "../shared/camera";
import { Caption, AccentStinger } from "../shared/Captions";
import { SfxCue } from "../shared/SfxTrack";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SOURCE_VIDEO = "footage/dylan_short_raw.mov";

export const SPEECH_SEGMENTS: { sourceStart: number; sourceEnd: number }[] = [
  { sourceStart: 1.134, sourceEnd: 9.126 },
  { sourceStart: 9.206, sourceEnd: 10.729 },
  { sourceStart: 10.809, sourceEnd: 19.057 },
  { sourceStart: 19.137, sourceEnd: 21.223 },
  { sourceStart: 21.303, sourceEnd: 22.585 },
  { sourceStart: 22.665, sourceEnd: 24.371 },
  { sourceStart: 24.451, sourceEnd: 26.246 },
  { sourceStart: 26.326, sourceEnd: 31.617 },
  { sourceStart: 31.697, sourceEnd: 35.497 },
  { sourceStart: 35.577, sourceEnd: 39.227 },
];

export const SPEECH_TOTAL = 37.37328;
export const OUTRO_HOLD = 0.85;
export const TOTAL_DURATION = SPEECH_TOTAL + OUTRO_HOLD;
export const TOTAL_FRAMES = Math.round(TOTAL_DURATION * FPS);

// ---------------------------------------------------------------------------
// Secciones full-screen (cortan al speaker) / placas
// ---------------------------------------------------------------------------
export const DYLAN_REVEAL = { from: 1.79, to: 2.08 }; // "Dylan" -> foto (overlay chico, sigue el speaker)
export const PERFUMES_GRAPHIC = { from: 2.08, to: 3.62 };
export const HERO_RESULT = { from: 3.62, to: 6.13 };
export const OCEANO_AZUL_MOTION = { from: 6.13, to: 8.37 };
export const P2P_LOGO_REVEAL = { from: 9.52, to: 12.34 };
export const PROSPECT_PAYMENT_ARROW = { from: 12.34, to: 14.03 };
export const FLOW_FULLSCREEN = { from: 14.03, to: 18.01 };
export const DYLAN_APPLICATION = { from: 18.01, to: 21.86 };
export const CONCEPT_REVEAL = { from: 26.82, to: 30.74 };
export const CTA_P2P = { from: 32.29, to: SPEECH_TOTAL };
export const OUTRO_CTA = { from: SPEECH_TOTAL, to: TOTAL_DURATION };

// ---------------------------------------------------------------------------
// Subtítulos (vacíos donde una placa/motion full-screen ya trae su propio
// texto grande, para no solapar).
// ---------------------------------------------------------------------------
export const CAPTIONS: Caption[] = [
  { from: 0.0, to: 0.43, lines: ["ESTE SER"] },
  { from: 0.43, to: 0.97, lines: ["HUMANO QUE"] },
  { from: 0.97, to: 1.5, lines: ["VES ACÁ"] },
  { from: 1.5, to: 2.08, lines: ["SE LLAMA DYLAN"], emphasis: ["DYLAN"] },
  // 2.08-3.62: 4 perfumes full screen
  // 3.62-6.13: hero +$7.000
  // 6.13-8.37: océano azul motion
  { from: 8.37, to: 8.61, lines: ["¿QUÉ ES EL"] },
  { from: 8.61, to: 9.52, lines: ["OCÉANO AZUL?"] },
  // 9.52-14.03: P2P logo + prospect/payment
  // 14.03-18.01: flow full screen
  // 18.01-21.86: dylan application
  { from: 21.86, to: 22.2, lines: ["SI VOS HOY"] },
  { from: 22.2, to: 22.73, lines: ["EN DÍA TENÉS"] },
  { from: 22.73, to: 24.0, lines: ["UN NEGOCIO"] },
  { from: 24.0, to: 25.08, lines: ["QUE VENDÉS"] },
  { from: 25.08, to: 25.46, lines: ["PRODUCTOS"] },
  { from: 25.46, to: 26.28, lines: ["Y TE GUSTARÍA"] },
  { from: 26.28, to: 26.82, lines: ["ESCALAR COMO"] },
  // 26.82-30.74: concept reveal (1 solo concepto)
  { from: 30.74, to: 31.37, lines: ["LO ÚNICO QUE"] },
  { from: 31.37, to: 32.29, lines: ["TENÉS QUE HACER"] },
  // 32.29-37.37: CTA P2P + cierre
];

export const ACCENT_STINGERS: AccentStinger[] = [];

// ---------------------------------------------------------------------------
// Cámara
// ---------------------------------------------------------------------------
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0.0, scale: 100 },
  { at: 1.5, scale: 106 },
  { at: 8.37, scale: 100 },
  { at: 21.86, scale: 100, shiftX: 0 },
  { at: 22.73, scale: 105, shiftX: -8 },
  { at: 26.28, scale: 100, shiftX: 0 },
  { at: 30.74, scale: 102 },
  { at: 32.29, scale: 108 },
  { at: 34.03, scale: 113 },
];

// ---------------------------------------------------------------------------
// SFX
// ---------------------------------------------------------------------------
export const SFX_CUES: SfxCue[] = [
  { at: 0.0, sfx: "click", volume: 0.45 },
  { at: 1.79, sfx: "whoosh", volume: 0.4 },
  { at: 2.08, sfx: "click", volume: 0.45 },
  { at: 2.18, sfx: "click", volume: 0.45 },
  { at: 2.28, sfx: "click", volume: 0.45 },
  { at: 2.38, sfx: "click", volume: 0.45 },
  { at: 3.62, sfx: "whoosh", volume: 0.45 },
  { at: 4.49, sfx: "impact", volume: 0.55 },
  { at: 5.75, sfx: "click_soft", volume: 0.4 },
  { at: 6.13, sfx: "whoosh", volume: 0.4 },
  { at: 8.08, sfx: "impact", volume: 0.45 },
  { at: 8.37, sfx: "click_soft", volume: 0.4 },
  { at: 9.52, sfx: "whoosh", volume: 0.45 },
  { at: 10.03, sfx: "click", volume: 0.45 },
  { at: 12.34, sfx: "click", volume: 0.45 },
  { at: 13.02, sfx: "click", volume: 0.45 },
  { at: 13.6, sfx: "click", volume: 0.45 },
  { at: 14.03, sfx: "whoosh", volume: 0.4 },
  { at: 15.87, sfx: "click", volume: 0.45 },
  { at: 16.64, sfx: "click", volume: 0.45 },
  { at: 17.66, sfx: "click", volume: 0.45 },
  { at: 18.01, sfx: "whoosh", volume: 0.4 },
  { at: 26.82, sfx: "whoosh", volume: 0.5 },
  { at: 27.68, sfx: "impact", volume: 0.55 },
  { at: 28.6, sfx: "click_soft", volume: 0.4 },
  { at: 32.29, sfx: "click_soft", volume: 0.4 },
  { at: 32.77, sfx: "riser", volume: 0.35 },
  { at: 32.96, sfx: "whoosh", volume: 0.5 },
  { at: SPEECH_TOTAL, sfx: "whoosh", volume: 0.4 },
];

export const WHITE_FLASHES: number[] = [2.08, 6.13, 9.52, 14.03, 18.01, 26.82];
export const VIOLET_FLASHES: number[] = [8.08, 32.29];
