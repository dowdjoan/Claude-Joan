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
  CTA_FINAL,
} from "./timeline";
import { COLORS } from "../shared/theme";
import { SpeakerReel } from "../shared/SpeakerReel";
import { Captions } from "../shared/Captions";
import { Flashes } from "../shared/Flashes";
import { SfxTrack } from "../shared/SfxTrack";
import { CTACard } from "../shared/CTACard";
import { HookBadge } from "./HookBadge";
import { PercentBeforeCard } from "./PercentBeforeCard";
import { PercentTransformCard } from "./PercentTransformCard";
import { P2PFlash } from "./P2PFlash";
import { ProspectPaymentBlocks } from "./ProspectPaymentBlocks";
import { MktVentasIA } from "./MktVentasIA";
import { ValiosoTags } from "./ValiosoTags";
import { NoClientsCard } from "./NoClientsCard";
import { CloserSetterLabels } from "./CloserSetterLabels";
import { InfraDiagram } from "./InfraDiagram";
import { MessageBubble } from "./MessageBubble";
import { HeroPercent2 } from "./HeroPercent2";
import { CtaSubtitle } from "./CtaSubtitle";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = async () => ({
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: TOTAL_FRAMES,
});

export const FeliEditComposition: React.FC = () => (
  <Composition
    id="FeliP2PAd"
    component={FeliEdit}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    calculateMetadata={calculateMetadata}
  />
);

// Short "Feli — de Closer a +30% en 4 días": speaker + jump cuts sin
// pausas, motion graphics full-screen (antes/después %, P2P, prospect ->
// payment, marketing+ventas+ia, no buscó clientes, infraestructura, hero
// 8%->30% v2) y overlays sobre el speaker (badge, tags, closer/setter,
// message bubble) según el brief. Ver timeline.ts para el timing exacto y
// cómo se recalculó a partir de los jump cuts reales.
export const FeliEdit: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bgNear }}>
    <SpeakerReel
      source={SOURCE_VIDEO}
      segments={SPEECH_SEGMENTS}
      cameraKeyframes={CAMERA_KEYFRAMES}
      fps={FPS}
    />
    <HookBadge />
    <PercentBeforeCard />
    <PercentTransformCard />
    <P2PFlash />
    <ProspectPaymentBlocks />
    <MktVentasIA />
    <ValiosoTags />
    <NoClientsCard />
    <CloserSetterLabels />
    <InfraDiagram />
    <MessageBubble />
    <HeroPercent2 />
    <CtaSubtitle />
    <CTACard from={CTA_FINAL.from} to={CTA_FINAL.to} />
    <Captions captions={CAPTIONS} accentStingers={ACCENT_STINGERS} />
    <Flashes whiteFlashes={WHITE_FLASHES} violetFlashes={VIOLET_FLASHES} />
    <SfxTrack cues={SFX_CUES} />
  </AbsoluteFill>
);
