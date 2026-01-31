"use client";

import { useState, useEffect, useRef } from "react";

export default function Commande() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    adresse: "",
    plat: "",
    quantite: "1",
    extras: "",
    instructions: "",
  });

  const platsDisponibles = [
    // Plats
    "Plat de Crispy + Frites - 5 000F",
    "Poulet Panné + Frites - 9 000F",
    "1/2 Poulet Panné + Frites - 5 000F",
    "Poulet Grillé - 9 000F",
    "1/2 Poulet Grillé - 5 000F",
    "Poulet Sauté - 10 000F",
    "Poulet Kédjénou - 10 000F",
    "Brochette Poulet Taouk - 5 000F",
    "Plat de Viande Mélange - 6 000F",
    "Poulet Rôti + Frites - 7 500F",
    "Riz Cantonnais Crevette - 3 000F",
    "Riz Cantonnais Poulet - 2 500F",
    "Steak Crème Fraîche - 6 000F",
    "Escalope Crème Fraîche - 6 000F",
    // Manaïche
    "Manaïche Zatar - 1 500F",
    "Manaïche Fromage - 2 500F",
    "Manaïche Viande - 2 500F",
    "Makloub - 3 000F",
    // Chawarma
    "Chawarma Poulet - 2 500F",
    "Chawarma Viande - 2 500F",
    "Chawarma Kafta - 2 500F",
    "Sandwich Tacos - 3 000F",
    "Sandwich Tacos + Frites - 4 000F",
    // Pizza
    "Pizza Talaat (P) - 5 500F",
    "Pizza Talaat (M) - 6 500F",
    "Pizza Talaat (G) - 7 500F",
    "Pizza Royal (P) - 5 000F",
    "Pizza Royal (M) - 6 000F",
    "Pizza Royal (G) - 7 500F",
    "Pizza Poulet (P) - 5 000F",
    "Pizza Crevette (G) - 9 500F",
    // Hamburger
    "Sandwich Zinger - 3 500F",
    "Sandwich Zinger + Frites - 4 500F",
    "Bœuf Burger - 4 000F",
    "Plat Hamburger + Frites - 3 500F",
    // Salades
    "Salade Libanaise - 2 500F",
    "Salade César - 4 000F",
    "Salade Niçoise - 4 000F",
    // Boissons
    "Coca-Cola - 1 000F",
    "Fanta - 1 000F",
    "Eau Céleste (Grande) - 1 000F",
  ];

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `🍽️ *NOUVELLE COMMANDE - CHEZ TALAAT*

👤 *Client:* ${formData.nom}
📞 *Téléphone:* ${formData.telephone}
📍 *Adresse de livraison:* ${formData.adresse}

🍴 *Commande:*
- Plat: ${formData.plat}
- Quantité: ${formData.quantite}
${formData.extras ? `• Extras: ${formData.extras}` : ""}
${formData.instructions ? `• Instructions: ${formData.instructions}` : ""}

Merci de confirmer ma commande ! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "2250708868786";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="commande"
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
        <form
          onSubmit={handleSubmit}
          className="bg-black/20 p-8 md:p-12 backdrop-blur-sm fade-in"
        >
          <div className="mb-6">
            <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
              Votre Nom *
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              required
              className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
            />
          </div>

          <div className="mb-6">
            <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="+225 XX XX XX XX XX"
              required
              className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
            />
          </div>

          <div className="mb-6">
            <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
              Adresse de Livraison *
            </label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              placeholder="Votre adresse complète"
              required
              className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
            />
          </div>

          <div className="mb-6">
            <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
              Choisir un Plat *
            </label>
            <select
              name="plat"
              value={formData.plat}
              onChange={handleChange}
              required
              className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
            >
              <option value="" className="bg-charcoal">
                -- Sélectionnez un plat --
              </option>
              {platsDisponibles.map((plat, index) => (
                <option key={index} value={plat} className="bg-charcoal">
                  {plat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
                Quantité
              </label>
              <select
                name="quantite"
                value={formData.quantite}
                onChange={handleChange}
                className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num} className="bg-charcoal">
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
                Extras
              </label>
              <input
                type="text"
                name="extras"
                value={formData.extras}
                onChange={handleChange}
                placeholder="Boisson, sauce..."
                className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-montserrat text-xs tracking-widest uppercase text-white mb-2">
              Instructions Spéciales
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Sans oignon, bien cuit, etc..."
              rows={3}
              className="w-full p-4 bg-white/10 border border-white/20 text-white font-cormorant text-base placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full p-5 bg-[#25D366] text-white font-montserrat text-xs tracking-[3px] uppercase hover:bg-[#128C7E] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 mt-4 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Commander via WhatsApp
          </button>
        </form>

        {/* Info */}
        <div className="fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">
            Commandez Maintenant
          </h2>

          <p className="text-lg text-white/80 mb-8">
            Passez votre commande directement via WhatsApp et recevez vos plats
            libanais préférés chez vous !
          </p>

          <div className="mb-8">
            <h4 className="font-montserrat text-xs tracking-[3px] uppercase text-white/70 mb-2">
              Appelez-nous
            </h4>
            <a
              href="tel:+2250708868786"
              className="font-playfair text-2xl text-white hover:text-gold transition-colors"
            >
              +225 07 08 86 87 86
            </a>
            <br />
            <a
              href="tel:+2250711459814"
              className="font-playfair text-2xl text-white hover:text-gold transition-colors"
            >
              +225 07 11 45 98 14
            </a>
          </div>

          <div className="mb-8">
            <h4 className="font-montserrat text-xs tracking-[3px] uppercase text-white/70 mb-2">
              Horaires de Livraison
            </h4>
            <p className="text-lg text-white">
              Lundi - Dimanche
              <br />
              8h00 - 22h00
            </p>
          </div>

          <div className="mb-8">
            <h4 className="font-montserrat text-xs tracking-[3px] uppercase text-white/70 mb-2">
              Notre Adresse
            </h4>
            <p className="text-lg text-white mb-4">
              Chez Talaat - 2 Plateaux
              <br />
              Abidjan, Côte d&apos;Ivoire
            </p>

            {/* Google Maps Embed */}
            <div className="w-full h-48 md:h-56 overflow-hidden border border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d534.2027817743603!2d-3.9978217383968153!3d5.366807492383354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb5b32863507%3A0xf164e8b92326322b!2sChez%20Talaat%20-%202%20Plateaux!5e0!3m2!1sen!2sci!4v1769873216651!5m2!1sen!2sci"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chez Talaat - Google Maps"
              />
            </div>

            {/* Google Maps Link */}
            <a
              href="https://www.google.com/maps/place/Chez+Talaat+-+2+Plateaux/@5.3668075,-3.9978217,19z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-gold hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Ouvrir dans Google Maps
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-8">
            <a
              href="https://wa.me/2250708868786"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-white/30 flex items-center justify-center text-white font-montserrat text-xs hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300"
            >
              WA
            </a>
            <a
              href="#"
              className="w-12 h-12 border border-white/30 flex items-center justify-center text-white font-montserrat text-xs hover:bg-white hover:text-primary-red transition-all duration-300"
            >
              FB
            </a>
            <a
              href="#"
              className="w-12 h-12 border border-white/30 flex items-center justify-center text-white font-montserrat text-xs hover:bg-white hover:text-primary-red transition-all duration-300"
            >
              IG
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
