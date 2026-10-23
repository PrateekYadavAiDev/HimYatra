import React from 'react';

export default function PillHeadline() {
  return (
    <section className="pill-headline-section">
      <div className="container">
        <div className="pill-headline-wrapper">
          <h2 className="pill-display-heading">
            <span className="text-chunk">Take the step and explore</span>{' '}
            <span className="inline-capsule-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" 
                alt="Himalayan alpine lake" 
                className="inline-capsule-img" 
              />
            </span>{' '}
            <span className="text-chunk">the sacred peaks</span><br />
            <span className="inline-capsule-image-wrap mr-inline">
              <img 
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80" 
                alt="Emerald mountain stream" 
                className="inline-capsule-img" 
              />
            </span>{' '}
            <span className="text-chunk">waiting for you.</span>
          </h2>

          <p className="pill-subtext-lead">
            Traveling changes you. You see pristine snow peaks, breathe pure cedar air, meet warm Pahadi souls, and return as a new version of yourself.
          </p>
        </div>
      </div>
    </section>
  );
}
