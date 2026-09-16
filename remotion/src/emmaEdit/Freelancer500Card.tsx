import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FREELANCER_500 } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE, FONT_FAMILY_UI } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

// Tarjeta UI central: FREELANCER arriba, $500 enorme (blur+scale) en el
// centro, "POR UNA SOLUCIÓN" debajo. Borde violeta sutil.
export const Freelancer500Card: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - FREELANCER_500.from;

  const heroProgress = interpolate(localT, [0.2, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heroBlur = interpolate(heroProgress, [0, 1], [14, 0]);
  const heroScale = interpolate(heroProgress, [0, 1], [0.85, 1]);
  const subOpacity = interpolate(localT, [0.7, 1.0], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={FREELANCER_500.from} to={FREELANCER_500.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            border: `1.5px solid ${COLORS.violet}77`,
            borderRadius: 24,
            padding: "40px 56px",
            background: "rgba(139,92,246,0.05)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_UI,
              fontWeight: 700,
              fontSize: 24,
              color: "#9599b3",
              letterSpacing: 4,
              marginBottom: 8,
            }}
          >
            FREELANCER
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 140,
              lineHeight: 1,
              color: COLORS.white,
              filter: `blur(${heroBlur}px)`,
              transform: `scale(${heroScale})`,
              letterSpacing: -2,
            }}
          >
            $500
          </div>
          <div
            style={{
              opacity: subOpacity,
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 800,
              fontSize: 26,
              color: COLORS.white,
              lineHeight: 1.15,
              marginTop: 10,
              letterSpacing: 1,
            }}
          >
            POR UNA
            <br />
            SOLUCIÓN
          </div>
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
