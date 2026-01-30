import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      {/* Video Background - Plus visible */}
      <div className="absolute inset-0">
        <video
          src="https://res.cloudinary.com/dzhkssyry/video/upload/v1769783632/movie_wflalr.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Overlay plus léger + vignette */}
        <div className="absolute inset-0 bg-warm-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-transparent to-warm-black/50" />
      </div>

      {/* Red Accent Line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-primary-red hidden lg:block" />

      {/* Content */}
      <div className="text-center z-10 px-4">
        <div className="inline-block border border-gold/40 px-6 py-2 mb-8 animate-fade-in-up-delay-1">
          <span className="font-montserrat text-xs tracking-[4px] uppercase text-gold">
            Établi depuis 2010
          </span>
        </div>

        <h1
          className="font-parisienne text-6xl md:text-8xl lg:text-9xl font-normal text-white leading-none mb-6 animate-fade-in-up-delay-2"
          style={{
            textShadow: "2px 2px 0 #C41E3A, 4px 4px 0 rgba(196, 30, 58, 0.3)",
          }}
        >
          Chez Talaat
        </h1>

        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-up-delay-3">
          <div className="w-16 h-px bg-gold/50" />
          <span className="font-montserrat text-sm tracking-[6px] uppercase text-white">
            Restaurant Mirador
          </span>
          <div className="w-16 h-px bg-gold/50" />
        </div>

        <p className="font-cormorant text-xl italic text-cream/90 mb-10 animate-fade-in-up-delay-4">
          Une expérience culinaire inoubliable au cœur d&apos;Abidjan
        </p>

        <a
          href="#reservation"
          className="inline-block font-montserrat text-xs tracking-[3px] uppercase px-10 py-4 bg-primary-red text-white hover:bg-white hover:text-primary-red transition-all duration-300 animate-fade-in-up-delay-5"
        >
          Découvrir
        </a>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-black to-transparent" />
    </section>
  );
}
