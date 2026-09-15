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
import { DylanPhotoOverlay } from "./DylanPhotoOverlay";
import { PerfumesGraphic } from "./PerfumesGraphic";
import { HeroResultCard } from "./HeroResultCard";
import { OceanoAzulConcept } from "./OceanoAzulConcept";
import { P2PLogoReveal } from "./P2PLogoReveal";
import { ProspectPaymentArrow } from "./ProspectPaymentArrow";
import { FlowFullscreen } from "./FlowFullscreen";
import { DylanApplicationCard } from "./DylanApplicationCard";
import { ConceptRevealCard } from "./ConceptRevealCard";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = async () => ({
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: TOTAL_FRAMES,
});

export const DylanShortEditComposition: React.FC = () => (
  <Composition
    id="DylanShortAd"
    component={DylanShortEdit}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    calculateMetadata={calculateMetadata}
  />
);

// Short "Caso Dylan / Océano Azul": speaker + jump cuts sin pausas, foto
// (placeholder) de Dylan, motion graphics full-screen (4 perfumes, hero
// +$7.000, Océano Azul, sistema P2P, flujo prospecto→payment→repagan,
// aplicación al negocio de Dylan, "1 solo concepto") y CTA P2P.
// Ver timeline.ts para el timing y la limitación de assets (sin foto real).
export const DylanShortEdit: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bgNear }}>
    <SpeakerReel
      source={SOURCE_VIDEO}
      segments={SPEECH_SEGMENTS}
      cameraKeyframes={CAMERA_KEYFRAMES}
      fps={FPS}
    />
    <DylanPhotoOverlay />
    <PerfumesGraphic />
    <HeroResultCard />
    <OceanoAzulConcept />
    <P2PLogoReveal />
    <ProspectPaymentArrow />
    <FlowFullscreen />
    <DylanApplicationCard />
    <ConceptRevealCard />
    <CTACard from={CTA_P2P.from} to={CTA_P2P.to} />
    <CTACard from={OUTRO_CTA.from} to={OUTRO_CTA.to} />
    <Captions captions={CAPTIONS} accentStingers={ACCENT_STINGERS} />
    <Flashes whiteFlashes={WHITE_FLASHES} violetFlashes={VIOLET_FLASHES} />
    <SfxTrack cues={SFX_CUES} />
  </AbsoluteFill>
);
