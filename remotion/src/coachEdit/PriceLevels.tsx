import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PRICE_LEVELS } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_VIOLET_BLUE,
  gradientText,
} from "./theme";
import { RevealBox } from "./RevealBox";

const LEVELS = [
  { at: 0.27, label: "$", size: 56 },
  { at: 0.92, label: "$$", size: 78 },
  { at: 1.59, label: "$$$", size: 104 },
];

const Level: React.FC<{ label: string; size: number; visible: boolean }> = ({
  label,
  size,
  visible,
}) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      transform: `translateY(${visible ? 0 : 24}px) scale(${visible ? 1 : 0.8})`,
      fontFamily: FONT_FAMILY_HEADLINE,
      fontWeight: 900,
      fontSize: size,
      ...gradientText(GRADIENT_VIOLET_BLUE),
      filter: `drop-shadow(0 0 16px ${COLORS.electricBlue}66)`,
    }}
  >
    {label}
  </div>
);

export const PriceLevels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - PRICE_LEVELS.from;
  const duration = PRICE_LEVELS.to - PRICE_LEVELS.from;
  const labelOpacity = interpolate(localT, [duration - 0.5, duration - 0.15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={PRICE_LEVELS.from} to={PRICE_LEVELS.to}>
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "14%",
        }}
      >
        <div style={{ display: "flex", gap: 28, alignItems: "flex-end", marginBottom: 20 }}>
          {LEVELS.map((l) => (
            <Level key={l.label} label={l.label} size={l.size} visible={localT >= l.at} />
          ))}
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 800,
            fontSize: 34,
            color: COLORS.white,
            letterSpacing: 2,
            opacity: labelOpacity,
          }}
        >
          COBRÁ MÁS CARO
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
