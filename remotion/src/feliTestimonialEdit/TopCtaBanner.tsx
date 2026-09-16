import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";

const ENTER_S = 0.35;

// Texto persistente arriba de todo el video ("RESPONDÉ P2P"), pedido
// explícitamente para que el CTA esté visible durante todo el testimonio
// y no solo al final. Va por encima de los StatBadges (que entran más
// abajo, con más paddingTop) para que nunca se solapen.
export const TopCtaBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const opacity = interpolate(t, [0, ENTER_S], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: "3%" }}>
      <div
        style={{
          opacity,
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          border: `1px solid ${COLORS.violet}55`,
          borderRadius: 999,
          padding: "7px 18px",
          background: "rgba(5,5,9,0.55)",
          boxShadow: `0 0 20px ${COLORS.violet}44`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 800,
            fontSize: 16,
            color: COLORS.white,
            letterSpacing: 1.5,
          }}
        >
          RESPONDÉ
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 20,
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
          }}
        >
          &ldquo;P2P&rdquo;
        </span>
      </div>
    </AbsoluteFill>
  );
};
