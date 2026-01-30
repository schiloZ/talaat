'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    text: "Un véritable délice ! L'ambiance chaleureuse et les saveurs authentiques de Chez Talaat m'ont transporté. Le poulet DG est simplement divin. Je recommande vivement !",
    author: 'Marie K.',
    location: 'Cocody, Abidjan',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    text: "Le meilleur tilapia braisé d'Abidjan ! Le service est impeccable et l'ambiance parfaite pour un dîner en famille ou entre amis. On y retourne chaque week-end.",
    author: 'Konan A.',
    location: 'Plateau, Abidjan',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    text: 'Une cuisine raffinée qui allie tradition et modernité. Les grillades sont exceptionnelles et le cadre est magnifique. Chez Talaat est devenu notre adresse préférée !',
    author: 'Aminata D.',
    location: 'Marcory, Abidjan',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleDotClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex(index);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-32 px-[5%] text-center relative bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(13, 13, 13, 0.95) 0%, rgba(26, 26, 26, 0.9) 50%, rgba(13, 13, 13, 0.95) 100%), url('https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=80')`,
      }}
    >
      {/* Section Header */}
      <div className="mb-16 fade-in">
        <div className="font-montserrat text-xs tracking-[4px] uppercase text-gold mb-4">
          Témoignages
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl font-normal text-white">
          Ce Que Disent Nos Clients
        </h2>
        <div className="w-16 h-0.5 bg-primary-red mx-auto mt-6" />
      </div>

      {/* Testimonial Slider */}
      <div className="max-w-3xl mx-auto relative min-h-[350px] md:min-h-[300px] fade-in">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`p-8 transition-all duration-500 ${
              index === currentIndex
                ? 'opacity-100 translate-x-0 relative'
                : 'opacity-0 translate-x-12 absolute inset-0 pointer-events-none'
            }`}
          >
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

            {/* Quote */}
            <p className="testimonial-text font-playfair text-xl md:text-2xl italic text-cream leading-relaxed mb-6">
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
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8 fade-in">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary-red scale-125'
                : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
