import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://levdfyfgejqfsookbrik.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxldmRmeWZnZWpxZnNvb2ticmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3ODM1MjcsImV4cCI6MjEwODM1OTUyN30.N_toI3ew33gikK1K6CmU9xrrUEUVzYVDvXsWbljrBxg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Save an inquiry to Supabase public.inquiries
 */
export async function saveInquiry({ name, phone, destination, message, source = 'contact_form' }) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          phone,
          destination,
          message,
          source,
          status: 'new'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase saveInquiry error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected saveInquiry error:', err);
    return { success: false, error: err };
  }
}

/**
 * Save a booking to Supabase public.bookings
 */
export async function saveBooking({
  bookingReference,
  fullName,
  email,
  phone,
  tourName,
  travelDate,
  pickupLocation,
  adults,
  children = 0,
  totalPrice,
  advanceToken,
  specialRequests,
  isCustomTrip = false,
  customTripDetails = null
}) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          booking_reference: bookingReference,
          full_name: fullName,
          email,
          phone,
          tour_name: tourName,
          travel_date: travelDate,
          pickup_location: pickupLocation,
          adults,
          children,
          total_price: totalPrice,
          advance_token: advanceToken,
          special_requests: specialRequests,
          is_custom_trip: isCustomTrip,
          custom_trip_details: customTripDetails,
          status: 'confirmed'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase saveBooking error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected saveBooking error:', err);
    return { success: false, error: err };
  }
}

/**
 * Save a newsletter subscription to Supabase public.newsletter_subscribers
 */
export async function saveNewsletterSubscription(email) {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select();

    if (error) {
      // If already subscribed (unique constraint), treat as success
      if (error.code === '23505') {
        return { success: true, alreadySubscribed: true };
      }
      console.error('Supabase newsletter error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected newsletter error:', err);
    return { success: false, error: err };
  }
}
