import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Composition } from "remotion";
import {
  FPS,
  WIDTH,
  HEIGHT,
  TOTAL_FRAMES,
  SOURCE_VIDEO,
  SPEECH_SEGMENTS,
  CAMERA_KEYFRAMES,
  CAPTIONS,
  ACCENT_STINGERS,
  WHITE_FLASHES,
  VIOLET_FLASHES,
  SFX_CUES,
} from "./timeline";
import { COLORS } from "../shared/theme";
import { SpeakerReel } from "../shared/SpeakerReel";
import { Captions } from "../shared/Captions";
import { Flashes } from "../shared/Flashes";
import { SfxTrack } from "../shared/SfxTrack";
import { StatBadges } from "./StatBadges";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = async () => ({
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: TOTAL_FRAMES,
});

export const DylanTestimonialEditComposition: React.FC = () => (
  <Composition
    id="DylanTestimonialAd"
    component={DylanTestimonialEdit}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    calculateMetadata={calculateMetadata}
  />
);

// Testimonio corto de Dylan para ads de Meta: 4 pasajes de la entrevista
// completa (hook, resultado, cambio de mentalidad, recomendación) editados
// como jump cuts sin pausas, con subtítulos animados y badges de números
// clave. Ver timeline.ts para cómo se eligieron/recortaron los pasajes.
export const DylanTestimonialEdit: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bgNear }}>
    <SpeakerReel
      source={SOURCE_VIDEO}
      segments={SPEECH_SEGMENTS}
      cameraKeyframes={CAMERA_KEYFRAMES}
      fps={FPS}
      objectPosition="103% 50%"
    />
    <StatBadges />
    <Captions captions={CAPTIONS} accentStingers={ACCENT_STINGERS} />
    <Flashes whiteFlashes={WHITE_FLASHES} violetFlashes={VIOLET_FLASHES} />
    <SfxTrack cues={SFX_CUES} />
  </AbsoluteFill>
);
