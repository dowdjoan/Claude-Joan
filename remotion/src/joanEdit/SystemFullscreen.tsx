import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SYSTEM_FULLSCREEN } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const PeopleIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <circle cx="12" cy="10" r="5" stroke={COLORS.electricBlue} strokeWidth="2.5" fill="none" />
    <circle cx="21" cy="12" r="4" stroke={COLORS.electricBlue} strokeWidth="2.5" fill="none" />
    <path d="M4 28c0-6 4-10 8-10s8 4 8 10" stroke={COLORS.electricBlue} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);
const FunnelIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <polygon points="4,4 28,4 19,17 19,28 13,25 13,17" fill="none" stroke={COLORS.violet} strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);
const AiIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <rect x="6" y="6" width="20" height="20" rx="5" stroke={COLORS.magenta} strokeWidth="2.5" fill="none" />
    <circle cx="12" cy="16" r="2" fill={COLORS.magenta} />
    <circle cx="20" cy="16" r="2" fill={COLORS.magenta} />
  </svg>
);

const Card: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  visible: boolean;
}> = ({ icon, title, subtitle, visible }) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      transform: `translateY(${visible ? 0 : 20}px)`,
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${COLORS.violet}44`,
      borderRadius: 18,
      padding: "18px 16px",
      width: 150,
      textAlign: "center",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>{icon}</div>
    <div
      style={{
        fontFamily: FONT_FAMILY_HEADLINE,
        fontWeight: 900,
        fontSize: 17,
        color: COLORS.white,
        letterSpacing: 0.5,
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontFamily: FONT_FAMILY_UI,
        fontWeight: 500,
        fontSize: 13,
        color: "#9599b3",
        marginTop: 6,
        lineHeight: 1.3,
      }}
    >
      {subtitle}
    </div>
  </div>
);

export const SystemFullscreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - SYSTEM_FULLSCREEN.from;
  const duration = SYSTEM_FULLSCREEN.to - SYSTEM_FULLSCREEN.from;
  const taglineOpacity = interpolate(localT, [duration - 1.6, duration - 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={SYSTEM_FULLSCREEN.from} to={SYSTEM_FULLSCREEN.to}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, ${COLORS.bgPetrol} 0%, ${COLORS.bgNear} 75%)`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 130,
            lineHeight: 1,
            ...gradientText(GRADIENT_VIOLET_BLUE),
            filter: `drop-shadow(0 0 30px ${COLORS.electricBlue}88)`,
          }}
        >
          P2P
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 700,
            fontSize: 22,
            color: "#cfd3e6",
            letterSpacing: 3,
            marginTop: 6,
            marginBottom: 34,
          }}
        >
          PROSPECTO → PAYMENT
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <Card icon={<PeopleIcon />} title="MARKETING" subtitle="Llevá personas que no te conocen" visible={localT >= 2.86} />
          <Card icon={<FunnelIcon />} title="VENTAS" subtitle="A que te paguen" visible={localT >= 4.45} />
          <Card icon={<AiIcon />} title="INTELIGENCIA ARTIFICIAL" subtitle="Y vuelvan a pagarte" visible={localT >= 6.05} />
        </div>
        <div
          style={{
            marginTop: 36,
            fontFamily: FONT_FAMILY_UI,
            fontWeight: 800,
            fontSize: 18,
            color: COLORS.white,
            letterSpacing: 2,
            opacity: taglineOpacity,
          }}
        >
          UN SISTEMA REAL. PROBADO. ESCALABLE.
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
