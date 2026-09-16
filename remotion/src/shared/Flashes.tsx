import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./theme";

const FLASH_DURATION = 0.12; // "muy breve"

const flashOpacity = (t: number, at: number) => {
  const local = t - at;
  if (local < 0 || local > FLASH_DURATION) return 0;
  const progress = local / FLASH_DURATION;
  return progress < 0.35
    ? interpolate(progress, [0, 0.35], [0, 1])
    : interpolate(progress, [0.35, 1], [1, 0]);
};

export const Flashes: React.FC<{
  whiteFlashes?: number[];
  violetFlashes?: number[];
}> = ({ whiteFlashes = [], violetFlashes = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const whiteOpacity = Math.max(...whiteFlashes.map((at) => flashOpacity(t, at)), 0);
  const violetOpacity = Math.max(...violetFlashes.map((at) => flashOpacity(t, at)), 0);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {violetOpacity > 0 ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 45%, ${COLORS.violet}55 0%, transparent 70%)`,
            opacity: violetOpacity,
          }}
        />
      ) : null}
      {whiteOpacity > 0 ? (
        <AbsoluteFill
          style={{ backgroundColor: COLORS.white, opacity: whiteOpacity }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
