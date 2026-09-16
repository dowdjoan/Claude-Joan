import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { HERO_TRANSFORM } from "./timeline";
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
    style={{ position: "absolute", bottom: "18%", opacity: opacity * 0.85 }}
  >
    <polyline
      points="10,130 110,100 210,108 310,50 430,10"
      fill="none"
      stroke="url(#emmaHeroGrad)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 10px ${COLORS.electricBlue}aa)` }}
    />
    <defs>
      <linearGradient id="emmaHeroGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={COLORS.magenta} />
        <stop offset="100%" stopColor={COLORS.electricBlue} />
      </linearGradient>
    </defs>
  </svg>
);

const Arrow: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width="20" height="34" style={{ opacity, margin: "4px 0" }}>
    <line x1="10" y1="0" x2="10" y2="24" stroke={COLORS.electricBlue} strokeWidth="3.5" strokeLinecap="round" />
    <polyline points="4,18 10,26 16,18" fill="none" stroke={COLORS.electricBlue} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Composición vertical de 3 etapas (community manager -> freelancer $500
// -> agencia IA +$9.000/mes), con zoom sobre la tercera etapa hasta que
// domina la pantalla (crossfade a una versión "final" limpia en vez de un
// transform-origin complejo, más robusto).
export const HeroTransform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - HERO_TRANSFORM.from;

  const s1Opacity = interpolate(localT, [0.1, 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const a1Opacity = interpolate(localT, [0.45, 0.65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s2Opacity = interpolate(localT, [0.7, 1.0], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const a2Opacity = interpolate(localT, [1.05, 1.25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s3Progress = interpolate(localT, [1.3, 1.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s3Blur = interpolate(s3Progress, [0, 1], [14, 0]);
  const s3Scale = interpolate(s3Progress, [0, 1], [0.85, 1]);

  // Crossfade hacia la versión "final" (zoom simulado)
  const stackOpacity = interpolate(localT, [3.6, 4.2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stackScale = interpolate(localT, [2.8, 4.2], [1, 1.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const finalOpacity = interpolate(localT, [3.7, 4.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const finalLineOpacity = interpolate(localT, [4.3, 4.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <RevealBox from={HERO_TRANSFORM.from} to={HERO_TRANSFORM.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509" }}>
        <AbsoluteFill
          style={{
            opacity: stackOpacity,
            transform: `scale(${stackScale})`,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                opacity: s1Opacity,
                fontFamily: FONT_FAMILY_HEADLINE,
                fontWeight: 800,
                fontSize: 30,
                color: "#c4c7db",
                letterSpacing: 1,
              }}
            >
              COMMUNITY MANAGER
            </div>
            <Arrow opacity={a1Opacity} />
            <div
              style={{
                opacity: s2Opacity,
                textAlign: "center",
                fontFamily: FONT_FAMILY_HEADLINE,
                fontWeight: 900,
                color: COLORS.violet,
                letterSpacing: 1,
              }}
            >
              <div style={{ fontSize: 34 }}>FREELANCER</div>
              <div style={{ fontSize: 46, marginTop: 2 }}>$500</div>
            </div>
            <Arrow opacity={a2Opacity} />
            <div
              style={{
                filter: `blur(${s3Blur}px)`,
                transform: `scale(${s3Scale})`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY_HEADLINE,
                  fontWeight: 900,
                  fontSize: 34,
                  color: COLORS.white,
                  letterSpacing: 1,
                }}
              >
                AGENCIA IA
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY_HEADLINE,
                  fontWeight: 900,
                  fontSize: 92,
                  lineHeight: 1,
                  marginTop: 6,
                  ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
                  filter: `drop-shadow(0 0 26px ${COLORS.violet}88)`,
                }}
              >
                +$9.000/MES
              </div>
            </div>
          </div>
        </AbsoluteFill>

        <AbsoluteFill style={{ opacity: finalOpacity, justifyContent: "center", alignItems: "center" }}>
          <AscendingLine opacity={finalLineOpacity} />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: FONT_FAMILY_UI,
                fontWeight: 700,
                fontSize: 30,
                color: COLORS.white,
                letterSpacing: 2,
                marginBottom: 6,
              }}
            >
              AGENCIA IA
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY_HEADLINE,
                fontWeight: 900,
                fontSize: 150,
                lineHeight: 1,
                ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
                filter: `drop-shadow(0 0 34px ${COLORS.violet}99)`,
              }}
            >
              +$9.000
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY_HEADLINE,
                fontWeight: 900,
                fontSize: 46,
                color: COLORS.white,
                marginTop: 4,
                letterSpacing: 2,
              }}
            >
              AL MES
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </RevealBox>
  );
};
