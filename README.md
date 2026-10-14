# Mirosa Cafe & Kitchen — Premium Restaurant Website
**Himayat Nagar, Hyderabad, Telangana, India**

A bespoke, responsive, hospitality-grade web experience for **Mirosa Cafe & Kitchen**. Designed with contemporary luxury dining aesthetics, editorial food photography, and frictionless ordering usability.

---

## 🌟 Brand Identity & Creative Direction

- **Warm Ivory & Cream Canvas**: Warm neutral backgrounds (`#FAF7F2`, `#F4EFEA`) reminiscent of boutique Parisian and Mediterranean bistros.
- **Deep Espresso & Charcoal Typography**: High-contrast, elegant typography featuring **Playfair Display** (refined serif headings) and **Plus Jakarta Sans** (ultra-crisp contemporary body).
- **Muted Terracotta & Champagne Gold Accents**: Tailored warm highlights (`#C26343`, `#C5A059`) for buttons, badges, and dietary indicators.
- **Authentic Editorial Photography**: Bespoke high-resolution imagery showcasing artisan pastry wheels, single-origin pour-overs, truffle puff pizzas, and warm cafe interiors.

---

## 🍽️ Key Website Features

### 1. Announcement Bar
- Editable top banner for announcements, festive offers, and delivery notifications.
- Dismissible and configurable directly from the Staff Admin Portal.

### 2. Cinematic Hero Section
- Full-width photography with gentle parallax-feel dark gradient.
- Clear brand proposition: *"An Experience Worth Savoring"*.
- Quick badges for *Artisanal Coffee & Viennoiserie*, *Valet Parking Available*, and *Open Daily 11:00 AM – 11:00 PM*.
- Action buttons: **Explore the Menu**, **Order Online**, and **Reserve a Table**.

### 3. Signature Editorial Menu (Homepage Highlights)
- Asymmetric editorial grid featuring 6 curated items:
  - *Cilantro Grilled Chicken* (₹520)
  - *Truffle Mushroom Puff Pastry Pizza* (₹480)
  - *Viral Pistachio Supreme Croissant Wheel* (₹320)
  - *The Mirosa Truffle Smash Burger* (₹480)
  - *Artisanal Hazelnut Frappe* (₹290)
  - *Passionfruit & Mint Sparkler* (₹260)
- Indian standard FSSAI dietary indicators (Green Veg dot / Red Non-Veg triangle).
- Clicking any dish opens the rich **Dish Detail Modal**.

### 4. Visual Category Tiles
- Interactive category tiles with photography:
  - *Small Plates & Starters*
  - *Signature Mains & Bowls*
  - *Puff Pastry Pizzas*
  - *Gourmet Burgers*
  - *Handcrafted Pastas*
  - *Specialty Coffee & Brews*
  - *Boutique Bakery & Desserts*
  - *Artisanal Mocktails*
- Clicking any tile immediately filters the complete menu and smoothly scrolls into view.

### 5. Delivery Hub: "Your Mirosa Favorites, Delivered"
- Prominent delivery section featuring distinct branded buttons:
  - **Order on Zomato**: `https://www.zomato.com/hyderabad/mirosa-cafe-kitchen-1-himayath-nagar`
  - **Order on Swiggy**: `https://www.swiggy.com/city/hyderabad/mirosa-cafe-and-kitchen-sector-78-himayath-nagar-rest782831`
- Safe link configuration (`target="_blank" rel="noopener noreferrer"`).
- Direct delivery modal accessible from the header and mobile sticky bar.

### 6. Complete Interactive Menu (24+ Dishes)
- **Live Search**: Debounced instant search filtering dishes by title, description, or ingredients.
- **Category Filter**: Easy switching across 8 distinct categories.
- **Dietary Filter**: Instant toggle between *All*, *Pure Vegetarian*, *Non-Vegetarian*, and *Chef's Picks*.
- **Price Sorting**: Sort by *Recommended*, *Price: Low to High*, or *Price: High to Low*.
- **Dish Detail Modal**: High-res image, ingredients, energy/portion info, dietary badges, and direct order actions.

### 7. Atmosphere & Gallery
- Masonry gallery with filter tabs (*All*, *Cafe Interiors*, *Culinary Creations*, *Coffee & Drinks*).
- Interactive Lightbox modal with Next / Previous navigation, photo counter, and keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).

### 8. Table Reservation Enquiry
- Reservation form requesting:
  - Guest Name, Phone Number, Email
  - Date (min date locked to today)
  - Time Slot (Lunch, High Tea, Dinner)
  - Number of Guests (1 to 12+)
  - Occasion / Seating Preference
  - Special Requests / Dietary Needs
- Instant validation and **Booking Confirmation Modal** with unique Reference Code (e.g., `MRS-8392`).
- Enquiries are automatically persisted in `localStorage` and sent to the Staff Admin Portal inbox.

### 9. Visit Mirosa (Location & Timings)
- **Verified Address**: 3-6-236/2, Street No. 15, AP State Housing Board, Himayatnagar, Hyderabad, Telangana 500029 (Near CPI Party Office / Urdu Hall Lane).
- **Operating Hours**: Monday – Sunday: 11:00 AM – 11:00 PM.
- **Phone**: +91 40 2322 4589 with direct `tel:` dialing.
- **Interactive Google Maps Embed** + direct link to open in Google Maps app.

### 10. Staff Management Portal (Admin Dashboard)
- Accessible via footer link or `#admin` URL hash.
- **Security**: PIN authentication gate (Default demo PIN: `2024`).
- **Menu Management**:
  - Add new dishes, edit existing dishes (name, price, category, veg/non-veg flag, description, dietary tags, chef's special, homepage feature).
  - Toggle live stock availability (*Available* / *Sold Out*).
  - Delete items with confirmation.
- **Table Enquiries Inbox**:
  - View all submitted customer table requests with guest details, party size, and special requests.
  - Update status (*Confirmed* / *Received*).
- **Store Operations & Links**:
  - Update top announcement bar text and toggle visibility.
  - Update Swiggy and Zomato listing URLs.
  - Update phone number and operating hours.
  - Reset to verified factory defaults option.
- All modifications update live site state instantly and persist in `localStorage`.

### 11. Mobile-First Experience
- Slide-out accessible mobile drawer navigation.
- Fixed bottom sticky action bar on mobile (`Menu`, `Reserve`, `Order Online`).
- Touch-friendly tap targets and zero layout shifts.

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Development
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit: `http://localhost:5173/`

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Security & Data Note
- Administrative features are client-side secured via staff PIN verification and `localStorage` state management for rapid demonstration and staff operations without hardcoded external credentials.
- Delivery links point to verified provisional Mirosa Himayat Nagar listings.
