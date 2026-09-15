import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { STAT_BADGES } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_UI,
  GRADIENT_VIOLET_BLUE,
} from "../shared/theme";

const ENTER_S = 0.2;

export const StatBadges: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const active = STAT_BADGES.find((b) => t >= b.from && t < b.to);
  if (!active) return null;

  const localT = t - active.from;
  const opacity = interpolate(localT, [0, ENTER_S], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slide = interpolate(localT, [0, ENTER_S], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: "8%" }}>
      <div
        style={{
          opacity,
          transform: `translateY(${slide}px)`,
          background: GRADIENT_VIOLET_BLUE,
          borderRadius: 999,
          padding: "10px 22px",
          boxShadow: `0 0 24px ${COLORS.violet}66`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 800,
            fontSize: 22,
            color: COLORS.white,
            letterSpacing: 1,
          }}
        >
          {active.text}
        </span>
      </div>
    </AbsoluteFill>
  );
};
