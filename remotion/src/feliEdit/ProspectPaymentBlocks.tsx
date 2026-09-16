import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PROSPECT_PAYMENT } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const Block: React.FC<{ text: string; borderColor: string; visible: boolean }> = ({
  text,
  borderColor,
  visible,
}) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      transform: `scale(${visible ? 1 : 0.88})`,
      border: `1.5px solid ${borderColor}`,
      borderRadius: 14,
      padding: "18px 24px",
      background: "rgba(255,255,255,0.02)",
      textAlign: "center",
    }}
  >
    <span
      style={{
        fontFamily: FONT_FAMILY_HEADLINE,
        fontWeight: 900,
        fontSize: 30,
        color: COLORS.white,
        letterSpacing: 1,
        whiteSpace: "pre-line",
      }}
    >
      {text}
    </span>
  </div>
);

// Motion horizontal: [PERSONA QUE NO TE CONOCE] -> [TE PAGA]. La flecha se
// dibuja exactamente cuando se explica la transformación.
export const ProspectPaymentBlocks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - PROSPECT_PAYMENT.from;

  const block1Visible = localT >= 0.15;
  const arrowProgress = interpolate(localT, [0.9, 1.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const block2Visible = localT >= 1.9;

  return (
    <RevealBox from={PROSPECT_PAYMENT.from} to={PROSPECT_PAYMENT.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <Block text={"PERSONA QUE\nNO TE CONOCE"} borderColor={`${COLORS.violet}aa`} visible={block1Visible} />
          <svg width="6" height="46" style={{ opacity: arrowProgress }}>
            <line
              x1="3"
              y1="0"
              x2="3"
              y2={46 * arrowProgress}
              stroke={COLORS.electricBlue}
              strokeWidth="5"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 8px ${COLORS.electricBlue}aa)` }}
            />
          </svg>
          <Block text="TE PAGA" borderColor={`${COLORS.electricBlue}cc`} visible={block2Visible} />
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
