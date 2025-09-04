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
  const [loading, setLoading] = useState(true);
  const radius = rounded ? "rounded-xl" : "";
  
  return ok ? (
    <div className="relative">
      {loading && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse ${radius}`}
          style={{ width: width || "auto", height: height || "auto" }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
        className={`${radius} ${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={() => setOk(false)}
        onLoad={() => setLoading(false)}
      />
    </div>
  ) : (
    <div
      role="img"
      aria-label={alt}
      className={`grid place-items-center bg-gray-200 text-gray-500 ${radius} ${className}`}
      style={{ width: width || "auto", height: height || "auto" }}
    >
      {/* Fallback bubble */}
      <span className="text-xs font-medium">Image unavailable</span>
    </div>
  );
}