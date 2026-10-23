import React from 'react';
import { Award, Compass, HeartHandshake, MountainSnow } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export default function StatsAndStory({ onExploreClick }) {
  return (
    <section className="stats-story-section">
      <div className="container">
        <div className="stats-story-grid">
          {/* Left Vertical Image Card matching Reference */}
          <div className="stats-media-card">
            <div className="stats-image-container">
              <img
                src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=900&q=80"
                alt="Emerald lake boat in Himalayan valley"
                className="stats-vertical-img"
              />
              <div className="stats-media-overlay">
                <div className="floating-location-tag">
                  <MountainSnow size={16} />
                  <span>Chandratal Lake, 14,100 ft</span>
                </div>
              </div>
            </div>
            
            {/* Subtle floating quote badge */}
            <div className="floating-stat-badge">
              <Award className="badge-icon-gold" size={24} />
              <div>
                <strong>HP Tourism Awarded</strong>
                <span>Best Mountain Tour Operator 2025</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Narrative, and Big Numbers matching Reference */}
          <div className="stats-content-col">
            <span className="section-eyebrow">Pahadi Hospitality & Roots</span>
            <h2 className="stats-headline">
              Traveling brings you closer to new places, people, and memories
            </h2>

            <p className="stats-description">
              Born and rooted in the hills of Himachal Pradesh, our team knows every bend of the mountain passes, every hidden chai tapri with majestic Kinner Kailash views, and every quiet meadow untouched by commercial tourism.
            </p>

            <p className="stats-description secondary">
              Whether you are seeking spiritual peace in Kedarnath, thrilling rapids in Rishikesh, or stargazing under the Milky Way in Spiti Valley, we take care of all mountain logistics, safe 4x4 transfers, and cozy heated stays.
            </p>

            {/* The 3 Big Stats from the Reference */}
            <div className="stats-metrics-row">
              <div className="metric-box">
                <span className="metric-number">98%</span>
                <span className="metric-label">Customer Satisfaction</span>
              </div>

              <div className="metric-box">
                <span className="metric-number">85+</span>
                <span className="metric-label">Popular Destinations</span>
              </div>

              <div className="metric-box">
                <span className="metric-number">245+</span>
                <span className="metric-label">Experienced Guides</span>
              </div>
            </div>

            {/* Quick Action */}
            <div className="stats-cta-action">
              <a href="#destinations" className="btn-primary" onClick={onExploreClick}>
                <Compass size={18} />
                <span>Explore Top Destinations</span>
              </a>
              <div className="pahadi-verified-tag">
                <HeartHandshake size={18} className="text-teal" />
                <span>100% Local Pahadi Employment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
