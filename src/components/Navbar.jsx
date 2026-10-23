import React, { useState, useEffect } from 'react';
import { Compass, Phone, Calendar, Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export default function Navbar({ onOpenBooking, onSelectSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Tour Packages', href: '#packages' },
    { label: 'Trip Planner', href: '#trip-planner' },
    { label: 'Why Us', href: '#features' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`main-navbar ${isScrolled ? 'scrolled' : ''}`}
      aria-label="Main Navigation"
    >
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo" onClick={(e) => handleLinkClick(e, '#hero')}>
          <div className="logo-icon-wrap">
            <Compass className="brand-compass-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Himalaya<span>Ex</span></span>
            <span className="brand-sub">Himachal & Uttarakhand</span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="nav-desktop-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link-item"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="nav-actions">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi%20HimalayaEx%2C%20I%20want%20to%20plan%20a%20mountain%20trip%20to%20Himachal%20%2F%20Uttarakhand.`}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-whatsapp-btn"
            title="Chat on WhatsApp with Mountain Expert"
          >
            <MessageCircle size={18} />
            <span className="desktop-only">Expert Advice</span>
          </a>

          <button
            id="nav-quick-book-btn"
            className="nav-reserve-pill"
            onClick={() => onOpenBooking(null)}
          >
            <span>Plan My Trip</span>
            <ArrowUpRight size={16} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-drawer-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-link"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-drawer-cta">
              <button
                className="btn-accent w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking(null);
                }}
              >
                <Calendar size={18} />
                Reserve / Customize Tour
              </button>
              <div className="mobile-contact-info">
                <p>📍 {COMPANY_INFO.address}</p>
                <p>📞 <strong>{COMPANY_INFO.phone}</strong> (24/7 Support)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
