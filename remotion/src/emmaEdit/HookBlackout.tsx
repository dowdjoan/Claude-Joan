import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { HOOK_EMMA } from "./timeline";
import { COLORS } from "../shared/theme";

// El archivo fuente tiene ~1.8s de video ajeno pisados justo en el rango
// de origen que cubre este beat (fuente ~0.6s-2.4s: la transición/intro de
// OTRO creador, "Les presento a @emanuelmdzz", quedó grabada encima). El
// audio de Emma ahí es real y continuo, pero el video en ese tramo no es
// Emma. En vez de mostrar esos frames, se tapa todo el beat con fondo
// negro opaco (el brief permite explícitamente cortar al speaker cuando
// conviene) y se deja sonar el audio real debajo mientras entran los
// subtítulos "EMMA" / "COMMUNITY MANAGER" y el badge.
export const HookBlackout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < HOOK_EMMA.from || t >= HOOK_EMMA.to) return null;

  return <AbsoluteFill style={{ backgroundColor: COLORS.bgNear }} />;
};
