import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { INFRAESTRUCTURA } from "./timeline";
import { COLORS, FONT_FAMILY_HEADLINE } from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

// Diagrama chico: NEGOCIO en el centro, ADS/LEADS/CRM/VENTAS/CLIENTES
// alrededor, VOS con más glow en el medio de la infraestructura. Se
// entiende en menos de un segundo.
const NODES = [
  { label: "ADS", x: 50, y: 12 },
  { label: "LEADS", x: 84, y: 34 },
  { label: "CRM", x: 84, y: 68 },
  { label: "VENTAS", x: 50, y: 90 },
  { label: "CLIENTES", x: 16, y: 68 },
];

export const InfraDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localT = frame / fps - INFRAESTRUCTURA.from;

  const titleOpacity = interpolate(localT, [0.05, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const centerOpacity = interpolate(localT, [0.3, 0.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nodesOpacity = interpolate(localT, [0.6, 1.0], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const vosOpacity = interpolate(localT, [1.1, 1.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <RevealBox from={INFRAESTRUCTURA.from} to={INFRAESTRUCTURA.to}>
      <AbsoluteFill style={{ backgroundColor: "#050509", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            opacity: titleOpacity,
            position: "absolute",
            top: "16%",
            fontFamily: FONT_FAMILY_HEADLINE,
            fontWeight: 900,
            fontSize: 34,
            color: COLORS.white,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          YA ESTÁS
          <br />
          DENTRO
        </div>
        <div style={{ position: "relative", width: 320, height: 320 }}>
          <svg width="320" height="320" style={{ position: "absolute", inset: 0, opacity: nodesOpacity }}>
            {NODES.map((n) => (
              <line
                key={n.label}
                x1="160"
                y1="160"
                x2={(n.x / 100) * 320}
                y2={(n.y / 100) * 320}
                stroke={COLORS.violet}
                strokeWidth="2"
                opacity={0.55}
              />
            ))}
          </svg>
          {NODES.map((n) => (
            <div
              key={n.label}
              style={{
                position: "absolute",
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: nodesOpacity,
                fontFamily: FONT_FAMILY_HEADLINE,
                fontWeight: 800,
                fontSize: 16,
                color: "#c4c7db",
                letterSpacing: 0.5,
                whiteSpace: "nowrap",
              }}
            >
              {n.label}
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: centerOpacity,
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 20,
              color: COLORS.white,
              border: "1px solid #3a3d4d",
              borderRadius: 10,
              padding: "10px 16px",
              background: "#0a0b12",
            }}
          >
            NEGOCIO
          </div>
          <div
            style={{
              position: "absolute",
              left: "68%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: vosOpacity,
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 22,
              color: COLORS.electricBlue,
              border: `1.5px solid ${COLORS.electricBlue}`,
              borderRadius: 10,
              padding: "8px 18px",
              background: "#0a0b12",
              filter: `drop-shadow(0 0 14px ${COLORS.electricBlue}aa)`,
            }}
          >
            VOS
          </div>
        </div>
      </AbsoluteFill>
    </RevealBox>
  );
};
