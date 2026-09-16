import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MAS_VALIOSO } from "./timeline";
import { COLORS, FONT_FAMILY_UI } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const TAGS = ["MARKETING", "VENTAS", "IA"];

// Etiquetas chicas (ya vistas en el módulo anterior) al costado del
// speaker mientras dice "se hizo más valioso" — sin tapar la cara.
export const ValiosoTags: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - MAS_VALIOSO.from;

  return (
    <RevealBox from={MAS_VALIOSO.from} to={MAS_VALIOSO.to}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-end", paddingRight: "6%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TAGS.map((tag, i) => {
            const at = 0.3 + i * 0.35;
            const opacity = interpolate(localT, [at, at + 0.25], [0, 1], {
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
