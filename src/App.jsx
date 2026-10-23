import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PillHeadline from './components/PillHeadline';
import StatsAndStory from './components/StatsAndStory';
import DestinationsGrid from './components/DestinationsGrid';
import FeaturesSection from './components/FeaturesSection';
import TourPackagesSection from './components/TourPackagesSection';
import TripCostEstimator from './components/TripCostEstimator';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MobileQuickBar from './components/MobileQuickBar';
import DayItineraryModal from './components/DayItineraryModal';
import BookingModal from './components/BookingModal';
import './App.css';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);

  const [itineraryModalOpen, setItineraryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleOpenBooking = (data = null) => {
    setBookingInitialData(data);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setBookingInitialData(null);
  };

  const handleOpenItinerary = (pkg) => {
    setSelectedPackage(pkg);
    setItineraryModalOpen(true);
  };

  const handleCloseItinerary = () => {
    setItineraryModalOpen(false);
    setSelectedPackage(null);
  };

  const handleSelectDestination = (dest) => {
    handleOpenBooking({
      destination: `${dest.name}, ${dest.state}`,
      title: `${dest.name} Tour Package`
    });
  };

  const handleSearchSubmit = (searchData) => {
    // Open booking modal with prefilled search criteria
    handleOpenBooking({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      adults: searchData.adults,
      children: searchData.children,
      rooms: searchData.rooms
    });
  };

  return (
    <div className="app-root">
      {/* Sticky Main Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Section matching Reference Image */}
      <Hero
        onOpenBooking={handleOpenBooking}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Inline Pill Capsules Typography Highlight */}
      <PillHeadline />

      {/* Side-by-Side Photo & Stats Metrics */}
      <StatsAndStory onExploreClick={() => {
        const destSec = document.getElementById('destinations');
        if (destSec) destSec.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Filterable Destinations Grid */}
      <DestinationsGrid
        onSelectDestination={handleSelectDestination}
        onOpenBooking={handleOpenBooking}
      />

      {/* Three-Column Highlight Features */}
      <FeaturesSection />

      {/* Curated Tour Packages with Itineraries */}
      <TourPackagesSection
        onOpenItinerary={handleOpenItinerary}
        onBookPackage={(pkg) => handleOpenBooking(pkg)}
      />

      {/* Interactive Trip Cost Calculator */}
      <TripCostEstimator onBookCustomTrip={handleOpenBooking} />

      {/* Traveler Testimonials */}
      <TestimonialsSection />

      {/* Himalayan Travel FAQs */}
      <FaqSection onOpenBooking={handleOpenBooking} />

      {/* Contact & Inquiries */}
      <ContactSection />

      {/* Comprehensive Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar onOpenBooking={handleOpenBooking} />

      {/* Day Itinerary Modal */}
      {itineraryModalOpen && selectedPackage && (
        <DayItineraryModal
          packageData={selectedPackage}
          onClose={handleCloseItinerary}
          onBookPackage={(pkg) => handleOpenBooking(pkg)}
        />
      )}

      {/* Booking & Reservation Modal with Confetti & Voucher */}
      {bookingModalOpen && (
        <BookingModal
          initialData={bookingInitialData}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
}
