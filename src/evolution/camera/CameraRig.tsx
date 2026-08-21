import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CameraState } from "../contracts/types";

interface CameraRigProps {
  children: React.ReactNode;
  cameraState?: CameraState;
  panBehavior?: 'still' | 'slow_push' | 'pullback' | 'lateral_track' | 'orbital' | 'vertical_drift';
  shake?: boolean;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  cameraState = { x: 0, y: 0, zoom: 1, rotation: 0, shakeIntensity: 0 },
  panBehavior = 'slow_push',
  shake = false,
}) => {
  const frame = useCurrentFrame();

  // Dynamic drift based on behavior
  let extraZoom = 0;
  let extraX = 0;
  let extraY = 0;

  if (panBehavior === 'slow_push') {
    extraZoom = interpolate(frame, [0, 300], [0, 0.08], { extrapolateRight: 'clamp' });
  } else if (panBehavior === 'pullback') {
    extraZoom = interpolate(frame, [0, 300], [0, -0.08], { extrapolateRight: 'clamp' });
  } else if (panBehavior === 'lateral_track') {
    extraX = interpolate(frame, [0, 300], [0, 40], { extrapolateRight: 'clamp' });
  } else if (panBehavior === 'vertical_drift') {
    extraY = interpolate(frame, [0, 300], [0, -30], { extrapolateRight: 'clamp' });
  } else if (panBehavior === 'orbital') {
    extraX = Math.sin(frame / 60) * 15;
    extraY = Math.cos(frame / 60) * 15;
  }

  // Micro shake offset
  const shakeX = shake ? (Math.sin(frame * 1.5) * 4 * cameraState.shakeIntensity) : 0;
  const shakeY = shake ? (Math.cos(frame * 1.7) * 4 * cameraState.shakeIntensity) : 0;

  const totalZoom = cameraState.zoom + extraZoom;
  const totalX = cameraState.x + extraX + shakeX;
  const totalY = cameraState.y + extraY + shakeY;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `translate(${totalX}px, ${totalY}px) scale(${totalZoom}) rotate(${cameraState.rotation}deg)`,
        transformOrigin: "center center",
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
};
