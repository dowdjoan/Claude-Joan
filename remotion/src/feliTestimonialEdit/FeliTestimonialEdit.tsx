import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Composition } from "remotion";
import {
  FPS,
  WIDTH,
  HEIGHT,
  TOTAL_FRAMES,
  SOURCE_VIDEO,
  OBJECT_POSITION,
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

export const FeliTestimonialEditComposition: React.FC = () => (
  <Composition
    id="FeliTestimonialAd"
    component={FeliTestimonialEdit}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    calculateMetadata={calculateMetadata}
  />
);

// Testimonio corto de Feli para ads de Meta: 5 pasajes de la entrevista
// completa (identidad/hook, el techo del closer, el salto a 30%, "4
// días", cierre/recomendación) editados como jump cuts sin pausas, con
// subtítulos animados y badges de números clave. Ver timeline.ts para
// cómo se eligieron/recortaron los pasajes y el crop del panel izquierdo
// (Feli) de la videollamada partida.
export const FeliTestimonialEdit: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bgNear }}>
    <SpeakerReel
      source={SOURCE_VIDEO}
      segments={SPEECH_SEGMENTS}
      cameraKeyframes={CAMERA_KEYFRAMES}
      fps={FPS}
      objectPosition={OBJECT_POSITION}
    />
    <StatBadges />
    <Captions captions={CAPTIONS} accentStingers={ACCENT_STINGERS} />
    <Flashes whiteFlashes={WHITE_FLASHES} violetFlashes={VIOLET_FLASHES} />
    <SfxTrack cues={SFX_CUES} />
  </AbsoluteFill>
);
