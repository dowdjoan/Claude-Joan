import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { NO_BUSCO_CLIENTES } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

// Lupa/search icon atravesada por una línea magenta ("no tuvo que buscar
// clientes"). Nada de gente prospectando.
const SearchCrossed: React.FC<{ crossProgress: number }> = ({ crossProgress }) => (
  <svg width="70" height="70" viewBox="0 0 70 70">
    <circle cx="30" cy="30" r="18" fill="none" stroke="#8b8ea3" strokeWidth="4" />
    <line x1="43" y1="43" x2="58" y2="58" stroke="#8b8ea3" strokeWidth="4" strokeLinecap="round" />
    <line
      x1="6"
      y1="6"
      x2={6 + 58 * crossProgress}
      y2={6 + 58 * crossProgress}
      stroke={COLORS.magenta}
      strokeWidth="5"
      strokeLinecap="round"
      style={{ filter: `drop-shadow(0 0 8px ${COLORS.magenta}aa)` }}
    />
  </svg>
);

export const NoClientsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - NO_BUSCO_CLIENTES.from;

  const crossProgress = interpolate(localT, [0.55, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bottomOpacity = interpolate(localT, [1.3, 1.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={NO_BUSCO_CLIENTES.from} to={NO_BUSCO_CLIENTES.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 46,
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          NO TUVO QUE
          <br />
          BUSCAR CLIENTES
        </div>
        <SearchCrossed crossProgress={crossProgress} />
        <div
          style={{
            opacity: bottomOpacity,
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 34,
            color: "#9599b3",
            textAlign: "center",
            lineHeight: 1.15,
            marginTop: 26,
          }}
        >
          YA ESTABA
          <br />
          DENTRO DEL NEGOCIO
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
