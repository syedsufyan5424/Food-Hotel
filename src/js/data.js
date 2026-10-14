/**
 * MIROSA CAFE & KITCHEN - CORE DATA REPOSITORY
 * Himayat Nagar, Hyderabad, Telangana 500029
 * Real authentic photography from Zomato listings
 */

export const RESTAURANT_INFO = {
  name: "Mirosa Cafe & Kitchen",
  tagline: "An Experience Worth Savoring",
  subtitle: "Thoughtfully prepared food, delightful flavors and moments worth sharing in the heart of Himayat Nagar.",
  address: "3-6-236/2, Street No. 15, AP State Housing Board, Himayatnagar, Hyderabad, Telangana 500029",
  landmark: "Near CPI Party Office / Urdu Hall Lane",
  timings: "Monday – Sunday: 11:00 AM – 11:00 PM",
  phone: "+91 40 2322 4589",
  phoneRaw: "+914023224589",
  email: "hello@mirosacafe.in",
  costForTwo: "₹1,200 approx. for two",
  zomatoUrl: "https://www.zomato.com/hyderabad/mirosa-cafe-kitchen-1-himayath-nagar",
  swiggyUrl: "https://www.swiggy.com/city/hyderabad/mirosa-cafe-and-kitchen-sector-78-himayath-nagar-rest782831",
  googleMapsUrl: "https://maps.google.com/?q=Mirosa+Cafe+%26+Kitchen+Himayatnagar+Hyderabad",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.1352467332215!2d78.48421887516538!3d17.405373883486167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dc462d109f%3A0x7d94562095f68b5e!2sMirosa%20Cafe%20%26%20Kitchen!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",
  announcement: {
    active: true,
    text: "✨ Welcome to Mirosa Himayat Nagar · Dine-in, Takeaway & Delivery via Swiggy & Zomato · Open daily 11 AM – 11 PM",
    badge: "Now Serving"
  }
};

export const MENU_CATEGORIES = [
  { id: "all", label: "All Offerings", count: 24, icon: "sparkles" },
  { id: "starters", label: "Small Plates & Starters", count: 4, icon: "utensils" },
  { id: "mains", label: "Signature Mains & Bowls", count: 4, icon: "bowl" },
  { id: "pizza", label: "Puff Pastry Pizzas", count: 3, icon: "pizza" },
  { id: "burgers", label: "Gourmet Burgers", count: 3, icon: "burger" },
  { id: "pasta", label: "Handcrafted Pastas", count: 3, icon: "pasta" },
  { id: "coffee", label: "Specialty Coffee & Brews", count: 3, icon: "coffee" },
  { id: "bakery", label: "Boutique Bakery & Desserts", count: 4, icon: "cake" },
  { id: "mocktails", label: "Artisanal Mocktails", count: 3, icon: "cocktail" }
];

export const INITIAL_MENU_ITEMS = [
  {
    id: "mirosa-cilantro-chicken",
    name: "Cilantro Grilled Chicken Steak",
    category: "mains",
    price: 520,
    isVeg: false,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Tender flame-grilled chicken breast served with ribbon pesto pasta, rich roasted pepper jus, and garden herb garnish.",
    dietary: ["Chef's Signature", "High Protein", "Gluten-Conscious"],
    calories: "540 kcal",
    image: "/assets/real/real-grilled-chicken.jpg"
  },
  {
    id: "mirosa-veggie-pizza",
    name: "Farm-Fresh Artisan Veggie Pizza",
    category: "pizza",
    price: 460,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Handcrafted crisp crust layered with San Marzano tomato sauce, melted fior di latte mozzarella, sweet golden corn, bell peppers, Kalamata olives, and fresh herbs.",
    dietary: ["Authentic Crust", "Vegetarian", "Chef's Special"],
    calories: "580 kcal",
    image: "/assets/real/real-veggie-pizza.jpg"
  },
  {
    id: "mirosa-pistachio-croissant-wheel",
    name: "Viral Pistachio Supreme Wheel",
    category: "bakery",
    price: 320,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Crispy circular laminated Viennoiserie filled with rich Sicilian pistachio pastry creme, dipped in creamy white chocolate glaze and dusted with crushed pistachios.",
    dietary: ["House-Baked Daily", "Viral Sensation", "Vegetarian"],
    calories: "480 kcal",
    image: "/assets/real/real-croissant-wheel.jpg"
  },
  {
    id: "mirosa-crispy-chicken-schnitzel",
    name: "Crispy Chicken Schnitzel & Fries",
    category: "mains",
    price: 490,
    isVeg: false,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Golden panko-crusted chicken fillet fried to perfection, served with hand-cut French fries, house garlic dip, and tossed seasonal salad greens.",
    dietary: ["Bestseller", "Includes Fries & Dip"],
    calories: "680 kcal",
    image: "/assets/real/real-crispy-chicken.jpg"
  },
  {
    id: "mirosa-barista-latte",
    name: "Signature Barista Cappuccino",
    category: "coffee",
    price: 240,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: true,
    isAvailable: true,
    description: "Double-shot custom roasted Arabica espresso with velvety micro-foam latte art, served hot in authentic ceramic cup and saucer.",
    dietary: ["Specialty Coffee", "Vegetarian"],
    calories: "120 kcal",
    image: "/assets/real/real-latte-art.jpg"
  },
  {
    id: "mirosa-citrus-mint-spritz",
    name: "Citrus Mint Botanical Spritz",
    category: "mocktails",
    price: 260,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: true,
    isAvailable: true,
    description: "Refreshing green mint syrup, citrus soda, and sparkling tonic poured over clear ice, garnished with fresh mint sprig and orange slice in a stem glass.",
    dietary: ["Refreshing", "Vegan", "Hydrating"],
    calories: "140 kcal",
    image: "/assets/real/real-citrus-spritz.jpg"
  },
  {
    id: "mirosa-creamy-alfredo",
    name: "Creamy Alfredo Penne",
    category: "pasta",
    price: 440,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: false,
    isAvailable: true,
    description: "Al dente penne pasta tossed in rich parmesan herb cream, bell peppers, and fresh parsley, served with golden toasted garlic bread.",
    dietary: ["Vegetarian", "Crowd Favorite"],
    calories: "580 kcal",
    image: "/assets/real/real-creamy-alfredo.jpg"
  },
  {
    id: "mirosa-penne-arrabbiata",
    name: "Spicy Penne Arrabbiata",
    category: "pasta",
    price: 420,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Penne tossed in fiery San Marzano tomato sauce with garlic, chili flakes, basil, and olive oil, paired with toasted garlic ciabatta.",
    dietary: ["Vegetarian", "Spicy Italian"],
    calories: "460 kcal",
    image: "/assets/real/real-penne-arrabbiata.jpg"
  },
  {
    id: "mirosa-pesto-pasta",
    name: "Creamy Genovese Pesto Pasta",
    category: "pasta",
    price: 460,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Fragrant basil pine nut pesto folded with cream and tossed with al dente pasta, topped with shaved parmesan and garlic toast.",
    dietary: ["Vegetarian", "Herbaceous"],
    calories: "520 kcal",
    image: "/assets/real/real-pesto-pasta.jpg"
  },
  {
    id: "mirosa-chicken-pizza",
    name: "Smoked Chicken Supreme Pizza",
    category: "pizza",
    price: 520,
    isVeg: false,
    isChefSpecial: true,
    isFeatured: false,
    isAvailable: true,
    description: "Hand-stretched pizza topped with tender spiced chicken, diced bell peppers, mozzarella, and a signature creamy mayo swirl.",
    dietary: ["Chef's Signature", "Non-Vegetarian"],
    calories: "650 kcal",
    image: "/assets/real/real-chicken-pizza.jpg"
  },
  {
    id: "mirosa-truffle-fries",
    name: "Golden Hand-Cut French Fries",
    category: "starters",
    price: 240,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Crispy double-cooked potato fries served hot in a wire basket with spicy chipotle dipping sauce.",
    dietary: ["Vegetarian", "Popular Starter"],
    calories: "380 kcal",
    image: "/assets/real/real-truffle-fries.jpg"
  },
  {
    id: "mirosa-chicken-wings",
    name: "Crispy Spicy Chicken Bites",
    category: "starters",
    price: 360,
    isVeg: false,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Succulent chicken bites crisped with secret spice blend, tossed with fresh coriander and served with shredded cabbage salad.",
    dietary: ["Non-Vegetarian", "Zesty & Crunchy"],
    calories: "450 kcal",
    image: "/assets/real/real-chicken-wings.jpg"
  },
  {
    id: "mirosa-spring-rolls",
    name: "Crispy Golden Spring Rolls",
    category: "starters",
    price: 290,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Crisp fried rolls filled with seasoned Asian vegetables, served with sweet chili sauce and creamy dip.",
    dietary: ["Vegetarian", "Crispy Appetizer"],
    calories: "320 kcal",
    image: "/assets/real/real-spring-rolls.jpg"
  },
  {
    id: "mirosa-rice-bowl",
    name: "Mirosa Spiced Rice Bowl",
    category: "mains",
    price: 480,
    isVeg: false,
    isChefSpecial: true,
    isFeatured: false,
    isAvailable: true,
    description: "Fragrant seasoned basmati rice surrounded by a rich spiced gravy with tender chicken chunks, spring onions, and whole red chili.",
    dietary: ["Comfort Classic", "Popular"],
    calories: "620 kcal",
    image: "/assets/real/real-rice-bowl.jpg"
  },
  {
    id: "mirosa-french-toast",
    name: "Brioche French Toast & Berry Dip",
    category: "bakery",
    price: 340,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: false,
    isAvailable: true,
    description: "Thick golden brioche slices pan-toasted in butter, dusted with fine sugar, served with rich fruit berry compote dip.",
    dietary: ["Sweet & Savory", "Vegetarian"],
    calories: "490 kcal",
    image: "/assets/real/real-french-toast.jpg"
  },
  {
    id: "mirosa-blue-mocktail",
    name: "Blue Lagoon Tropical Cooler",
    category: "mocktails",
    price: 240,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Vibrant curacao blue citrus cooler with lemon soda and crushed ice, refreshing on warm Hyderabad afternoons.",
    dietary: ["Refreshing", "Vegan"],
    calories: "130 kcal",
    image: "/assets/real/real-blue-mocktail.jpg"
  },
  {
    id: "mirosa-berry-cooler",
    name: "Sparkling Wild Berry Cooler",
    category: "mocktails",
    price: 250,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Ruby red berries blended with crushed ice and citrus tonic, served in a stem wine glass with fresh mint sprig.",
    dietary: ["Antioxidant", "Vegan"],
    calories: "120 kcal",
    image: "/assets/real/real-berry-cooler.jpg"
  },
  {
    id: "mirosa-hot-chocolate",
    name: "Rich Belgian Hot Chocolate",
    category: "coffee",
    price: 260,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Warm melted dark chocolate whisked with creamy steamed milk and topped with soft mini marshmallows.",
    dietary: ["Comfort Drink", "Vegetarian"],
    calories: "290 kcal",
    image: "/assets/real/real-hot-chocolate.jpg"
  },
  {
    id: "mirosa-garden-salad",
    name: "Mirosa Mediterranean Garden Salad",
    category: "starters",
    price: 340,
    isVeg: false,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Tossed green beans, baby asparagus, hard-boiled farm eggs, black olives, cherry tomatoes, and house vinaigrette.",
    dietary: ["High Protein", "Keto Friendly"],
    calories: "280 kcal",
    image: "/assets/real/real-garden-salad.jpg"
  },
  {
    id: "mirosa-mushroom-pasta",
    name: "Creamy Wild Mushroom Stroganoff",
    category: "pasta",
    price: 460,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Sauteed cremini and button mushrooms folded in garlic sour cream sauce with herbs, served with crusty garlic bread.",
    dietary: ["Vegetarian", "Rich & Savory"],
    calories: "510 kcal",
    image: "/assets/real/real-mushroom-pasta.jpg"
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Mirosa Espresso Bar & Counter",
    category: "interior",
    description: "The signature fluted white barista station, ambient woven pendant lamps, and specialty coffee brewing at Himayat Nagar.",
    image: "/assets/real/real-espresso-bar.jpg",
    span: "col-span-2 row-span-2"
  },
  {
    id: 2,
    title: "Iconic Terrazzo Spiral Staircase",
    category: "interior",
    description: "Architectural spiral staircase with terrazzo steps and indoor greenery leading to the mezzanine floor.",
    image: "/assets/real/real-spiral-stairs.jpg",
    span: "col-span-1"
  },
  {
    id: 3,
    title: "Mirosa Wall Sign & Greenery",
    category: "interior",
    description: "The minimalist 'mirosa' brand wall with warm spotlights and potted plants.",
    image: "/assets/real/real-mirosa-wall.jpg",
    span: "col-span-1"
  },
  {
    id: 4,
    title: "Viral Croissant Wheel & Brew",
    category: "food",
    description: "Authentic house-laminated supreme croissant wheel with rich filling and freshly pulled cappuccino.",
    image: "/assets/real/real-croissant-wheel.jpg",
    span: "col-span-1"
  },
  {
    id: 5,
    title: "Handcrafted Barista Latte Art",
    category: "coffee",
    description: "Precision rosetta latte art in Mirosa's signature ceramic cup and saucer.",
    image: "/assets/real/real-latte-art.jpg",
    span: "col-span-1"
  },
  {
    id: 6,
    title: "Artisan Spiced Chicken Pizza",
    category: "food",
    description: "Freshly baked pizza topped with spiced chicken chunks, mozzarella, and house cream drizzle.",
    image: "/assets/real/real-chicken-pizza.jpg",
    span: "col-span-1"
  },
  {
    id: 7,
    title: "Creamy Alfredo Penne with Toast",
    category: "food",
    description: "Rich velvety penne pasta tossed in herb garlic cream, served with toasted garlic bread.",
    image: "/assets/real/real-creamy-alfredo.jpg",
    span: "col-span-1"
  },
  {
    id: 8,
    title: "Blue Lagoon & Citrus Spritz",
    category: "drinks",
    description: "Refreshing layered mocktails and botanical sparklers served over clear ice.",
    image: "/assets/real/real-blue-mocktail.jpg",
    span: "col-span-2"
  },
  {
    id: 9,
    title: "Crispy Chicken Schnitzel & Fries",
    category: "food",
    description: "Golden fried chicken cutlet served with hand-cut fries, garlic dip, and garden salad.",
    image: "/assets/real/real-crispy-chicken.jpg",
    span: "col-span-1"
  },
  {
    id: 10,
    title: "Farm-Fresh Veggie Loaded Pizza",
    category: "food",
    description: "Crisp thin crust pizza generously topped with bell peppers, sweet corn, black olives, and herbs.",
    image: "/assets/real/real-veggie-pizza.jpg",
    span: "col-span-1"
  },
  {
    id: 11,
    title: "Sparkling Citrus Mint Spritz",
    category: "drinks",
    description: "Effervescent citrus cooler garnished with fresh garden mint and dehydrated orange.",
    image: "/assets/real/real-citrus-spritz.jpg",
    span: "col-span-1"
  },
  {
    id: 12,
    title: "Mirosa Main Dining Hall",
    category: "interior",
    description: "Spacious cafe seating with bespoke wooden tables, green armchairs, and warm acoustic ambiance.",
    image: "/assets/real/real-interior-main.jpg",
    span: "col-span-1"
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: "MRS-2401",
    name: "Arjun Venkat",
    phone: "+91 98490 12345",
    email: "arjun.v@gmail.com",
    date: "2026-10-16",
    time: "20:00",
    guests: "4",
    occasion: "Anniversary Celebration",
    status: "Confirmed",
    notes: "Prefers corner banquette table with ambient lighting.",
    createdAt: "2026-10-14 11:30"
  },
  {
    id: "MRS-2402",
    name: "Pooja Reddy",
    phone: "+91 97011 88442",
    email: "pooja.reddy@outlook.com",
    date: "2026-10-17",
    time: "16:30",
    guests: "2",
    occasion: "Coffee & Pastries Date",
    status: "Confirmed",
    notes: "High tea and pistachio croissant wheel pre-order.",
    createdAt: "2026-10-14 14:15"
  }
];
