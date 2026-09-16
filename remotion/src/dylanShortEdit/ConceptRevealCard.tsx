import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CONCEPT_REVEAL } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const LockIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: 6 }}>
    <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="#66697d" strokeWidth="1.4" />
    <path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="#66697d" strokeWidth="1.4" />
  </svg>
);

const Piece: React.FC<{ label: string; visible: boolean }> = ({ label, visible }) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      display: "flex",
      alignItems: "center",
      border: "1px solid #2a2c3a",
      borderRadius: 10,
      padding: "6px 12px",
      background: "rgba(255,255,255,0.02)",
    }}
  >
    <LockIcon />
    <span
      style={{
        fontFamily: FONT_FAMILY_UI,
        fontWeight: 700,
        fontSize: 14,
        color: "#66697d",
        letterSpacing: 0.5,
      }}
    >
      {label}
    </span>
  </div>
);

const PIECES = ["MARKETING", "VENTAS", "IA", "RETENCIÓN", "OFERTA"];

export const ConceptRevealCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - CONCEPT_REVEAL.from;

  const aplicoOpacity = interpolate(localT, [0, 0.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const oneScale = interpolate(localT, [0.5, 0.75], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const oneOpacity = interpolate(localT, [0.5, 0.68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const soloOpacity = interpolate(localT, [0.8, 1.05], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const deP2pOpacity = interpolate(localT, [1.3, 1.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const piecesOpacity = interpolate(localT, [2.0, 2.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={CONCEPT_REVEAL.from} to={CONCEPT_REVEAL.to}>
      <AbsoluteFill
        style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}
      >
        <div
          style={{
            opacity: aplicoOpacity,
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 28,
            color: "#9599b3",
            letterSpacing: 3,
            marginBottom: 6,
          }}
        >
          APLICÓ
        </div>
        <div
          style={{
            opacity: oneOpacity,
            transform: `scale(${oneScale})`,
            display: "flex",
            alignItems: "baseline",
            gap: 18,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 168,
              lineHeight: 1,
              ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
              filter: `drop-shadow(0 0 30px ${COLORS.violet}99)`,
            }}
          >
            1
          </span>
          <span
            style={{
              opacity: soloOpacity,
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 44,
              color: COLORS.white,
              lineHeight: 1.1,
            }}
          >
            SOLO
            <br />
            CONCEPTO
          </span>
        </div>
        <div
          style={{
            opacity: deP2pOpacity,
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 30,
            color: COLORS.white,
            marginTop: 6,
            letterSpacing: 2,
          }}
        >
          DE P2P
        </div>
        <div
          style={{
            opacity: piecesOpacity,
            marginTop: 30,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            maxWidth: 320,
          }}
        >
          {PIECES.map((p) => (
            <Piece key={p} label={p} visible={piecesOpacity > 0} />
          ))}
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
