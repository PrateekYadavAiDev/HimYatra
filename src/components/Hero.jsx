import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  Compass, 
  Sparkles, 
  Plane, 
  Hotel, 
  Mountain,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

export default function Hero({ onOpenBooking, onSearchSubmit }) {
  const [activeTab, setActiveTab] = useState('tours'); // 'tours' | 'treks' | 'stays'
  const [destination, setDestination] = useState('Spiti Valley, Himachal');
  const [checkIn, setCheckIn] = useState('2026-11-05');
  const [checkOut, setCheckOut] = useState('2026-11-12');
  const [guestCount, setGuestCount] = useState('2 Adults, 1 Room');
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleUpdateGuests = (newAdults, newChildren, newRooms) => {
    setAdults(newAdults);
    setChildren(newChildren);
    setRooms(newRooms);
    setGuestCount(`${newAdults} Adults${newChildren > 0 ? `, ${newChildren} Kids` : ''}, ${newRooms} Room${newRooms > 1 ? 's' : ''}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({
        tab: activeTab,
        destination,
        checkIn,
        checkOut,
        adults,
        children,
        rooms
      });
    } else {
      onOpenBooking({
        destination,
        checkIn,
        checkOut,
        guests: `${adults + children} Travelers`
      });
    }
  };

  return (
    <section id="hero" className="hero-section-wrapper">
      <div className="hero-curved-container">
        {/* Scenic Himalayan Alpine Chalet Background with Gradient Overlay */}
        <div className="hero-bg-media">
          <div className="hero-bg-overlay"></div>
        </div>

        {/* Inner Header Bar matching Reference */}
        <div className="hero-inner-topbar">
          <div className="hero-brand">
            <Compass className="hero-brand-icon" size={26} />
            <span className="hero-brand-name">himalaya<span>ex</span></span>
          </div>

          <div className="hero-top-links">
            <a href="#destinations" className="hero-top-link">Destinations</a>
            <a href="#packages" className="hero-top-link">Tour Packages</a>
            <a href="#features" className="hero-top-link">Why Us</a>
            <a href="#contact" className="hero-top-link">Contact Us</a>
          </div>

          <button 
            className="hero-signin-btn"
            onClick={() => onOpenBooking(null)}
          >
            Plan Trip
          </button>
        </div>

        {/* Hero Main Content Row */}
        <div className="hero-content-grid">
          {/* Left Column: Headline, Subtitle, Reference Pill Button */}
          <div className="hero-left-column">
            <div className="hero-badge-pill">
              <Sparkles size={15} />
              <span>Himachal & Uttarakhand Specialists</span>
            </div>

            <h1 className="hero-display-title">
              Let’s find your<br />
              <span className="hero-title-highlight">next adventure</span>
            </h1>

            <p className="hero-subtitle-text">
              From the snow-crowned passes of Spiti Valley and Rohtang to the tranquil cedar trails of Kasol and the sacred heights of Kedarnath — embark on authentic journeys crafted by native Pahadi guides.
            </p>

            <div className="hero-cta-group">
              <a 
                href="#packages" 
                className="hero-pill-btn"
                id="hero-take-tour-btn"
              >
                <span>Take a tour</span>
                <span className="pill-circle-icon">
                  <ArrowUpRight size={20} />
                </span>
              </a>

              <div className="hero-rating-snippet">
                <div className="hero-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span><strong>4.9/5</strong> rating from 1,800+ Indian travelers</span>
              </div>
            </div>

            {/* Slider track indicator like reference */}
            <div className="hero-slider-track">
              <span className="track-bar active"></span>
              <span className="track-bar"></span>
              <span className="track-bar"></span>
            </div>
          </div>

          {/* Right Column: Floating Interactive Booking Card matching reference */}
          <div className="hero-right-column">
            <div className="hero-floating-card">
              {/* Segmented Control Tabs */}
              <div className="booking-widget-tabs" role="tablist">
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'tours' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tours')}
                >
                  <Plane size={16} />
                  <span>Tour</span>
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'treks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('treks')}
                >
                  <Mountain size={16} />
                  <span>Treks</span>
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'stays' ? 'active' : ''}`}
                  onClick={() => setActiveTab('stays')}
                >
                  <Hotel size={16} />
                  <span>Hotels</span>
                </button>
              </div>

              {/* Booking Fields Form */}
              <form onSubmit={handleSearch} className="hero-search-form">
                {/* Destination Selector */}
                <div className="form-field-group">
                  <label htmlFor="destination-select" className="field-label">
                    Destination
                  </label>
                  <div className="field-input-box">
                    <MapPin className="field-icon" size={18} />
                    <select
                      id="destination-select"
                      className="field-select"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    >
                      <optgroup label="Himachal Pradesh">
                        <option value="Spiti Valley, Himachal">Spiti Valley & Chandratal Lake</option>
                        <option value="Manali & Solang, Himachal">Manali, Solang & Atal Tunnel</option>
                        <option value="Kasol, Tosh & Jibhi, Himachal">Kasol, Tosh & Jibhi Valley</option>
                        <option value="Dharamshala & Bir, Himachal">Dharamshala & Bir Billing</option>
                        <option value="Shimla & Kinnaur, Himachal">Shimla, Kufri & Kinnaur Valley</option>
                      </optgroup>
                      <optgroup label="Uttarakhand">
                        <option value="Rishikesh & Haridwar, Uttarakhand">Rishikesh Rapids & Ganga Aarti</option>
                        <option value="Kedarnath & Badrinath, Uttarakhand">Kedarnath Dham & Chopta Tungnath</option>
                        <option value="Auli & Chopta, Uttarakhand">Auli Skiing & Alpine Meadows</option>
                        <option value="Nainital & Jim Corbett, Uttarakhand">Nainital Lakes & Corbett Safari</option>
                        <option value="Mussoorie & Dhanaulti, Uttarakhand">Mussoorie & Dhanaulti Ridge</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Check In & Check Out Dates */}
                <div className="form-row-two-cols">
                  <div className="form-field-group">
                    <label htmlFor="check-in-date" className="field-label">
                      Check In / Start
                    </label>
                    <div className="field-input-box">
                      <CalendarIcon className="field-icon" size={17} />
                      <input
                        type="date"
                        id="check-in-date"
                        className="field-input"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="check-out-date" className="field-label">
                      Check Out / End
                    </label>
                    <div className="field-input-box">
                      <CalendarIcon className="field-icon" size={17} />
                      <input
                        type="date"
                        id="check-out-date"
                        className="field-input"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Guests & Room Selector */}
                <div className="form-field-group relative">
                  <label className="field-label">
                    Guests & Rooms
                  </label>
                  <button
                    type="button"
                    className="field-input-box text-left w-full"
                    onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                  >
                    <Users className="field-icon" size={18} />
                    <span className="field-text-val">{guestCount}</span>
                  </button>

                  {/* Popover for Adult / Kid / Room adjustments */}
                  {showGuestDropdown && (
                    <div className="guest-popover-menu animate-fade-in">
                      <div className="guest-row">
                        <div>
                          <strong>Adults</strong>
                          <span className="sub">Ages 12+</span>
                        </div>
                        <div className="counter-controls">
                          <button
                            type="button"
                            className="counter-btn"
                            onClick={() => handleUpdateGuests(Math.max(1, adults - 1), children, rooms)}
                          >-</button>
                          <span className="counter-val">{adults}</span>
                          <button
                            type="button"
                            className="counter-btn"
                            onClick={() => handleUpdateGuests(adults + 1, children, rooms)}
                          >+</button>
                        </div>
                      </div>

                      <div className="guest-row">
                        <div>
                          <strong>Children</strong>
                          <span className="sub">Ages 2 - 11</span>
                        </div>
                        <div className="counter-controls">
                          <button
                            type="button"
                            className="counter-btn"
                            onClick={() => handleUpdateGuests(adults, Math.max(0, children - 1), rooms)}
                          >-</button>
                          <span className="counter-val">{children}</span>
                          <button
                            type="button"
                            className="counter-btn"
                            onClick={() => handleUpdateGuests(adults, children + 1, rooms)}
                          >+</button>
                        </div>
                      </div>

                      <div className="guest-row">
                        <div>
                          <strong>Rooms</strong>
                          <span className="sub">Hotel / Tents</span>
                        </div>
                        <div className="counter-controls">
                          <button
                            type="button"
                            className="counter-btn"
                            onClick={() => handleUpdateGuests(adults, children, Math.max(1, rooms - 1))}
                          >-</button>
                          <span className="counter-val">{rooms}</span>
                          <button
                            type="button"
                            className="counter-btn"
                            onClick={() => handleUpdateGuests(adults, children, rooms + 1)}
                          >+</button>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="popover-done-btn"
                        onClick={() => setShowGuestDropdown(false)}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Big Dark Reserve CTA matching Reference */}
                <button
                  type="submit"
                  id="hero-reserve-btn"
                  className="hero-reserve-cta-btn"
                >
                  <span>Reserve & Explore</span>
                  <ChevronRight size={18} />
                </button>
              </form>

              {/* Mountain Perks under search card */}
              <div className="card-footer-perks">
                <div className="perk-item">
                  <ShieldCheck size={14} className="text-teal" />
                  <span>100% Verified Cabs</span>
                </div>
                <div className="perk-item">
                  <Sparkles size={14} className="text-amber" />
                  <span>Customizable Itinerary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
