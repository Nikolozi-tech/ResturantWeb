import { createContext, createElement, useContext, useMemo, useReducer } from "react";

export const CATEGORIES = [
  { id: "pizza", label: { ge: "პიცა", en: "Pizza" }, description: { ge: "ღუმელიდან პირდაპირ მაგიდაზე", en: "Oven-fired bistro favorites" } },
  { id: "burgers", label: { ge: "ბურგერები & სენდვიჩები", en: "Burgers & Sandwiches" }, description: { ge: "კომფორტული, სწრაფი და ხარისხიანი", en: "Premium comfort classics" } },
  { id: "appetizers", label: { ge: "წასახემსებელი & სალათები", en: "Appetizers & Salads" }, description: { ge: "გასაზიარებელი არჩევანი", en: "Shareable plates and fresh sides" } },
  { id: "drinks", label: { ge: "სასმელები", en: "Drinks" }, description: { ge: "გრილი და გამაგრილებელი", en: "Cold, polished refreshers" } },
];

export const MENU_ITEMS = [
  {
    id: "pizza-margherita",
    categoryId: "pizza",
    name: { ge: "პიცა მარგარიტა", en: "Pizza Margherita" },
    description: { ge: "კლასიკური პიცა ტომატის სოუსითა და მოცარელათი", en: "Classic pizza with tomato sauce and mozzarella." },
    price: 18,
    viral: false,
    available: true,
    visual: "tomato",
  },
  {
    id: "pizza-pepperoni",
    categoryId: "pizza",
    name: { ge: "პიცა პეპერონი", en: "Pizza Pepperoni" },
    description: { ge: "ცხარე პეპერონი, მოცარელა, საფირმო სოუსი", en: "Spicy pepperoni, mozzarella, and signature sauce." },
    price: 22,
    viral: true,
    available: true,
    visual: "pepperoni",
  },
  {
    id: "four-cheese-pizza",
    categoryId: "pizza",
    name: { ge: "პიცა ოთხი ყველი", en: "Four Cheese Pizza" },
    description: { ge: "მოცარელა, პარმეზანი, გორგონძოლა, ჩედარი", en: "Mozzarella, parmesan, gorgonzola, and cheddar." },
    price: 24,
    viral: false,
    available: true,
    visual: "cheese",
  },
  {
    id: "classic-burger",
    categoryId: "burgers",
    name: { ge: "კლასიკური ბურგერი", en: "Classic Burger" },
    description: { ge: "საქონლის ხორცის კოტლეტი, ჩედარი, ბოსტნეული, საფირმო სოუსი", en: "Beef patty, cheddar, vegetables, and signature sauce." },
    price: 16,
    viral: true,
    available: true,
    visual: "burger",
  },
  {
    id: "chicken-burger",
    categoryId: "burgers",
    name: { ge: "ჩიქენ ბურგერი", en: "Crispy Chicken Burger" },
    description: { ge: "ხრაშუნა ქათმის ფილე, სალათის ფოთოლი, მაიონეზის სოუსი", en: "Crispy chicken fillet, lettuce, and mayo sauce." },
    price: 15,
    viral: false,
    available: true,
    visual: "chicken",
  },
  {
    id: "club-sandwich-fries",
    categoryId: "burgers",
    name: { ge: "კლუბ სენდვიჩი ფრით", en: "Club Sandwich with Fries" },
    description: { ge: "კლასიკური კლუბ სენდვიჩი ოქროსფერ ფრისთან ერთად", en: "Classic club sandwich served with golden fries." },
    price: 14,
    viral: false,
    available: true,
    visual: "sandwich",
  },
  {
    id: "caesar-chicken",
    categoryId: "appetizers",
    name: { ge: "კეისარი ქათმით", en: "Caesar Salad with Chicken" },
    description: { ge: "კლასიკური კეისარი საფირმო დრესინგითა და კრუტონებით", en: "Classic Caesar with signature dressing and croutons." },
    price: 16,
    viral: false,
    available: true,
    visual: "salad",
  },
  {
    id: "french-fries",
    categoryId: "appetizers",
    name: { ge: "კარტოფილი ფრი", en: "French Fries" },
    description: { ge: "ოქროსფერი კარტოფილი ფრი სოუსით", en: "Golden french fries with sauce." },
    price: 7,
    viral: false,
    available: true,
    visual: "fries",
  },
  {
    id: "mexican-potatoes",
    categoryId: "appetizers",
    name: { ge: "მექსიკური კარტოფილი", en: "Mexican Potatoes" },
    description: { ge: "ცხარე მექსიკური კარტოფილი საფირმო სოუსით", en: "Spicy Mexican potatoes with signature sauce." },
    price: 8,
    viral: false,
    available: true,
    visual: "potatoes",
  },
  {
    id: "coca-cola-033",
    categoryId: "drinks",
    name: { ge: "კოკა-კოლა 0.33ლ", en: "Coca-Cola 0.33L" },
    description: { ge: "გაცივებული კოკა-კოლა ქილით", en: "Chilled Coca-Cola can." },
    price: 3,
    viral: false,
    available: true,
    visual: "cola",
  },
  {
    id: "iced-coffee",
    categoryId: "drinks",
    name: { ge: "ცივი ყავა", en: "Iced Coffee" },
    description: { ge: "გამაგრილებელი ცივი ყავა რძით", en: "Refreshing iced coffee with milk." },
    price: 7,
    viral: false,
    available: true,
    visual: "coffee",
  },
];

export const TIME_SLOTS = [
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

const initialReservations = [
  {
    id: "MRC-24891",
    customerName: "Nino Beridze",
    phone: "+995555141288",
    partySize: 4,
    date: "2026-05-26",
    time: "20:00",
    status: "Confirmed",
    createdAt: "2026-05-26T02:00:00.000Z",
  },
  {
    id: "MRC-24892",
    customerName: "Giorgi Maisuradze",
    phone: "+995577901020",
    partySize: 2,
    date: "2026-05-26",
    time: "21:30",
    status: "Seated",
    createdAt: "2026-05-26T02:04:00.000Z",
  },
];

const initialState = {
  language: "ge",
  menuItems: MENU_ITEMS,
  reservations: initialReservations,
};

const MenuContext = createContext(null);

const sortReservations = (reservations) =>
  [...reservations].sort((a, b) => {
    const dateTime = `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
    return dateTime || a.customerName.localeCompare(b.customerName);
  });

const createTrackingId = () =>
  `MRC-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

function menuReducer(state, action) {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "ADD_RESERVATION":
      return { ...state, reservations: sortReservations([...state.reservations, action.payload]) };
    case "UPDATE_RESERVATION_STATUS":
      return {
        ...state,
        reservations: sortReservations(
          state.reservations.map((reservation) =>
            reservation.id === action.payload.id ? { ...reservation, status: action.payload.status } : reservation,
          ),
        ),
      };
    case "TOGGLE_MENU_AVAILABILITY":
      return {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload ? { ...item, available: !item.available } : item,
        ),
      };
    default:
      return state;
  }
}

export function MenuProvider({ children }) {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const reservations = useMemo(() => sortReservations(state.reservations), [state.reservations]);

  const bookedSlotsByDate = useMemo(
    () =>
      reservations.reduce((slots, reservation) => {
        if (reservation.status !== "Cancelled") {
          slots[reservation.date] = [...(slots[reservation.date] || []), reservation.time];
        }
        return slots;
      }, {}),
    [reservations],
  );

  const groupedMenu = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        ...category,
        items: state.menuItems.filter((item) => item.categoryId === category.id),
      })),
    [state.menuItems],
  );

  const createReservation = ({ customerName, localPhone, partySize, date, time }) => {
    const reservation = {
      id: createTrackingId(),
      customerName: customerName.trim(),
      phone: `+995${localPhone}`,
      partySize: Number(partySize),
      date,
      time,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_RESERVATION", payload: reservation });
    return reservation;
  };

  const isSlotAvailable = (date, time) => {
    if (!date || !time) return false;
    return !(bookedSlotsByDate[date] || []).includes(time);
  };

  const value = useMemo(
    () => ({
      bookedSlotsByDate,
      categories: CATEGORIES,
      createReservation,
      dispatch,
      groupedMenu,
      isSlotAvailable,
      language: state.language,
      menuItems: state.menuItems,
      reservations,
      setLanguage: (language) => dispatch({ type: "SET_LANGUAGE", payload: language }),
      timeSlots: TIME_SLOTS,
      toggleMenuAvailability: (itemId) => dispatch({ type: "TOGGLE_MENU_AVAILABILITY", payload: itemId }),
      updateReservationStatus: (id, status) =>
        dispatch({ type: "UPDATE_RESERVATION_STATUS", payload: { id, status } }),
    }),
    [bookedSlotsByDate, groupedMenu, reservations, state.language, state.menuItems],
  );

  return createElement(MenuContext.Provider, { value }, children);
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
