import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ANTES_PORCENTAJE } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE, FONT_FAMILY_UI } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

// "ANTES": 8%-12%, blanco/gris (punto de partida), sin nada espectacular
// todavía. Barra horizontal corta debajo.
export const PercentBeforeCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - ANTES_PORCENTAJE.from;
  const barWidth = interpolate(localT, [0.15, 0.6], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={ANTES_PORCENTAJE.from} to={ANTES_PORCENTAJE.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 108,
            lineHeight: 1,
            color: COLORS.white,
            letterSpacing: -2,
          }}
        >
          8% – 12%
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 26,
            color: "#9599b3",
            letterSpacing: 3,
            marginTop: 14,
          }}
        >
          POR CIERRE
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 16,
            color: "#66697d",
            letterSpacing: 4,
            marginTop: 4,
          }}
        >
          CLOSER
        </div>
        <div
          style={{
            width: barWidth,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#3a3d4d",
            marginTop: 26,
          }}
        />
      </AbsoluteFill>
    </RevealBox>
  );
};
