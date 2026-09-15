import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ICON_ROW } from "./timeline";
import { COLORS, FONT_FAMILY_UI } from "./theme";
import { RevealBox } from "./RevealBox";

const DumbbellIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect x="6" y="22" width="8" height="12" rx="2" stroke={COLORS.electricBlue} strokeWidth="3" />
    <rect x="42" y="22" width="8" height="12" rx="2" stroke={COLORS.electricBlue} strokeWidth="3" />
    <line x1="14" y1="28" x2="42" y2="28" stroke={COLORS.electricBlue} strokeWidth="3" />
    <rect x="2" y="24" width="4" height="8" rx="1" fill={COLORS.electricBlue} />
    <rect x="50" y="24" width="4" height="8" rx="1" fill={COLORS.electricBlue} />
  </svg>
);

const FoodIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="30" r="16" stroke={COLORS.violet} strokeWidth="3" />
    <path d="M28 14c2-4 6-5 8-3" stroke={COLORS.violet} strokeWidth="3" strokeLinecap="round" />
    <line x1="16" y1="46" x2="16" y2="30" stroke={COLORS.violet} strokeWidth="3" strokeLinecap="round" />
    <line x1="12" y1="30" x2="12" y2="22" stroke={COLORS.violet} strokeWidth="3" strokeLinecap="round" />
    <line x1="16" y1="30" x2="16" y2="22" stroke={COLORS.violet} strokeWidth="3" strokeLinecap="round" />
    <line x1="20" y1="30" x2="20" y2="22" stroke={COLORS.violet} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Pill: React.FC<{
  icon: React.ReactNode;
  label: string;
  visible: boolean;
}> = ({ icon, label, visible }) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      transform: `translateY(${visible ? 0 : 14}px)`,
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "rgba(10,10,20,0.55)",
      border: `1px solid ${COLORS.violet}55`,
      borderRadius: 999,
      padding: "14px 28px",
      boxShadow: `0 0 24px ${COLORS.violet}33`,
    }}
  >
    {icon}
    <span
      style={{
        fontFamily: FONT_FAMILY_UI,
        fontWeight: 800,
        fontSize: 32,
        color: COLORS.white,
        letterSpacing: 1,
      }}
    >
      {label}
    </span>
  </div>
);

export const IconRow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - ICON_ROW.from;

  return (
    <RevealBox from={ICON_ROW.from} to={ICON_ROW.to}>
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "16%",
          gap: 18,
        }}
      >
        <Pill icon={<DumbbellIcon />} label="ENTRENADOR" visible={localT >= 0.38} />
        <Pill icon={<FoodIcon />} label="NUTRICIONISTA" visible={localT >= 1.31} />
      </AbsoluteFill>
    </RevealBox>
  );
};
