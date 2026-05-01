import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);

  // Customer Details States
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const resetBooking = () => {
    setPickup("");
    setDrop("");
    setVehicle(null);
    setDistance(0);
    setPrice(0);
    setCustomerName("");
    setCustomerPhone("");
    setUserEmail("");
  };

  const value = {
    pickup,
    drop,
    vehicle,
    distance,
    price,
    customerName,
    customerPhone,
    userEmail,
    setPickup,
    setDrop,
    setVehicle,
    setDistance,
    setPrice,
    setCustomerName,
    setCustomerPhone,
    setUserEmail,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);