import React from "react";
import { AbsoluteFill } from "remotion";
import { HERO_RESULT } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const AscendingLine: React.FC = () => (
  <svg
    width="480"
    height="160"
    viewBox="0 0 480 160"
    style={{ position: "absolute", bottom: "16%", opacity: 0.85 }}
  >
    <polyline
      points="10,150 120,110 220,120 320,55 470,12"
      fill="none"
      stroke="url(#heroLineGrad)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 10px ${COLORS.electricBlue}aa)` }}
    />
    <defs>
      <linearGradient id="heroLineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={COLORS.magenta} />
        <stop offset="100%" stopColor={COLORS.electricBlue} />
      </linearGradient>
    </defs>
  </svg>
);

export const HeroResultCard: React.FC = () => (
  <RevealBox from={HERO_RESULT.from} to={HERO_RESULT.to}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 38%, ${COLORS.bgPetrol} 0%, #050509 75%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 158,
            lineHeight: 1,
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
            filter: `drop-shadow(0 0 32px ${COLORS.violet}88)`,
          }}
        >
          +$7.000
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 34,
            color: COLORS.white,
            marginTop: 10,
            letterSpacing: 1,
          }}
        >
          EN MENOS DE
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 56,
            color: COLORS.white,
            marginTop: 4,
          }}
        >
          30 DÍAS
        </div>
      </div>
      <AscendingLine />
    </AbsoluteFill>
  </RevealBox>
);
