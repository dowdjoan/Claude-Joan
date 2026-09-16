import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CTA_FINAL } from "./timeline";
import { FONT_FAMILY_UI } from "../shared/theme";

// Línea chica arriba del CTACard compartido ("Y te muestro cómo
// aplicarlo a tu caso"), para no duplicar el componente reusado.
export const CtaSubtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - CTA_FINAL.from;
  const opacity = interpolate(localT, [0.1, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: "47%" }}>
      <div
        style={{
          opacity,
          fontFamily: FONT_FAMILY_UI,
          fontWeight: 700,
          fontSize: 20,
          color: "#cfd3e6",
          letterSpacing: 1,
          textAlign: "center",
          lineHeight: 1.3,
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}
      >
        Y TE MUESTRO CÓMO
        <br />
        APLICARLO A TU CASO
      </div>
    </AbsoluteFill>
  );
};
