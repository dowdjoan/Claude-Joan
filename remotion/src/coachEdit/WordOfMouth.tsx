import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { WORD_OF_MOUTH } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "./theme";
import { RevealBox } from "./RevealBox";

const PersonIcon: React.FC<{ visible: boolean }> = ({ visible }) => (
  <svg
    width="46"
    height="46"
    viewBox="0 0 46 46"
    style={{
      opacity: visible ? 1 : 0,
      transform: `scale(${visible ? 1 : 0.6})`,
    }}
  >
    <circle cx="23" cy="14" r="9" stroke={COLORS.white} strokeWidth="3" fill="none" />
    <path
      d="M6 42c0-10 8-16 17-16s17 6 17 16"
      stroke={COLORS.white}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const Arrow: React.FC<{ visible: boolean }> = ({ visible }) => (
  <svg width="34" height="16" style={{ opacity: visible ? 1 : 0 }}>
    <line x1="0" y1="8" x2="26" y2="8" stroke={COLORS.violet} strokeWidth="3" />
    <polyline points="20,2 28,8 20,14" fill="none" stroke={COLORS.violet} strokeWidth="3" />
  </svg>
);

export const WordOfMouth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - WORD_OF_MOUTH.from;

  const xOpacity = interpolate(localT, [1.3, 1.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const xScale = interpolate(localT, [1.3, 1.6], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(localT, [1.7, 1.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={WORD_OF_MOUTH.from} to={WORD_OF_MOUTH.to}>
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "13%",
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
          <PersonIcon visible={localT >= 0.2} />
          <Arrow visible={localT >= 0.45} />
          <PersonIcon visible={localT >= 0.6} />
          <Arrow visible={localT >= 0.85} />
          <PersonIcon visible={localT >= 1.0} />
          <div
            style={{
              position: "absolute",
              inset: -10,
              opacity: xOpacity,
              transform: `scale(${xScale})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="180" height="80" viewBox="0 0 180 80">
              <line x1="10" y1="10" x2="170" y2="70" stroke={COLORS.magenta} strokeWidth="7" strokeLinecap="round" />
              <line x1="170" y1="10" x2="10" y2="70" stroke={COLORS.magenta} strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div style={{ marginTop: 34, textAlign: "center", opacity: labelOpacity }}>
          <div
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 52,
              ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
            }}
          >
            BOCA A BOCA
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY_UI,
              fontWeight: 700,
              fontSize: 26,
              color: COLORS.white,
              letterSpacing: 2,
              marginTop: 6,
            }}
          >
            NO ES UN SISTEMA
          </div>
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
