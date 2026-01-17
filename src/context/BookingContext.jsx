import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);

  const resetBooking = () => {
    setPickup("");
    setDrop("");
    setVehicle(null);
    setDistance(0);
    setPrice(0);
  };

  const value = {
    pickup,
    drop,
    vehicle,
    distance,
    price,
    setPickup,
    setDrop,
    setVehicle,
    setDistance,
    setPrice,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
