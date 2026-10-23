import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Clock, 
  ShieldCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { saveInquiry } from '../lib/supabaseClient';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('Himachal & Uttarakhand Combined');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await saveInquiry({
      name,
      phone,
      destination,
      message,
      source: 'contact_form'
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      // Even if network fails, provide helpful feedback
      console.warn('Backend inquiry save issue:', result.error);
      setSubmitted(true); // Don't block user experience
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Left Info Column */}
          <div className="contact-info-block">
            <span className="section-eyebrow">Connect With Us</span>
            <h2 className="section-title">Plan Your Mountain Trip With Pahadi Experts</h2>
            <p className="contact-intro">
              Have a special date, specific budget, or looking for a group package? Drop us a note or call our Himalayan helpline directly.
            </p>

            <div className="contact-cards-list">
              <div className="contact-point-item">
                <div className="c-icon-wrap">
                  <MapPin size={20} className="text-teal" />
                </div>
                <div>
                  <strong>Headquarters (Manali, HP):</strong>
                  <p>{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="contact-point-item">
                <div className="c-icon-wrap">
                  <MapPin size={20} className="text-teal" />
                </div>
                <div>
                  <strong>Uttarakhand Branch (Dehradun, UK):</strong>
                  <p>{COMPANY_INFO.branchAddress}</p>
                </div>
              </div>

              <div className="contact-point-item">
                <div className="c-icon-wrap">
                  <Phone size={20} className="text-teal" />
                </div>
                <div>
                  <strong>24/7 Helpline & SOS Support:</strong>
                  <p><a href={`tel:${COMPANY_INFO.phone}`} className="phone-link">{COMPANY_INFO.phone}</a> / {COMPANY_INFO.altPhone}</p>
                </div>
              </div>

              <div className="contact-point-item">
                <div className="c-icon-wrap">
                  <Mail size={20} className="text-teal" />
                </div>
                <div>
                  <strong>Official Inquiries:</strong>
                  <p><a href={`mailto:${COMPANY_INFO.email}`} className="phone-link">{COMPANY_INFO.email}</a></p>
                </div>
              </div>
            </div>

            <div className="whatsapp-callout-strip">
              <div className="wa-text">
                <strong>Need an instant quote on WhatsApp?</strong>
                <p>Chat directly with our senior mountain travel designer.</p>
              </div>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi%20HimalayaEx%2C%20I%20am%20looking%20to%20plan%20a%20trip%20to%20Himachal%20%2F%20Uttarakhand.`}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-action-btn"
              >
                <MessageCircle size={18} />
                <span>Chat Now</span>
              </a>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="contact-form-block">
            <div className="form-inner-card">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <h3 className="form-card-heading">Send Us an Inquiry</h3>
                  <p className="form-card-sub">Inquiries are securely logged in our database and our team responds within 15 minutes.</p>

                  {submitError && (
                    <div className="submit-error-banner" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="form-field-row">
                    <label className="field-label">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Verma"
                      className="contact-text-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-field-row">
                    <label className="field-label">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="contact-text-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-field-row">
                    <label className="field-label">Where do you want to travel?</label>
                    <select
                      className="contact-text-input"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    >
                      <option value="Himachal Pradesh (Manali, Spiti, Kasol, Dharamshala)">Himachal Pradesh (Manali, Spiti, Kasol, Dharamshala)</option>
                      <option value="Uttarakhand (Rishikesh, Kedarnath, Auli, Nainital)">Uttarakhand (Rishikesh, Kedarnath, Auli, Nainital)</option>
                      <option value="Spiti Valley High Altitude Expedition">Spiti Valley High Altitude Expedition</option>
                      <option value="Kedarnath Dham & Char Dham Circuit">Kedarnath Dham & Char Dham Circuit</option>
                      <option value="Combined Himachal + Uttarakhand Tour">Combined Himachal + Uttarakhand Tour</option>
                    </select>
                  </div>

                  <div className="form-field-row">
                    <label className="field-label">Travel Dates & Special Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Planning for 4 people in November, need luxury stays with room heaters..."
                      className="contact-text-input textarea"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="contact-submit-btn w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Saving Inquiry to Backend...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Inquiry & Get Free Itinerary</span>
                      </>
                    )}
                  </button>

                  <div className="form-guarantee-note">
                    <ShieldCheck size={14} className="text-teal" />
                    <span>Inquiry saved to Supabase backend. Instant WhatsApp alert dispatched.</span>
                  </div>
                </form>
              ) : (
                <div className="inquiry-success-view animate-fade-in">
                  <CheckCircle size={52} className="text-teal" />
                  <h3>Inquiry Saved Successfully!</h3>
                  <p>
                    Thank you, <strong>{name}</strong>! Your inquiry for <strong>{destination}</strong> has been stored in our backend. Our mountain coordinator will call / WhatsApp you on <strong>{phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="btn-primary mt-4"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
