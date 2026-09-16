import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { HERO_30_V2 } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const AscendingLine: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg
    width="440"
    height="140"
    viewBox="0 0 440 140"
    style={{ position: "absolute", bottom: "14%", opacity: opacity * 0.85 }}
  >
    <polyline
      points="10,130 110,100 210,108 310,50 430,10"
      fill="none"
      stroke="url(#feliHero2Grad)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 10px ${COLORS.electricBlue}aa)` }}
    />
    <defs>
      <linearGradient id="feliHero2Grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={COLORS.magenta} />
        <stop offset="100%" stopColor={COLORS.electricBlue} />
      </linearGradient>
    </defs>
  </svg>
);

// Segundo HERO MOMENT: 8% chico/blanco -> 30% enorme con gradiente P2P,
// dominando ~40-50% de la altura útil.
export const HeroPercent2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - HERO_30_V2.from;

  const arrowOpacity = interpolate(localT, [0.2, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heroProgress = interpolate(localT, [0.4, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heroBlur = interpolate(heroProgress, [0, 1], [16, 0]);
  const heroScale = interpolate(heroProgress, [0, 1], [0.8, 1]);
  const subOpacity = interpolate(localT, [1.0, 1.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={HERO_30_V2.from} to={HERO_30_V2.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <AscendingLine opacity={subOpacity} />
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 36,
            color: COLORS.white,
          }}
        >
          8%
        </div>
        <svg width="20" height="46" style={{ opacity: arrowOpacity, margin: "6px 0" }}>
          <line x1="10" y1="0" x2="10" y2="34" stroke={COLORS.electricBlue} strokeWidth="4" strokeLinecap="round" />
          <polyline points="3,26 10,38 17,26" fill="none" stroke={COLORS.electricBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 220,
            lineHeight: 1,
            filter: `blur(${heroBlur}px)`,
            transform: `scale(${heroScale})`,
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
          }}
        >
          30%
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 800,
            fontSize: 26,
            color: COLORS.white,
            letterSpacing: 2,
            marginTop: 14,
            textAlign: "center",
          }}
        >
          EN CUESTIÓN
          <br />
          DE DÍAS
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
