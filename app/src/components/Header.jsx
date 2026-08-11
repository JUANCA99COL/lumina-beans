import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#offer', label: 'Shop' },
  { href: '#reviews', label: 'Reviews' },
];

const OFFER_DROPDOWN = ['Bourbon', 'Typica', 'Caturra'];

function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll and allow Escape to close while the mobile nav is open.
  useEffect(() => {
    if (!navOpen) {
      setOfferOpen(false);
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [navOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setNavOpen(false);
    scrollToHash(href);
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <a
          href="#home"
          className="logo"
          aria-label="Lumina Beans home"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <Logo />
        </a>

        <nav className={`main-nav${navOpen ? ' open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
              {link.label}
            </a>
          ))}

          <div className={`nav-dropdown${offerOpen ? ' open' : ''}`}>
            <button
              className="nav-dropdown-trigger"
              aria-haspopup="true"
              aria-expanded={offerOpen}
              onClick={() => setOfferOpen((v) => !v)}
            >
              Our Offer{' '}
              <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
              </svg>
            </button>
            <div className="nav-dropdown-menu">
              {OFFER_DROPDOWN.map((item) => (
                <a key={item} href="#offer" onClick={(e) => handleNavClick(e, '#offer')}>{item}</a>
              ))}
            </div>
          </div>

          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
        </nav>

        <div className="header-icons">
          <motion.button whileHover={{ scale: 1.08, color: scrolled ? 'var(--color-heading-highlight)' : 'var(--color-accent)' }} whileTap={{ scale: 0.94 }} className="icon-btn" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" /></svg>
          </motion.button>
          <motion.button whileHover={{ scale: 1.08, color: scrolled ? 'var(--color-heading-highlight)' : 'var(--color-accent)' }} whileTap={{ scale: 0.94 }} className="icon-btn" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          </motion.button>
          <motion.button
            className="icon-btn nav-toggle"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={navOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
            <motion.span
              animate={navOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
            <motion.span
              animate={navOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            className="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setNavOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </header>
  );
}
