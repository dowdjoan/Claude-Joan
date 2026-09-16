import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TRES_SISTEMAS } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  GRADIENT_VIOLET_BLUE,
  gradientText,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const MegaphoneIcon: React.FC = () => (
  <svg width="28" height="24" viewBox="0 0 30 26">
    <path d="M2 10v6h5l9 6V4L7 10H2z" fill="none" stroke={COLORS.magenta} strokeWidth="2" strokeLinejoin="round" />
    <path d="M22 9a6 6 0 0 1 0 8" fill="none" stroke={COLORS.magenta} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const FunnelIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 26 26">
    <path d="M2 3h22l-8 11v8l-6 2v-10L2 3z" fill="none" stroke={COLORS.violet} strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ChipIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 26 26">
    <rect x="6" y="6" width="14" height="14" rx="2" fill="none" stroke={COLORS.electricBlue} strokeWidth="2" />
    <line x1="13" y1="0" x2="13" y2="6" stroke={COLORS.electricBlue} strokeWidth="2" />
    <line x1="13" y1="20" x2="13" y2="26" stroke={COLORS.electricBlue} strokeWidth="2" />
    <line x1="0" y1="13" x2="6" y2="13" stroke={COLORS.electricBlue} strokeWidth="2" />
    <line x1="20" y1="13" x2="26" y2="13" stroke={COLORS.electricBlue} strokeWidth="2" />
  </svg>
);

const MODULES = [
  { label: "MARKETING", icon: <MegaphoneIcon />, at: 0.1 },
  { label: "VENTAS", icon: <FunnelIcon />, at: 0.75 },
  { label: "IA", icon: <ChipIcon />, at: 1.4 },
];

export const TresSistemas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - TRES_SISTEMAS.from;

  const p2pOpacity = interpolate(localT, [1.9, 2.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={TRES_SISTEMAS.from} to={TRES_SISTEMAS.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {MODULES.map((m, i) => {
            const visible = localT >= m.at;
            const opacity = interpolate(localT, [m.at, m.at + 0.22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <React.Fragment key={m.label}>
                <div
                  style={{
                    opacity,
                    transform: `translateX(${visible ? 0 : -12}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    border: "1px solid #2a2c3a",
                    borderRadius: 12,
                    padding: "12px 24px",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {m.icon}
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_HEADLINE,
                      fontWeight: 900,
                      fontSize: 27,
                      color: COLORS.white,
                      letterSpacing: 1,
                    }}
                  >
                    {m.label}
                  </span>
                </div>
                {i < MODULES.length - 1 ? (
                  <svg width="4" height="22" style={{ opacity: localT >= m.at + 0.26 ? 1 : 0 }}>
                    <line
                      x1="2"
                      y1="0"
                      x2="2"
                      y2="22"
                      stroke={COLORS.electricBlue}
                      strokeWidth="3"
                      strokeLinecap="round"
                      style={{ filter: `drop-shadow(0 0 6px ${COLORS.electricBlue}aa)` }}
                    />
                  </svg>
                ) : null}
              </React.Fragment>
            );
          })}
          <div
            style={{
              opacity: p2pOpacity,
              marginTop: 20,
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: 3,
              ...gradientText(GRADIENT_VIOLET_BLUE),
            }}
          >
            P2P
          </div>
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
