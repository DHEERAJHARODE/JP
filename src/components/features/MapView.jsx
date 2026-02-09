import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to update map center when props change
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const MapView = ({ pickupCoords, dropCoords }) => {
  // Default center (India/Delhi center as fallback)
  const defaultCenter = [20.5937, 78.9629]; 
  const center = pickupCoords || dropCoords || defaultCenter;
  const zoom = pickupCoords ? 13 : 5;

  return (
    <div style={{ height: "100%", width: "100%", borderRadius: "16px", overflow: "hidden" }}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        {/* OpenStreetMap Tiles (Free) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Dynamic Center Update */}
        {(pickupCoords || dropCoords) && (
          <RecenterMap lat={center[0]} lng={center[1]} />
        )}

        {/* Pickup Marker */}
        {pickupCoords && (
          <Marker position={pickupCoords}>
            <Popup>📍 Pickup Location</Popup>
          </Marker>
        )}

        {/* Drop Marker */}
        {dropCoords && (
          <Marker position={dropCoords}>
            <Popup>🏁 Drop Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;