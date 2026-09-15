import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { SFX_CUES, sec } from "./timeline";

const FILES: Record<string, string> = {
  click: "sfx/click.wav",
  click_soft: "sfx/click_soft.wav",
  impact: "sfx/impact.wav",
  whoosh: "sfx/whoosh.wav",
  riser: "sfx/riser.wav",
};

// Un <Audio> corto por cada cue. El volumen siempre queda por debajo de la
// voz (ver volumes en timeline.ts) — la voz del clip original no se toca.
export const SfxTrack: React.FC = () => (
  <>
    {SFX_CUES.map((cue, i) => (
      <Sequence key={i} from={sec(cue.at)} durationInFrames={20}>
        <Audio src={staticFile(FILES[cue.sfx])} volume={() => cue.volume ?? 0.4} />
      </Sequence>
    ))}
  </>
);
