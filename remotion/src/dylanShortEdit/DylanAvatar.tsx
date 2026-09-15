import React from "react";
import { COLORS, FONT_FAMILY_HEADLINE, GRADIENT_VIOLET_BLUE } from "../shared/theme";

// Placeholder de "foto real de Dylan": no llegó como archivo accesible en
// este sandbox (solo como contenido visual en el chat), así que se usa una
// silueta con gradiente + glow en su lugar. Reemplazar por la foto real
// (staticFile + <Img>) en cuanto se suba el archivo.
export const DylanAvatar: React.FC<{ size: number; glow?: boolean }> = ({
  size,
  glow = true,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: GRADIENT_VIOLET_BLUE,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: glow ? `0 0 ${size * 0.5}px ${COLORS.violet}77` : "none",
      border: "2px solid rgba(255,255,255,0.2)",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontFamily: FONT_FAMILY_HEADLINE,
        fontWeight: 900,
        fontSize: size * 0.42,
        color: COLORS.white,
      }}
    >
      D
    </span>
  </div>
);
