import React from "react";

interface MotionDataPlayerProps {
  src: string;
  alt?: string;
}

const MotionDataPlayer: React.FC<MotionDataPlayerProps> = ({ src, alt }) => {
  return (
    <div className="bg-default shadow-sm rounded-md">
      <video src={src} controls className="w-full rounded-md" />
    </div>
  );
};

export default MotionDataPlayer;
