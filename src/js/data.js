/**
 * MIROSA CAFE & KITCHEN - OFFICIAL MENU DATA
 * Himayat Nagar, Hyderabad, Telangana 500029
 * Authentic menu from official Mirosa printed menu cards
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
  { id: "all", label: "All Offerings", count: 30, icon: "sparkles" },
  { id: "pizzas", label: "Pizzas", count: 7, icon: "pizza" },
  { id: "pastas", label: "Pastas", count: 5, icon: "pasta" },
  { id: "combos", label: "Indian Combos", count: 5, icon: "bowl" },
  { id: "salads", label: "Salads", count: 5, icon: "leaf" },
  { id: "soups", label: "Soups", count: 5, icon: "soup" },
  { id: "sides", label: "Sides", count: 3, icon: "utensils" }
];

export const INITIAL_MENU_ITEMS = [
  // ==================== PIZZAS ====================
  {
    id: "mirosa-pizza-margherita",
    name: "Margherita",
    category: "pizzas",
    price: 390,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: true,
    isAvailable: true,
    description: "Tomato Sauce, Sun-dried Tomato, Basil, Bocconcini Cheese.",
    dietary: ["Vegetarian", "Bocconcini Cheese", "Sun-dried Tomato"],
    calories: "520 kcal",
    image: "/assets/real/real-veggie-pizza.jpg"
  },
  {
    id: "mirosa-pizza-quattro-formaggi",
    name: "Quattro Formaggi",
    category: "pizzas",
    price: 420,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Quattro Formaggi, Toum Sauce, Parsley.",
    dietary: ["Vegetarian", "Four Cheese", "Toum Sauce"],
    calories: "590 kcal",
    image: "/assets/real/sheet3_7.jpg"
  },
  {
    id: "mirosa-pizza-veg-exotica",
    name: "Veg Exotica Pizza",
    category: "pizzas",
    price: 450,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Red Sauce, Mozzarella, Black Olives, Broccoli, Baby Corn, Bellpepers, Onion.",
    dietary: ["Chef's Special", "Vegetarian", "Loaded Veggies"],
    calories: "560 kcal",
    image: "/assets/real/real-veggie-pizza.jpg"
  },
  {
    id: "mirosa-pizza-paneer-tikka",
    name: "Paneer Tikka Pizza",
    category: "pizzas",
    price: 480,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Tawa Paneer, Red Sauce, Mozzarella, Capsicum, Onion, Tomato.",
    dietary: ["Vegetarian", "Tawa Paneer", "Indian Fusion"],
    calories: "610 kcal",
    image: "/assets/real/sheet3_8.jpg"
  },
  {
    id: "mirosa-pizza-jerk-chicken",
    name: "Jerk Chicken",
    category: "pizzas",
    price: 480,
    isVeg: false,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Chipotle Sauce, Mozzarella, Sriracha Chicken, Onion, Bellpeppers.",
    dietary: ["Non-Vegetarian", "Sriracha Chicken", "Chipotle Sauce"],
    calories: "640 kcal",
    image: "/assets/real/sheet3_7.jpg"
  },
  {
    id: "mirosa-pizza-alfredo-chicken",
    name: "Alfredo Chicken Pizza",
    category: "pizzas",
    price: 480,
    isVeg: false,
    isChefSpecial: false,
    isFeatured: true,
    isAvailable: true,
    description: "Alfredo Sauce, Grilled Chicken, Mozzarella, Bellpeppers, Mushroom, Onion.",
    dietary: ["Non-Vegetarian", "Alfredo Sauce", "Grilled Chicken"],
    calories: "630 kcal",
    image: "/assets/real/sheet4_5.jpg"
  },
  {
    id: "mirosa-pizza-loaded-chicken",
    name: "Loaded Chicken Pizza",
    category: "pizzas",
    price: 520,
    isVeg: false,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Chipotle Sauce, Mozzarella, Chicken Pepperoni, Spicy Chicken, Chicken Sausage, Green Chilli.",
    dietary: ["Chef's Special", "Non-Vegetarian", "Pepperoni & Sausage"],
    calories: "690 kcal",
    image: "/assets/real/real-chicken-pizza.jpg"
  },

  // ==================== SALADS ====================
  {
    id: "mirosa-salad-caesar",
    name: "Caesar Salad",
    category: "salads",
    price: 270,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Leaves, Croutons, Parmesan, Caesar Dressing. (Veg ₹270 / Chicken ₹320).",
    dietary: ["Classic Caesar", "Veg | Chicken Option"],
    calories: "280 kcal",
    image: "/assets/real/sheet1_9.jpg"
  },
  {
    id: "mirosa-salad-greek-feta",
    name: "Greek Salad Feta Cheese",
    category: "salads",
    price: 270,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Mixed Leaves, Mixed Veggies, Feta Cheese, Home-made Dressing.",
    dietary: ["Vegetarian", "Feta Cheese", "Homemade Dressing"],
    calories: "260 kcal",
    image: "/assets/real/sheet1_9.jpg"
  },
  {
    id: "mirosa-salad-watermelon-feta",
    name: "Watermelon Feta Salad",
    category: "salads",
    price: 320,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Sliced Watermelon, Fresh Leaves, Gaucamole, Feta Cheese.",
    dietary: ["Chef's Special", "Vegetarian", "Guacamole & Feta"],
    calories: "220 kcal",
    image: "/assets/real/sheet1_10.jpg"
  },
  {
    id: "mirosa-salad-mexican-chicken",
    name: "Mexican Chicken Salad",
    category: "salads",
    price: 340,
    isVeg: false,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Mixed Leaves, Sauteed Veggies, Mexican Chicken, Spicy Beans, Baby Corn, Mexican Sizzling.",
    dietary: ["Non-Vegetarian", "Mexican Chicken", "Spicy Beans"],
    calories: "340 kcal",
    image: "/assets/real/sheet1_9.jpg"
  },
  {
    id: "mirosa-salad-mirosa-chicken",
    name: "Mirosa Chicken Salad",
    category: "salads",
    price: 360,
    isVeg: false,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Mixed Sauteed Veggies, Grilled Chicken, Boiled Egg, Spicy Beans, Special Dressing.",
    dietary: ["Chef's Special", "Non-Vegetarian", "High Protein"],
    calories: "380 kcal",
    image: "/assets/real/real-garden-salad.jpg"
  },

  // ==================== PASTAS ====================
  {
    id: "mirosa-pasta-aglio-olio",
    name: "Aglio Olio Spaghetti",
    category: "pastas",
    price: 420,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Spaghetti, Garlic, Parmesan, Olive Oil, Seasoning.",
    dietary: ["Vegetarian", "Spaghetti", "Olive Oil & Garlic"],
    calories: "440 kcal",
    image: "/assets/real/sheet1_5.jpg"
  },
  {
    id: "mirosa-pasta-pesto",
    name: "Pesto Pasta",
    category: "pastas",
    price: 490,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: true,
    isAvailable: true,
    description: "Spaghetti Pasta, Basil Pesto Sauce.",
    dietary: ["Vegetarian", "Spaghetti", "Fresh Basil Pesto"],
    calories: "490 kcal",
    image: "/assets/real/real-pesto-pasta.jpg"
  },
  {
    id: "mirosa-pasta-alfredo",
    name: "Alfredo Pasta",
    category: "pastas",
    price: 420,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Choice of Pasta - Penne | Spaghetti. Pasta, Creamy Cheese Sauce, Parmesan Cheese, Fresh Herbs. (Veg ₹420 / Chicken ₹450).",
    dietary: ["Chef's Special", "Creamy Cheese Sauce", "Veg | Chicken Option"],
    calories: "540 kcal",
    image: "/assets/real/real-creamy-alfredo.jpg"
  },
  {
    id: "mirosa-pasta-arrabiata",
    name: "Arrabiata Pasta",
    category: "pastas",
    price: 420,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Choice of Pasta - Penne | Spaghetti. Pasta, Tomato Pelati Sauce, Parmesan, Garlic, Olive Oil, Fresh Herbs. (Veg ₹420 / Chicken ₹450).",
    dietary: ["Spicy Tomato Pelati", "Veg | Chicken Option"],
    calories: "460 kcal",
    image: "/assets/real/real-penne-arrabbiata.jpg"
  },
  {
    id: "mirosa-pasta-mamarosa",
    name: "Mamarosa Pasta",
    category: "pastas",
    price: 420,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Penne Pasta, Special Mixed Sauce, Fresh Herbs. (Veg ₹420 / Chicken ₹450).",
    dietary: ["Chef's Special", "Special Mixed Sauce", "Veg | Chicken Option"],
    calories: "510 kcal",
    image: "/assets/real/real-mushroom-pasta.jpg"
  },

  // ==================== SOUPS ====================
  {
    id: "mirosa-soup-broccoli",
    name: "Broccoli Soup",
    category: "soups",
    price: 200,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: false,
    isAvailable: true,
    description: "Broccoli, Parmesan Cheese, Fresh Cream.",
    dietary: ["Chef's Special", "Vegetarian", "Fresh Cream"],
    calories: "160 kcal",
    image: "/assets/real/sheet5_8.jpg"
  },
  {
    id: "mirosa-soup-mushroom",
    name: "Cream of Mushroom",
    category: "soups",
    price: 210,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Mushroom, Parmesan Cheese, Fresh Cream.",
    dietary: ["Vegetarian", "Parmesan Cheese", "Fresh Cream"],
    calories: "180 kcal",
    image: "/assets/real/real-mushroom-pasta.jpg"
  },
  {
    id: "mirosa-soup-hot-sour",
    name: "Hot & Sour Soup",
    category: "soups",
    price: 190,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Spicy Sauce, Veggies. (Veg ₹190 / Chicken ₹230).",
    dietary: ["Spicy Sauce", "Veg | Chicken Option"],
    calories: "140 kcal",
    image: "/assets/real/sheet5_2.jpg"
  },
  {
    id: "mirosa-soup-lemon-coriander",
    name: "Lemon Coriander Soup",
    category: "soups",
    price: 190,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Lemon, Coriander, Veggies. (Veg ₹190 / Chicken ₹230).",
    dietary: ["Citrus & Fresh", "Veg | Chicken Option"],
    calories: "110 kcal",
    image: "/assets/real/sheet5_8.jpg"
  },
  {
    id: "mirosa-soup-alfredo-pollo",
    name: "Alfredo De Pollo",
    category: "soups",
    price: 230,
    isVeg: false,
    isChefSpecial: true,
    isFeatured: false,
    isAvailable: true,
    description: "Chicken, Parmesan Cheese, Cream.",
    dietary: ["Chef's Special", "Non-Vegetarian", "Chicken & Cream"],
    calories: "220 kcal",
    image: "/assets/real/sheet3_1.jpg"
  },

  // ==================== SIDES ====================
  {
    id: "mirosa-sides-french-fries",
    name: "Choice of French Fries",
    category: "sides",
    price: 220,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: true,
    isAvailable: true,
    description: "Crisp golden potato fries. Salted (₹220) | Peri Peri (₹240) | Truffle Parmesan (₹340).",
    dietary: ["Vegetarian", "Salted | Peri Peri | Truffle Parmesan"],
    calories: "380 kcal",
    image: "/assets/real/real-truffle-fries.jpg"
  },
  {
    id: "mirosa-sides-garlic-bread",
    name: "Garlic Bread",
    category: "sides",
    price: 220,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Home-made Loaf, Mozzarella, Garlic Seasoning. Classic (₹220) | Cheese (₹250).",
    dietary: ["Vegetarian", "Homemade Loaf", "Classic | Cheese"],
    calories: "290 kcal",
    image: "/assets/real/real-french-toast.jpg"
  },
  {
    id: "mirosa-sides-loaded-nachos",
    name: "Loaded Mexican Nachos",
    category: "sides",
    price: 320,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Spicy Beans, Salsa, Gaucamole, Sour Cream, Cheese Sauce. (Veg ₹320 / Chicken ₹360).",
    dietary: ["Guacamole & Salsa", "Sour Cream & Cheese", "Veg | Chicken Option"],
    calories: "450 kcal",
    image: "/assets/real/real-spring-rolls.jpg"
  },

  // ==================== INDIAN COMBOS ====================
  {
    id: "mirosa-combo-paneer-masala",
    name: "Paneer Masala Rice Bowl",
    category: "combos",
    price: 450,
    isVeg: true,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Served with Jeera Rice. Tender cottage cheese in spiced onion tomato masala gravy.",
    dietary: ["Chef's Special", "Vegetarian", "Served with Jeera Rice"],
    calories: "580 kcal",
    image: "/assets/real/sheet5_2.jpg"
  },
  {
    id: "mirosa-combo-patiyala-paneer",
    name: "Patiyala Paneer Rice Bowl",
    category: "combos",
    price: 450,
    isVeg: true,
    isChefSpecial: false,
    isFeatured: false,
    isAvailable: true,
    description: "Served with Jeera Rice. Rich Punjabi Patiyala style paneer gravy.",
    dietary: ["Vegetarian", "Punjabi Style", "Served with Jeera Rice"],
    calories: "590 kcal",
    image: "/assets/real/sheet5_2.jpg"
  },
  {
    id: "mirosa-combo-butter-chicken",
    name: "Butter Chicken Rice Bowl",
    category: "combos",
    price: 460,
    isVeg: false,
    isChefSpecial: false,
    isFeatured: true,
    isAvailable: true,
    description: "Served with Jeera Rice. Classic tender chicken in velvety makhani butter gravy.",
    dietary: ["Bestseller", "Non-Vegetarian", "Served with Jeera Rice"],
    calories: "640 kcal",
    image: "/assets/real/real-rice-bowl.jpg"
  },
  {
    id: "mirosa-combo-afghani-chicken",
    name: "Afghani Chicken Rice Bowl",
    category: "combos",
    price: 480,
    isVeg: false,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Served with Egg Omelette & Butter Rice. Mild creamy Afghani chicken.",
    dietary: ["Chef's Special", "Non-Vegetarian", "Egg Omelette & Butter Rice"],
    calories: "690 kcal",
    image: "/assets/real/sheet1_1.jpg"
  },
  {
    id: "mirosa-combo-lamb-keema",
    name: "Lamb Keema Rice Bowl",
    category: "combos",
    price: 510,
    isVeg: false,
    isChefSpecial: true,
    isFeatured: true,
    isAvailable: true,
    description: "Served with Cashew Butter Rice. Spiced minced lamb keema cooked to perfection.",
    dietary: ["Chef's Special", "Non-Vegetarian", "Cashew Butter Rice"],
    calories: "720 kcal",
    image: "/assets/real/real-rice-bowl.jpg"
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
    description: "Architectural spiral staircase with terrazzo stairs and indoor greenery leading to the mezzanine floor.",
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
    title: "Loaded Chicken Pizza",
    category: "food",
    description: "Pepperoni, spicy chicken, sausage, mozzarella and chipotle sauce on crisp crust.",
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
    title: "Mirosa Chicken Salad",
    category: "food",
    description: "Mixed sauteed veggies, grilled chicken, boiled egg, spicy beans and special dressing.",
    image: "/assets/real/real-garden-salad.jpg",
    span: "col-span-1"
  },
  {
    id: 10,
    title: "Farm-Fresh Veg Exotica Pizza",
    category: "food",
    description: "Black olives, broccoli, baby corn, bell peppers and mozzarella on crisp crust.",
    image: "/assets/real/real-veggie-pizza.jpg",
    span: "col-span-1"
  },
  {
    id: 11,
    title: "Butter Chicken Rice Bowl",
    category: "food",
    description: "Classic tender chicken in rich makhani gravy served with fragrant Jeera Rice.",
    image: "/assets/real/real-rice-bowl.jpg",
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
