"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const GOOGLE_STATS = {
  rating: 3.9,
  totalReviews: 2110,
  // Ajuste ces % selon la réalité (doit faire 100)
  distribution: [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 12 },
    { stars: 3, pct: 7 },
    { stars: 2, pct: 4 },
    { stars: 1, pct: 5 },
  ],
};

const testimonials = [
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "Un restaurant agréable et convivial, proposant une cuisine variée et savoureuse. Le service est attentionné et l'ambiance chaleureuse. Une adresse idéale pour un repas réussi à Abidjan.",
    author: "Ahmed GADDOUR",
    location: "Local Guide · Abidjan",
    rating: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "J'ai bien aimé, la musique n'était pas trop forte. Le repas a pris un peu de temps avant d'arriver mais ça pouvait aller. Nous on était un peu pressées vu que c'était notre pause déjeuner 😊",
    author: "Floriane Kouadio",
    location: "Abidjan",
    rating: 4,
  },
  {
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    text: "J'ai aimé mon passage, on était à la salle de l'étage. Endroit sympa et bien aménagé. Le serveur faisait son travail et était courtois. Temps d'attente court. J'ai aimé mon chawarma. Rapport qualité-prix très bon. Je recommande !",
    author: "Vee TT",
    location: "Local Guide · Abidjan",
    rating: 5,
  },
];

function StarRow({
  rating,
  size = 18,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(5)].map((_, i) => {
        const isFull = i < full;
        const isHalf = i === full && hasHalf;
        return (
          <span
            key={i}
            className="relative"
            style={{ width: size, height: size }}
          >
            {/* base star */}
            <svg
              className={`absolute inset-0 ${isFull || isHalf ? "text-gold" : "text-white/15"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              width={size}
              height={size}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>

            {/* half overlay */}
            {isHalf && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}
              >
                <svg
                  className="text-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width={size}
                  height={size}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("visible"),
        ),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const fadeElements = sectionRef.current?.querySelectorAll(".fade-in");
    fadeElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleDotClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex(index);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-28 md:py-32 px-[5%] text-center relative bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(13, 13, 13, 0.95) 0%, rgba(26, 26, 26, 0.9) 50%, rgba(13, 13, 13, 0.95) 100%), url('https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=80')`,
      }}
    >
      {/* Header */}
      <div className="mb-10 md:mb-14 fade-in">
        <div className="font-montserrat text-xs tracking-[4px] uppercase text-gold mb-4">
          Avis Google
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl font-normal text-white">
          Ce Que Disent Nos Clients
        </h2>
        <div className="w-16 h-0.5 bg-primary-red mx-auto mt-6" />
      </div>

      {/* Stats Card */}
      <div className="max-w-5xl mx-auto mb-12 md:mb-14 fade-in">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch bg-black/35 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8">
          {/* Left summary */}
          <div className="text-left flex flex-col justify-between">
            <div>
              <div className="flex items-end gap-3">
                <div className="font-playfair text-5xl md:text-6xl text-white leading-none">
                  {GOOGLE_STATS.rating.toFixed(1)}
                </div>
                <div className="pb-1">
                  <StarRow
                    rating={GOOGLE_STATS.rating}
                    className="justify-start"
                  />
                  <div className="font-montserrat text-xs tracking-widest uppercase text-white/60 mt-2">
                    {GOOGLE_STATS.totalReviews.toLocaleString("en-US")} reviews
                  </div>
                </div>
              </div>

              <div className="mt-4 font-cormorant text-lg text-cream/90">
                Majoritairement des avis 5★
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/PyWqYeiuLBHooSjm8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-montserrat text-xs tracking-widest uppercase text-white/70 hover:text-gold transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Voir tous les avis sur Google
            </a>
          </div>

          {/* Right distribution */}
          <div className="text-left">
            <div className="font-montserrat text-xs tracking-[4px] uppercase text-white/70 mb-5">
              Répartition des notes
            </div>

            <div className="space-y-3">
              {GOOGLE_STATS.distribution.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <div className="w-10 font-montserrat text-xs tracking-widest text-white/80">
                    {row.stars}★
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gold/90 rounded-full"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <div className="w-12 text-right font-montserrat text-xs tracking-widest text-white/60">
                    {row.pct}%
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-white/50 font-montserrat text-[0.7rem] tracking-wider">
              * Statistiques affichées à titre indicatif (ajustables dans le
              code).
            </div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="max-w-3xl mx-auto relative min-h-[420px] md:min-h-[360px] fade-in">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`p-7 md:p-8 transition-all duration-500 ${
              index === currentIndex
                ? "opacity-100 translate-y-0 relative"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <div className="bg-black/35 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-[3px] border-primary-red shadow-xl">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Stars */}
              <StarRow
                rating={testimonial.rating}
                className="justify-center mb-5"
              />

              {/* Quote */}
              <p className="font-playfair text-xl md:text-2xl italic text-cream leading-relaxed mb-6">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="font-montserrat text-sm tracking-widest uppercase text-white font-medium">
                {testimonial.author}
              </div>
              <div className="font-cormorant text-base text-gold italic mt-1">
                {testimonial.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8 fade-in">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Voir avis ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary-red scale-125"
                : "bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
