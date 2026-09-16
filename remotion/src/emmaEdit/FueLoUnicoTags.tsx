import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FUE_LO_UNICO } from "./timeline";
import { COLORS, FONT_FAMILY_UI } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const TAGS = ["MARKETING", "VENTAS", "IA"];

// Etiquetas chicas (ya vistas en TresSistemas) al costado del speaker,
// sin sobrecargar. No tapa la cara.
export const FueLoUnicoTags: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - FUE_LO_UNICO.from;

  return (
    <RevealBox from={FUE_LO_UNICO.from} to={FUE_LO_UNICO.to}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-end", paddingRight: "6%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TAGS.map((tag, i) => {
            const at = 1.0 + i * 0.3;
            const opacity = interpolate(localT, [at, at + 0.22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={tag}
                style={{
                  opacity,
                  transform: `translateX(${opacity < 1 ? 12 : 0}px)`,
                  border: `1px solid ${COLORS.electricBlue}55`,
                  borderRadius: 999,
                  padding: "6px 16px",
                  background: "rgba(59,130,246,0.08)",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY_UI,
                    fontWeight: 700,
                    fontSize: 15,
                    color: COLORS.white,
                    letterSpacing: 1.5,
                  }}
                >
                  {tag}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
