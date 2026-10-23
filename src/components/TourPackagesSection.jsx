import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Check, 
  Car, 
  Coffee, 
  Bed, 
  ArrowRight,
  Eye,
  Sparkles,
  Tag
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';

export default function TourPackagesSection({ onOpenItinerary, onBookPackage }) {
  const [activeTab, setActiveTab] = useState('All');

  const packageCategories = [
    'All',
    'Himachal Pradesh',
    'Uttarakhand',
    'Adventure & Treks',
    'Spiritual & Pilgrimage'
  ];

  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Himachal Pradesh') return pkg.state === 'Himachal Pradesh';
    if (activeTab === 'Uttarakhand') return pkg.state === 'Uttarakhand';
    if (activeTab === 'Adventure & Treks') return pkg.category === 'Adventure & Treks' || pkg.category === 'Alpine Treks';
    if (activeTab === 'Spiritual & Pilgrimage') return pkg.category === 'Spiritual & Pilgrimage';
    return true;
  });

  return (
    <section id="packages" className="packages-section">
      <div className="container">
        {/* Section Header matching Reference text */}
        <div className="packages-header-block">
          <div className="header-text-center">
            <span className="section-eyebrow">Curated Himalayan Circuits</span>
            <h2 className="section-title">Get a good travel experience</h2>
            <p className="section-lead-text">
              A good travel experience is not just about the places visited, but also the stories, friendships, and peaceful moments brought back home.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="package-tabs-bar">
            {packageCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`package-cat-btn ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="packages-card-grid">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              {/* Media Container */}
              <div className="package-card-media">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="package-card-image"
                  loading="lazy"
                />
                <div className="pkg-overlay-gradient"></div>

                <div className="pkg-top-chips">
                  <span className="pkg-badge-duration">
                    <Clock size={13} />
                    <span>{pkg.duration}</span>
                  </span>
                  <span className="pkg-badge-discount">
                    <Tag size={12} />
                    <span>{pkg.discount}</span>
                  </span>
                </div>

                <div className="pkg-state-chip">
                  <MapPin size={12} />
                  <span>{pkg.state}</span>
                </div>
              </div>

              {/* Package Content */}
              <div className="package-card-body">
                <div className="pkg-rating-category-row">
                  <span className="pkg-category-text">{pkg.category}</span>
                  <div className="pkg-rating-wrap">
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span><strong>{pkg.rating}</strong> ({pkg.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="pkg-card-title">{pkg.title}</h3>
                <p className="pkg-card-subtitle">{pkg.subtitle}</p>

                {/* Inclusions summary icons */}
                <div className="pkg-inclusions-strip">
                  <div className="inclusion-pill" title="Private Mountain Vehicle">
                    <Car size={13} />
                    <span>Cab</span>
                  </div>
                  <div className="inclusion-pill" title="Heated Mountain Homestay / Resort">
                    <Bed size={13} />
                    <span>Stays</span>
                  </div>
                  <div className="inclusion-pill" title="Daily Breakfast & Dinner">
                    <Coffee size={13} />
                    <span>Meals</span>
                  </div>
                  <div className="inclusion-pill" title="Local Pahadi Guide & Oxygen">
                    <ShieldCheck size={13} />
                    <span>Guide & SOS</span>
                  </div>
                </div>

                {/* Key Checklist Highlights */}
                <ul className="pkg-highlights-list">
                  {pkg.inclusions.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="highlight-item">
                      <Check size={14} className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing & Actions */}
                <div className="pkg-card-bottom">
                  <div className="pkg-price-group">
                    <span className="pkg-price-caption">Starting from</span>
                    <div className="pkg-pricing-numbers">
                      <span className="pkg-current-price">₹{pkg.price.toLocaleString('en-IN')}</span>
                      <span className="pkg-orig-price">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="pkg-per-person">/ person</span>
                    </div>
                  </div>

                  <div className="pkg-actions-group">
                    <button
                      type="button"
                      className="pkg-itinerary-btn"
                      onClick={() => onOpenItinerary(pkg)}
                      title="View day-by-day plan"
                    >
                      <Eye size={15} />
                      <span>Itinerary</span>
                    </button>

                    <button
                      type="button"
                      className="pkg-book-btn"
                      onClick={() => onBookPackage(pkg)}
                    >
                      <span>Book</span>
                      <ArrowRight size={15} />
                    </button>
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
