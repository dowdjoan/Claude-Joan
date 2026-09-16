import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Placa } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
  glow,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const CardBg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 50% 38%, ${COLORS.bgPetrol} 0%, ${COLORS.bgNear} 75%)`,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </AbsoluteFill>
);

// Línea ascendente minimalista (referencia visual, no un gráfico corporativo)
const AscendingLine: React.FC = () => (
  <svg
    width="480"
    height="160"
    viewBox="0 0 480 160"
    style={{ position: "absolute", bottom: "14%", opacity: 0.85 }}
  >
    <polyline
      points="10,150 120,110 220,120 320,55 470,12"
      fill="none"
      stroke="url(#lineGrad)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 10px ${COLORS.electricBlue}aa)` }}
    />
    <defs>
      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={COLORS.violet} />
        <stop offset="100%" stopColor={COLORS.electricBlue} />
      </linearGradient>
    </defs>
  </svg>
);

const MoneyCard: React.FC = () => (
  <CardBg>
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: FONT_FAMILY_UI,
          fontWeight: 700,
          fontSize: 40,
          color: COLORS.white,
          letterSpacing: 6,
          marginBottom: 8,
        }}
      >
        MÁS DE
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY_HEADLINE,
          fontWeight: 900,
          fontSize: 168,
          lineHeight: 1,
          ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
          filter: `drop-shadow(0 0 30px ${COLORS.violet}88)`,
        }}
      >
        $4.500+
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY_HEADLINE,
          fontWeight: 900,
          fontSize: 64,
          color: COLORS.white,
          marginTop: 4,
          letterSpacing: 2,
        }}
      >
        AL MES
      </div>
    </div>
    <AscendingLine />
  </CardBg>
);

const EscalarCard: React.FC<{ localT: number; duration: number }> = ({
  localT,
  duration,
}) => {
  const growth = interpolate(localT, [0, duration], [1, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <CardBg>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.white,
            letterSpacing: 3,
            marginBottom: 4,
          }}
        >
          ¿NO SABÉS CÓMO
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 148,
            lineHeight: 1,
            transform: `scale(${growth})`,
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
            filter: `drop-shadow(0 0 34px ${COLORS.electricBlue}99)`,
          }}
        >
          ESCALAR
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 56,
            color: COLORS.white,
            marginTop: 10,
          }}
        >
          TU NEGOCIO?
        </div>
      </div>
    </CardBg>
  );
};

export const ImpactCard: React.FC<{ placa: Placa }> = ({ placa }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - placa.from;
  const duration = placa.to - placa.from;

  return (
    <RevealBox from={placa.from} to={placa.to}>
      {placa.kind === "money" ? (
        <MoneyCard />
      ) : (
        <EscalarCard localT={localT} duration={duration} />
      )}
    </RevealBox>
  );
};

export const glowText = glow; // re-export para otros componentes
