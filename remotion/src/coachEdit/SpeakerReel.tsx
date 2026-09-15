import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FPS, SOURCE_VIDEO, SPEECH_SEGMENTS } from "./timeline";
import { getCameraTransform } from "./camera";

// El speaker "protagonista": concatena los tramos de habla (jump cuts, sin
// pausas) de un único archivo fuente, con un punch-in/reencuadre continuo
// manejado por camera.ts que no se corta en los saltos de plano.
export const SpeakerReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeSec = frame / fps;
  const { scale, shiftX } = getCameraTransform(timeSec);

  let cursor = 0;
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale / 100}) translateX(${shiftX}%)`,
        transformOrigin: "50% 45%",
      }}
    >
      {SPEECH_SEGMENTS.map((seg, i) => {
        const durationInFrames = Math.round(
          (seg.sourceEnd - seg.sourceStart) * FPS,
        );
        const from = cursor;
        cursor += durationInFrames;
        return (
          <Sequence key={i} from={from} durationInFrames={durationInFrames}>
            <OffthreadVideo
              src={staticFile(SOURCE_VIDEO)}
              startFrom={Math.round(seg.sourceStart * FPS)}
              muted={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
