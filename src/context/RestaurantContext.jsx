import { createContext, useContext, useMemo, useState } from "react";
import { bookedSlots, initialBookings, menuItems } from "../data/mockData";

const RestaurantContext = createContext(null);

const makeConfirmationCode = () =>
  `SUP-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now()
    .toString()
    .slice(-4)}`;

export function RestaurantProvider({ children }) {
  const [inventory, setInventory] = useState(menuItems);
  const [bookings, setBookings] = useState(initialBookings);

  const unavailableSlotsByDate = useMemo(() => {
    const liveBookedSlots = bookings.reduce((acc, booking) => {
      if (booking.status !== "Cancelled") {
        acc[booking.date] = [...(acc[booking.date] || []), booking.time];
      }
      return acc;
    }, {});

    Object.entries(bookedSlots).forEach(([date, slots]) => {
      liveBookedSlots[date] = [...new Set([...(liveBookedSlots[date] || []), ...slots])];
    });

    return liveBookedSlots;
  }, [bookings]);

  const isSlotAvailable = (date, time) => {
    if (!date || !time) {
      return false;
    }

    return !(unavailableSlotsByDate[date] || []).includes(time);
  };

  const createBooking = (bookingDetails) => {
    const confirmationCode = makeConfirmationCode();
    const booking = {
      ...bookingDetails,
      id: confirmationCode,
      guests: Number(bookingDetails.guests),
      status: "Pending",
    };

    setBookings((currentBookings) => [booking, ...currentBookings]);
    return booking;
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking,
      ),
    );
  };

  const toggleItemStock = (itemId) => {
    setInventory((currentInventory) =>
      currentInventory.map((item) =>
        item.id === itemId ? { ...item, inStock: !item.inStock } : item,
      ),
    );
  };

  const value = useMemo(
    () => ({
      bookings,
      createBooking,
      inventory,
      isSlotAvailable,
      toggleItemStock,
      unavailableSlotsByDate,
      updateBookingStatus,
    }),
    [bookings, inventory, unavailableSlotsByDate],
  );

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }

  return context;
}
