// src/components/BadgeRow.tsx
import RemoteImage from "./RemoteImage";
import { ASSETS } from "../data/assets";

export default function BadgeRow() {
  return (
    <div className="mt-4 flex flex-wrap gap-3 items-center">
      <RemoteImage src={ASSETS.badge1} alt="Badge 1" className="h-10 w-auto" rounded />
      <RemoteImage src={ASSETS.badge2} alt="Badge 2" className="h-10 w-auto" rounded />
    </div>
  );
}