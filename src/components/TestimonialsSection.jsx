import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="testimonials-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-eyebrow">Real Mountain Stories</span>
          <h2 className="section-title">Loved by Indian Travelers Everywhere</h2>
          <p className="section-lead-text">
            From solo backpackers to joint families with grandparents, see why travelers trust our native Pahadi hospitality.
          </p>
        </div>

        {/* Carousel / Grid representation */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-quote-icon">
                <Quote size={28} className="quote-mark" />
              </div>

              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p className="testimonial-comment">"{t.comment}"</p>

              <div className="testimonial-author-row">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4 className="author-name">
                    {t.name}
                    <CheckCircle2 size={13} className="text-teal inline ml-1" />
                  </h4>
                  <p className="author-meta">
                    {t.city} • <span className="dest-tag">{t.destination}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* HP Trust Banner */}
        <div className="trust-proof-banner">
          <div className="trust-item">
            <span className="trust-number">4.9 / 5</span>
            <span className="trust-label">Google & TripAdvisor Avg Rating</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <span className="trust-number">18,500+</span>
            <span className="trust-label">Happy Indian Travelers</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <span className="trust-number">100%</span>
            <span className="trust-label">Verified Mountain Cabs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
