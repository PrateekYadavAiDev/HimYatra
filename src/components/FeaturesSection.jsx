import React from 'react';
import { Compass, Users, ShieldCheck, HeartHandshake, Mountain, PhoneCall } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      id: 'ease-of-travel',
      icon: Compass,
      title: 'Ease of travel',
      subtitle: 'Complete trip arrangement',
      description: 'We handle your holiday trip easy and smooth with certified mountain drivers, luxury Volvo tickets, highway permits, and luggage support.'
    },
    {
      id: 'local-staff-help',
      icon: Users,
      title: 'Local Staff Help',
      subtitle: 'Native Pahadi guides',
      description: 'Professional local guides will show you hidden paradise places, tranquil apple orchards, and authentic homestays you will never miss.'
    },
    {
      id: 'safe-and-reliable',
      icon: ShieldCheck,
      title: 'Safe and reliable',
      subtitle: '24/7 mountain safety',
      description: 'Experience and professional team. Portable medical oxygen on high altitude passes, transparent prices, and 24/7 roadside assistance.'
    }
  ];

  return (
    <section id="features" className="features-highlight-section">
      <div className="container">
        <div className="features-three-col-grid">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="feature-minimal-card">
                <div className="feature-icon-outer">
                  <Icon size={24} className="feature-icon-svg" />
                </div>
                <div className="feature-text-block">
                  <h3 className="feature-card-heading">{item.title}</h3>
                  <span className="feature-card-sub">{item.subtitle}</span>
                  <p className="feature-card-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
