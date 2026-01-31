"use client";

import { useState, useEffect, useRef } from "react";

type MenuCategory =
  | "manaiche"
  | "chawarma"
  | "plats"
  | "pizza"
  | "hamburger"
  | "salade"
  | "desserts"
  | "boissons";

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
  plats: {
    icon: "🍽️",
    title: "Plats",
    items: [
      {
        name: "Plat de Crispy + Frites",
        description: "Poulet croustillant accompagné de frites dorées",
        price: "5 000 F",
      },
      {
        name: "Poulet Panné + Frites",
        description: "Poulet pané maison, frites croustillantes",
        price: "9 000 F",
        badge: "Populaire",
      },
      {
        name: "1/2 Poulet Panné + Frites",
        description: "Demi-portion de poulet pané avec frites",
        price: "5 000 F",
      },
      {
        name: "Poulet Grillé",
        description: "Poulet entier grillé aux épices orientales",
        price: "9 000 F",
        badge: "Chef's Choice",
      },
      {
        name: "1/2 Poulet Grillé",
        description: "Demi-poulet grillé aux épices",
        price: "5 000 F",
      },
      {
        name: "Poulet Sauté",
        description: "Poulet sauté aux légumes et épices",
        price: "10 000 F",
      },
      {
        name: "1/2 Poulet Sauté",
        description: "Demi-portion de poulet sauté",
        price: "5 000 F",
      },
      {
        name: "Poulet Kédjénou",
        description: "Poulet mijoté aux épices traditionnelles",
        price: "10 000 F",
      },
      {
        name: "1/2 Poulet Kédjénou",
        description: "Demi-portion de kédjénou",
        price: "5 000 F",
      },
      {
        name: "Plat de Steak",
        description: "Steak de bœuf grillé à point",
        price: "5 000 F",
      },
      {
        name: "Brochette Poulet Taouk",
        description: "Brochettes de poulet mariné à la libanaise",
        price: "5 000 F",
        badge: "Libanais",
      },
      {
        name: "Plat de Viande Mélange",
        description: "Assortiment de viandes grillées",
        price: "6 000 F",
      },
      {
        name: "1/2 Viande Mélange",
        description: "Demi-portion viandes mélangées",
        price: "4 000 F",
      },
      {
        name: "Poulet Rôti + Frites",
        description: "Poulet rôti doré avec frites",
        price: "7 500 F",
      },
      {
        name: "1/2 Poulet Rôti + Frites",
        description: "Demi-poulet rôti avec frites",
        price: "4 500 F",
      },
      {
        name: "Riz Cantonnais Crevette",
        description: "Riz sauté aux crevettes",
        price: "3 000 F",
      },
      {
        name: "Riz Cantonnais Viande",
        description: "Riz sauté à la viande hachée",
        price: "2 500 F",
      },
      {
        name: "Riz Cantonnais Poulet",
        description: "Riz sauté au poulet",
        price: "2 500 F",
      },
      {
        name: "Steak Crème Fraîche",
        description: "Steak nappé de crème fraîche",
        price: "6 000 F",
      },
      {
        name: "Escalope Crème Fraîche",
        description: "Escalope de poulet à la crème",
        price: "6 000 F",
      },
      {
        name: "Escalope",
        description: "Escalope de poulet grillée",
        price: "5 000 F",
      },
      {
        name: "Plat de Frites Fromage",
        description: "Frites gratinées au fromage",
        price: "3 000 F",
      },
      {
        name: "Plat de Frites Simple",
        description: "Frites dorées maison",
        price: "1 000 F",
      },
    ],
  },
  manaiche: {
    icon: "🫓",
    title: "Manaïche",
    items: [
      {
        name: "Manaïche Zatar",
        description: "Pain libanais au thym et huile d'olive",
        price: "1 500 F",
        badge: "Traditionnel",
      },
      {
        name: "Manaïche Fromage",
        description: "Pain libanais garni de fromage fondu",
        price: "2 500 F",
      },
      {
        name: "Manaïche Cocktail",
        description: "Pain libanais garniture mixte",
        price: "2 500 F",
      },
      {
        name: "Manaïche Viande",
        description: "Pain libanais à la viande épicée",
        price: "2 500 F",
        badge: "Populaire",
      },
      {
        name: "Makloub",
        description: "Spécialité libanaise farcie",
        price: "3 000 F",
      },
      {
        name: "Manaïche Jambon",
        description: "Pain libanais au jambon",
        price: "3 000 F",
      },
    ],
  },
  chawarma: {
    icon: "🌯",
    title: "Chawarma & Sandwichs",
    items: [
      {
        name: "Sandwich Tacos",
        description: "Tacos garni à la libanaise",
        price: "3 000 F",
      },
      {
        name: "Sandwich Tacos + Frites",
        description: "Tacos avec portion de frites",
        price: "4 000 F",
        badge: "Populaire",
      },
      {
        name: "Sandwich Francisco",
        description: "Sandwich spécial maison",
        price: "2 500 F",
      },
      {
        name: "Sandwich Crispy",
        description: "Poulet croustillant en sandwich",
        price: "2 500 F",
      },
      {
        name: "Chawarma Foie de Poulet",
        description: "Foie de poulet mariné et grillé",
        price: "2 500 F",
      },
      {
        name: "Chawarma Kafta",
        description: "Viande hachée épicée grillée",
        price: "2 500 F",
        badge: "Libanais",
      },
      {
        name: "Chawarma Saucisse",
        description: "Saucisse grillée en sandwich",
        price: "2 500 F",
      },
      {
        name: "Chawarma Foie de Bœuf",
        description: "Foie de bœuf mariné",
        price: "2 500 F",
      },
      {
        name: "Chawarma Viande",
        description: "Viande de bœuf marinée, épices orientales",
        price: "2 500 F",
        badge: "Chef's Choice",
      },
      {
        name: "Chawarma Viande Tomate",
        description: "Viande aux tomates fraîches",
        price: "2 500 F",
      },
      {
        name: "Chawarma Poulet",
        description: "Poulet mariné aux épices libanaises",
        price: "2 500 F",
        badge: "Populaire",
      },
      {
        name: "Chawarma Petit Pois",
        description: "Garniture aux petits pois",
        price: "2 500 F",
      },
      {
        name: "Chawarma Filet",
        description: "Filet de poulet grillé",
        price: "2 500 F",
      },
      {
        name: "Chawarma Gésier",
        description: "Gésiers marinés et grillés",
        price: "2 500 F",
      },
      {
        name: "Chawarma Boulette",
        description: "Boulettes de viande épicées",
        price: "2 500 F",
      },
    ],
  },
  pizza: {
    icon: "🍕",
    title: "Pizzas",
    items: [
      {
        name: "Pizza Royal",
        description: "Tomate, fromage, champignon, jambon (P/M/G)",
        price: "5 000 / 6 000 / 7 500 F",
      },
      {
        name: "Pizza au Poulet",
        description: "Tomate, fromage, poulet (P/M/G)",
        price: "5 000 / 6 000 / 7 500 F",
      },
      {
        name: "Pizza Bolonaise",
        description: "Sauce tomate, fromage, viande hachée, légumes (P/M/G)",
        price: "5 000 / 6 000 / 7 500 F",
      },
      {
        name: "Pizza Carnivore",
        description: "Tomate, fromage, viande hachée (P/M/G)",
        price: "5 000 / 6 000 / 7 500 F",
      },
      {
        name: "Pizza Calabrese",
        description: "Fromage, sauce, jambon, poivre, tomate, olive (P/M/G)",
        price: "5 500 / 6 500 / 7 500 F",
      },
      {
        name: "Pizza Talaat",
        description: "Tomate, fromage, olive, champignon, maïs, jambon (P/M/G)",
        price: "5 500 / 6 500 / 7 500 F",
        badge: "Spécialité",
      },
      {
        name: "Pizza Reine",
        description: "Tomate, fromage, champignon, olive (P/M/G)",
        price: "5 000 / 6 000 / 7 500 F",
      },
      {
        name: "Pizza Mexicaine",
        description: "Fromage, champignon, poulet, poivron (P/M/G)",
        price: "5 000 / 6 000 / 7 500 F",
      },
      {
        name: "Pizza Végétarienne",
        description: "Tomate, fromage, champignon, olive, oignons (P/M/G)",
        price: "5 000 / 6 000 / 7 500 F",
      },
      {
        name: "Pizza Crème Fraîche",
        description: "Base crème fraîche, garniture au choix (P/M/G)",
        price: "5 500 / 6 500 / 8 000 F",
      },
      {
        name: "Pizza Margherita",
        description: "Tomate, fromage, basilic (P/M/G)",
        price: "5 000 / 6 000 / 7 500 F",
      },
      {
        name: "Pizza Quatre Saisons",
        description: "Tomate, fromage, champignon, olive, oignons (P/M/G)",
        price: "5 500 / 6 500 / 7 500 F",
      },
      {
        name: "Pizza Thon",
        description: "Sauce tomate, fromage, thon (P/M/G)",
        price: "6 000 / 7 000 / 8 000 F",
      },
      {
        name: "Pizza Crevette",
        description: "Sauce tomate, fromage, crevettes (P/M/G)",
        price: "7 000 / 8 000 / 9 500 F",
        badge: "Premium",
      },
      {
        name: "Pizza Pepperoni",
        description: "Sauce tomate, fromage, saucisse (P/M/G)",
        price: "6 000 / 7 000 / 8 000 F",
      },
      {
        name: "Pizza Texas",
        description: "Fromage, poulet, maïs (P/M/G)",
        price: "5 500 / 6 500 / 8 000 F",
      },
      {
        name: "Pizza Calzone",
        description: "Tomate, fromage, champignon, œuf, jambon (P/M/G)",
        price: "5 000 / 6 000 / 7 500 F",
      },
    ],
  },
  hamburger: {
    icon: "🍔",
    title: "Hamburgers",
    items: [
      {
        name: "Sandwich Zinger",
        description: "Burger épicé croustillant",
        price: "3 500 F",
        badge: "Populaire",
      },
      {
        name: "Sandwich Zinger + Frites",
        description: "Burger épicé avec frites",
        price: "4 500 F",
      },
      {
        name: "Plat Hamburger + Frites",
        description: "Burger classique avec frites",
        price: "3 500 F",
      },
      {
        name: "Bœuf Burger",
        description: "Burger 100% bœuf grillé",
        price: "4 000 F",
        badge: "Chef's Choice",
      },
      {
        name: "Sandwich Hamburger",
        description: "Burger classique",
        price: "2 500 F",
      },
      {
        name: "Plat Chicken + Frites",
        description: "Burger poulet avec frites",
        price: "3 500 F",
      },
      {
        name: "Sandwich Chicken",
        description: "Burger au poulet",
        price: "2 500 F",
      },
      {
        name: "Plat Saucisse Burger + Frites",
        description: "Burger saucisse avec frites",
        price: "3 500 F",
      },
      {
        name: "Sandwich Saucisse Burger",
        description: "Burger à la saucisse",
        price: "2 500 F",
      },
    ],
  },
  salade: {
    icon: "🥗",
    title: "Salades",
    items: [
      {
        name: "Salade Libanaise",
        description: "Légumes frais, persil, menthe, vinaigrette citron",
        price: "2 500 F",
        badge: "Libanais",
      },
      {
        name: "Salade Niçoise",
        description: "Thon, œufs, olives, haricots verts, tomates",
        price: "4 000 F",
      },
      {
        name: "Salade Fromage",
        description: "Mesclun, fromage, noix, vinaigrette",
        price: "4 000 F",
      },
      {
        name: "Salade de Chef",
        description: "Salade composée du chef",
        price: "4 000 F",
        badge: "Chef's Choice",
      },
      {
        name: "Salade César",
        description: "Laitue, parmesan, croûtons, sauce césar",
        price: "4 000 F",
      },
    ],
  },
  desserts: {
    icon: "🍦",
    title: "Glaces & Desserts",
    items: [
      {
        name: "Glace 1 Boule",
        description: "Parfum au choix : vanille, chocolat, fraise...",
        price: "1 000 F",
      },
      {
        name: "Glace 2 Boules",
        description: "Deux parfums au choix",
        price: "1 500 F",
      },
      {
        name: "Frisco",
        description: "Glace enrobée de chocolat",
        price: "1 000 F",
      },
    ],
  },
  boissons: {
    icon: "🥤",
    title: "Boissons",
    items: [],
    columns: [
      {
        title: "Sodas & Jus",
        items: [
          {
            name: "Coca-Cola",
            description: "Canette ou bouteille",
            price: "1 000 F",
          },
          { name: "Fanta", description: "Orange ou exotic", price: "1 000 F" },
          {
            name: "Sprite",
            description: "Citron-lime rafraîchissant",
            price: "1 000 F",
          },
          { name: "Youki", description: "Soda local", price: "1 000 F" },
          {
            name: "Cocktail",
            description: "Mélange de jus de fruits",
            price: "1 000 F",
          },
          {
            name: "Moka Café",
            description: "Boisson au café",
            price: "1 000 F",
          },
          { name: "Ivoirio", description: "Soda ivoirien", price: "1 000 F" },
          {
            name: "Orangina",
            description: "Orange pétillante",
            price: "1 000 F",
          },
          { name: "Malta", description: "Boisson maltée", price: "1 000 F" },
        ],
      },
      {
        title: "Eaux",
        items: [
          {
            name: "Eau Céleste (Petite)",
            description: "Eau minérale 33cl",
            price: "500 F",
          },
          {
            name: "Eau Céleste (Grande)",
            description: "Eau minérale 1L",
            price: "1 000 F",
          },
        ],
      },
    ],
  },
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("plats");
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

  const categories: { key: MenuCategory; label: string }[] = [
    { key: "manaiche", label: "Manaïche" },
    { key: "chawarma", label: "Chawarma" },
    { key: "plats", label: "Plats" },
    { key: "pizza", label: "Pizzas" },
    { key: "hamburger", label: "Burgers" },
    { key: "salade", label: "Salades" },
    { key: "desserts", label: "Desserts" },
    { key: "boissons", label: "Boissons" },
  ];

  const currentMenu = menuData[activeCategory];

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="py-32 px-[5%] bg-charcoal relative"
    >
      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-52 bg-gradient-to-b from-charcoal to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20 fade-in">
        <div className="font-montserrat text-xs tracking-[4px] uppercase text-gold mb-4">
          Saveurs du Liban
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-normal text-white">
          Notre Carte
        </h2>
        <div className="w-16 h-0.5 bg-primary-red mx-auto mt-6" />
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-2 md:gap-3 mb-16 flex-wrap px-4 fade-in">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`font-montserrat text-[0.6rem] md:text-xs tracking-widest uppercase px-3 md:px-4 py-2 md:py-3 transition-all duration-300 border ${
              activeCategory === cat.key
                ? "bg-primary-red text-white border-primary-red opacity-100"
                : "bg-white/5 text-cream/60 border-transparent hover:bg-white/10 hover:opacity-100"
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
                  <h4 className="font-playfair text-lg text-white mb-1">
                    {item.name}
                  </h4>
                  <p className="text-sm text-cream/60 italic">
                    {item.description}
                  </p>
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
                      <h4 className="font-playfair text-lg text-white mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-cream/60 italic">
                        {item.description}
                      </p>
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
          COMMANDER
        </a>
      </div>
    </section>
  );
}
