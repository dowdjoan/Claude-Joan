import React from "react";
import { AbsoluteFill } from "remotion";
import { HOOK_EMMA } from "./timeline";
import { COLORS, FONT_FAMILY_UI } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const ScissorsIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 6 }}>
    <circle cx="6" cy="6" r="3" fill="none" stroke={COLORS.white} strokeWidth="1.6" />
    <circle cx="6" cy="18" r="3" fill="none" stroke={COLORS.white} strokeWidth="1.6" />
    <line x1="8.5" y1="8" x2="20" y2="18" stroke={COLORS.white} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="8.5" y1="16" x2="20" y2="6" stroke={COLORS.white} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// Badge chico ("DE UNA BARBERÍA" + tijeras lineales) que aparece al final
// del hook, sin tapar la cara del speaker.
export const HookEmmaBadge: React.FC = () => (
  <RevealBox from={HOOK_EMMA.to - 0.9} to={HOOK_EMMA.to}>
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: "10%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1px solid ${COLORS.electricBlue}66`,
          borderRadius: 999,
          padding: "8px 18px",
          background: "rgba(59,130,246,0.08)",
        }}
      >
        <ScissorsIcon />
        <span
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 18,
            color: COLORS.white,
            letterSpacing: 1.5,
          }}
        >
          DE UNA BARBERÍA
        </span>
      </div>
    </AbsoluteFill>
  </RevealBox>
);
