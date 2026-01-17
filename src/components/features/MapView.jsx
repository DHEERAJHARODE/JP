import React, { useEffect, useRef } from "react";

const MapView = ({ center = { lat: 28.6139, lng: 77.209 }, zoom = 12, markers = [] }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps JS API not loaded");
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    // Add markers
    markers.forEach((marker) => {
      new window.google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title,
      });
    });
  }, [center, zoom, markers]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "400px", borderRadius: "8px" }}
    ></div>
  );
};

export default MapView;
