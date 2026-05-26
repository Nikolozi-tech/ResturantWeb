import { createContext, createElement, useContext, useMemo, useReducer } from "react";
import { menuItems as officialMenuItems } from "../data/menu.js";

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

const initialReservations = [
  {
    id: "MRC-82491",
    customerName: "Nino Beridze",
    phone: "+995555141288",
    partySize: 4,
    date: "2026-05-26",
    time: "20:00",
    status: "Confirmed",
    createdAt: "2026-05-26T02:00:00.000Z",
  },
  {
    id: "MRC-82492",
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
  menuItems: officialMenuItems,
  reservations: initialReservations,
};

const MenuContext = createContext(null);

const sortReservations = (reservations) =>
  [...reservations].sort((a, b) => {
    const dateTime = `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
    return dateTime || a.customerName.localeCompare(b.customerName);
  });

const createTrackingId = () => `MRC-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

function menuReducer(state, action) {
  switch (action.type) {
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
          item.id === action.payload ? { ...item, isAvailable: !item.isAvailable } : item,
        ),
      };
    default:
      return state;
  }
}

export function MenuProvider({ children }) {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const reservations = useMemo(() => sortReservations(state.reservations), [state.reservations]);

  const categories = useMemo(() => {
    const byCategory = new Map();
    state.menuItems.forEach((item) => {
      if (!byCategory.has(item.categoryGe)) {
        byCategory.set(item.categoryGe, {
          id: item.category,
          labelGe: item.categoryGe,
          labelEn: item.category,
        });
      }
    });
    return Array.from(byCategory.values());
  }, [state.menuItems]);

  const groupedMenu = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        items: state.menuItems.filter((item) => item.categoryGe === category.labelGe),
      })),
    [categories, state.menuItems],
  );

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
      categories,
      createReservation,
      groupedMenu,
      isSlotAvailable,
      menuItems: state.menuItems,
      reservations,
      timeSlots,
      toggleMenuAvailability: (itemId) => dispatch({ type: "TOGGLE_MENU_AVAILABILITY", payload: itemId }),
      updateReservationStatus: (id, status) =>
        dispatch({ type: "UPDATE_RESERVATION_STATUS", payload: { id, status } }),
    }),
    [bookedSlotsByDate, categories, groupedMenu, reservations, state.menuItems],
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
