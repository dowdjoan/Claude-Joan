import React from "react";
import { AbsoluteFill } from "remotion";
import { QUOTE_CARD, REALITY_CARD } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

export const QuoteCard: React.FC = () => (
  <RevealBox from={QUOTE_CARD.from} to={QUOTE_CARD.to}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 10%" }}>
      <div
        style={{
          fontFamily: FONT_FAMILY_HEADLINE,
          fontWeight: 900,
          fontSize: 50,
          lineHeight: 1.15,
          textAlign: "center",
          color: COLORS.white,
          textShadow: "0 4px 24px rgba(0,0,0,0.6)",
        }}
      >
        &ldquo;ES UNA LOCURA
        <br />
        LA PLATA QUE
        <br />
        <span style={gradientText(GRADIENT_VIOLET_BLUE)}>ESTÁ HACIENDO.&rdquo;</span>
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY_UI,
          fontWeight: 700,
          fontSize: 22,
          color: "#cfd3e6",
          marginTop: 20,
        }}
      >
        Y LO SENCILLO Y SIMPLE QUE ES.
      </div>
    </AbsoluteFill>
  </RevealBox>
);

export const RealityCard: React.FC = () => (
  <RevealBox from={REALITY_CARD.from} to={REALITY_CARD.to}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 10%" }}>
      <div
        style={{
          fontFamily: FONT_FAMILY_HEADLINE,
          fontWeight: 900,
          fontSize: 68,
          textAlign: "center",
          ...gradientText(GRADIENT_VIOLET_BLUE),
          filter: `drop-shadow(0 0 24px ${COLORS.electricBlue}77)`,
        }}
      >
        NO ES FÁCIL
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY_UI,
          fontWeight: 600,
          fontSize: 24,
          color: COLORS.white,
          textAlign: "center",
          marginTop: 16,
          maxWidth: 480,
          lineHeight: 1.35,
        }}
      >
        Pero es posible si tenés el sistema correcto.
      </div>
    </AbsoluteFill>
  </RevealBox>
);
