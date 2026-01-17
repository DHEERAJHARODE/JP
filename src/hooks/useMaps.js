import { useState } from "react";

export const useMaps = () => {
  const [distance, setDistance] = useState(0);

  // Calculate distance between two lat/lng points using Haversine formula
  const calculateDistance = (pickup, drop) => {
    if (!pickup || !drop) return 0;

    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of Earth in km
    const dLat = toRad(drop.lat - pickup.lat);
    const dLng = toRad(drop.lng - pickup.lng);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(pickup.lat)) *
        Math.cos(toRad(drop.lat)) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    setDistance(d);
    return d;
  };

  return {
    distance,
    calculateDistance,
  };
};
