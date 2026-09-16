import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { P2P_REVEAL } from "./timeline";
import {
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_MAGENTA_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

export const P2PRevealFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - P2P_REVEAL.from;

  const p2pProgress = interpolate(localT, [0.1, 0.45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p2pBlur = interpolate(p2pProgress, [0, 1], [16, 0]);
  const p2pScale = interpolate(p2pProgress, [0, 1], [0.82, 1]);
  const subOpacity = interpolate(localT, [0.6, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={P2P_REVEAL.from} to={P2P_REVEAL.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 168,
            lineHeight: 1,
            filter: `blur(${p2pBlur}px)`,
            transform: `scale(${p2pScale})`,
            ...gradientText(GRADIENT_MAGENTA_VIOLET_BLUE),
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
