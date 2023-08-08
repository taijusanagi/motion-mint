// components/MotionDataPlayer.tsx

import React from "react";

interface MotionDataPlayerProps {
  src: string; // Path to the motion data (e.g., video source)
  alt?: string; // Optional description of the motion data for accessibility
}

const MotionDataPlayer: React.FC<MotionDataPlayerProps> = ({ src, alt }) => {
  return (
    <div className="bg-default shadow-sm rounded-md">
      <video src={src} controls className="w-full rounded-md" alt={alt || "Motion Data Preview"} />
    </div>
  );
};

export default MotionDataPlayer;
