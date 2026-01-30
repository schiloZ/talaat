import Link from 'next/link';

export default function Footer() {
  const navLinks = [
    { href: '#about', label: 'Notre Histoire' },
    { href: '#menu', label: 'La Carte' },
    { href: '#gallery', label: 'Galerie' },
    { href: '#testimonials', label: 'Avis' },
    { href: '#reservation', label: 'Réservation' },
  ];

  return (
    <footer className="bg-warm-black py-16 px-[5%] text-center">
      <div className="font-parisienne text-5xl text-white mb-4">Chez Talaat</div>
      <div className="font-montserrat text-xs tracking-[3px] uppercase text-primary-red mb-8">
        Restaurant Mirador
      </div>

      <nav className="flex justify-center gap-8 flex-wrap mb-12">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-montserrat text-xs tracking-widest uppercase text-cream/60 hover:text-primary-red hover:opacity-100 transition-all duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <p className="text-sm text-cream/40 pt-8 border-t border-white/5">
        © 2024 Chez Talaat Restaurant Mirador. Tous droits réservés.
      </p>
    </footer>
  );
}
