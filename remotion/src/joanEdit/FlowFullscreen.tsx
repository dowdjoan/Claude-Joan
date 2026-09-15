import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FLOW_FULLSCREEN } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE, gradientText, GRADIENT_VIOLET_BLUE } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const STEPS = [
  { at: 0.2, text: "PERSONAS QUE\nNO TE CONOCEN" },
  { at: 2.5, text: "TE PAGAN" },
  { at: 3.9, text: "VUELVEN A\nPAGARTE" },
];

const Connector: React.FC<{ visible: boolean }> = ({ visible }) => (
  <svg width="4" height="46" style={{ opacity: visible ? 1 : 0 }}>
    <line
      x1="2"
      y1="0"
      x2="2"
      y2="46"
      stroke={COLORS.violet}
      strokeWidth="4"
      strokeLinecap="round"
      style={{ filter: `drop-shadow(0 0 8px ${COLORS.violet}aa)` }}
    />
  </svg>
);

export const FlowFullscreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - FLOW_FULLSCREEN.from;

  return (
    <RevealBox from={FLOW_FULLSCREEN.from} to={FLOW_FULLSCREEN.to}>
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.bgNear,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {STEPS.map((step, i) => {
            const visible = localT >= step.at;
            const isLast = i === STEPS.length - 1;
            const opacity = interpolate(localT, [step.at, step.at + 0.25], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    opacity,
                    transform: `scale(${visible ? 1 : 0.85})`,
                    fontFamily: FONT_FAMILY_HEADLINE,
                    fontWeight: 900,
                    fontSize: isLast ? 56 : 44,
                    lineHeight: 1.15,
                    textAlign: "center",
                    whiteSpace: "pre-line",
                    ...(isLast
                      ? gradientText(GRADIENT_VIOLET_BLUE)
                      : { color: COLORS.white }),
                  }}
                >
                  {step.text}
                </div>
                {i < STEPS.length - 1 ? <Connector visible={localT >= step.at + 0.3} /> : null}
              </React.Fragment>
            );
          })}
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
