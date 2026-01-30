'use client';

import { useState, useEffect, useRef } from 'react';

type MenuCategory = 'entrees' | 'plats' | 'grillades' | 'desserts' | 'boissons';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  badge?: string;
}

interface MenuData {
  icon: string;
  title: string;
  items: MenuItem[];
  columns?: { title: string; items: MenuItem[] }[];
}

const menuData: Record<MenuCategory, MenuData> = {
  entrees: {
    icon: '🥗',
    title: 'Entrées',
    items: [
      { name: 'Salade Talaat', description: 'Légumes frais, avocat, crevettes grillées, vinaigrette maison', price: '4 500 F' },
      { name: 'Salade Niçoise', description: 'Thon, œufs, olives, haricots verts, tomates cerises', price: '4 000 F' },
      { name: 'Nems au Poulet', description: '6 pièces croustillantes, sauce aigre-douce', price: '3 500 F' },
      { name: 'Accras de Morue', description: 'Beignets de morue épicés, sauce pimentée', price: '3 000 F' },
      { name: 'Avocat aux Crevettes', description: 'Demi-avocat garni, crevettes sauce cocktail', price: '5 000 F' },
      { name: 'Soupe de Poisson', description: 'Bouillon parfumé, morceaux de poisson, croûtons', price: '3 500 F' },
    ],
  },
  plats: {
    icon: '🍛',
    title: 'Plats Principaux',
    items: [
      { name: 'Poulet DG', description: 'Poulet sauté aux plantains mûrs, légumes de saison', price: '8 000 F', badge: "Chef's Choice" },
      { name: 'Attiéké Poisson', description: 'Semoule de manioc, poisson braisé, légumes grillés', price: '6 500 F', badge: 'Local' },
      { name: 'Riz Sauce Graine', description: 'Riz blanc, sauce graine onctueuse, viande de bœuf', price: '5 500 F' },
      { name: 'Foutou Sauce Arachide', description: 'Foutou banane, sauce arachide, poulet fumé', price: '6 000 F', badge: 'Local' },
      { name: 'Kedjenou de Poulet', description: 'Poulet mijoté aux légumes, épices traditionnelles', price: '7 500 F' },
      { name: 'Spaghetti Fruits de Mer', description: 'Crevettes, moules, calamars, sauce tomate maison', price: '9 000 F' },
      { name: 'Riz Cantonais', description: 'Riz sauté, légumes, œufs, crevettes, jambon', price: '5 000 F' },
      { name: 'Garba', description: 'Attiéké, thon frit, piment, oignon, tomate', price: '3 000 F', badge: 'Populaire' },
    ],
  },
  grillades: {
    icon: '🥩',
    title: 'Grillades',
    items: [
      { name: 'Côte de Bœuf Grillée', description: '500g, frites maison, sauce au poivre', price: '15 000 F', badge: "Chef's Choice" },
      { name: 'Tilapia Braisé', description: 'Poisson entier aux épices, alloco, attiéké', price: '9 500 F', badge: 'Populaire' },
      { name: 'Brochettes Mixtes', description: 'Bœuf, poulet, crevettes (6 pièces), sauce arachide', price: '8 500 F' },
      { name: 'Poulet Braisé', description: 'Demi-poulet mariné, alloco, piment', price: '7 000 F' },
      { name: 'Carpe Braisée', description: 'Poisson aux épices locales, accompagnements au choix', price: '11 000 F' },
      { name: "Côtelettes d'Agneau", description: '4 pièces, légumes grillés, sauce menthe', price: '14 000 F' },
      { name: 'Brochettes de Poulet', description: '6 pièces marinées aux épices africaines', price: '5 000 F' },
      { name: 'Capitaine Grillé', description: 'Filet de capitaine, beurre citronné, riz', price: '12 000 F' },
    ],
  },
  desserts: {
    icon: '🍰',
    title: 'Desserts',
    items: [
      { name: 'Fondant au Chocolat', description: 'Cœur coulant, glace vanille, coulis de framboise', price: '4 500 F', badge: "Chef's Choice" },
      { name: 'Salade de Fruits Frais', description: 'Mangue, ananas, papaye, passion, menthe fraîche', price: '3 000 F' },
      { name: 'Crème Brûlée', description: 'Vanille de Madagascar, caramel croustillant', price: '4 000 F' },
      { name: 'Bananes Flambées', description: 'Bananes caramélisées, rhum, glace vanille', price: '3 500 F' },
      { name: 'Tiramisu Maison', description: 'Recette traditionnelle, cacao amer', price: '4 000 F' },
      { name: 'Glaces Artisanales', description: '3 boules au choix : vanille, chocolat, coco, mangue', price: '2 500 F' },
    ],
  },
  boissons: {
    icon: '🍹',
    title: 'Boissons',
    items: [],
    columns: [
      {
        title: 'Boissons Fraîches',
        items: [
          { name: 'Jus de Bissap', description: 'Hibiscus frais, menthe, gingembre', price: '1 500 F' },
          { name: 'Jus de Gingembre', description: 'Gingembre frais, citron, miel', price: '1 500 F' },
          { name: 'Jus de Baobab', description: 'Bouye naturel, vanille', price: '1 500 F' },
          { name: 'Cocktail Tropical', description: 'Mangue, ananas, fruit de la passion', price: '2 500 F' },
          { name: 'Eau Minérale', description: 'Plate ou gazeuse (50cl)', price: '1 000 F' },
          { name: 'Sodas', description: 'Coca, Fanta, Sprite, Schweppes', price: '1 000 F' },
        ],
      },
      {
        title: 'Vins & Alcools',
        items: [
          { name: 'Bière Locale', description: 'Flag, Ivoire, Castel (65cl)', price: '1 500 F' },
          { name: 'Bière Importée', description: 'Heineken, 1664, Corona', price: '2 500 F' },
          { name: 'Vin Rouge (verre)', description: 'Sélection du moment', price: '3 000 F' },
          { name: 'Vin Rouge (bouteille)', description: 'Bordeaux, Côtes du Rhône', price: '15 000 F' },
          { name: 'Champagne', description: 'Moët & Chandon', price: '75 000 F' },
          { name: 'Whisky', description: "Johnny Walker, Jack Daniel's (dose)", price: '5 000 F' },
        ],
      },
    ],
  },
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('entrees');
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

  const categories: { key: MenuCategory; label: string }[] = [
    { key: 'entrees', label: 'Entrées' },
    { key: 'plats', label: 'Plats Principaux' },
    { key: 'grillades', label: 'Grillades' },
    { key: 'desserts', label: 'Desserts' },
    { key: 'boissons', label: 'Boissons' },
  ];

  const currentMenu = menuData[activeCategory];

  return (
    <section ref={sectionRef} id="menu" className="py-32 px-[5%] bg-charcoal relative">
      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-52 bg-gradient-to-b from-charcoal to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20 fade-in">
        <div className="font-montserrat text-xs tracking-[4px] uppercase text-gold mb-4">
          Nos Spécialités
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-normal text-white">
          La Carte
        </h2>
        <div className="w-16 h-0.5 bg-primary-red mx-auto mt-6" />
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-2 md:gap-4 mb-16 flex-wrap px-4 fade-in">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`font-montserrat text-[0.65rem] md:text-xs tracking-widest uppercase px-3 md:px-5 py-3 transition-all duration-300 border ${
              activeCategory === cat.key
                ? 'bg-primary-red text-white border-primary-red opacity-100'
                : 'bg-white/5 text-cream/60 border-transparent hover:bg-white/10 hover:opacity-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-4 fade-in">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
          <span className="text-3xl">{currentMenu.icon}</span>
          <h3 className="font-playfair text-2xl md:text-3xl text-white font-normal">
            {currentMenu.title}
          </h3>
        </div>

        {/* Regular Menu Items */}
        {currentMenu.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {currentMenu.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start py-5 border-b border-white/5 gap-4 hover:pl-2 hover:border-primary-red hover:bg-white/[0.02] transition-all duration-300 group"
              >
                <div className="flex-1">
                  <h4 className="font-playfair text-lg text-white mb-1">{item.name}</h4>
                  <p className="text-sm text-cream/60 italic">{item.description}</p>
                  {item.badge && (
                    <span className="inline-block font-montserrat text-[0.6rem] tracking-wider uppercase bg-gold text-warm-black px-2 py-1 mt-2 rounded-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="font-playfair text-lg text-primary-red font-medium whitespace-nowrap pl-4">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drinks with Columns */}
        {currentMenu.columns && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {currentMenu.columns.map((column, colIndex) => (
              <div key={colIndex}>
                <h5 className="font-montserrat text-xs tracking-[3px] uppercase text-gold mb-6 pb-2 border-b border-gold/30">
                  {column.title}
                </h5>
                {column.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start py-5 border-b border-white/5 gap-4 hover:pl-2 hover:border-primary-red hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="font-playfair text-lg text-white mb-1">{item.name}</h4>
                      <p className="text-sm text-cream/60 italic">{item.description}</p>
                    </div>
                    <div className="font-playfair text-lg text-primary-red font-medium whitespace-nowrap pl-4">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-16 fade-in">
        <a
          href="#reservation"
          className="inline-block font-montserrat text-xs tracking-[3px] uppercase px-10 py-4 bg-transparent text-white border border-white hover:bg-primary-red hover:border-primary-red hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-red/30 transition-all duration-300"
        >
          Réserver une Table
        </a>
      </div>
    </section>
  );
}
