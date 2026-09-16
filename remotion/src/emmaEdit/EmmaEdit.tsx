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
  TOTAL_DURATION,
} from "./timeline";
import { COLORS } from "../shared/theme";
import { SpeakerReel } from "../shared/SpeakerReel";
import { Captions } from "../shared/Captions";
import { Flashes } from "../shared/Flashes";
import { SfxTrack } from "../shared/SfxTrack";
import { CTACard } from "../shared/CTACard";
import { HookBlackout } from "./HookBlackout";
import { HookEmmaBadge } from "./HookEmmaBadge";
import { Freelancer500Card } from "./Freelancer500Card";
import { HeroTransform } from "./HeroTransform";
import { P2PRevealFlash } from "./P2PRevealFlash";
import { MechanismCycle } from "./MechanismCycle";
import { TresSistemas } from "./TresSistemas";
import { FueLoUnicoTags } from "./FueLoUnicoTags";
import { ReminderStack } from "./ReminderStack";
import { CtaSubtitle } from "./CtaSubtitle";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = async () => ({
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: TOTAL_FRAMES,
});

export const EmmaEditComposition: React.FC = () => (
  <Composition
    id="EmmaP2PAd"
    component={EmmaEdit}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    calculateMetadata={calculateMetadata}
  />
);

// Short "Emma — de Community Manager a Agencia IA (+$9.000/mes)": speaker
// + jump cuts sin pausas, motion graphics full-screen ($500, hero de 3
// etapas con zoom, P2P, ciclo prospect-to-payment, marketing+ventas+ia) y
// overlays sobre el speaker (badge, tags, reminder stack) según el brief.
// Ver timeline.ts para el timing exacto y la limitación de assets (sin
// foto real de Emma: no llegó ningún archivo de imagen).
export const EmmaEdit: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bgNear }}>
    <SpeakerReel
      source={SOURCE_VIDEO}
      segments={SPEECH_SEGMENTS}
      cameraKeyframes={CAMERA_KEYFRAMES}
      fps={FPS}
    />
    <HookBlackout />
    <HookEmmaBadge />
    <Freelancer500Card />
    <HeroTransform />
    <P2PRevealFlash />
    <MechanismCycle />
    <TresSistemas />
    <FueLoUnicoTags />
    <ReminderStack />
    <CtaSubtitle />
    <CTACard from={CTA_FINAL.from + 1.9} to={TOTAL_DURATION} />
    <Captions captions={CAPTIONS} accentStingers={ACCENT_STINGERS} />
    <Flashes whiteFlashes={WHITE_FLASHES} violetFlashes={VIOLET_FLASHES} />
    <SfxTrack cues={SFX_CUES} />
  </AbsoluteFill>
);
