"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle("menu-open");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove("menu-open");
  };

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-400 ${
          isScrolled
            ? "bg-warm-black/95 backdrop-blur-md py-3"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="hidden md:flex gap-8 font-montserrat text-xs tracking-widest uppercase">
          <span className="opacity-80">Lun-Dim: 8h-23h</span>
          <span className="opacity-80">2 Plateaux, Abidjan</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="#commande"
            className="font-montserrat text-[0.7rem] tracking-widest uppercase px-6 py-3 bg-primary-red text-white hover:bg-deep-red hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-red/40 transition-all duration-300"
          >
            Commander
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col gap-1.5 p-2.5 cursor-pointer"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-[998] transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-full max-w-[400px] h-screen bg-warm-black z-[999] flex flex-col pt-24 px-12 pb-12 transition-all duration-400 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeMobileMenu}
          className="mobile-menu-close absolute top-6 right-6 w-10 h-10 bg-transparent border border-white/20 hover:bg-primary-red hover:border-primary-red transition-all duration-300"
        />
        <div className="font-parisienne text-4xl text-white mb-2">
          Chez Talaat
        </div>
        <div className="font-montserrat text-[0.65rem] tracking-[4px] uppercase text-primary-red mb-12">
          Restaurant Mirador
        </div>
        <nav className="flex flex-col">
          {[
            { href: "#about", label: "Notre Histoire" },
            { href: "#menu", label: "La Carte" },
            { href: "#gallery", label: "Galerie" },
            { href: "#testimonials", label: "Avis Clients" },
            { href: "#reservation", label: "Réservation" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className={`font-playfair text-3xl text-cream py-4 border-b border-white/5 hover:text-primary-red hover:pl-4 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-5 opacity-0"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen
                  ? `${0.1 + index * 0.05}s`
                  : "0s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t border-white/10">
          <p className="font-montserrat text-xs tracking-wider text-cream/60 mb-2">
            Réservations
          </p>
          <a
            href="tel:+22501234567"
            className="font-cormorant text-lg text-white"
          >
            +225 01 23 45 67
          </a>
          <p className="font-montserrat text-xs tracking-wider text-cream/60 mb-2 mt-4">
            Adresse
          </p>
          <span className="font-cormorant text-lg text-white">
            2 Plateaux, Abidjan
          </span>
        </div>
      </div>
    </>
  );
}
