import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { P2P_FLASH } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

export const P2PFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - P2P_FLASH.from;
  const subOpacity = interpolate(localT, [0.55, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={P2P_FLASH.from} to={P2P_FLASH.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 158,
            lineHeight: 1,
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
            filter: `drop-shadow(0 0 32px ${COLORS.violet}99)`,
          }}
        >
          P2P
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 24,
            color: "#cfd3e6",
            letterSpacing: 3,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          PROSPECT TO PAYMENT
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
