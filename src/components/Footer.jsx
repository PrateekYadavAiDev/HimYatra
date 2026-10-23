import React from 'react';
import { Compass, Phone, Mail, MapPin, Heart, ShieldCheck, ArrowUp } from 'lucide-react';
import { COMPANY_INFO, DESTINATIONS } from '../data/travelData';

import { saveNewsletterSubscription } from '../lib/supabaseClient';

export default function Footer({ onOpenBooking }) {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [subStatus, setSubStatus] = React.useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubStatus('subscribing');

    const res = await saveNewsletterSubscription(newsletterEmail);
    if (res.success) {
      setSubStatus('subscribed');
      setNewsletterEmail('');
      setTimeout(() => setSubStatus(''), 4000);
    } else {
      setSubStatus('error');
      setTimeout(() => setSubStatus(''), 4000);
    }
  };

  return (
    <footer className="main-footer">
      <div className="container">
        {/* Top Newsletter / Pre-Footer Strip */}
        <div className="footer-newsletter-card">
          <div className="newsletter-text">
            <span className="newsletter-badge">Pahadi Seasonal Updates</span>
            <h3>Get Snowfall Alerts & Exclusive Flash Deals</h3>
            <p>Subscribe for seasonal route openings, Rohtang/Kunzum pass updates, and festive discounts.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              required 
              placeholder="Enter your email address..." 
              className="newsletter-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button type="submit" className="newsletter-submit-btn" disabled={subStatus === 'subscribing'}>
              {subStatus === 'subscribing' ? 'Joining...' : subStatus === 'subscribed' ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-columns-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <Compass className="footer-brand-icon" size={26} />
              <span className="footer-brand-name">Himalaya<span>Ex</span></span>
            </div>
            <p className="footer-desc">
              Premier mountain travel company based in Manali, Himachal Pradesh. Handcrafting unforgettable journeys across Himachal Pradesh and Uttarakhand with local Pahadi guides, verified mountain cabs, and cozy stays.
            </p>
            <div className="footer-reg-badge">
              <ShieldCheck size={16} className="text-teal" />
              <span>Govt. Reg: {COMPANY_INFO.regNumber}</span>
            </div>
          </div>

          {/* Col 2: Himachal Destinations */}
          <div className="footer-col">
            <h4 className="footer-col-title">Himachal Pradesh</h4>
            <ul className="footer-links-list">
              <li><a href="#destinations">Spiti Valley Expedition</a></li>
              <li><a href="#destinations">Manali & Solang Valley</a></li>
              <li><a href="#destinations">Kasol, Tosh & Kheerganga</a></li>
              <li><a href="#destinations">Jibhi & Tirthan Valley</a></li>
              <li><a href="#destinations">Dharamshala & Bir Billing</a></li>
              <li><a href="#destinations">Shimla, Kufri & Kinnaur</a></li>
            </ul>
          </div>

          {/* Col 3: Uttarakhand Destinations */}
          <div className="footer-col">
            <h4 className="footer-col-title">Uttarakhand Circuits</h4>
            <ul className="footer-links-list">
              <li><a href="#destinations">Kedarnath Dham Pilgrimage</a></li>
              <li><a href="#destinations">Auli Ski Resort & Meadows</a></li>
              <li><a href="#destinations">Rishikesh River Rafting</a></li>
              <li><a href="#destinations">Chopta Tungnath Trek</a></li>
              <li><a href="#destinations">Nainital & Bhimtal Lakes</a></li>
              <li><a href="#destinations">Jim Corbett Wildlife Safari</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Direct Contact</h4>
            <div className="footer-contact-items">
              <p>
                <MapPin size={16} className="text-teal inline mr-2" />
                <span>{COMPANY_INFO.address}</span>
              </p>
              <p>
                <Phone size={16} className="text-teal inline mr-2" />
                <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
              </p>
              <p>
                <Mail size={16} className="text-teal inline mr-2" />
                <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
              </p>
            </div>

            <button 
              type="button" 
              className="footer-plan-cta"
              onClick={() => onOpenBooking(null)}
            >
              Plan Custom Itinerary
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} HimalayaEx Private Limited. All rights reserved. Crafted with <Heart size={14} className="text-red inline mx-1" fill="#ef4444" /> for mountain lovers.
          </p>

          <button 
            type="button" 
            className="back-to-top-btn" 
            onClick={scrollToTop}
            title="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
