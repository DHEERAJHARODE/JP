import { useState } from "react";

export const useMaps = () => {
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);

  // Helper: Address text ko Coordinates (Lat/Lng) mein badalne ke liye
  const getCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return { lat: data[0].lat, lng: data[0].lon };
      }
      return null;
    } catch (error) {
      console.error("Geocoding Error:", error);
      return null;
    }
  };

  // Actual Road Distance calculate karne ka function
  const calculateDistance = async (pickupAddress, dropAddress) => {
    if (!pickupAddress || !dropAddress) return 0;

    setLoading(true);
    try {
      // 1. Pehle dono addresses ke coordinates nikalo
      const pickupCoords = await getCoordinates(pickupAddress);
      const dropCoords = await getCoordinates(dropAddress);

      if (!pickupCoords || !dropCoords) {
        console.error("Locations not found");
        return 0;
      }

      // 2. OSRM API se road distance nikalo (Free API)
      const url = `https://router.project-osrm.org/route/v1/driving/${pickupCoords.lng},${pickupCoords.lat};${dropCoords.lng},${dropCoords.lat}?overview=false`;
      
      const response = await fetch(url);
      const result = await response.json();

      if (result.routes && result.routes.length > 0) {
        // Distance meters me aata hai, usko KM me convert karein
        const distanceInKm = (result.routes[0].distance / 1000).toFixed(1);
        setDistance(parseFloat(distanceInKm));
        return parseFloat(distanceInKm);
      }
    } catch (error) {
      console.error("Routing Error:", error);
    } finally {
      setLoading(false);
    }
    return 0;
  };

  return {
    distance,
    loading, // UI me loader dikhane ke liye
    calculateDistance,
  };
};