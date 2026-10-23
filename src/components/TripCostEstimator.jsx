import React, { useState } from 'react';
import { Calculator, MapPin, Calendar, Users, Car, Home, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function TripCostEstimator({ onBookCustomTrip }) {
  const [stateChoice, setStateChoice] = useState('Himachal');
  const [destination, setDestination] = useState('Manali & Solang');
  const [durationDays, setDurationDays] = useState(5);
  const [adultCount, setAdultCount] = useState(2);
  const [stayType, setStayType] = useState('deluxe'); // 'homestay' | 'deluxe' | 'luxury'
  const [vehicleType, setVehicleType] = useState('suv'); // 'sedan' | 'suv' | 'tempo'
  const [addActivities, setAddActivities] = useState(true);
  const [addCampfire, setAddCampfire] = useState(true);

  // Price calculation constants (realistic Himalayan rates)
  const baseRatesPerDay = {
    'Manali & Solang': 2200,
    'Spiti Valley': 3200,
    'Kasol & Jibhi': 2100,
    'Dharamshala & Bir': 2300,
    'Shimla & Kinnaur': 2500,
    'Rishikesh & Haridwar': 1900,
    'Kedarnath & Chopta': 3100,
    'Auli & Joshimath': 3300,
    'Nainital & Jim Corbett': 2400
  };

  const stayMultipliers = {
    homestay: 1.0,
    deluxe: 1.35,
    luxury: 1.85
  };

  const vehicleRatesPerDay = {
    sedan: 2800,
    suv: 4200,
    tempo: 6800
  };

  // Compute live price
  const baseDayCost = baseRatesPerDay[destination] || 2500;
  const stayCost = baseDayCost * stayMultipliers[stayType] * durationDays * Math.ceil(adultCount / 2);
  const transportCost = vehicleRatesPerDay[vehicleType] * durationDays;
  const activityCost = (addActivities ? 1500 : 0) * adultCount;
  const campfireCost = addCampfire ? 1200 : 0;
  const totalCost = Math.round(stayCost + transportCost + activityCost + campfireCost);
  const perPersonCost = Math.round(totalCost / adultCount);

  const himachalDestinations = [
    'Manali & Solang',
    'Spiti Valley',
    'Kasol & Jibhi',
    'Dharamshala & Bir',
    'Shimla & Kinnaur'
  ];

  const uttarakhandDestinations = [
    'Rishikesh & Haridwar',
    'Kedarnath & Chopta',
    'Auli & Joshimath',
    'Nainital & Jim Corbett'
  ];

  const activeDestinations = stateChoice === 'Himachal' ? himachalDestinations : uttarakhandDestinations;

  const handleStateChange = (state) => {
    setStateChoice(state);
    setDestination(state === 'Himachal' ? himachalDestinations[0] : uttarakhandDestinations[0]);
  };

  const handleProceed = () => {
    onBookCustomTrip({
      customTrip: true,
      state: stateChoice,
      destination,
      duration: `${durationDays} Days / ${durationDays - 1} Nights`,
      adults: adultCount,
      stayType,
      vehicleType,
      estimatedPrice: totalCost,
      perPersonCost
    });
  };

  return (
    <section id="trip-planner" className="planner-section">
      <div className="container">
        <div className="planner-card-wrapper">
          <div className="planner-header">
            <div className="planner-eyebrow">
              <Calculator size={15} />
              <span>Interactive Mountain Trip Calculator</span>
            </div>
            <h2 className="planner-title">Customize Your Himalayan Itinerary</h2>
            <p className="planner-subtitle">
              Get an instant transparent estimate for your private Himachal or Uttarakhand vacation. No hidden fees or mountain surprises.
            </p>
          </div>

          <div className="planner-grid">
            {/* Left Controls Column */}
            <div className="planner-controls-col">
              {/* State Switcher */}
              <div className="control-group">
                <label className="control-label">Choose State</label>
                <div className="state-toggle-group">
                  <button
                    type="button"
                    className={`state-btn ${stateChoice === 'Himachal' ? 'active' : ''}`}
                    onClick={() => handleStateChange('Himachal')}
                  >
                    🌲 Himachal Pradesh
                  </button>
                  <button
                    type="button"
                    className={`state-btn ${stateChoice === 'Uttarakhand' ? 'active' : ''}`}
                    onClick={() => handleStateChange('Uttarakhand')}
                  >
                    ⛰️ Uttarakhand
                  </button>
                </div>
              </div>

              {/* Destination selector */}
              <div className="control-group">
                <label className="control-label">Destination Circuit</label>
                <div className="dest-chips-selector">
                  {activeDestinations.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`dest-chip-btn ${destination === d ? 'active' : ''}`}
                      onClick={() => setDestination(d)}
                    >
                      <MapPin size={13} />
                      <span>{d}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration and Guests in 2 cols */}
              <div className="control-two-cols">
                <div className="control-group">
                  <label className="control-label">Duration: <strong>{durationDays} Days</strong></label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="slider-input"
                  />
                  <div className="slider-labels">
                    <span>3 Days</span>
                    <span>6 Days</span>
                    <span>10 Days</span>
                  </div>
                </div>

                <div className="control-group">
                  <label className="control-label">Travelers: <strong>{adultCount} Persons</strong></label>
                  <div className="counter-row">
                    <button
                      type="button"
                      className="counter-btn"
                      onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                    >-</button>
                    <span className="counter-display">{adultCount}</span>
                    <button
                      type="button"
                      className="counter-btn"
                      onClick={() => setAdultCount(Math.min(12, adultCount + 1))}
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Vehicle Preference */}
              <div className="control-group">
                <label className="control-label">Private Mountain Transport</label>
                <div className="selection-options-grid">
                  <button
                    type="button"
                    className={`option-box ${vehicleType === 'sedan' ? 'active' : ''}`}
                    onClick={() => setVehicleType('sedan')}
                  >
                    <Car size={18} />
                    <span className="opt-title">Mountain Sedan</span>
                    <span className="opt-desc">Swift Dzire / Etios</span>
                  </button>

                  <button
                    type="button"
                    className={`option-box ${vehicleType === 'suv' ? 'active' : ''}`}
                    onClick={() => setVehicleType('suv')}
                  >
                    <Car size={18} />
                    <span className="opt-title">Mountain SUV 4x4</span>
                    <span className="opt-desc">Innova / Scorpio / Bolero</span>
                  </button>

                  <button
                    type="button"
                    className={`option-box ${vehicleType === 'tempo' ? 'active' : ''}`}
                    onClick={() => setVehicleType('tempo')}
                  >
                    <Users size={18} />
                    <span className="opt-title">Tempo Traveler</span>
                    <span className="opt-desc">Luxury 12-Seater</span>
                  </button>
                </div>
              </div>

              {/* Stay Type */}
              <div className="control-group">
                <label className="control-label">Accommodation Style</label>
                <div className="selection-options-grid">
                  <button
                    type="button"
                    className={`option-box ${stayType === 'homestay' ? 'active' : ''}`}
                    onClick={() => setStayType('homestay')}
                  >
                    <Home size={18} />
                    <span className="opt-title">Pahadi Homestay</span>
                    <span className="opt-desc">Traditional & Authentic</span>
                  </button>

                  <button
                    type="button"
                    className={`option-box ${stayType === 'deluxe' ? 'active' : ''}`}
                    onClick={() => setStayType('deluxe')}
                  >
                    <Home size={18} />
                    <span className="opt-title">3-Star Deluxe</span>
                    <span className="opt-desc">Valley View & Heating</span>
                  </button>

                  <button
                    type="button"
                    className={`option-box ${stayType === 'luxury' ? 'active' : ''}`}
                    onClick={() => setStayType('luxury')}
                  >
                    <Home size={18} />
                    <span className="opt-title">Luxury Chalet</span>
                    <span className="opt-desc">4/5-Star Boutique Villa</span>
                  </button>
                </div>
              </div>

              {/* Addons toggles */}
              <div className="addons-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={addActivities}
                    onChange={(e) => setAddActivities(e.target.checked)}
                  />
                  <span>Adventure Activity Pass (Rafting / Paragliding / Trek)</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={addCampfire}
                    onChange={(e) => setAddCampfire(e.target.checked)}
                  />
                  <span>Private Apple Orchard Campfire & Music</span>
                </label>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="planner-summary-col">
              <div className="summary-card">
                <div className="summary-top-tag">
                  <Sparkles size={15} />
                  <span>Transparent Price Calculation</span>
                </div>

                <h3 className="summary-plan-title">
                  {durationDays} Days in {destination}
                </h3>
                <p className="summary-plan-subtitle">
                  {stateChoice} • {adultCount} Travelers • {vehicleType.toUpperCase()}
                </p>

                <div className="summary-breakdown-list">
                  <div className="summary-row">
                    <span>Stay ({durationDays} Nights, {stayType}):</span>
                    <span>₹{stayCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="summary-row">
                    <span>Private Cab ({vehicleType}):</span>
                    <span>₹{transportCost.toLocaleString('en-IN')}</span>
                  </div>
                  {addActivities && (
                    <div className="summary-row">
                      <span>Activities & Permits:</span>
                      <span>₹{activityCost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {addCampfire && (
                    <div className="summary-row">
                      <span>Campfire Experience:</span>
                      <span>₹{campfireCost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="summary-row text-teal font-medium">
                    <span>High-Altitude Safety Kit:</span>
                    <span>Free Included</span>
                  </div>
                  <div className="summary-row text-teal font-medium">
                    <span>All Mountain Road Tolls:</span>
                    <span>Free Included</span>
                  </div>
                </div>

                <div className="summary-total-box">
                  <div>
                    <span className="total-label">Estimated Total</span>
                    <div className="total-amount-display">
                      ₹{totalCost.toLocaleString('en-IN')}
                    </div>
                    <span className="per-person-note">Approx ₹{perPersonCost.toLocaleString('en-IN')} / person</span>
                  </div>

                  <button
                    type="button"
                    className="summary-book-cta"
                    onClick={handleProceed}
                  >
                    <span>Lock Custom Quote</span>
                    <ArrowRight size={17} />
                  </button>
                </div>

                <div className="summary-footer-guarantees">
                  <p><Check size={14} className="text-teal" /> 20% advance token to book, pay rest on arrival</p>
                  <p><Check size={14} className="text-teal" /> Free date rescheduling up to 7 days before trip</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
