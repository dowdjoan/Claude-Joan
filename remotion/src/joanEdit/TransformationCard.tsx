import React from "react";
import { AbsoluteFill } from "remotion";
import { TRANSFORMATION_CARD } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const Side: React.FC<{
  label: string;
  role: string;
  amount: string;
  dim?: boolean;
}> = ({ label, role, amount, dim }) => (
  <div style={{ textAlign: "center", opacity: dim ? 0.55 : 1 }}>
    <div
      style={{
        fontFamily: FONT_FAMILY_UI,
        fontWeight: 700,
        fontSize: 26,
        color: COLORS.white,
        letterSpacing: 4,
        marginBottom: 10,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: FONT_FAMILY_UI,
        fontWeight: 600,
        fontSize: 20,
        color: "#b9bccf",
        border: `1px solid ${dim ? "#555" : COLORS.electricBlue}66`,
        borderRadius: 999,
        padding: "6px 18px",
        display: "inline-block",
        marginBottom: 14,
      }}
    >
      {role}
    </div>
    <div
      style={{
        fontFamily: FONT_FAMILY_HEADLINE,
        fontWeight: 900,
        fontSize: dim ? 46 : 62,
        lineHeight: 1,
        ...(dim
          ? { color: "#8a8ea3" }
          : gradientText(GRADIENT_MAGENTA_VIOLET_BLUE)),
        filter: dim ? "none" : `drop-shadow(0 0 20px ${COLORS.violet}88)`,
      }}
    >
      {amount}
    </div>
    <div
      style={{
        fontFamily: FONT_FAMILY_UI,
        fontWeight: 700,
        fontSize: 20,
        color: dim ? "#8a8ea3" : COLORS.white,
        marginTop: 4,
      }}
    >
      AL MES
    </div>
  </div>
);

export const TransformationCard: React.FC = () => (
  <RevealBox from={TRANSFORMATION_CARD.from} to={TRANSFORMATION_CARD.to}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, ${COLORS.bgPetrol} 0%, ${COLORS.bgNear} 75%)`,
        justifyContent: "center",
        alignItems: "center",
        gap: 26,
      }}
    >
      <Side label="JOAN ANTES" role="PROGRAMADOR" amount="$600-800" dim />
      <svg width="40" height="40" viewBox="0 0 40 40">
        <polyline
          points="6,20 34,20"
          stroke={COLORS.electricBlue}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <polyline
          points="24,8 34,20 24,32"
          fill="none"
          stroke={COLORS.electricBlue}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Side label="JOAN HOY" role="AGENCIA" amount="$20.000" />
    </AbsoluteFill>
  </RevealBox>
);
