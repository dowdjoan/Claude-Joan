import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FLOW_GRAPHIC } from "./timeline";
import { COLORS, FONT_FAMILY_UI, gradientText, GRADIENT_VIOLET_BLUE } from "./theme";
import { RevealBox } from "./RevealBox";

const NODE_VOS_AT = 0;
const NODE_IA_AT = 2.81;
const NODE_CLIENTE_AT = 4.61;

const Node: React.FC<{
  label: string;
  visible: boolean;
  glowing?: boolean;
}> = ({ label, visible, glowing }) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      transform: `scale(${visible ? 1 : 0.7})`,
      display: "flex",
      alignItems: "center",
      gap: 14,
    }}
  >
    <div
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: glowing ? GRADIENT_VIOLET_BLUE : COLORS.white,
        boxShadow: glowing
          ? `0 0 18px ${COLORS.electricBlue}, 0 0 36px ${COLORS.violet}88`
          : "none",
      }}
    />
    <div
      style={{
        fontFamily: FONT_FAMILY_UI,
        fontWeight: 800,
        fontSize: 34,
        letterSpacing: 2,
        ...(glowing ? gradientText(GRADIENT_VIOLET_BLUE) : { color: COLORS.white }),
      }}
    >
      {label}
    </div>
  </div>
);

const Connector: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width="4" height="70" style={{ marginLeft: 7 }}>
    <line
      x1="2"
      y1="0"
      x2="2"
      y2={70 * Math.min(Math.max(progress, 0), 1)}
      stroke={COLORS.violet}
      strokeWidth="4"
      strokeLinecap="round"
      style={{ filter: `drop-shadow(0 0 6px ${COLORS.violet}aa)` }}
    />
  </svg>
);

export const FlowDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - FLOW_GRAPHIC.from;

  const lineProgress1 = interpolate(
    localT,
    [NODE_VOS_AT + 0.3, NODE_IA_AT],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const lineProgress2 = interpolate(
    localT,
    [NODE_IA_AT + 0.3, NODE_CLIENTE_AT],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <RevealBox from={FLOW_GRAPHIC.from} to={FLOW_GRAPHIC.to}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: "8%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Node label="VOS" visible={localT >= NODE_VOS_AT} />
          <Connector progress={lineProgress1} />
          <Node label="IA" visible={localT >= NODE_IA_AT} glowing />
          <Connector progress={lineProgress2} />
          <Node label="CLIENTE" visible={localT >= NODE_CLIENTE_AT} />
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
