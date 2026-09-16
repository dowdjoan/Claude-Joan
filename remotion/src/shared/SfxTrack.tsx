import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";

export type SfxCue = {
  at: number;
  sfx: "click" | "click_soft" | "impact" | "whoosh" | "riser";
  volume?: number;
};

const FILES: Record<SfxCue["sfx"], string> = {
  click: "sfx/click.wav",
  click_soft: "sfx/click_soft.wav",
  impact: "sfx/impact.wav",
  whoosh: "sfx/whoosh.wav",
  riser: "sfx/riser.wav",
};

// Un <Audio> corto por cada cue. El volumen siempre queda por debajo de la
// voz (ver volumes al armar `cues`) — la voz del clip original no se toca.
export const SfxTrack: React.FC<{ cues: SfxCue[] }> = ({ cues }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {cues.map((cue, i) => (
        <Sequence key={i} from={Math.round(cue.at * fps)} durationInFrames={20}>
          <Audio src={staticFile(FILES[cue.sfx])} volume={() => cue.volume ?? 0.4} />
        </Sequence>
      ))}
    </>
  );
};
