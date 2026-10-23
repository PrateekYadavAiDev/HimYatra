# HimalayaEx — Luxury Himalayan Tour & Travel Web Platform

A modern, responsive web application for a premier tour and travel business specializing in handcrafted journeys across **Himachal Pradesh** and **Uttarakhand**.

---

## 🌟 Key Features

- **Hero & Search Widget**: Inspired by modern travel portals with destination selection (Spiti Valley, Manali, Kedarnath, Auli, Rishikesh, Kasol, etc.), date pickers, and guest counters.
- **Curated Tour Packages**: Complete packages with day-by-day itineraries, pricing in INR, inclusions tags (cabs, stays, meals, guides), and brochure download.
- **Interactive Trip Planner & Cost Estimator**: Real-time pricing calculator for private mountain trips with vehicle selection (Sedan, SUV 4x4, Tempo) and accommodation styles.
- **Online Booking System**: Instant reservation modal with celebratory confetti animation and printable/downloadable booking voucher with reference ID.
- **Supabase Backend Integration**:
  - `inquiries`: Saves all customer inquiry submissions with contact and travel requirements.
  - `bookings`: Persists tour reservations and custom itinerary orders.
  - `newsletter_subscribers`: Manages seasonal snowfall alert email subscriptions.
- **Fully Responsive**: Desktop, tablet, and mobile optimized with persistent mobile quick actions.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS (Tailored Design System, Glassmorphism, Micro-interactions)
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <YOUR_REPO_URL>
cd "Buseness Website"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase credentials:
```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-publishable-key
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```
