import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Share2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOUR_PACKAGES, COMPANY_INFO } from '../data/travelData';

import { saveBooking } from '../lib/supabaseClient';

export default function BookingModal({ initialData, onClose }) {
  const defaultPackage = TOUR_PACKAGES[0];
  
  const [selectedPkgId, setSelectedPkgId] = useState(
    initialData?.id || (initialData?.title ? TOUR_PACKAGES.find(p => p.title === initialData.title)?.id : defaultPackage.id) || defaultPackage.id
  );
  
  const currentPkg = TOUR_PACKAGES.find(p => p.id === selectedPkgId) || defaultPackage;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState(initialData?.checkIn || '2026-11-15');
  const [adults, setAdults] = useState(initialData?.adults || 2);
  const [children, setChildren] = useState(0);
  const [pickupCity, setPickupCity] = useState('Chandigarh (Airport / Railway)');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Calculate pricing
  const unitPrice = initialData?.customTrip ? initialData.perPersonCost : currentPkg.price;
  const subtotal = unitPrice * adults + Math.round(unitPrice * 0.6 * children);
  const advanceAmount = Math.round(subtotal * 0.20);
  const balanceOnArrival = subtotal - advanceAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `HIM-${Math.floor(100000 + Math.random() * 900000)}`;
    const tourName = initialData?.customTrip 
      ? `${initialData.duration} in ${initialData.destination}` 
      : currentPkg.title;

    // Persist to Supabase backend
    const saveRes = await saveBooking({
      bookingReference: generatedId,
      fullName,
      email,
      phone,
      tourName,
      travelDate,
      pickupLocation: pickupCity,
      adults,
      children,
      totalPrice: subtotal,
      advanceToken: advanceAmount,
      specialRequests: specialNote,
      isCustomTrip: !!initialData?.customTrip,
      customTripDetails: initialData?.customTrip ? initialData : null
    });

    if (!saveRes.success) {
      console.warn('Supabase booking save warning:', saveRes.error);
    }

    setBookingId(generatedId);
    setIsSubmitting(false);
    setBookingConfirmed(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Fallback gracefully
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="booking-modal-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="modal-close-icon-btn" 
          onClick={onClose}
          aria-label="Close booking modal"
        >
          <X size={22} />
        </button>

        {!bookingConfirmed ? (
          <div>
            <div className="booking-modal-header">
              <span className="booking-modal-badge">
                <Sparkles size={14} />
                <span>Instant Mountain Reservation</span>
              </span>
              <h2 className="booking-modal-title">
                {initialData?.customTrip ? 'Reserve Custom Himalayan Tour' : 'Book Your Mountain Getaway'}
              </h2>
              <p className="booking-modal-sub">
                Lock your dates with a nominal 20% advance token. Pay remainder upon arrival in Himachal / Uttarakhand.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="booking-form-grid">
              {/* Package Selection */}
              {!initialData?.customTrip && (
                <div className="form-full-width">
                  <label className="field-label">Select Package</label>
                  <select
                    className="modal-input-field"
                    value={selectedPkgId}
                    onChange={(e) => setSelectedPkgId(e.target.value)}
                  >
                    {TOUR_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.title} ({pkg.duration}) — ₹{pkg.price.toLocaleString('en-IN')} / person
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Start Date & Pickup City */}
              <div className="form-half-width">
                <label className="field-label">Preferred Start Date</label>
                <div className="input-with-icon">
                  <Calendar size={17} className="input-icon-svg" />
                  <input
                    type="date"
                    required
                    className="modal-input-field pl-10"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-half-width">
                <label className="field-label">Pickup Location</label>
                <div className="input-with-icon">
                  <MapPin size={17} className="input-icon-svg" />
                  <select
                    className="modal-input-field pl-10"
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                  >
                    <option value="Chandigarh (Airport / Railway)">Chandigarh (Airport / Railway)</option>
                    <option value="New Delhi (Airport / Majnu Ka Tila)">New Delhi (Airport / Majnu Ka Tila)</option>
                    <option value="Dehradun Airport (Jolly Grant)">Dehradun Airport (Jolly Grant)</option>
                    <option value="Haridwar / Rishikesh Railway">Haridwar / Rishikesh Railway</option>
                    <option value="Manali / Bhuntar Airport">Manali / Bhuntar Airport</option>
                    <option value="Shimla Railway Station">Shimla Railway Station</option>
                  </select>
                </div>
              </div>

              {/* Adults & Children Count */}
              <div className="form-half-width">
                <label className="field-label">Adults (12+ yrs)</label>
                <div className="modal-counter-wrap">
                  <button
                    type="button"
                    className="modal-count-btn"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                  >-</button>
                  <span className="modal-count-num">{adults}</span>
                  <button
                    type="button"
                    className="modal-count-btn"
                    onClick={() => setAdults(adults + 1)}
                  >+</button>
                </div>
              </div>

              <div className="form-half-width">
                <label className="field-label">Children (2 - 11 yrs)</label>
                <div className="modal-counter-wrap">
                  <button
                    type="button"
                    className="modal-count-btn"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                  >-</button>
                  <span className="modal-count-num">{children}</span>
                  <button
                    type="button"
                    className="modal-count-btn"
                    onClick={() => setChildren(children + 1)}
                  >+</button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="form-full-width">
                <label className="field-label">Primary Traveler Full Name</label>
                <div className="input-with-icon">
                  <User size={17} className="input-icon-svg" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Sharma"
                    className="modal-input-field pl-10"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-half-width">
                <label className="field-label">WhatsApp Number (For Driver & Coordinator)</label>
                <div className="input-with-icon">
                  <Phone size={17} className="input-icon-svg" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="modal-input-field pl-10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-half-width">
                <label className="field-label">Email Address (For Voucher)</label>
                <div className="input-with-icon">
                  <Mail size={17} className="input-icon-svg" />
                  <input
                    type="email"
                    required
                    placeholder="vikram@example.com"
                    className="modal-input-field pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-full-width">
                <label className="field-label">Special Requests (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Jain food, senior citizen room on ground floor, extra room heater..."
                  className="modal-input-field"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                />
              </div>

              {/* Price Breakdown Card */}
              <div className="form-full-width booking-pricing-summary">
                <div className="pricing-line">
                  <span>Selected Tour:</span>
                  <strong>{initialData?.customTrip ? `${initialData.duration} in ${initialData.destination}` : currentPkg.title}</strong>
                </div>
                <div className="pricing-line">
                  <span>Travelers:</span>
                  <span>{adults} Adults {children > 0 ? `, ${children} Children` : ''}</span>
                </div>
                <div className="pricing-line total-highlight">
                  <span>Total Tour Cost:</span>
                  <span className="text-xl font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="advance-split-box">
                  <div className="split-col">
                    <span className="split-label">20% Token Today</span>
                    <span className="split-val text-teal">₹{advanceAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="split-col">
                    <span className="split-label">Balance on Arrival</span>
                    <span className="split-val">₹{balanceOnArrival.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="form-full-width">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="booking-submit-btn w-full"
                >
                  {isSubmitting ? (
                    <span>Confirming Reservation...</span>
                  ) : (
                    <>
                      <span>Confirm & Generate Booking Voucher</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="safe-booking-note">
                  <ShieldCheck size={14} className="text-teal inline" /> Free cancellation & date changes up to 7 days prior to departure.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation & Downloadable Voucher View */
          <div className="booking-confirmation-view animate-fade-in printable-voucher">
            <div className="confirmation-top-icon">
              <CheckCircle2 size={54} className="text-teal" />
            </div>

            <h2 className="confirm-title">Reservation Confirmed!</h2>
            <p className="confirm-sub">
              Your Himalayan adventure has been registered. A copy of your voucher and itinerary has been dispatched to <strong>{email}</strong>.
            </p>

            <div className="voucher-card">
              <div className="voucher-header">
                <div>
                  <h3 className="voucher-brand">HimalayaEx</h3>
                  <span className="voucher-license">Govt. HP Reg: {COMPANY_INFO.regNumber}</span>
                </div>
                <div className="voucher-id-pill">
                  <span>Voucher #: </span>
                  <strong>{bookingId}</strong>
                </div>
              </div>

              <div className="voucher-details-grid">
                <div className="v-item">
                  <span className="v-label">Traveler Name</span>
                  <span className="v-val">{fullName || 'Valued Guest'}</span>
                </div>
                <div className="v-item">
                  <span className="v-label">Contact</span>
                  <span className="v-val">{phone}</span>
                </div>
                <div className="v-item">
                  <span className="v-label">Selected Tour</span>
                  <span className="v-val">{initialData?.customTrip ? `${initialData.duration} in ${initialData.destination}` : currentPkg.title}</span>
                </div>
                <div className="v-item">
                  <span className="v-label">Start Date</span>
                  <span className="v-val">{travelDate}</span>
                </div>
                <div className="v-item">
                  <span className="v-label">Pickup Point</span>
                  <span className="v-val">{pickupCity}</span>
                </div>
                <div className="v-item">
                  <span className="v-label">Travelers</span>
                  <span className="v-val">{adults} Adults {children > 0 ? `, ${children} Children` : ''}</span>
                </div>
                <div className="v-item">
                  <span className="v-label">Total Tour Cost</span>
                  <span className="v-val font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="v-item">
                  <span className="v-label">Status</span>
                  <span className="v-val text-teal font-semibold">Token Initiated (Pay Rest on Arrival)</span>
                </div>
              </div>

              <div className="voucher-helpline-box">
                <p>📍 <strong>Local Office:</strong> {COMPANY_INFO.address}</p>
                <p>📞 <strong>24/7 Mountain Helpline:</strong> {COMPANY_INFO.phone}</p>
                <p>💬 <strong>WhatsApp Travel Concierge:</strong> +91 98160 45890</p>
              </div>
            </div>

            <div className="confirmation-action-buttons">
              <button 
                type="button" 
                className="btn-primary"
                onClick={handlePrint}
              >
                <Printer size={16} />
                <span>Print / Save Voucher (PDF)</span>
              </button>

              <button 
                type="button" 
                className="btn-accent"
                onClick={onClose}
              >
                <span>Back to Explorer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
