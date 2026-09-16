// Timeline del short "Feli — de Closer a +30% en 4 días" (mismo método que
// los otros edits: SPEECH_SEGMENTS salen de `ffmpeg silencedetect` sobre el
// audio real del clip fuente, recortado primero a los 45s pedidos por el
// brief; cada pausa >=0.25s se aprieta a ~0.08s (BUFFER=0.04s a cada lado)
// sin tocar nunca una palabra; las pausas <0.25s se dejan intactas dentro
// del mismo segmento).
//
// Los textos de las placas/motion graphics y sus 15 "beats" narrativos son
// los que pide el brief tal cual (sección 7 TIMELINE). Los timestamps que
// dio el brief son referencias narrativas sobre el archivo original de 45s
// SIN cortar; una vez que se cortan las pausas el audio real dura menos
// (42.087s), así que esos 15 beats se reescalaron proporcionalmente
// (factor = 42.087 / 44) preservando su orden y duración relativa — no hay
// acceso a un modelo de forced-alignment en este sandbox, así que esto es
// una estimación, no un timing palabra-por-palabra verificado.

import { CameraKeyframe } from "../shared/camera";
import { Caption, AccentStinger } from "../shared/Captions";
import { SfxCue } from "../shared/SfxTrack";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SOURCE_VIDEO = "footage/feli_raw.mov";

// Segmentos de habla (jump cuts) en tiempo de la fuente ya recortada a 45s.
export const SPEECH_SEGMENTS: { sourceStart: number; sourceEnd: number }[] = [
  { sourceStart: 0.1956, sourceEnd: 6.276 },
  { sourceStart: 6.5088, sourceEnd: 10.573 },
  { sourceStart: 10.8866, sourceEnd: 11.7017 },
  { sourceStart: 12.1507, sourceEnd: 15.9097 },
  { sourceStart: 16.1737, sourceEnd: 23.6405 },
  { sourceStart: 23.8581, sourceEnd: 24.8394 },
  { sourceStart: 25.2024, sourceEnd: 27.7676 },
  { sourceStart: 28.0372, sourceEnd: 33.0099 },
  { sourceStart: 33.212, sourceEnd: 36.0092 },
  { sourceStart: 36.2331, sourceEnd: 39.6168 },
  { sourceStart: 39.7985, sourceEnd: 45.0 },
];

export const TOTAL_DURATION = 42.087;
export const TOTAL_FRAMES = Math.round(TOTAL_DURATION * FPS);

// ---------------------------------------------------------------------------
// Los 15 "beats" del brief, reescalados (factor 42.087/44) sobre el audio
// ya limpio de pausas.
// ---------------------------------------------------------------------------
export const HOOK_FELI = { from: 0, to: 2.87 };
export const ANTES_PORCENTAJE = { from: 2.87, to: 6.696 };
export const DESPUES_30 = { from: 6.696, to: 10.522 };
export const LA_PREGUNTA = { from: 10.522, to: 14.348 };
export const P2P_FLASH = { from: 14.348, to: 16.261 };
export const PROSPECT_PAYMENT = { from: 16.261, to: 20.087 };
export const MKT_VENTAS_IA = { from: 20.087, to: 22.957 };
export const MAS_VALIOSO = { from: 22.957, to: 25.826 };
export const NO_BUSCO_CLIENTES = { from: 25.826, to: 28.696 };
export const CLOSER_SETTER = { from: 28.696, to: 31.565 };
export const INFRAESTRUCTURA = { from: 31.565, to: 34.435 };
export const TE_PUEDO_AYUDAR = { from: 34.435, to: 37.304 };
export const HERO_30_V2 = { from: 37.304, to: 39.217 };
export const PREGUNTA_FINAL = { from: 39.217, to: 40.174 };
export const CTA_FINAL = { from: 40.174, to: TOTAL_DURATION };

// ---------------------------------------------------------------------------
// Subtítulos (vacíos donde una placa/motion full-screen ya trae su propio
// texto grande, para no solapar — mismo criterio que los otros edits).
// ---------------------------------------------------------------------------
export const CAPTIONS: Caption[] = [
  { from: 0, to: 1.0, lines: ["DE SIMPLE"] },
  { from: 1.0, to: 1.9, lines: ["CLOSER"], emphasis: ["CLOSER"] },
  // 1.9-2.87: badge "CLOSER DE VENTAS"
  // 2.87-6.696: ANTES full screen (8-12%)
  // 6.696-10.522: DESPUÉS full screen (+30%)
  { from: 10.522, to: 12.4, lines: ["¿QUÉ HIZO", "DIFERENTE?"] },
  { from: 12.4, to: 14.348, lines: ["QUE VOS NO", "ESTÁS VIENDO"] },
  // 14.348-16.261: P2P flash
  // 16.261-20.087: prospect -> payment
  // 20.087-22.957: marketing + ventas + ia
  { from: 22.957, to: 23.9, lines: ["SE HIZO"] },
  { from: 23.9, to: 25.826, lines: ["MÁS VALIOSO"], emphasis: ["MÁS", "VALIOSO"] },
  // 25.826-28.696: no buscó clientes
  // 28.696-31.565: closer/setter (overlay propio)
  // 31.565-34.435: infraestructura
  // 34.435-37.304: mensaje "te puedo ayudar"
  // 37.304-39.217: hero 8% -> 30% v2
  { from: 39.217, to: 40.174, lines: ["¿CÓMO CAMBIARÍAN", "TUS INGRESOS?"] },
  // 40.174-42.087: CTA P2P
];

export const ACCENT_STINGERS: AccentStinger[] = [];

// ---------------------------------------------------------------------------
// Cámara (punch-ins suaves en los tramos donde el speaker está visible)
// ---------------------------------------------------------------------------
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0, scale: 100 },
  { at: 1.0, scale: 105 },
  { at: 2.87, scale: 100 },
  { at: 10.522, scale: 100 },
  { at: 11.6, scale: 108 },
  { at: 14.348, scale: 100 },
  { at: 22.957, scale: 102 },
  { at: 25.826, scale: 100 },
  { at: 28.696, scale: 100 },
  { at: 31.565, scale: 100 },
  { at: 34.435, scale: 103 },
  { at: 37.304, scale: 100 },
  { at: 39.217, scale: 110 },
  { at: 40.174, scale: 106 },
];

// ---------------------------------------------------------------------------
// SFX
// ---------------------------------------------------------------------------
export const SFX_CUES: SfxCue[] = [
  { at: 0.0, sfx: "click", volume: 0.45 },
  { at: 1.0, sfx: "click", volume: 0.45 },
  { at: 1.9, sfx: "click_soft", volume: 0.4 },
  { at: 2.87, sfx: "whoosh", volume: 0.45 },
  { at: 3.3, sfx: "impact", volume: 0.5 },
  { at: 6.696, sfx: "whoosh", volume: 0.4 },
  { at: 7.3, sfx: "riser", volume: 0.35 },
  { at: 7.6, sfx: "impact", volume: 0.6 },
  { at: 8.0, sfx: "click_soft", volume: 0.4 },
  { at: 10.522, sfx: "click", volume: 0.45 },
  { at: 12.4, sfx: "click", volume: 0.45 },
  { at: 14.348, sfx: "whoosh", volume: 0.45 },
  { at: 14.6, sfx: "impact", volume: 0.5 },
  { at: 15.4, sfx: "click_soft", volume: 0.4 },
  { at: 16.261, sfx: "whoosh", volume: 0.4 },
  { at: 16.6, sfx: "click", volume: 0.45 },
  { at: 18.3, sfx: "click", volume: 0.45 },
  { at: 20.087, sfx: "whoosh", volume: 0.4 },
  { at: 20.4, sfx: "click", volume: 0.45 },
  { at: 21.1, sfx: "click", volume: 0.45 },
  { at: 21.8, sfx: "click", volume: 0.45 },
  { at: 22.957, sfx: "click", volume: 0.45 },
  { at: 23.9, sfx: "click", volume: 0.45 },
  { at: 25.826, sfx: "whoosh", volume: 0.4 },
  { at: 26.2, sfx: "click", volume: 0.45 },
  { at: 27.5, sfx: "click_soft", volume: 0.4 },
  { at: 28.696, sfx: "click", volume: 0.45 },
  { at: 29.3, sfx: "click", volume: 0.45 },
  { at: 29.9, sfx: "click_soft", volume: 0.4 },
  { at: 31.565, sfx: "whoosh", volume: 0.4 },
  { at: 31.9, sfx: "click_soft", volume: 0.4 },
  { at: 34.435, sfx: "click_soft", volume: 0.4 },
  { at: 35.2, sfx: "click", volume: 0.45 },
  { at: 35.6, sfx: "click", volume: 0.45 },
  { at: 36.0, sfx: "click", volume: 0.45 },
  { at: 37.304, sfx: "whoosh", volume: 0.45 },
  { at: 37.6, sfx: "impact", volume: 0.6 },
  { at: 39.217, sfx: "click", volume: 0.45 },
  { at: 40.174, sfx: "click_soft", volume: 0.4 },
  { at: 40.4, sfx: "riser", volume: 0.35 },
  { at: 40.7, sfx: "whoosh", volume: 0.5 },
];

export const WHITE_FLASHES: number[] = [
  2.87,
  14.348,
  25.826,
  31.565,
  37.304,
];
export const VIOLET_FLASHES: number[] = [6.696, 7.6, 37.6];
