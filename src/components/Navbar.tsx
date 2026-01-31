"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Empêche le scroll du body quand menu ouvert
  useEffect(() => {
    if (isMobileMenuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");

    return () => document.body.classList.remove("menu-open");
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center px-6 md:px-12 py-4 transition-all duration-400 ${
          isScrolled
            ? "bg-warm-black/95 backdrop-blur-md py-3"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        {/* Left side (desktop info only) */}
        <div className="hidden md:flex gap-8 font-montserrat text-xs tracking-widest uppercase">
          <span className="opacity-80">Lun-Dim: 8h-23h</span>
          <span className="opacity-80">2 Plateaux, Abidjan</span>
        </div>

        {/* Right side always pushed right */}
        <div className="ml-auto flex items-center gap-3 md:gap-6">
          <Link
            href="#commande"
            className="font-montserrat text-[0.7rem] tracking-widest uppercase px-5 md:px-6 py-3 bg-primary-red text-white hover:bg-deep-red hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-red/40 transition-all duration-300"
          >
            Commander
          </Link>

          {/* Burger (visible on mobile + desktop if you want) */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            className="flex flex-col gap-1.5 p-2.5 cursor-pointer"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
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
        className={`fixed top-0 right-0 w-full max-w-[400px] h-screen bg-warm-black z-[999] flex flex-col pt-24 px-10 md:px-12 pb-12 transition-all duration-400 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* ❌ SUPPRIMÉ: le bouton close vide (l’autre croix) */}
        {/* La fermeture se fait via le burger (qui devient un X) ou clic overlay */}

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
            { href: "#commande", label: "Commander" },
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
            Commander
          </p>
          <a
            href="tel:+2250711459814"
            className="font-cormorant text-lg text-white"
          >
            +225 07 11 45 98 14
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
