import React from "react";
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
} from "remotion";
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
  PLACAS,
  CTA_P2P,
  OUTRO_CTA,
} from "./timeline";
import { COLORS } from "../shared/theme";
import { SpeakerReel } from "../shared/SpeakerReel";
import { Captions } from "../shared/Captions";
import { Flashes } from "../shared/Flashes";
import { SfxTrack } from "../shared/SfxTrack";
import { FlowDiagram } from "./FlowDiagram";
import { IconRow } from "./IconRow";
import { PriceLevels } from "./PriceLevels";
import { WordOfMouth } from "./WordOfMouth";
import { ImpactCard } from "./ImpactCard";
import { CTACard } from "../shared/CTACard";
import { MiniClassCard } from "./MiniClassCard";
import { ImpactTextHice, ImpactTextVosPodes } from "./ImpactText";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = async () => ({
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
    durationInFrames: TOTAL_FRAMES,
  });

export const CoachFitnessEditComposition: React.FC = () => (
  <Composition
    id="CoachFitnessAd"
    component={CoachFitnessEdit}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    calculateMetadata={calculateMetadata}
  />
);

// Edit vertical 9:16 "Coach Fitness P2P": speaker + jump cuts sin pausas,
// subtítulos animados, placas de impacto, motion graphics y CTA P2P.
// Ver remotion/src/coachEdit/timeline.ts para el detalle de cómo se armó el
// timing (silencedetect real + estimación proporcional de palabras).
export const CoachFitnessEdit: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bgNear }}>
    <SpeakerReel
      source={SOURCE_VIDEO}
      segments={SPEECH_SEGMENTS}
      cameraKeyframes={CAMERA_KEYFRAMES}
      fps={FPS}
    />
    <FlowDiagram />
    <IconRow />
    <PriceLevels />
    <WordOfMouth />
    {PLACAS.map((placa, i) => (
      <ImpactCard key={i} placa={placa} />
    ))}
    <CTACard from={CTA_P2P.from} to={CTA_P2P.to} />
    <MiniClassCard />
    <ImpactTextHice />
    <ImpactTextVosPodes />
    <CTACard from={OUTRO_CTA.from} to={OUTRO_CTA.to} />
    <Captions captions={CAPTIONS} accentStingers={ACCENT_STINGERS} />
    <Flashes whiteFlashes={WHITE_FLASHES} violetFlashes={VIOLET_FLASHES} />
    <SfxTrack cues={SFX_CUES} />
  </AbsoluteFill>
);
