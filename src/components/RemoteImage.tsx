// src/components/RemoteImage.tsx
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  rounded?: boolean;
};

export default function RemoteImage({
  src,
  alt,
  className = "",
  width,
  height,
  rounded = false,
}: Props) {
  const [ok, setOk] = useState(true);
  const radius = rounded ? "rounded-xl" : "";
  return ok ? (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      className={`${radius} ${className}`}
      onError={() => setOk(false)}
    />
  ) : (
    <div
      role="img"
      aria-label={alt}
      className={`grid place-items-center bg-neutral-200 text-neutral-500 ${radius} ${className}`}
      style={{ width: width || "auto", height: height || "auto" }}
    >
      {/* Fallback bubble */}
      <span className="text-xs">image unavailable</span>
    </div>
  );
}