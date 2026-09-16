import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PERFUMES_GRAPHIC } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";

// Botella de perfume genérica, sin marca, silueta distinta por índice,
// iluminación lateral violeta/azul via gradiente + glow.
const Bottle: React.FC<{ shape: 0 | 1 | 2 | 3; visible: boolean }> = ({
  shape,
  visible,
}) => {
  const shapes = [
    // clásica cuadrada
    <path
      key="s0"
      d="M20 8h14v10h4a4 4 0 0 1 4 4v46a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4h4V8z"
    />,
    // redondeada alta
    <path
      key="s1"
      d="M22 6h12v9c6 2 10 8 10 15v34a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V30c0-7 4-13 10-15V6z"
    />,
    // cónica
    <path key="s2" d="M24 6h8v8l12 50a6 6 0 0 1-6 8H18a6 6 0 0 1-6-8l12-50V6z" />,
    // achatada ancha
    <path
      key="s3"
      d="M18 10h20v8a6 6 0 0 1 6 6v40a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6v-8z"
    />,
  ];

  return (
    <svg
      width="116"
      height="138"
      viewBox="0 0 68 82"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 18}px) scale(${visible ? 1 : 0.85})`,
      }}
    >
      <defs>
        <linearGradient id={`bottleGrad${shape}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.violet} stopOpacity="0.85" />
          <stop offset="100%" stopColor={COLORS.electricBlue} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <g
        fill={`url(#bottleGrad${shape})`}
        stroke={COLORS.white}
        strokeOpacity="0.25"
        strokeWidth="1"
        style={{ filter: `drop-shadow(0 0 10px ${COLORS.violet}88)` }}
      >
        {shapes[shape]}
      </g>
    </svg>
  );
};

export const PerfumesGraphic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < PERFUMES_GRAPHIC.from || t >= PERFUMES_GRAPHIC.to) return null;
  const localT = t - PERFUMES_GRAPHIC.from;

  const numberProgress = interpolate(localT, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const numberBlur = interpolate(numberProgress, [0, 1], [12, 0]);
  const numberScale = interpolate(numberProgress, [0, 1], [0.88, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#050509" }}>
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: "20%" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 52,
            color: COLORS.white,
          }}
        >
          EMPEZÓ CON
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 240,
            lineHeight: 1,
            filter: `blur(${numberBlur}px)`,
            transform: `scale(${numberScale})`,
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
          }}
        >
          4
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 44,
            color: COLORS.white,
            letterSpacing: 2,
            marginTop: -8,
          }}
        >
          PERFUMES
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: "20%" }}>
        <div style={{ display: "flex", gap: 30 }}>
          {[0, 1, 2, 3].map((i) => (
            <Bottle key={i} shape={i as 0 | 1 | 2 | 3} visible={localT >= i * 0.1} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
