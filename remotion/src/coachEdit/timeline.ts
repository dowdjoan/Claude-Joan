// Timeline del edit "Coach Fitness P2P".
//
// Cómo se construyó (ver también scripts/analyze_reference.py para el caso
// genérico): se corrió `ffmpeg -af silencedetect=noise=-30dB:d=0.15` sobre
// el .mov original para encontrar cada pausa real del audio (silence_start /
// silence_end exactos). Los SPEECH_SEGMENTS de abajo son los tramos de habla
// resultantes después de eliminar el aire inicial y "apretar" cada pausa
// larga (>=0.25s) a ~0.08s, sin tocar nunca una palabra (los puntos de corte
// caen siempre dentro de un tramo de silencio detectado, nunca en medio de
// audio). Eso arma el jump-cut de "sin pausas muertas".
//
// El texto de cada subtítulo/placa SÍ se ubicó por estimación proporcional
// (peso por longitud de palabra) dentro de esos tramos, porque este entorno
// no tiene acceso de red a un modelo de transcripción (whisper/faster-
// whisper intentan bajar pesos desde huggingface.co, bloqueado por la
// política de egress del sandbox). Los tiempos de las palabras individuales
// pueden estar corridos por ~100-200ms; los cortes de silencio (los saltos
// de plano) son exactos. Vale la pena una pasada de oído en Remotion Studio
// para afinar si hace falta.
//
// Todos los tiempos de este archivo están en el timeline "limpio" (después
// del jump-cut), en segundos.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SOURCE_VIDEO = "footage/coach_fitness_raw.mov";

// Tramos de habla a concatenar desde el .mov original (trimStart/trimEnd en
// el timeline ORIGINAL de la fuente). Se reproducen uno detrás del otro sin
// hueco -> ahí está el jump cut que saca las pausas.
export const SPEECH_SEGMENTS: { sourceStart: number; sourceEnd: number }[] = [
  { sourceStart: 1.299, sourceEnd: 3.803 },
  { sourceStart: 3.883, sourceEnd: 6.165 },
  { sourceStart: 6.245, sourceEnd: 7.927 },
  { sourceStart: 8.007, sourceEnd: 8.506 },
  { sourceStart: 8.586, sourceEnd: 17.502 },
  { sourceStart: 17.582, sourceEnd: 18.223 },
  { sourceStart: 18.303, sourceEnd: 22.777 },
  { sourceStart: 22.857, sourceEnd: 23.817 },
  { sourceStart: 23.897, sourceEnd: 30.953 },
  { sourceStart: 31.033, sourceEnd: 34.611 },
  { sourceStart: 34.691, sourceEnd: 36.769 },
  { sourceStart: 36.849, sourceEnd: 39.574 },
];

export const SPEECH_TOTAL = SPEECH_SEGMENTS.reduce(
  (acc, s) => acc + (s.sourceEnd - s.sourceStart),
  0,
);

// Hold final del CTA (spec: "mantener CTA ~0.5-1s después de terminar la voz").
export const OUTRO_HOLD = 0.9;
export const TOTAL_DURATION = SPEECH_TOTAL + OUTRO_HOLD;
export const TOTAL_FRAMES = Math.round(TOTAL_DURATION * FPS);

export const sec = (s: number) => Math.round(s * FPS);

// ---------------------------------------------------------------------------
// Subtítulos (frases cortas, 2-5 palabras). `emphasis` son las palabras que
// llevan el gradiente P2P en vez de blanco.
// ---------------------------------------------------------------------------
export type Caption = {
  from: number;
  to: number;
  lines: string[];
  emphasis?: string[];
};

export const CAPTIONS: Caption[] = [
  { from: 0.0, to: 0.38, lines: ["ESCALÉ"], emphasis: ["ESCALÉ"] },
  { from: 0.38, to: 0.99, lines: ["MI NEGOCIO"] },
  { from: 0.99, to: 1.86, lines: ["COMO ENTRENADOR"] },
  { from: 1.86, to: 2.35, lines: ["PERSONAL"] },
  { from: 2.35, to: 2.99, lines: ["Y COMO COACH"] },
  { from: 2.99, to: 3.4, lines: ["FITNESS"] },
  // 3.42-5.15: placa full screen, sin subtítulo normal
  { from: 5.15, to: 5.8, lines: ["EN MUY"] },
  { from: 5.8, to: 6.47, lines: ["POCO TIEMPO"] },
  { from: 6.47, to: 7.02, lines: ["Y LA LOCURA"], emphasis: ["LOCURA"] },
  { from: 7.02, to: 7.62, lines: ["DE ESTO ES"] },
  { from: 7.62, to: 8.39, lines: ["QUE ENCIMA"] },
  { from: 8.39, to: 8.99, lines: ["MI ENTREGA"] },
  { from: 8.99, to: 9.7, lines: ["DE SERVICIO ERA"] },
  { from: 9.7, to: 10.74, lines: ["PRÁCTICAMENTE NULA"] },
  { from: 10.74, to: 11.67, lines: ["PORQUE ENTREGABA"] },
  { from: 11.67, to: 12.6, lines: ["EL SERVICIO TODO"] },
  { from: 12.6, to: 13.53, lines: ["CON IA"], emphasis: ["IA"] },
  { from: 13.53, to: 14.19, lines: ["ENTREGA CON IA"], emphasis: ["IA"] },
  { from: 14.19, to: 14.63, lines: ["¿Y CÓMO"] },
  { from: 14.63, to: 15.67, lines: ["CONSEGUÍA CLIENTES?"] },
  { from: 15.67, to: 16.03, lines: ["DE ESTA"] },
  { from: 16.03, to: 16.88, lines: ["MANERA SEMEJANTE"] },
  { from: 16.88, to: 17.48, lines: ["ESTUPIDEZ?"] },
  { from: 17.48, to: 17.86, lines: ["SI SOS"] },
  { from: 17.86, to: 18.79, lines: ["ENTRENADOR"] },
  { from: 18.79, to: 19.56, lines: ["Y NUTRICIONISTA"] },
  { from: 19.56, to: 20.44, lines: ["Y HOY EN DÍA"] },
  // 20.44-22.63: placa full screen "¿NO SABÉS CÓMO ESCALAR TU NEGOCIO?"
  { from: 22.63, to: 23.4, lines: ["Y CÓMO COBRAR"] },
  { from: 23.4, to: 24.22, lines: ["MUCHO MÁS CARO"] },
  { from: 24.22, to: 24.9, lines: ["POR CADA CLIENTE"] },
  { from: 25.21, to: 25.81, lines: ["CÓMO DEJAR"] },
  { from: 25.81, to: 26.63, lines: ["DE DEPENDER"] },
  { from: 26.63, to: 27.15, lines: ["DE ESE"] },
  { from: 27.56, to: 28.33, lines: ["CÓMO PASAR"] },
  { from: 28.33, to: 28.87, lines: ["AL SIGUIENTE"] },
  { from: 28.87, to: 29.85, lines: ["NIVEL"], emphasis: ["NIVEL"] },
  // 29.89-31.15: CTA P2P full (CTACard trae su propio "RESPONDÉ P2P")
  // 31.15-33.4: tarjeta mini clase (MiniClassCard trae su propio texto)
  { from: 33.09, to: 34.08, lines: ["PARA QUE VOS VEAS"] },
  { from: 34.08, to: 34.93, lines: ["EXACTAMENTE"] },
  { from: 35.64, to: 36.14, lines: ["Y CÓMO VOS"] },
];

// Texto extra tipo "stinger" (no es subtítulo literal, es un acento de
// edición que pidió el brief) — chico, entra y sale rápido.
export const ACCENT_STINGERS = [
  { from: 17.3, to: 17.75, text: "ASÍ DE SIMPLE." },
];

// ---------------------------------------------------------------------------
// Placas full-screen (reemplazan al talking head)
// ---------------------------------------------------------------------------
export type Placa = {
  from: number;
  to: number;
  kind: "money" | "escalar";
};

export const PLACAS: Placa[] = [
  { from: 3.42, to: 5.15, kind: "money" },
  { from: 20.44, to: 22.63, kind: "escalar" },
];

// ---------------------------------------------------------------------------
// Motion graphics (además de/reemplazando parcialmente al speaker)
// ---------------------------------------------------------------------------
export const FLOW_GRAPHIC = { from: 8.99, to: 14.19 };
export const ICON_ROW = { from: 17.48, to: 19.56 };
export const PRICE_LEVELS = { from: 22.63, to: 25.21 };
export const WORD_OF_MOUTH = { from: 25.21, to: 27.9 };
export const NIVEL_FLASH_AT = 29.85;
export const CTA_P2P = { from: 29.89, to: 31.15 };
export const MINI_CLASS_CARD = { from: 31.15, to: 33.4 };
export const IMPACT_TEXT_HICE = { from: 34.93, to: 35.64 };
export const IMPACT_TEXT_VOS_PODES = { from: 36.14, to: SPEECH_TOTAL };
export const OUTRO_CTA = { from: SPEECH_TOTAL, to: TOTAL_DURATION };

// ---------------------------------------------------------------------------
// Zoom / reencuadre del speaker (punch-ins). `scale` en %, 100 = sin zoom.
// `shiftX` desplaza al speaker en % del ancho (positivo = a la derecha) para
// dejar lugar a los motion graphics.
// ---------------------------------------------------------------------------
export type CameraKeyframe = { at: number; scale: number; shiftX?: number };

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0.0, scale: 100 },
  { at: 2.35, scale: 105 },
  { at: 5.15, scale: 100 },
  { at: 6.47, scale: 108 },
  { at: 8.99, scale: 106, shiftX: -14 },
  { at: 14.19, scale: 112, shiftX: 0 },
  { at: 17.48, scale: 115, shiftX: 10 },
  { at: 19.56, scale: 106, shiftX: 0 },
  { at: 22.63, scale: 106 },
  { at: 25.21, scale: 108 },
  { at: 27.56, scale: 104 },
  { at: 28.87, scale: 113 },
  { at: 29.89, scale: 105, shiftX: 0 },
  { at: 31.15, scale: 103, shiftX: 16 },
  { at: 33.09, scale: 105, shiftX: 0 },
  { at: 34.93, scale: 110 },
  { at: 36.14, scale: 115 },
];

// ---------------------------------------------------------------------------
// SFX. Un click por cada aparición de texto/asset, whoosh/impact en momentos
// grandes (placas, CTA). Volumen bajo comentario del spec: siempre por debajo
// de la voz.
// ---------------------------------------------------------------------------
export type SfxCue = { at: number; sfx: "click" | "click_soft" | "impact" | "whoosh" | "riser"; volume?: number };

export const SFX_CUES: SfxCue[] = [
  { at: 0.0, sfx: "click", volume: 0.5 },
  { at: 0.38, sfx: "click_soft", volume: 0.45 },
  { at: 2.35, sfx: "click_soft", volume: 0.4 },
  { at: 3.42, sfx: "whoosh", volume: 0.45 },
  { at: 3.92, sfx: "impact", volume: 0.5 },
  { at: 5.15, sfx: "click", volume: 0.4 },
  { at: 6.47, sfx: "click_soft", volume: 0.4 },
  { at: 8.99, sfx: "click", volume: 0.45 },
  { at: 11.8, sfx: "click", volume: 0.5 },
  { at: 13.53, sfx: "click_soft", volume: 0.45 },
  { at: 14.19, sfx: "click_soft", volume: 0.4 },
  { at: 17.48, sfx: "click", volume: 0.45 },
  { at: 17.86, sfx: "click", volume: 0.45 },
  { at: 18.79, sfx: "click", volume: 0.45 },
  { at: 20.44, sfx: "whoosh", volume: 0.45 },
  { at: 20.9, sfx: "impact", volume: 0.5 },
  { at: 22.63, sfx: "click_soft", volume: 0.4 },
  { at: 22.9, sfx: "click", volume: 0.45 },
  { at: 23.55, sfx: "click", volume: 0.45 },
  { at: 24.22, sfx: "click", volume: 0.45 },
  { at: 25.21, sfx: "click_soft", volume: 0.4 },
  { at: 27.15, sfx: "click", volume: 0.45 },
  { at: 27.56, sfx: "click_soft", volume: 0.4 },
  { at: 29.85, sfx: "impact", volume: 0.45 },
  { at: 29.89, sfx: "riser", volume: 0.35 },
  { at: 30.38, sfx: "whoosh", volume: 0.5 },
  { at: 31.15, sfx: "click", volume: 0.45 },
  { at: 31.9, sfx: "click_soft", volume: 0.4 },
  { at: 34.93, sfx: "click_soft", volume: 0.4 },
  { at: 36.14, sfx: "click", volume: 0.45 },
  { at: SPEECH_TOTAL, sfx: "whoosh", volume: 0.45 },
];

// Flash blanco muy breve en cortes de sección importantes.
export const WHITE_FLASHES: number[] = [5.15, 20.35, 20.44];
// Destello violeta corto (glow, no flash blanco) en cambios de énfasis.
export const VIOLET_FLASHES: number[] = [3.42, 29.85];
