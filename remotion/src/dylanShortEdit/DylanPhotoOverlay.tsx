import React from "react";
import { AbsoluteFill } from "remotion";
import { DYLAN_REVEAL } from "./timeline";
import { FONT_FAMILY_HEADLINE, GRADIENT_VIOLET_BLUE, gradientText } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";
import { DylanAvatar } from "./DylanAvatar";

// Se dispara cuando el speaker dice "Dylan" (0:02-0:05 del brief): entra
// con blur+scale+glow violeta, al lado del talking head.
export const DylanPhotoOverlay: React.FC = () => (
  <RevealBox from={DYLAN_REVEAL.from} to={DYLAN_REVEAL.to + 1.6}>
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "flex-end", padding: "10% 6% 0 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <DylanAvatar size={128} />
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 22,
            ...gradientText(GRADIENT_VIOLET_BLUE),
          }}
        >
          DYLAN
        </div>
      </div>
    </AbsoluteFill>
  </RevealBox>
);
