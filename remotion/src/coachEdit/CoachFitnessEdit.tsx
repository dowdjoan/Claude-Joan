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
  PLACAS,
  CTA_P2P,
  OUTRO_CTA,
} from "./timeline";
import { COLORS } from "./theme";
import { SpeakerReel } from "./SpeakerReel";
import { FlowDiagram } from "./FlowDiagram";
import { IconRow } from "./IconRow";
import { PriceLevels } from "./PriceLevels";
import { WordOfMouth } from "./WordOfMouth";
import { ImpactCard } from "./ImpactCard";
import { CTACard } from "./CTACard";
import { MiniClassCard } from "./MiniClassCard";
import { ImpactTextHice, ImpactTextVosPodes } from "./ImpactText";
import { Captions } from "./Captions";
import { Flashes } from "./Flashes";
import { SfxTrack } from "./SfxTrack";

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
    <SpeakerReel />
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
    <Captions />
    <Flashes />
    <SfxTrack />
  </AbsoluteFill>
);
