// Identidad visual P2P: negro/azul extremadamente oscuro + violeta/magenta/azul
// eléctrico, glow controlado (nada cyberpunk/gamer). Ver spec del usuario.
export const COLORS = {
  bgNear: "#020207",
  bgPetrol: "#050914",
  white: "#f5f6fb",
  electricBlue: "#3b82f6",
  violet: "#8b5cf6",
  magenta: "#ec4899",
};

export const GRADIENT_VIOLET_BLUE = `linear-gradient(90deg, ${COLORS.violet} 0%, ${COLORS.electricBlue} 100%)`;
export const GRADIENT_MAGENTA_VIOLET_BLUE = `linear-gradient(90deg, ${COLORS.magenta} 0%, ${COLORS.violet} 55%, ${COLORS.electricBlue} 100%)`;

export const gradientText = (gradient: string): React.CSSProperties => ({
  backgroundImage: gradient,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
});

export const glow = (color: string, strength = 1): string =>
  `0 0 ${18 * strength}px ${color}, 0 0 ${44 * strength}px ${color}66`;

// Fuentes del sistema (bold/black) en vez de Google Fonts: evita depender de
// una descarga de red en render (bloqueada en este entorno) y sigue dando el
// look "sans-serif gruesa" que pide la referencia.
export const FONT_FAMILY_HEADLINE =
  "'Helvetica Neue', 'Arial Black', system-ui, sans-serif";
export const FONT_FAMILY_UI = "'Helvetica Neue', Arial, system-ui, sans-serif";
