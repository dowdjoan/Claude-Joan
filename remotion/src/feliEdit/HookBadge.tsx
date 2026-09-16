import React from "react";
import { AbsoluteFill } from "remotion";
import { HOOK_FELI } from "./timeline";
import { COLORS, FONT_FAMILY_UI } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

// Etiqueta UI chica ("CLOSER DE VENTAS") que aparece después de las dos
// entradas de texto "DE SIMPLE / CLOSER", sin tapar la cara del speaker.
export const HookBadge: React.FC = () => (
  <RevealBox from={HOOK_FELI.to - 0.97} to={HOOK_FELI.to}>
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: "9%" }}>
      <div
        style={{
          border: `1px solid ${COLORS.electricBlue}66`,
          borderRadius: 999,
          padding: "8px 20px",
          background: "rgba(59,130,246,0.08)",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 20,
            color: COLORS.white,
            letterSpacing: 2,
          }}
        >
          CLOSER DE VENTAS
        </span>
      </div>
    </AbsoluteFill>
  </RevealBox>
);
