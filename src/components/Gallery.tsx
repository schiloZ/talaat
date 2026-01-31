"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const galleryImages = [
  {
    src: "/images/food1.JPG",
    alt: "Plat gastronomique",
  },
  {
    src: "/images/food2.JPG",
    alt: "Viande grillée",
  },
  { src: "/images/food3.JPG", alt: "Dessert élégant" },
  {
    src: "/images/food4.JPG",
    alt: "Ambiance restaurant",
  },
  {
    src: "/images/food5.JPG",
    alt: "Plat signature",
  },
  {
    src: "/images/food6.PNG",
    alt: "Cuisine raffinée",
  },
  {
    src: "/images/food7.JPG",
    alt: "Cuisine raffinée",
  },
  {
    src: "/images/food8.JPG",
    alt: "Cuisine raffinée",
  },
  {
    src: "/images/food10.JPG",
    alt: "Cuisine raffinée",
  },
];

export default function Gallery() {
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
    <section ref={sectionRef} id="gallery" className="py-24 bg-warm-black">
      {/* Section Header */}
      <div className="text-center mb-12 px-[5%] fade-in">
        <div className="font-montserrat text-xs tracking-[4px] uppercase text-gold mb-4">
          Instagram
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl font-normal text-white">
          @ChezTalaat
        </h2>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 fade-in">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="gallery-item aspect-square relative overflow-hidden cursor-pointer"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Label */}
      <div className="text-center mt-8 fade-in">
        <span className="font-montserrat text-xs tracking-[3px] uppercase text-cream/50">
          Suivez-nous sur{" "}
          <a href="#" className="text-primary-red hover:underline">
            Instagram
          </a>
        </span>
      </div>
    </section>
  );
}
