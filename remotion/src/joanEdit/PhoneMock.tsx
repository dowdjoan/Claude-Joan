import React from "react";
import { AbsoluteFill } from "remotion";
import { PHONE_MOCK_CARD } from "./timeline";
import {
  COLORS,
  FONT_FAMILY_HEADLINE,
  FONT_FAMILY_UI,
  GRADIENT_VIOLET_BLUE,
} from "../shared/theme";
import { RevealBox } from "../shared/RevealBox";

export const PhoneMock: React.FC = () => (
  <RevealBox from={PHONE_MOCK_CARD.from} to={PHONE_MOCK_CARD.to}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, ${COLORS.bgPetrol} 0%, ${COLORS.bgNear} 75%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY_HEADLINE,
          fontWeight: 900,
          fontSize: 40,
          color: COLORS.white,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        APLICADO A
        <br />
        NEGOCIOS INMOBILIARIOS
      </div>
      <div
        style={{
          width: 300,
          borderRadius: 30,
          border: `2px solid ${COLORS.violet}55`,
          background: "#0a0a16",
          boxShadow: `0 0 40px ${COLORS.violet}33`,
          padding: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: GRADIENT_VIOLET_BLUE,
            }}
          />
          <div style={{ fontFamily: FONT_FAMILY_UI, fontWeight: 700, fontSize: 14, color: COLORS.white }}>
            Joan Dowd | Negocios Inmobiliarios
          </div>
        </div>
        <div
          style={{
            background: "rgba(139,92,246,0.12)",
            border: `1px solid ${COLORS.violet}44`,
            borderRadius: 16,
            padding: 14,
          }}
        >
          <div style={{ fontFamily: FONT_FAMILY_UI, fontWeight: 700, fontSize: 13, color: "#cfd3e6", marginBottom: 6 }}>
            Agencia de publicidad
          </div>
          <div style={{ fontFamily: FONT_FAMILY_UI, fontWeight: 500, fontSize: 13, color: "#9599b3", lineHeight: 1.4 }}>
            Te ayudo a captar +5 propiedades sin referidos ni portales.
            Escribime &ldquo;CÓDIGO&rdquo; y te llegan 7 minutos de cómo lo...
          </div>
        </div>
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY_UI,
          fontWeight: 700,
          fontSize: 20,
          color: "#cfd3e6",
          textAlign: "center",
          marginTop: 22,
          maxWidth: 320,
        }}
      >
        Para que consigan vendedores y propietarios calificados
      </div>
    </AbsoluteFill>
  </RevealBox>
);
