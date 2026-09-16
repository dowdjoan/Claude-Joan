import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { DYLAN_APPLICATION } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE, FONT_FAMILY_UI } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";
import { DylanAvatar } from "./DylanAvatar";

const Node: React.FC<{ label: string; visible: boolean; glowing?: boolean }> = ({
  label,
  visible,
  glowing,
}) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      transform: `translateY(${visible ? 0 : 10}px)`,
      fontFamily: FONT_FAMILY_HEADLINE,
      fontWeight: 900,
      fontSize: 26,
      color: glowing ? COLORS.electricBlue : COLORS.white,
      letterSpacing: 1,
      filter: glowing ? `drop-shadow(0 0 10px ${COLORS.electricBlue}aa)` : "none",
    }}
  >
    {label}
  </div>
);

const Connector: React.FC<{ visible: boolean }> = ({ visible }) => (
  <svg width="3" height="26" style={{ opacity: visible ? 1 : 0 }}>
    <line x1="1.5" y1="0" x2="1.5" y2="26" stroke={COLORS.violet} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const DylanApplicationCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - DYLAN_APPLICATION.from;

  return (
    <RevealBox from={DYLAN_APPLICATION.from} to={DYLAN_APPLICATION.to}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 40%, ${COLORS.bgPetrol} 0%, #050509 75%)`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DylanAvatar size={150} />
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 15,
            color: "#9599b3",
            marginTop: 10,
            marginBottom: 22,
            letterSpacing: 2,
          }}
        >
          NEGOCIO DE PERFUMES
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Node label="P2P" visible={localT >= 0.3} glowing />
          <Connector visible={localT >= 0.55} />
          <Node label="PERFUMES" visible={localT >= 0.7} />
          <Connector visible={localT >= 0.95} />
          <Node label="CLIENTES" visible={localT >= 1.1} />
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
