"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const fadeElements = sectionRef.current?.querySelectorAll(".fade-in");
    fadeElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 px-[5%] bg-gradient-to-b from-warm-black to-charcoal"
    >
      {/* Section Header */}
      <div className="text-center mb-20 fade-in">
        <div className="font-montserrat text-xs tracking-[4px] uppercase text-gold mb-4">
          Notre Histoire
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-normal text-white">
          L&apos;Art de la Gastronomie
        </h2>
        <div className="w-16 h-0.5 bg-primary-red mx-auto mt-6" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
        {/* Images */}
        <div className="relative h-[400px] lg:h-[600px] fade-in">
          <div className="absolute top-0 left-0 w-[70%] h-[70%] shadow-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
              alt="Restaurant intérieur"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[55%] h-[55%] border-[3px] border-primary-red shadow-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&q=80"
              alt="Chef Talaat"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="fade-in">
          <h3 className="font-parisienne text-5xl md:text-6xl text-primary-red mb-6">
            Talaat
          </h3>
          <p className="text-lg md:text-xl leading-relaxed text-cream/85 mb-6">
            Bienvenue chez Talaat, où chaque plat raconte une histoire de
            passion et de tradition orientale. Niché au Boulevard Latrille à
            Abidjan, notre restaurant vous invite à découvrir une cuisine
            libanaise authentique, riche en saveurs, mêlant mezzés
            traditionnels, grillades parfumées et spécialités orientales.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-cream/85 mb-6">
            Notre chef, héritier d&apos;un savoir-faire ancestral, sélectionne
            méticuleusement les meilleurs ingrédients pour créer des plats
            généreux qui éveillent tous vos sens. Dans un cadre moderne et
            convivial, laissez-vous transporter par une expérience gastronomique
            aux saveurs du Liban.
          </p>

          {/* Chef Signature */}
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10">
            <div className="w-[70px] h-[70px] rounded-full bg-primary-red flex items-center justify-center font-parisienne text-3xl text-white">
              T
            </div>
            <div>
              <h4 className="font-playfair text-xl text-white mb-1">
                Chef Talaat
              </h4>
              <span className="font-montserrat text-xs tracking-widest uppercase text-gold">
                Chef Exécutif & Fondateur
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
