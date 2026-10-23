import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall } from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../data/travelData';

export default function FaqSection({ onOpenBooking }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="faq-section">
      <div className="container">
        <div className="faq-layout-grid">
          {/* Left Column: Title & Mountain Advice Box */}
          <div className="faq-info-col">
            <span className="section-eyebrow">Himalayan Travel Guide</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="faq-lead-desc">
              Everything you need to know before packing your woollens and heading to the majestic hills of Himachal and Uttarakhand.
            </p>

            <div className="mountain-advice-card">
              <div className="advice-header">
                <HelpCircle size={20} className="text-teal" />
                <h4>Have a custom question?</h4>
              </div>
              <p>
                Our Manali and Dehradun trip planners are happy to answer your questions on weather, snowfall, route conditions, or child-friendly hotels.
              </p>
              <div className="advice-actions">
                <a 
                  href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`} 
                  className="advice-call-btn"
                >
                  <PhoneCall size={16} />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="faq-accordion-col">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-icon-wrap">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-content animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
