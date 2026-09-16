import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { TICKETS_GRAPHIC } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const HouseIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 30 30">
    <path d="M4 15 15 5l11 10" fill="none" stroke={COLORS.electricBlue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 13v12h16V13" fill="none" stroke={COLORS.electricBlue} strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);
const PeopleIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 30 30">
    <circle cx="11" cy="9" r="4.5" stroke={COLORS.violet} strokeWidth="2.5" fill="none" />
    <circle cx="19" cy="11" r="3.5" stroke={COLORS.violet} strokeWidth="2.5" fill="none" />
    <path d="M4 26c0-5.5 3.5-9 7-9s7 3.5 7 9" stroke={COLORS.violet} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const Ticket: React.FC<{
  amount: string;
  icon: React.ReactNode;
  label: string;
  visible: boolean;
}> = ({ amount, icon, label, visible }) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      transform: `translateY(${visible ? 0 : 18}px) scale(${visible ? 1 : 0.9})`,
      textAlign: "center",
    }}
  >
    <div
      style={{
        border: `2px solid ${COLORS.violet}77`,
        borderRadius: 18,
        padding: "16px 28px",
        ...gradientText(GRADIENT_VIOLET_BLUE),
        fontFamily: FONT_FAMILY_HEADLINE,
        fontWeight: 900,
        fontSize: 40,
        boxShadow: `0 0 24px ${COLORS.violet}33`,
      }}
    >
      {amount}
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginTop: 14, marginBottom: 6 }}>{icon}</div>
    <div
      style={{
        fontFamily: FONT_FAMILY_UI,
        fontWeight: 700,
        fontSize: 14,
        color: "#cfd3e6",
        letterSpacing: 0.5,
        maxWidth: 130,
      }}
    >
      {label}
    </div>
  </div>
);

export const TicketsGraphic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - TICKETS_GRAPHIC.from;

  return (
    <RevealBox from={TICKETS_GRAPHIC.from} to={TICKETS_GRAPHIC.to}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, ${COLORS.bgPetrol} 0%, ${COLORS.bgNear} 75%)`,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "22%",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 30,
            color: COLORS.white,
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          TICKETS DE
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          <Ticket amount="$6.000" icon={<HouseIcon />} label="PROPIETARIOS CALIFICADOS" visible={localT >= 0.72} />
          <Ticket amount="$12.000" icon={<PeopleIcon />} label="VENDEDORES CALIFICADOS" visible={localT >= 1.06} />
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
