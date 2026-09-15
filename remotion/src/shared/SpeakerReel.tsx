import React, { useMemo } from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraKeyframe, makeCameraTransformGetter } from "./camera";

export type SpeechSegment = { sourceStart: number; sourceEnd: number };

// El speaker "protagonista": concatena los tramos de habla (jump cuts, sin
// pausas) de un único archivo fuente, con un punch-in/reencuadre continuo
// que no se corta en los saltos de plano.
export const SpeakerReel: React.FC<{
  source: string;
  segments: SpeechSegment[];
  cameraKeyframes: CameraKeyframe[];
  fps: number;
}> = ({ source, segments, cameraKeyframes, fps }) => {
  const frame = useCurrentFrame();
  const { fps: compFps } = useVideoConfig();
  const timeSec = frame / compFps;
  const getCameraTransform = useMemo(
    () => makeCameraTransformGetter(cameraKeyframes),
    [cameraKeyframes],
  );
  const { scale, shiftX } = getCameraTransform(timeSec);

  let cursor = 0;
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale / 100}) translateX(${shiftX}%)`,
        transformOrigin: "50% 45%",
      }}
    >
      {segments.map((seg, i) => {
        const durationInFrames = Math.round(
          (seg.sourceEnd - seg.sourceStart) * fps,
        );
        const from = cursor;
        cursor += durationInFrames;
        return (
          <Sequence key={i} from={from} durationInFrames={durationInFrames}>
            <OffthreadVideo
              src={staticFile(source)}
              startFrom={Math.round(seg.sourceStart * fps)}
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
