import React from "react";
import { AbsoluteFill } from "remotion";
import { INTRO_PROFILE_CARD } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_VIOLET_BLUE,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div style={{ display: "flex", gap: 4 }}>
    <span style={{ fontFamily: FONT_FAMILY_UI, fontWeight: 800, fontSize: 13, color: COLORS.white }}>
      {value}
    </span>
    <span style={{ fontFamily: FONT_FAMILY_UI, fontWeight: 500, fontSize: 13, color: "#9599b3" }}>
      {label}
    </span>
  </div>
);

// Recreación del perfil de Instagram de referencia (no tenemos el archivo de
// imagen en disco, solo llegó como contenido visual en el chat, así que el
// avatar es un placeholder con gradiente P2P en vez de la foto real).
export const IntroProfileCard: React.FC = () => (
  <RevealBox from={INTRO_PROFILE_CARD.from} to={INTRO_PROFILE_CARD.to}>
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: "10%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(8,9,20,0.78)",
          border: `1px solid ${COLORS.violet}44`,
          borderRadius: 22,
          padding: "16px 22px",
          boxShadow: `0 0 30px ${COLORS.violet}33`,
          maxWidth: 340,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: GRADIENT_VIOLET_BLUE,
            flexShrink: 0,
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        />
        <div>
          <div
            style={{
              fontFamily: FONT_FAMILY_HEADLINE,
              fontWeight: 900,
              fontSize: 20,
              color: COLORS.white,
            }}
          >
            joandowd.gm
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY_UI,
              fontWeight: 500,
              fontSize: 13,
              color: "#9599b3",
              marginTop: 2,
              marginBottom: 6,
            }}
          >
            Joan Dowd | Negocios inmobiliarios
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
            <Stat value="53" label="publicaciones" />
            <Stat value="2083" label="seguidores" />
            <Stat value="42" label="seguidos" />
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY_UI,
              fontWeight: 400,
              fontSize: 12,
              color: "#9599b3",
              lineHeight: 1.4,
            }}
          >
            Agencia de publicidad
            <br />
            🏠 Te ayudo a captar +5 propiedades sin referidos ni portales.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  </RevealBox>
);
