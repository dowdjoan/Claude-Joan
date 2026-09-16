import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CTA_FINAL } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE } from "../shared/theme";

// Recordatorio breve de la transformación (COMMUNITY MANAGER -> $500 ->
// +$9.000/MES) arriba del todo, chico, que entra y sale antes de que
// aparezca "RESPONDÉ P2P" para no competirle protagonismo.
export const ReminderStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - CTA_FINAL.from;

  const opacity = interpolate(
    localT,
    [0.3, 0.7, 1.5, 1.9],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  if (opacity <= 0) return null;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: "8%" }}>
      <div
        style={{
          opacity,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: FONT_FAMILY_HEADLINE,
          fontWeight: 800,
          fontSize: 15,
          letterSpacing: 1,
        }}
      >
        <span style={{ color: "#8b8ea3" }}>COMMUNITY MANAGER</span>
        <span style={{ color: COLORS.electricBlue }}>→</span>
        <span style={{ color: COLORS.violet }}>$500</span>
        <span style={{ color: COLORS.electricBlue }}>→</span>
        <span style={{ color: COLORS.white }}>+$9.000/MES</span>
      </div>
    </AbsoluteFill>
  );
};
