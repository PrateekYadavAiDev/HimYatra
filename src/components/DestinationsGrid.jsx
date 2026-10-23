import React, { useState } from 'react';
import { MapPin, Star, ArrowUpRight, Mountain, Compass, Sparkles } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

export default function DestinationsGrid({ onSelectDestination, onOpenBooking }) {
  const [filter, setFilter] = useState('All');

  const filterTabs = [
    'All',
    'Himachal Pradesh',
    'Uttarakhand',
    'High Altitude',
    'Spiritual'
  ];

  const filteredDestinations = DESTINATIONS.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Himachal Pradesh') return item.state === 'Himachal Pradesh';
    if (filter === 'Uttarakhand') return item.state === 'Uttarakhand';
    if (filter === 'High Altitude') {
      return item.id === 'spiti-valley' || item.id === 'auli-chopta' || item.id === 'kedarnath-yatra';
    }
    if (filter === 'Spiritual') {
      return item.id === 'kedarnath-yatra' || item.id === 'rishikesh-ganges' || item.id === 'dharamshala-bir';
    }
    return true;
  });

  return (
    <section id="destinations" className="destinations-section">
      <div className="container">
        {/* Section Header matching Reference Title */}
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">Handpicked Mountain Gateways</span>
            <h2 className="section-title">Experience Our Destination</h2>
          </div>
          
          {/* Filter Pills */}
          <div className="filter-pill-nav" role="tablist">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`filter-pill-btn ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid matching Reference Image Cards */}
        <div className="destinations-cards-grid">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="destination-card group"
              onClick={() => onSelectDestination ? onSelectDestination(dest) : onOpenBooking({ destination: `${dest.name}, ${dest.state}` })}
            >
              <div className="dest-img-wrap">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="dest-card-image"
                  loading="lazy"
                />
                <div className="dest-card-gradient"></div>

                {/* Top Badge */}
                <div className="dest-top-badges">
                  <span className="badge badge-dark">
                    <MapPin size={13} className="text-amber" />
                    <span>{dest.state}</span>
                  </span>
                  <span className="badge badge-teal">
                    <span>{dest.badge}</span>
                  </span>
                </div>

                {/* Bottom Content overlay matching reference */}
                <div className="dest-bottom-content">
                  <div className="dest-card-name-row">
                    <div>
                      <h3 className="dest-card-title">{dest.name}</h3>
                      <p className="dest-card-altitude">
                        <Mountain size={13} />
                        <span>{dest.altitude} • Best: {dest.bestTime}</span>
                      </p>
                    </div>

                    <div className="dest-card-arrow-circle">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <p className="dest-card-tagline">{dest.tagline}</p>

                  <div className="dest-card-footer">
                    <div className="dest-rating">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      <span><strong>{dest.rating}</strong> ({dest.reviewsCount})</span>
                    </div>

                    <div className="dest-price-tag">
                      <span className="from-text">From</span>
                      <span className="price-val">₹{dest.startingPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
