import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MECANISMO } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const PersonOutline: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 26 26">
    <circle cx="13" cy="8" r="5" fill="none" stroke="#8b8ea3" strokeWidth="2" />
    <path d="M3 24c0-6 4.5-10 10-10s10 4 10 10" fill="none" stroke="#8b8ea3" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const PersonHighlight: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 26 26">
    <circle cx="13" cy="8" r="5" fill="none" stroke={COLORS.electricBlue} strokeWidth="2.4" />
    <path d="M3 24c0-6 4.5-10 10-10s10 4 10 10" fill="none" stroke={COLORS.electricBlue} strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="13" cy="8" r="9" fill="none" stroke={COLORS.electricBlue} strokeWidth="1" opacity="0.4" />
  </svg>
);
const WalletIcon: React.FC = () => (
  <svg width="28" height="24" viewBox="0 0 28 24">
    <rect x="2" y="4" width="24" height="17" rx="3" fill="none" stroke={COLORS.violet} strokeWidth="2.2" />
    <path d="M2 9h24" stroke={COLORS.violet} strokeWidth="2.2" />
    <circle cx="21" cy="14.5" r="2" fill={COLORS.violet} />
  </svg>
);
const RecurrenceIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28">
    <path
      d="M5 14a9 9 0 1 1 2.6 6.3"
      fill="none"
      stroke={COLORS.magenta}
      strokeWidth="2.4"
      strokeLinecap="round"
      style={{ filter: `drop-shadow(0 0 6px ${COLORS.magenta}aa)` }}
    />
    <polyline points="3,17 5,22 10,20" fill="none" stroke={COLORS.magenta} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STAGES = [
  { at: 0.15, label: "NO TE\nCONOCE", icon: <PersonOutline />, color: "#c4c7db" },
  { at: 1.05, label: "TE CONOCE", icon: <PersonHighlight />, color: COLORS.electricBlue },
  { at: 1.95, label: "TE PAGA", icon: <WalletIcon />, color: COLORS.violet },
  { at: 2.85, label: "VUELVE A\nPAGARTE", icon: <RecurrenceIcon />, color: COLORS.magenta },
];

const Connector: React.FC<{ visible: boolean }> = ({ visible }) => (
  <svg width="4" height="34" style={{ opacity: visible ? 1 : 0 }}>
    <line
      x1="2"
      y1="0"
      x2="2"
      y2="34"
      stroke={COLORS.electricBlue}
      strokeWidth="3"
      strokeLinecap="round"
      style={{ filter: `drop-shadow(0 0 6px ${COLORS.electricBlue}aa)` }}
    />
  </svg>
);

// Ciclo completo de P2P construido progresivamente, sincronizado con la
// voz: NO TE CONOCE -> TE CONOCE -> TE PAGA -> VUELVE A PAGARTE.
export const MechanismCycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - MECANISMO.from;

  return (
    <RevealBox from={MECANISMO.from} to={MECANISMO.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {STAGES.map((stage, i) => {
            const visible = localT >= stage.at;
            const opacity = interpolate(localT, [stage.at, stage.at + 0.25], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <React.Fragment key={stage.label}>
                <div
                  style={{
                    opacity,
                    transform: `scale(${visible ? 1 : 0.85})`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    border: `1px solid ${stage.color}55`,
                    borderRadius: 14,
                    padding: "12px 26px",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {stage.icon}
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_HEADLINE,
                      fontWeight: 900,
                      fontSize: 28,
                      color: stage.color,
                      letterSpacing: 1,
                      whiteSpace: "pre-line",
                      lineHeight: 1.1,
                    }}
                  >
                    {stage.label}
                  </span>
                </div>
                {i < STAGES.length - 1 ? (
                  <Connector visible={localT >= stage.at + 0.3} />
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
