import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CLOSER_SETTER } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE, FONT_FAMILY_UI } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

// CLOSER a la izquierda, SETTER a la derecha del speaker, "YA ESTÁS
// ADENTRO" debajo. El speaker queda en el centro.
export const CloserSetterLabels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - CLOSER_SETTER.from;

  const closerOpacity = interpolate(localT, [0.1, 0.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const setterOpacity = interpolate(localT, [0.7, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bottomOpacity = interpolate(localT, [1.3, 1.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY_HEADLINE,
    fontWeight: 900,
    fontSize: 34,
    color: COLORS.white,
    letterSpacing: 1,
  };

  return (
    <RevealBox from={CLOSER_SETTER.from} to={CLOSER_SETTER.to}>
      <AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", paddingLeft: "6%" }}>
          <div style={{ opacity: closerOpacity, transform: `translateX(${closerOpacity < 1 ? -10 : 0}px)`, ...labelStyle }}>
            CLOSER
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-end", paddingRight: "6%" }}>
          <div style={{ opacity: setterOpacity, transform: `translateX(${setterOpacity < 1 ? 10 : 0}px)`, ...labelStyle }}>
            SETTER
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: "12%" }}>
          <div
            style={{
              opacity: bottomOpacity,
              fontFamily: FONT_FAMILY_UI,
              fontWeight: 800,
              fontSize: 22,
              color: COLORS.white,
              letterSpacing: 2,
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            YA ESTÁS ADENTRO
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </RevealBox>
  );
};
