// Timeline del short "Emma — de Community Manager a Agencia IA (+$9.000/mes)".
// Mismo método que feliEdit/dylanShortEdit: SPEECH_SEGMENTS salen de
// `ffmpeg silencedetect` sobre el audio real del clip (45s aprox, ya
// vertical 1080x1920 nativo), apretando cada pausa >=0.25s a ~0.08s
// (BUFFER=0.04s a cada lado) sin tocar nunca una palabra; las pausas
// <0.25s se dejan intactas dentro del mismo segmento.
//
// El brief da 10 "beats" narrativos con timestamps orientativos sobre el
// archivo SIN cortar (el propio brief dice "los timestamps son
// orientativos"). Una vez recortadas las pausas el audio real dura menos,
// así que esos 10 beats se reescalaron proporcionalmente (factor =
// duración_real / duración_original_relativa) preservando orden y peso
// relativo — no hay acceso a un modelo de forced-alignment en este
// sandbox, así que esto es una estimación, no un timing palabra-por-
// palabra verificado.
//
// LIMITACIÓN: el brief permite usar una foto real de Emma si se provee un
// archivo. No llegó ningún archivo de imagen en este sandbox (solo texto
// describiéndola), así que no se usa ninguna foto/placeholder de Emma —
// la única fuente visual de Emma es el propio video hablando.

import { CameraKeyframe } from "../shared/camera";
import { Caption, AccentStinger } from "../shared/Captions";
import { SfxCue } from "../shared/SfxTrack";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SOURCE_VIDEO = "footage/emma_raw.mov";

export const SPEECH_SEGMENTS: { sourceStart: number; sourceEnd: number }[] = [
  { sourceStart: 0.381179, sourceEnd: 2.36621 },
  { sourceStart: 2.6032, sourceEnd: 4.72054 },
  { sourceStart: 5.51109, sourceEnd: 5.79476 },
  { sourceStart: 6.72556, sourceEnd: 9.23512 },
  { sourceStart: 9.48522, sourceEnd: 16.2971 },
  { sourceStart: 16.5748, sourceEnd: 17.3663 },
  { sourceStart: 17.6661, sourceEnd: 19.7595 },
  { sourceStart: 20.1927, sourceEnd: 20.4635 },
  { sourceStart: 20.672, sourceEnd: 22.4152 },
  { sourceStart: 22.7127, sourceEnd: 27.5093 },
  { sourceStart: 27.7699, sourceEnd: 30.563 },
  { sourceStart: 30.8399, sourceEnd: 32.6275 },
  { sourceStart: 32.8633, sourceEnd: 35.7086 },
  { sourceStart: 36.1355, sourceEnd: 41.8864 },
  { sourceStart: 42.082, sourceEnd: 44.106 },
];

export const TOTAL_DURATION = 38.604;
export const TOTAL_FRAMES = Math.round(TOTAL_DURATION * FPS);

// ---------------------------------------------------------------------------
// Los 10 beats del brief, reescalados sobre el audio ya limpio de pausas.
// ---------------------------------------------------------------------------
export const HOOK_EMMA = { from: 0, to: 2.742 };
export const FREELANCER_500 = { from: 2.742, to: 6.399 };
export const HERO_TRANSFORM = { from: 6.399, to: 12.798 };
export const LA_PREGUNTA = { from: 12.798, to: 17.369 };
export const P2P_REVEAL = { from: 17.369, to: 21.026 };
export const MECANISMO = { from: 21.026, to: 25.596 };
export const TRES_SISTEMAS = { from: 25.596, to: 28.339 };
export const FUE_LO_UNICO = { from: 28.339, to: 31.081 };
export const TU_CASO = { from: 31.081, to: 33.824 };
export const CTA_FINAL = { from: 33.824, to: TOTAL_DURATION };

// ---------------------------------------------------------------------------
// Subtítulos (vacíos donde una placa/motion full-screen ya trae su propio
// texto grande, para no solapar).
// ---------------------------------------------------------------------------
export const CAPTIONS: Caption[] = [
  // HOOK_EMMA (badge propio se encarga de "DE UNA BARBERÍA")
  { from: 0, to: 0.95, lines: ["EMMA"], emphasis: ["EMMA"] },
  { from: 0.95, to: 2.05, lines: ["COMMUNITY", "MANAGER"] },
  // 2.742-6.399: FREELANCER_500 full screen
  // 6.399-12.798: HERO_TRANSFORM full screen
  { from: 12.798, to: 14.5, lines: ["¿QUÉ HIZO", "EMMA?"], emphasis: ["EMMA?"] },
  { from: 14.5, to: 16.5, lines: ["QUE VOS NO", "ESTÁS VIENDO"] },
  { from: 16.5, to: 17.369, lines: ["COMO FREELANCER"] },
  // 17.369-21.026: P2P_REVEAL full screen
  // 21.026-25.596: MECANISMO full screen
  // 25.596-28.339: TRES_SISTEMAS full screen
  { from: 28.339, to: 29.4, lines: ["ESO FUE"] },
  { from: 29.4, to: 30.3, lines: ["LO QUE CAMBIÓ."], emphasis: ["CAMBIÓ."] },
  { from: 31.081, to: 32.6, lines: ["¿Y EN", "TU CASO?"], emphasis: ["TU", "CASO?"] },
  { from: 32.6, to: 33.824, lines: ["¿CÓMO LO", "APLICARÍAS?"] },
  // 33.824-38.604: CTA_FINAL
];

export const ACCENT_STINGERS: AccentStinger[] = [];

// ---------------------------------------------------------------------------
// Cámara (punch-ins suaves en los tramos con speaker visible)
// ---------------------------------------------------------------------------
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0, scale: 100 },
  { at: 0.95, scale: 105 },
  { at: 6.399, scale: 100 },
  { at: 12.798, scale: 100 },
  { at: 14.5, scale: 110 },
  { at: 17.369, scale: 100 },
  { at: 28.339, scale: 102 },
  { at: 31.081, scale: 100 },
  { at: 32.0, scale: 109 },
  { at: 33.824, scale: 106 },
];

// ---------------------------------------------------------------------------
// SFX
// ---------------------------------------------------------------------------
export const SFX_CUES: SfxCue[] = [
  { at: 0.0, sfx: "click", volume: 0.45 },
  { at: 0.95, sfx: "click", volume: 0.45 },
  { at: 2.742, sfx: "whoosh", volume: 0.45 },
  { at: 3.2, sfx: "impact", volume: 0.5 },
  { at: 6.399, sfx: "whoosh", volume: 0.4 },
  { at: 9.8, sfx: "click_soft", volume: 0.4 },
  { at: 11.3, sfx: "riser", volume: 0.35 },
  { at: 11.9, sfx: "impact", volume: 0.6 },
  { at: 12.798, sfx: "click", volume: 0.45 },
  { at: 14.5, sfx: "click", volume: 0.45 },
  { at: 17.369, sfx: "whoosh", volume: 0.45 },
  { at: 17.6, sfx: "impact", volume: 0.5 },
  { at: 21.026, sfx: "whoosh", volume: 0.4 },
  { at: 21.5, sfx: "click", volume: 0.45 },
  { at: 22.5, sfx: "click", volume: 0.45 },
  { at: 23.5, sfx: "click", volume: 0.45 },
  { at: 24.5, sfx: "click", volume: 0.45 },
  { at: 25.596, sfx: "whoosh", volume: 0.4 },
  { at: 25.9, sfx: "click", volume: 0.45 },
  { at: 26.6, sfx: "click", volume: 0.45 },
  { at: 27.3, sfx: "click", volume: 0.45 },
  { at: 28.339, sfx: "click", volume: 0.45 },
  { at: 29.4, sfx: "click", volume: 0.45 },
  { at: 31.081, sfx: "click", volume: 0.45 },
  { at: 33.824, sfx: "click_soft", volume: 0.4 },
  { at: 34.2, sfx: "riser", volume: 0.35 },
  { at: 34.6, sfx: "whoosh", volume: 0.5 },
  { at: TOTAL_DURATION, sfx: "whoosh", volume: 0.4 },
];

export const WHITE_FLASHES: number[] = [2.742, 17.369, 21.026, 25.596];
export const VIOLET_FLASHES: number[] = [11.9, 17.6];
