import React from "react";
import { AbsoluteFill } from "remotion";
import { MINI_CLASS_CARD } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const PlayButton: React.FC = () => (
  <div
    style={{
      width: 54,
      height: 54,
      borderRadius: "50%",
      background: GRADIENT_VIOLET_BLUE,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 0 18px ${COLORS.electricBlue}88`,
      flexShrink: 0,
    }}
  >
    <svg width="20" height="22" viewBox="0 0 20 22">
      <polygon points="0,0 20,11 0,22" fill={COLORS.white} />
    </svg>
  </div>
);

export const MiniClassCard: React.FC = () => (
  <RevealBox from={MINI_CLASS_CARD.from} to={MINI_CLASS_CARD.to}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 8%" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          background: "rgba(8,9,20,0.72)",
          border: `1px solid ${COLORS.violet}55`,
          borderRadius: 28,
          padding: "30px 32px",
          boxShadow: `0 0 40px ${COLORS.violet}44`,
          backdropFilter: "blur(6px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <PlayButton />
          <div>
            <div
              style={{
                fontFamily: FONT_FAMILY_HEADLINE,
                fontWeight: 900,
                fontSize: 36,
                color: COLORS.white,
                letterSpacing: 1,
              }}
            >
              MINI CLASE
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY_UI,
                fontWeight: 700,
                fontSize: 20,
                ...gradientText(GRADIENT_VIOLET_BLUE),
                marginTop: 2,
              }}
            >
              GRATIS
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 500,
            fontSize: 22,
            color: "#cfd3e6",
            marginTop: 18,
            lineHeight: 1.35,
          }}
        >
          Cómo escalar tu negocio como entrenador o nutricionista.
        </div>
      </div>
    </AbsoluteFill>
  </RevealBox>
);
