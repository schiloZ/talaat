import Image from "next/image";
import Link from "next/link";

export default function Hero2() {
  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/Taalat.jpeg"
          alt="Restaurant background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-warm-black/92 via-warm-black/85 to-warm-black/92" />
      </div>

      {/* Pattern */}
      <div className="hero-pattern" />

      {/* Content */}
      <div className="text-center z-10 animate-fade-in-up">
        <div className="font-montserrat text-xs tracking-[4px] uppercase text-gold mb-6 animate-fade-in-up-delay-1">
          Établi depuis 2010
        </div>

        {/* Chef Hat SVG */}
        <div className="relative mb-4">
          <svg
            className="w-28 h-auto mx-auto mb-2 drop-shadow-2xl animate-float"
            viewBox="0 0 100 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="50" cy="25" rx="35" ry="20" fill="white" />
            <ellipse cx="25" cy="30" rx="15" ry="12" fill="white" />
            <ellipse cx="75" cy="30" rx="15" ry="12" fill="white" />
            <ellipse cx="50" cy="20" rx="20" ry="15" fill="white" />
            <rect x="20" y="40" width="60" height="35" fill="white" />
            <line
              x1="25"
              y1="50"
              x2="25"
              y2="75"
              stroke="#f0f0f0"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="50"
              x2="40"
              y2="75"
              stroke="#f0f0f0"
              strokeWidth="1"
            />
            <line
              x1="55"
              y1="50"
              x2="55"
              y2="75"
              stroke="#f0f0f0"
              strokeWidth="1"
            />
            <line
              x1="70"
              y1="50"
              x2="70"
              y2="75"
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          </svg>
        </div>

        <h1
          className="font-parisienne text-6xl md:text-8xl lg:text-9xl font-normal text-white leading-none mb-2 animate-fade-in-up-delay-2"
          style={{
            textShadow: "2px 2px 0 #C41E3A, 4px 4px 0 rgba(196, 30, 58, 0.3)",
          }}
        >
          Chez Talaat
        </h1>

        <div className="font-montserrat text-sm md:text-base tracking-[8px] uppercase text-white bg-primary-red inline-block px-8 py-3 animate-fade-in-up-delay-3">
          Restaurant Mirador
        </div>

        <p className="font-cormorant text-xl italic text-cream/80 mt-8 animate-fade-in-up-delay-4">
          Une expérience culinaire inoubliable au cœur d&apos;Abidjan
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up-delay-5">
        <span className="font-montserrat text-[0.6rem] tracking-[3px] uppercase opacity-60">
          Découvrir
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-primary-red to-transparent animate-scroll-pulse" />
      </div>
    </section>
  );
}
