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
  CTA_P2P,
  OUTRO_CTA,
} from "./timeline";
import { COLORS } from "../shared/theme";
import { SpeakerReel } from "../shared/SpeakerReel";
import { Captions } from "../shared/Captions";
import { Flashes } from "../shared/Flashes";
import { SfxTrack } from "../shared/SfxTrack";
import { CTACard } from "../shared/CTACard";
import { TransformationCard } from "./TransformationCard";
import { FunnelGraphic } from "./FunnelGraphic";
import { QuestionCard } from "./QuestionCard";
import { SystemFullscreen } from "./SystemFullscreen";
import { FlowFullscreen } from "./FlowFullscreen";
import { PhoneMock } from "./PhoneMock";
import { TicketsGraphic } from "./TicketsGraphic";
import { QuoteCard, RealityCard } from "./TextCards";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = async () => ({
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: TOTAL_FRAMES,
});

export const JoanP2PEditComposition: React.FC = () => (
  <Composition
    id="JoanP2PAd"
    component={JoanP2PEdit}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    calculateMetadata={calculateMetadata}
  />
);

// Edit vertical 9:16 "Joan P2P Inmobiliarias": speaker + jump cuts sin
// pausas, subtítulos animados, placas de transformación/pregunta, motion
// graphics full-screen (sistema P2P, flujo de negocio, mock de teléfono),
// tickets, testimonial y CTA P2P. Ver timeline.ts para el timing.
export const JoanP2PEdit: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bgNear }}>
    <SpeakerReel
      source={SOURCE_VIDEO}
      segments={SPEECH_SEGMENTS}
      cameraKeyframes={CAMERA_KEYFRAMES}
      fps={FPS}
    />
    <TransformationCard />
    <FunnelGraphic />
    <QuestionCard />
    <SystemFullscreen />
    <FlowFullscreen />
    <PhoneMock />
    <TicketsGraphic />
    <QuoteCard />
    <RealityCard />
    <CTACard from={CTA_P2P.from} to={CTA_P2P.to} />
    <CTACard from={OUTRO_CTA.from} to={OUTRO_CTA.to} />
    <Captions captions={CAPTIONS} accentStingers={ACCENT_STINGERS} />
    <Flashes whiteFlashes={WHITE_FLASHES} violetFlashes={VIOLET_FLASHES} />
    <SfxTrack cues={SFX_CUES} />
  </AbsoluteFill>
);
