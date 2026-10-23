import React from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export default function MobileQuickBar({ onOpenBooking }) {
  return (
    <div className="mobile-sticky-quick-bar" aria-label="Mobile quick actions">
      <a
        href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
        className="mobile-bar-btn call-btn"
        title="Call Mountain Expert"
      >
        <Phone size={18} />
        <span>Call</span>
      </a>

      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi%20HimalayaEx%2C%20I%20want%20to%20plan%20a%20mountain%20trip.`}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bar-btn whatsapp-btn"
        title="WhatsApp Chat"
      >
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        className="mobile-bar-btn reserve-btn"
        onClick={() => onOpenBooking(null)}
      >
        <Calendar size={18} />
        <span>Plan Trip</span>
      </button>
    </div>
  );
}
