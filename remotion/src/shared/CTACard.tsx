import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const ArrowDown: React.FC<{ bounce: number }> = ({ bounce }) => (
  <svg
    width="46"
    height="60"
    viewBox="0 0 46 60"
    style={{ transform: `translateY(${bounce}px)` }}
  >
    <line x1="23" y1="0" x2="23" y2="42" stroke={COLORS.electricBlue} strokeWidth="5" strokeLinecap="round" />
    <polyline
      points="6,32 23,50 40,32"
      fill="none"
      stroke={COLORS.electricBlue}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CTACard: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - from;

  const bounce = interpolate(
    localT % 0.9,
    [0, 0.45, 0.9],
    [0, 10, 0],
  );

  return (
    <RevealBox from={from} to={to}>
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "16%",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 190,
            lineHeight: 1,
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
            filter: `drop-shadow(0 0 40px ${COLORS.magenta}99) drop-shadow(0 0 70px ${COLORS.electricBlue}66)`,
          }}
        >
          P2P
        </div>
        <ArrowDown bounce={bounce} />
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 800,
            fontSize: 34,
            color: COLORS.white,
            letterSpacing: 3,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          RESPONDÉ &ldquo;P2P&rdquo;
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
