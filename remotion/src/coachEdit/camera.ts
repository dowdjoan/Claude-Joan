import { CAMERA_KEYFRAMES, CameraKeyframe } from "./timeline";

const TRANSITION_DURATION = 0.4; // s, punch-in suave

// Completa shiftX no definido con el último valor conocido, así cada
// keyframe no tiene que repetir el shift si no cambia.
const filled: Required<CameraKeyframe>[] = (() => {
  let lastShift = 0;
  return CAMERA_KEYFRAMES.map((k) => {
    if (k.shiftX !== undefined) lastShift = k.shiftX;
    return { ...k, shiftX: lastShift };
  });
})();

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const getCameraTransform = (
  timeSec: number,
): { scale: number; shiftX: number } => {
  let curr = filled[0];
  let prev = filled[0];
  for (let i = 0; i < filled.length; i++) {
    if (filled[i].at <= timeSec) {
      prev = curr;
      curr = filled[i];
    }
  }
  const progress = Math.min(
    Math.max((timeSec - curr.at) / TRANSITION_DURATION, 0),
    1,
  );
  const eased = easeOutCubic(progress);
  return {
    scale: prev.scale + (curr.scale - prev.scale) * eased,
    shiftX: prev.shiftX + (curr.shiftX - prev.shiftX) * eased,
  };
};
