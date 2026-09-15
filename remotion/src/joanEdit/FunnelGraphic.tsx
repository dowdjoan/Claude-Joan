import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FUNNEL_GRAPHIC } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE, FONT_FAMILY_UI } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const PersonIcon: React.FC<{ size: number; visible: boolean }> = ({
  size,
  visible,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 46 46"
    style={{ opacity: visible ? 1 : 0, transform: `scale(${visible ? 1 : 0.6})` }}
  >
    <circle cx="23" cy="14" r="9" stroke={COLORS.electricBlue} strokeWidth="3" fill="none" />
    <path
      d="M6 42c0-10 8-16 17-16s17 6 17 16"
      stroke={COLORS.electricBlue}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export const FunnelGraphic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - FUNNEL_GRAPHIC.from;

  return (
    <RevealBox from={FUNNEL_GRAPHIC.from} to={FUNNEL_GRAPHIC.to}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, ${COLORS.bgPetrol} 0%, ${COLORS.bgNear} 75%)`,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "18%",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 46,
            color: COLORS.white,
            textAlign: "center",
            marginBottom: 22,
          }}
        >
          MUY POCOS CLIENTES
          <br />
          PERO HIGH TICKET
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <PersonIcon size={38} visible={localT >= 0.2} />
          <PersonIcon size={30} visible={localT >= 0.5} />
          <PersonIcon size={22} visible={localT >= 0.8} />
          <svg width="60" height="40" style={{ marginLeft: 10, opacity: localT >= 1.1 ? 1 : 0 }}>
            <polyline
              points="4,34 56,6"
              fill="none"
              stroke={COLORS.violet}
              strokeWidth="4"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 8px ${COLORS.violet}aa)` }}
            />
            <polyline
              points="40,4 56,6 52,22"
              fill="none"
              stroke={COLORS.violet}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 22,
            color: "#cfd3e6",
            letterSpacing: 2,
            marginTop: 18,
            opacity: localT >= 1.3 ? 1 : 0,
          }}
        >
          MENOS CLIENTES, MÁS INGRESOS
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
