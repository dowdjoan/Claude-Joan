import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTIONS, ACCENT_STINGERS, sec } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  GRADIENT_VIOLET_BLUE,
  gradientText,
} from "./theme";

const ENTRANCE_S = 0.16; // 120-200ms del spec

const Word: React.FC<{ text: string; highlighted: boolean }> = ({
  text,
  highlighted,
}) => (
  <span
    style={
      highlighted
        ? { ...gradientText(GRADIENT_VIOLET_BLUE) }
        : { color: COLORS.white }
    }
  >
    {text}
  </span>
);

const renderLine = (line: string, emphasis: string[] | undefined) => {
  const parts = line.split(" ");
  return parts.map((w, i) => {
    const clean = w.replace(/[¿?.,]/g, "");
    const isEmphasis = emphasis?.includes(clean) ?? false;
    return (
      <React.Fragment key={i}>
        <Word text={w} highlighted={isEmphasis} />
        {i < parts.length - 1 ? " " : ""}
      </React.Fragment>
    );
  });
};

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const active = CAPTIONS.find((c) => t >= c.from && t < c.to);
  const accent = ACCENT_STINGERS.find((a) => t >= a.from && t < a.to);

  return (
    <AbsoluteFill>
      {active ? (
        <CaptionBlock
          key={`${active.from}`}
          caption={active}
          startFrame={sec(active.from)}
        />
      ) : null}
      {accent ? (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: "30%",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 46,
              color: COLORS.white,
              letterSpacing: 1,
              opacity: interpolate(
                frame,
                [sec(accent.from), sec(accent.from) + 4, sec(accent.to) - 4, sec(accent.to)],
                [0, 1, 1, 0],
              ),
            }}
          >
            {accent.text}
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

const CaptionBlock: React.FC<{
  caption: (typeof CAPTIONS)[number];
  startFrame: number;
}> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const localT = t - caption.from;
  const entranceProgress = Math.min(Math.max(localT / ENTRANCE_S, 0), 1);

  const blurPx = interpolate(entranceProgress, [0, 1], [10, 0]);
  const scale = interpolate(entranceProgress, [0, 1], [0.82, 1]);
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "8%",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          filter: `blur(${blurPx}px)`,
          opacity,
          textAlign: "center",
          maxWidth: "88%",
        }}
      >
        {caption.lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 72,
              lineHeight: 1.08,
              letterSpacing: -1,
              textShadow: "0 4px 24px rgba(0,0,0,0.55)",
            }}
          >
            {renderLine(line, caption.emphasis)}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
