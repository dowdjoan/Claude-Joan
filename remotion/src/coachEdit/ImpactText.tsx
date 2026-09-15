import React from "react";
import { AbsoluteFill } from "remotion";
import { IMPACT_TEXT_HICE, IMPACT_TEXT_VOS_PODES } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE, GRADIENT_VIOLET_BLUE, gradientText } from "./theme";
import { RevealBox } from "./RevealBox";

const BigTwoLiner: React.FC<{
  from: number;
  to: number;
  line1: string;
  line2: string;
}> = ({ from, to, line1, line2 }) => (
  <RevealBox from={from} to={to}>
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "10%",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 60,
            lineHeight: 1.05,
            color: COLORS.white,
            textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          {line1}
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 60,
            lineHeight: 1.05,
            ...gradientText(GRADIENT_VIOLET_BLUE),
          }}
        >
          {line2}
        </div>
      </div>
    </AbsoluteFill>
  </RevealBox>
);

export const ImpactTextHice: React.FC = () => (
  <BigTwoLiner
    from={IMPACT_TEXT_HICE.from}
    to={IMPACT_TEXT_HICE.to}
    line1="CÓMO YO"
    line2="LO HICE"
  />
);

export const ImpactTextVosPodes: React.FC = () => (
  <BigTwoLiner
    from={IMPACT_TEXT_VOS_PODES.from}
    to={IMPACT_TEXT_VOS_PODES.to}
    line1="VOS TAMBIÉN"
    line2="PODÉS HACERLO"
  />
);
