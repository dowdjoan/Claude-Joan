import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { P2P_LOGO_REVEAL } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

export const P2PLogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - P2P_LOGO_REVEAL.from;

  const subOpacity = interpolate(localT, [0.9, 1.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={P2P_LOGO_REVEAL.from} to={P2P_LOGO_REVEAL.to}>
      <AbsoluteFill
        style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 168,
            lineHeight: 1,
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
            filter: `drop-shadow(0 0 34px ${COLORS.violet}99)`,
          }}
        >
          P2P
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 26,
            color: "#cfd3e6",
            letterSpacing: 4,
            marginTop: 12,
            textAlign: "center",
          }}
        >
          PROSPECT
          <br />
          TO
          <br />
          PAYMENT
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
