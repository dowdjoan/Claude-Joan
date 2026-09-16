import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TE_PUEDO_AYUDAR } from "./timeline";
import { COLORS, FONT_FAMILY_UI, FONT_FAMILY_HEADLINE } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const TAGS = ["MARKETING", "VENTAS", "IA"];

// Bubble/message UI chico al costado del speaker + tres etiquetas que
// entran sucesivamente. No es un chat completo.
export const MessageBubble: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - TE_PUEDO_AYUDAR.from;

  const bubbleOpacity = interpolate(localT, [0.1, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={TE_PUEDO_AYUDAR.from} to={TE_PUEDO_AYUDAR.to}>
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "flex-end", padding: "12% 6% 0 0" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, maxWidth: 300 }}>
          <div
            style={{
              opacity: bubbleOpacity,
              transform: `translateY(${bubbleOpacity < 1 ? -8 : 0}px)`,
              border: "1px solid #2a2c3a",
              borderRadius: "16px 16px 4px 16px",
              padding: "14px 18px",
              background: "rgba(255,255,255,0.04)",
              textAlign: "right",
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY_UI,
                fontWeight: 700,
                fontSize: 18,
                color: COLORS.white,
                lineHeight: 1.3,
              }}
            >
              &ldquo;TE PUEDO AYUDAR
              <br />
              CON ESTO.&rdquo;
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {TAGS.map((tag, i) => {
              const at = 0.7 + i * 0.35;
              const opacity = interpolate(localT, [at, at + 0.25], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={tag}
                  style={{
                    opacity,
                    border: `1px solid ${COLORS.violet}66`,
                    borderRadius: 999,
                    padding: "5px 12px",
                    background: "rgba(139,92,246,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_HEADLINE,
                      fontWeight: 800,
                      fontSize: 13,
                      color: COLORS.white,
                      letterSpacing: 1,
                    }}
                  >
                    {tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
