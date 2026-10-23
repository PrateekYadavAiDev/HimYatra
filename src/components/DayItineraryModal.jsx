import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Check, 
  ShieldCheck, 
  Calendar, 
  Car, 
  Bed, 
  Coffee, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';

export default function DayItineraryModal({ packageData, onClose, onBookPackage }) {
  const [activeDay, setActiveDay] = useState(1);

  if (!packageData) return null;

  const handleDownloadItinerary = () => {
    // Generate text brochure for instant download
    const content = `=====================================================
HIMALAYAEX - DETAILED TOUR ITINERARY
Package: ${packageData.title}
Subtitle: ${packageData.subtitle}
Duration: ${packageData.duration} | State: ${packageData.state}
Price: ₹${packageData.price.toLocaleString('en-IN')} / person
=====================================================

DAY-BY-DAY SCHEDULE:
${packageData.itinerary.map(item => `Day ${item.day}: ${item.title}\n${item.desc}\n`).join('\n')}

INCLUSIONS:
${packageData.inclusions.map(inc => `• ${inc}`).join('\n')}

Pick-up: ${packageData.pickupLocation}
Drop-off: ${packageData.dropLocation}
Transport: ${packageData.transport}
Accommodation: ${packageData.accommodation}
Meals: ${packageData.meals}

Emergency Contact: +91 98160 45890 / explore@himalayaex.com
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${packageData.id}-itinerary.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="itinerary-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Close Button */}
        <button 
          className="modal-close-icon-btn" 
          onClick={onClose}
          aria-label="Close itinerary modal"
        >
          <X size={22} />
        </button>

        {/* Modal Header Banner */}
        <div className="itinerary-modal-banner">
          <img 
            src={packageData.image} 
            alt={packageData.title} 
            className="modal-banner-img"
          />
          <div className="modal-banner-overlay"></div>

          <div className="modal-banner-content">
            <div className="modal-tag-row">
              <span className="badge badge-amber">{packageData.state}</span>
              <span className="badge badge-teal">{packageData.duration}</span>
            </div>
            <h2 className="modal-title">{packageData.title}</h2>
            <p className="modal-subtitle">{packageData.subtitle}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="itinerary-modal-body">
          {/* Quick Specifications Bar */}
          <div className="modal-specs-strip">
            <div className="spec-item">
              <Car size={16} className="text-teal" />
              <div>
                <strong>Transport:</strong>
                <span>{packageData.transport}</span>
              </div>
            </div>
            <div className="spec-item">
              <Bed size={16} className="text-teal" />
              <div>
                <strong>Stay:</strong>
                <span>{packageData.accommodation}</span>
              </div>
            </div>
            <div className="spec-item">
              <Coffee size={16} className="text-teal" />
              <div>
                <strong>Meals:</strong>
                <span>{packageData.meals}</span>
              </div>
            </div>
            <div className="spec-item">
              <MapPin size={16} className="text-teal" />
              <div>
                <strong>Pickup / Drop:</strong>
                <span>{packageData.pickupLocation}</span>
              </div>
            </div>
          </div>

          <div className="itinerary-two-columns">
            {/* Left: Day-by-Day Interactive Timeline */}
            <div className="itinerary-timeline-col">
              <div className="timeline-col-header">
                <h3>Day-by-Day Journey Plan</h3>
                <button 
                  type="button" 
                  className="download-brochure-btn"
                  onClick={handleDownloadItinerary}
                  title="Download text itinerary"
                >
                  <Download size={14} />
                  <span>Download Itinerary</span>
                </button>
              </div>

              <div className="timeline-items-list">
                {packageData.itinerary.map((dayItem) => {
                  const isOpen = activeDay === dayItem.day;
                  return (
                    <div 
                      key={dayItem.day} 
                      className={`timeline-day-card ${isOpen ? 'open' : ''}`}
                    >
                      <button 
                        type="button"
                        className="timeline-day-header"
                        onClick={() => setActiveDay(isOpen ? null : dayItem.day)}
                      >
                        <div className="day-badge-num">
                          Day {dayItem.day}
                        </div>
                        <span className="day-title-text">{dayItem.title}</span>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      {isOpen && (
                        <div className="timeline-day-content animate-fade-in">
                          <p>{dayItem.desc}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Inclusions & Fast Booking Trigger */}
            <div className="itinerary-side-col">
              <div className="side-inclusions-box">
                <h4>What's Included</h4>
                <ul className="inclusions-check-list">
                  {packageData.inclusions.map((inc, i) => (
                    <li key={i}>
                      <Check size={15} className="text-teal check-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <div className="exclusions-note">
                  <strong>Not Included:</strong> Personal expenses, heater charges at remote high-altitude homestays, and lunch en-route unless specified.
                </div>
              </div>

              {/* Price & Action Card */}
              <div className="side-booking-callout">
                <div className="callout-price-row">
                  <div>
                    <span className="callout-from">All-inclusive package</span>
                    <div className="callout-price-val">₹{packageData.price.toLocaleString('en-IN')}</div>
                    <span className="callout-orig">₹{packageData.originalPrice.toLocaleString('en-IN')} per person</span>
                  </div>
                  <span className="save-pill">{packageData.discount}</span>
                </div>

                <button
                  type="button"
                  className="modal-book-now-btn"
                  onClick={() => {
                    onClose();
                    onBookPackage(packageData);
                  }}
                >
                  <span>Reserve This Tour</span>
                  <ArrowRight size={17} />
                </button>

                <p className="advance-note">
                  <ShieldCheck size={14} className="text-teal inline mr-1" />
                  Pay 20% now to confirm dates, rest on arrival in the hills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
