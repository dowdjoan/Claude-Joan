import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PROSPECT_PAYMENT_ARROW } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE, gradientText, GRADIENT_VIOLET_BLUE } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

export const ProspectPaymentArrow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - PROSPECT_PAYMENT_ARROW.from;

  const arrowProgress = interpolate(localT, [0.3, 1.1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const paymentLit = localT >= 1.1;

  return (
    <RevealBox from={PROSPECT_PAYMENT_ARROW.from} to={PROSPECT_PAYMENT_ARROW.to}>
      <AbsoluteFill
        style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 46,
              color: COLORS.white,
              letterSpacing: 1,
            }}
          >
            PROSPECT
          </div>
          <svg width="70" height="24" style={{ opacity: arrowProgress }}>
            <line
              x1="0"
              y1="12"
              x2={70 * arrowProgress}
              y2="12"
              stroke={COLORS.electricBlue}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {arrowProgress > 0.7 ? (
              <polyline
                points="54,4 68,12 54,20"
                fill="none"
                stroke={COLORS.electricBlue}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null}
          </svg>
          <div
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 46,
              letterSpacing: 1,
              ...(paymentLit
                ? { ...gradientText(GRADIENT_VIOLET_BLUE), filter: `drop-shadow(0 0 16px ${COLORS.electricBlue}aa)` }
                : { color: "#55586b" }),
            }}
          >
            PAYMENT
          </div>
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
