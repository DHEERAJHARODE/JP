import { useState } from "react";

export const useMaps = () => {
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);

  // Helper: Address text ko Coordinates (Lat/Lng) mein badalne ke liye
  const getCoordinates = async (address) => {
    try {
      // Nominatim requires a User-Agent header, otherwise it might block requests
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        {
          headers: {
            "Accept-Language": "en",
            "User-Agent": "ShipEase_Logistics_App/1.0" 
          }
        }
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
      return null;
    } catch (error) {
      console.error("Geocoding Error:", error);
      return null;
    }
  };

  // Fallback: Haversine formula to calculate straight-line distance if OSRM fails
  const calculateStraightLineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    // Add 20% (1.2 multiplier) to account for road curves
    return R * c * 1.2; 
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
      
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`OSRM API failed with status ${response.status}`);
        
        const result = await response.json();

        if (result.routes && result.routes.length > 0) {
          // Distance meters me aata hai, usko KM me convert karein
          const distanceInKm = (result.routes[0].distance / 1000).toFixed(1);
          setDistance(parseFloat(distanceInKm));
          return parseFloat(distanceInKm);
        }
      } catch (osrmError) {
        console.warn("OSRM Server is down (502/CORS). Using Fallback Distance Calculation...");
        
        // 3. FALLBACK: Agar OSRM fail ho jaye, toh straight-line distance nikal lo
        const fallbackDist = calculateStraightLineDistance(
          pickupCoords.lat, pickupCoords.lng, 
          dropCoords.lat, dropCoords.lng
        ).toFixed(1);
        
        setDistance(parseFloat(fallbackDist));
        return parseFloat(fallbackDist);
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
    loading, 
    calculateDistance,
  };
};