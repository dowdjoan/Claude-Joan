import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { OCEANO_AZUL_MOTION } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE } from "../shared/theme";

// 25 puntos violetas apretados en el 60% izquierdo ("mercado saturado")
const DOTS = Array.from({ length: 25 }, (_, i) => {
  const cols = 5;
  const row = Math.floor(i / cols);
  const col = i % cols;
  const jitterX = ((i * 37) % 10) - 5;
  const jitterY = ((i * 53) % 10) - 5;
  return {
    x: 6 + col * 8 + jitterX * 0.25,
    y: 26 + row * 9 + jitterY * 0.25,
  };
});

export const OceanoAzulConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < OCEANO_AZUL_MOTION.from || t >= OCEANO_AZUL_MOTION.to) return null;
  const localT = t - OCEANO_AZUL_MOTION.from;
  const duration = OCEANO_AZUL_MOTION.to - OCEANO_AZUL_MOTION.from;

  const dotsOpacity = interpolate(localT, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const travelProgress = interpolate(localT, [0.4, duration - 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const travelX = interpolate(travelProgress, [0, 1], [42, 74]); // % of width
  const travelY = interpolate(travelProgress, [0, 1], [55, 34]);

  const textOpacity = interpolate(localT, [duration - 0.55, duration - 0.25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050509" }}>
      {/* zona derecha con luz azul eléctrica */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 82% 50%, ${COLORS.electricBlue}33 0%, transparent 55%)`,
        }}
      />
      {/* 60% izquierdo: puntos saturados */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, opacity: dotsOpacity }}
      >
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r="1.6"
            fill={COLORS.violet}
            style={{ filter: `drop-shadow(0 0 2px ${COLORS.violet}aa)` }}
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: "6%",
          top: "18%",
          opacity: dotsOpacity,
          fontFamily: FONT_FAMILY_HEADLINE,
          fontWeight: 900,
          fontSize: 26,
          color: COLORS.white,
          letterSpacing: 1,
        }}
      >
        MERCADO
        <br />
        SATURADO
      </div>

      {/* punto viajero con estela */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <line
          x1={`${30}%`}
          y1={`${35}%`}
          x2={`${travelX}%`}
          y2={`${travelY}%`}
          stroke={COLORS.electricBlue}
          strokeWidth="3"
          strokeLinecap="round"
          opacity={travelProgress > 0 ? 0.8 : 0}
          style={{ filter: `drop-shadow(0 0 8px ${COLORS.electricBlue}cc)` }}
        />
        <circle
          cx={`${travelX}%`}
          cy={`${travelY}%`}
          r="7"
          fill={COLORS.white}
          opacity={dotsOpacity}
          style={{ filter: `drop-shadow(0 0 14px ${COLORS.electricBlue})` }}
        />
      </svg>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-end", paddingRight: "6%" }}>
        <div
          style={{
            opacity: textOpacity,
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 68,
            textAlign: "right",
            lineHeight: 1.05,
          }}
        >
          <span style={{ color: COLORS.white }}>OCÉANO</span>
          <br />
          <span
            style={{
              color: COLORS.electricBlue,
              filter: `drop-shadow(0 0 22px ${COLORS.electricBlue}aa)`,
            }}
          >
            AZUL
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
