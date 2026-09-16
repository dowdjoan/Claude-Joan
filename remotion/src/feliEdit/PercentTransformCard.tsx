import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { DESPUES_30 } from "./timeline";
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
    width="420"
    height="130"
    viewBox="0 0 420 130"
    style={{ position: "absolute", bottom: "20%", opacity: opacity * 0.8 }}
  >
    <polyline
      points="10,120 100,95 190,100 290,45 410,10"
      fill="none"
      stroke="url(#feliLineGrad)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 10px ${COLORS.electricBlue}aa)` }}
    />
    <defs>
      <linearGradient id="feliLineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={COLORS.magenta} />
        <stop offset="100%" stopColor={COLORS.electricBlue} />
      </linearGradient>
    </defs>
  </svg>
);

// "DESPUÉS": la composición del "antes" se achica y desplaza a la
// izquierda, aparece flecha luminosa y +30% ENORME con gradiente P2P.
export const PercentTransformCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - DESPUES_30.from;

  const arrowOpacity = interpolate(localT, [0.15, 0.45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heroProgress = interpolate(localT, [0.35, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heroBlur = interpolate(heroProgress, [0, 1], [14, 0]);
  const heroScale = interpolate(heroProgress, [0, 1], [0.82, 1]);
  const diasOpacity = interpolate(localT, [1.0, 1.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={DESPUES_30.from} to={DESPUES_30.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <AscendingLine opacity={diasOpacity} />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 42,
              color: "#7c7f96",
              letterSpacing: -1,
            }}
          >
            8–12%
          </div>
          <svg width="46" height="20" style={{ opacity: arrowOpacity }}>
            <line x1="0" y1="10" x2="34" y2="10" stroke={COLORS.electricBlue} strokeWidth="4" strokeLinecap="round" />
            <polyline points="26,3 38,10 26,17" fill="none" stroke={COLORS.electricBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 132,
              lineHeight: 1,
              filter: `blur(${heroBlur}px)`,
              transform: `scale(${heroScale})`,
              ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
              letterSpacing: -3,
            }}
          >
            +30%
          </div>
        </div>
        <div
          style={{
            opacity: diasOpacity,
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 800,
            fontSize: 30,
            color: COLORS.white,
            letterSpacing: 3,
            marginTop: 18,
          }}
        >
          EN 4 DÍAS
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
