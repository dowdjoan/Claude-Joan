import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { QUESTION_CARD } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const InfoBox: React.FC<{ label: string; lines: string[]; visible: boolean }> = ({
  label,
  lines,
  visible,
}) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      transform: `translateY(${visible ? 0 : 16}px)`,
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${COLORS.violet}44`,
      borderRadius: 16,
      padding: "16px 20px",
      minWidth: 180,
      textAlign: "left",
    }}
  >
    <div
      style={{
        fontFamily: FONT_FAMILY_UI,
        fontWeight: 700,
        fontSize: 16,
        color: "#9599b3",
        letterSpacing: 1,
        marginBottom: 6,
      }}
    >
      {label}
    </div>
    {lines.map((l, i) => (
      <div
        key={i}
        style={{
          fontFamily: FONT_FAMILY_HEADLINE,
          fontWeight: 900,
          fontSize: 22,
          color: COLORS.white,
          lineHeight: 1.25,
        }}
      >
        {l}
      </div>
    ))}
  </div>
);

export const QuestionCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - QUESTION_CARD.from;
  const duration = QUESTION_CARD.to - QUESTION_CARD.from;
  const pillOpacity = interpolate(localT, [duration - 1.4, duration - 1.0], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={QUESTION_CARD.from} to={QUESTION_CARD.to}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 32%, ${COLORS.bgPetrol} 0%, ${COLORS.bgNear} 75%)`,
          justifyContent: "center",
          alignItems: "center",
          padding: "0 8%",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 58,
            lineHeight: 1.1,
            textAlign: "center",
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
            filter: `drop-shadow(0 0 26px ${COLORS.magenta}77)`,
            marginBottom: 30,
          }}
        >
          ¿CÓMO MIERDA
          <br />
          HIZO JOAN?
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <InfoBox
            label="DE"
            lines={["$600-800/MES", "COMO PROGRAMADOR"]}
            visible={localT >= 0.6}
          />
          <svg width="28" height="20" style={{ opacity: localT >= 0.9 ? 1 : 0 }}>
            <polyline points="2,10 26,10" stroke={COLORS.electricBlue} strokeWidth="3" />
            <polyline points="18,2 26,10 18,18" fill="none" stroke={COLORS.electricBlue} strokeWidth="3" />
          </svg>
          <InfoBox
            label="A"
            lines={["$20.000/MES", "CON UNA AGENCIA"]}
            visible={localT >= 1.1}
          />
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 800,
            fontSize: 24,
            color: COLORS.white,
            background: "rgba(139,92,246,0.15)",
            border: `1px solid ${COLORS.violet}88`,
            borderRadius: 999,
            padding: "10px 26px",
            opacity: pillOpacity,
          }}
        >
          Y ESCALAR EN MENOS DE UN AÑO?
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
