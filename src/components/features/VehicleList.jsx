import React from "react";
import "../../App.css"; 
// Note: You can replace the emoji with actual <img> tags of trucks later

const VehicleList = ({ vehicles = [], onSelect }) => {
  return (
    <div className="grid-2">
      {vehicles.map((vehicle) => (
        <div 
          key={vehicle.id} 
          className="modern-card" 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => onSelect(vehicle)}
        >
          <div>
            <h3 style={{ marginBottom: '4px' }}>{vehicle.name}</h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Capacity: {vehicle.capacity}</p>
            <span className="badge badge-blue">₹{vehicle.pricePerKm}/km</span>
          </div>
          <div style={{ fontSize: '3rem' }}>🚚</div> 
        </div>
      ))}
    </div>
  );
};

export default VehicleList;