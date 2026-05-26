import React, { createContext, useContext, useMemo, useState } from "react";

export const categories = [
  { id: "pizza", label: { en: "Pizza", ge: "პიცა" }, accent: "from-amber-500 to-orange-600" },
  {
    id: "burgers",
    label: { en: "Burgers & Sandwiches", ge: "ბურგერები & სენდვიჩები" },
    accent: "from-green-500 to-emerald-700",
  },
  {
    id: "appetizers",
    label: { en: "Appetizers & Salads", ge: "წასახემსებელი & სალათები" },
    accent: "from-lime-500 to-amber-500",
  },
  { id: "drinks", label: { en: "Drinks", ge: "სასმელები" }, accent: "from-cyan-400 to-green-500" },
];

export const maracanaMenu = [
  {
    id: "pizza-margherita",
    categoryId: "pizza",
    name: { ge: "პიცა მარგარიტა", en: "Pizza Margherita" },
    description: {
      ge: "კლასიკური პიცა ტომატის სოუსითა და მოცარელათი",
      en: "Classic pizza with tomato sauce and mozzarella.",
    },
    price: 18,
    imageTone: "from-red-950 via-amber-800 to-amber-500",
    inStock: true,
    isViral: false,
  },
  {
    id: "pizza-pepperoni",
    categoryId: "pizza",
    name: { ge: "პიცა პეპერონი", en: "Pizza Pepperoni" },
    description: {
      ge: "ცხარე პეპერონი, მოცარელა, საფირმო სოუსი",
      en: "Spicy pepperoni, mozzarella, and signature sauce.",
    },
    price: 22,
    imageTone: "from-red-950 via-red-700 to-amber-500",
    inStock: true,
    isViral: true,
  },
  {
    id: "four-cheese-pizza",
    categoryId: "pizza",
    name: { ge: "პიცა ოთხი ყველი", en: "Four Cheese Pizza" },
    description: {
      ge: "მოცარელა, პარმეზანი, გორგონძოლა, ჩედარი",
      en: "Mozzarella, parmesan, gorgonzola, and cheddar.",
    },
    price: 24,
    imageTone: "from-yellow-950 via-amber-700 to-yellow-300",
    inStock: true,
    isViral: false,
  },
  {
    id: "classic-burger",
    categoryId: "burgers",
    name: { ge: "კლასიკური ბურგერი", en: "Classic Burger" },
    description: {
      ge: "საქონლის ხორცის კოტლეტი, ჩედარი, ბოსტნეული, საფირმო სოუსი",
      en: "Beef patty, cheddar, vegetables, and signature sauce.",
    },
    price: 16,
    imageTone: "from-neutral-950 via-green-900 to-amber-500",
    inStock: true,
    isViral: true,
  },
  {
    id: "crispy-chicken-burger",
    categoryId: "burgers",
    name: { ge: "ჩიქენ ბურგერი", en: "Crispy Chicken Burger" },
    description: {
      ge: "ხრაშუნა ქათმის ფილე, სალათის ფოთოლი, მაიონეზის სოუსი",
      en: "Crispy chicken fillet, lettuce, and mayo sauce.",
    },
    price: 15,
    imageTone: "from-orange-950 via-amber-800 to-green-500",
    inStock: true,
    isViral: false,
  },
  {
    id: "club-sandwich-fries",
    categoryId: "burgers",
    name: { ge: "კლუბ სენდვიჩი ფრით", en: "Club Sandwich with Fries" },
    description: {
      ge: "კლასიკური კლუბ სენდვიჩი ოქროსფერ ფრისთან ერთად",
      en: "Classic club sandwich served with golden fries.",
    },
    price: 14,
    imageTone: "from-amber-950 via-neutral-800 to-yellow-500",
    inStock: true,
    isViral: false,
  },
  {
    id: "caesar-chicken",
    categoryId: "appetizers",
    name: { ge: "კეისარი ქათმით", en: "Caesar Salad with Chicken" },
    description: {
      ge: "კლასიკური კეისარი საფირმო დრესინგითა და კრუტონებით",
      en: "Classic Caesar with signature dressing and croutons.",
    },
    price: 16,
    imageTone: "from-green-950 via-lime-800 to-amber-400",
    inStock: true,
    isViral: false,
  },
  {
    id: "french-fries",
    categoryId: "appetizers",
    name: { ge: "კარტოფილი ფრი", en: "French Fries" },
    description: {
      ge: "ოქროსფერი კარტოფილი ფრი სოუსით",
      en: "Golden french fries with sauce.",
    },
    price: 7,
    imageTone: "from-yellow-950 via-amber-700 to-yellow-300",
    inStock: true,
    isViral: false,
  },
  {
    id: "mexican-potatoes",
    categoryId: "appetizers",
    name: { ge: "მექსიკური კარტოფილი", en: "Mexican Potatoes" },
    description: {
      ge: "ცხარე მექსიკური კარტოფილი საფირმო სოუსით",
      en: "Spicy Mexican potatoes with signature sauce.",
    },
    price: 8,
    imageTone: "from-red-950 via-orange-700 to-green-500",
    inStock: true,
    isViral: false,
  },
  {
    id: "coca-cola",
    categoryId: "drinks",
    name: { ge: "კოკა-კოლა 0.33ლ", en: "Coca-Cola 0.33L" },
    description: {
      ge: "გაცივებული კოკა-კოლა ქილით",
      en: "Chilled Coca-Cola can.",
    },
    price: 3,
    imageTone: "from-red-950 via-neutral-900 to-red-600",
    inStock: true,
    isViral: false,
  },
  {
    id: "iced-coffee",
    categoryId: "drinks",
    name: { ge: "ცივი ყავა", en: "Iced Coffee" },
    description: {
      ge: "გამაგრილებელი ცივი ყავა რძით",
      en: "Refreshing iced coffee with milk.",
    },
    price: 7,
    imageTone: "from-stone-950 via-amber-900 to-neutral-500",
    inStock: true,
    isViral: false,
  },
];

export const timeSlots = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

const initialBookings = [
  {
    id: "MRC-9402",
    fullName: "Nino Beridze",
    phone: "+995555141288",
    guests: 4,
    date: "2026-05-26",
    time: "20:30",
    status: "Confirmed",
    createdAt: "2026-05-26T01:00:00.000Z",
  },
  {
    id: "MRC-9403",
    fullName: "Giorgi Maisuradze",
    phone: "+995577901020",
    guests: 2,
    date: "2026-05-26",
    time: "22:00",
    status: "Seated",
    createdAt: "2026-05-26T01:05:00.000Z",
  },
];

const MenuContext = createContext(null);

const makeConfirmationCode = () =>
  "MRC-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Date.now().toString().slice(-4);

const sortBookings = (items) =>
  [...items].sort((a, b) => {
    const dateCompare = (a.date + "T" + a.time).localeCompare(b.date + "T" + b.time);
    return dateCompare || a.fullName.localeCompare(b.fullName);
  });

export function MenuProvider({ children }) {
  const [language, setLanguage] = useState("ge");
  const [menuItems, setMenuItems] = useState(maracanaMenu);
  const [bookings, setBookings] = useState(initialBookings);

  const bookedSlotsByDate = useMemo(
    () =>
      bookings.reduce((slots, booking) => {
        if (booking.status !== "Cancelled") {
          slots[booking.date] = [...(slots[booking.date] || []), booking.time];
        }
        return slots;
      }, {}),
    [bookings],
  );

  const isSlotAvailable = (date, time) => {
    if (!date || !time) {
      return false;
    }
    return !(bookedSlotsByDate[date] || []).includes(time);
  };

  const createBooking = (bookingDetails) => {
    const booking = {
      id: makeConfirmationCode(),
      fullName: bookingDetails.fullName.trim(),
      phone: bookingDetails.phone,
      guests: Number(bookingDetails.guests),
      date: bookingDetails.date,
      time: bookingDetails.time,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setBookings((current) => sortBookings([...current, booking]));
    return booking;
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((current) =>
      sortBookings(current.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking))),
    );
  };

  const toggleItemStock = (itemId) => {
    setMenuItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, inStock: !item.inStock } : item)),
    );
  };

  const value = useMemo(
    () => ({
      bookedSlotsByDate,
      bookings: sortBookings(bookings),
      categories,
      createBooking,
      isSlotAvailable,
      language,
      menuItems,
      setLanguage,
      timeSlots,
      toggleItemStock,
      updateBookingStatus,
    }),
    [bookedSlotsByDate, bookings, language, menuItems],
  );

  return React.createElement(MenuContext.Provider, { value }, children);
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
