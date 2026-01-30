'use client';

import { useEffect, useRef } from 'react';

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const fadeElements = sectionRef.current?.querySelectorAll('.fade-in');
    fadeElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reservation"
      className="py-32 px-[5%] relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(196, 30, 58, 0.95) 0%, rgba(139, 0, 0, 0.95) 100%), url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1400&q=80')`,
      }}
    >
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto items-center">
        {/* Form */}
        <form className="bg-black/20 p-8 md:p-12 backdrop-blur-sm fade-in">
          <div className="mb-6">
            <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
              Votre Nom
            </label>
            <input
              type="text"
              placeholder="Entrez votre nom"
              className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
            />
          </div>

          <div className="mb-6">
            <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
            />
          </div>

          <div className="mb-6">
            <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              placeholder="+225 XX XX XX XX XX"
              className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
                Heure
              </label>
              <select className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300">
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
              Nombre de Personnes
            </label>
            <select className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300">
              <option value="1">1 personne</option>
              <option value="2">2 personnes</option>
              <option value="3">3 personnes</option>
              <option value="4">4 personnes</option>
              <option value="5-6">5-6 personnes</option>
              <option value="7-10">7-10 personnes</option>
              <option value="10+">Plus de 10</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-5 bg-white text-primary-red font-montserrat text-xs tracking-[3px] uppercase hover:bg-gold hover:text-warm-black hover:-translate-y-1 hover:shadow-xl transition-all duration-300 mt-4"
          >
            Réserver Ma Table
          </button>
        </form>

        {/* Info */}
        <div className="fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">
            Réservez Votre Table
          </h2>

          <div className="mb-8">
            <h4 className="font-montserrat text-xs tracking-[3px] uppercase text-white/70 mb-2">
              Réservation par Téléphone
            </h4>
            <a
              href="tel:+22501234567"
              className="font-playfair text-2xl text-white hover:text-gold transition-colors"
            >
              +225 01 23 45 67
            </a>
          </div>

          <div className="mb-8">
            <h4 className="font-montserrat text-xs tracking-[3px] uppercase text-white/70 mb-2">
              Horaires d&apos;Ouverture
            </h4>
            <p className="text-lg text-white">
              Lundi - Dimanche
              <br />
              11h00 - 23h00
            </p>
          </div>

          <div className="mb-8">
            <h4 className="font-montserrat text-xs tracking-[3px] uppercase text-white/70 mb-2">
              Adresse
            </h4>
            <p className="text-lg text-white">
              Quartier Mirador
              <br />
              Abidjan, Côte d&apos;Ivoire
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-8">
            {['FB', 'IG', 'WA'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-12 h-12 border border-white/30 flex items-center justify-center text-white font-montserrat text-xs hover:bg-white hover:text-primary-red transition-all duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
