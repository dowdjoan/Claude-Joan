import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const ENTER_S = 0.28;
const EXIT_S = 0.22;

// Transición de entrada (blur + scale + glow) y salida (fade + blur) para
// cualquier motion graphic / placa. Nunca aparecen ni desaparecen de golpe.
export const RevealBox: React.FC<{
  from: number;
  to: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ from, to, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const localT = t - from;
  const timeToEnd = to - t;

  const enter = Math.min(Math.max(localT / ENTER_S, 0), 1);
  const exit = Math.min(Math.max(timeToEnd / EXIT_S, 0), 1);
  const progress = Math.min(enter, exit);

  const blurPx = interpolate(progress, [0, 1], [16, 0]);
  const scale = interpolate(progress, [0, 1], [0.86, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        filter: `blur(${blurPx}px)`,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
