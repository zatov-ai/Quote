// src/components/HeroBanner.tsx
import { ASSETS } from "../data/assets";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden hero-pan rounded-2xl border border-neutral-200">
      <div
        className="relative h-[260px] sm:h-[340px] w-full"
        style={{
          backgroundImage: `url('${ASSETS.hero}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay gradient for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">The Future of Freight is Intelligent</h1>
          <p className="text-sm sm:text-base text-neutral-700">AI-powered quotes, clearer options, faster bookings.</p>
        </div>
        {/* image used as child to enable hover animation */}
        <img src={ASSETS.hero} alt="" className="hero-img invisible" />
      </div>
    </section>
  );
}