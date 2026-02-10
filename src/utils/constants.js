// src/utils/constants.js

// 1. अपनी इमेजेस इम्पोर्ट करें (नाम अपने फाइल के हिसाब से चेक कर लें)
import bikeImg from '../assets/images/bike.png';
import autoImg from '../assets/images/auto.png';
import chotaHathiImg from '../assets/images/chotahati.png'; // Tata Ace
import pickupImg from '../assets/images/pickup.png';          // Bolero/Pickup
import eicherImg from '../assets/images/miniTruck.png';          // Eicher 14ft/17ft
import tataTruckImg from '../assets/images/truck.png';   // Heavy Truck

export const VEHICLES = [
  { 
    id: 1, 
    name: "2 Wheeler", 
    capacity: "20 kg", 
    size: "Small Box", 
    description: "Documents, keys, small parcels & food.", 
    pricePerKm: 10,
    image: bikeImg
  },
  { 
    id: 2, 
    name: "3 Wheeler", 
    capacity: "500 kg", 
    size: "5ft x 4.5ft x 5ft", 
    description: "Best for few cartons, electronics or small furniture.", 
    pricePerKm: 15,
    image: autoImg
  },
  { 
    id: 3, 
    name: "Tata Ace (Chota Hathi)", 
    capacity: "750 kg", 
    size: "7ft x 4ft x 5ft", 
    description: "Ideal for 1 BHK partial shifting or medium goods.", 
    pricePerKm: 20,
    image: chotaHathiImg
  },
  { 
    id: 4, 
    name: "Pickup / 8ft Truck", 
    capacity: "1.5 tons", 
    size: "8ft x 4.5ft x 5.5ft", 
    description: "Perfect for 1 BHK complete shifting or commercial goods.", 
    pricePerKm: 30,
    image: pickupImg
  },
  { 
    id: 5, 
    name: "Eicher Truck", 
    capacity: "4 tons", 
    size: "14ft x 6ft x 7ft", 
    description: "Great for 2 BHK household or office shifting.", 
    pricePerKm: 45,
    image: eicherImg
  },
  { 
    id: 6, 
    name: "Tata Heavy Truck", 
    capacity: "7 tons", 
    size: "19ft x 7ft x 7ft", 
    description: "For 3+ BHK, industrial machinery & heavy loads.", 
    pricePerKm: 65,
    image: tataTruckImg
  },
];

export const CITIES = [
  "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Indore", "Bhopal"
];

export const BASE_PRICES = {
  minimumDistance: 3, // km
  minimumFare: 50,   // ₹
};