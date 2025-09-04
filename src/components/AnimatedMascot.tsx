// src/components/AnimatedMascot.tsx
import RemoteImage from "./RemoteImage";
import { ASSETS } from "../data/assets";

type Props = { size?: number; className?: string; title?: string };

export default function AnimatedMascot({ size = 56, className = "", title = "ZATO AI" }: Props) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <RemoteImage
        src={ASSETS.mascot}
        alt={`${title} mascot`}
        width={size}
        height={size}
        rounded
        className="animate-float shadow-lg"
      />
    </div>
  );
}