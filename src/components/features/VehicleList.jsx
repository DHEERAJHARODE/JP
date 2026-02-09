import React from "react";
import "../../App.css"; 

const VehicleList = ({ vehicles = [], onSelect, selectedVehicle, distance = 0 }) => {
  return (
    <div className="grid-2" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {vehicles.map((vehicle) => {
        // Calculate dynamic price
        const estimatedPrice = distance > 0 
          ? Math.round(vehicle.pricePerKm * distance) 
          : 0;

        const isSelected = selectedVehicle?.id === vehicle.id;

        return (
          <div 
            key={vehicle.id} 
            onClick={() => onSelect(vehicle)}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              padding: '16px',
              borderRadius: '12px',
              border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0', // Blue border if selected
              background: isSelected ? '#eff6ff' : 'white', // Light blue bg if selected
              transition: 'all 0.2s ease'
            }}
          >
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                 <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>{vehicle.name}</h3>
                 {isSelected && <span style={{fontSize: '0.8rem', color: '#2563eb'}}>● Selected</span>}
              </div>
              
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0' }}>
                Capacity: {vehicle.capacity}
              </p>
              
              <div style={{marginTop: '8px'}}>
                 {distance > 0 ? (
                    // Show Total Fare if distance is known
                    <span style={{ 
                      background: '#dbeafe', color: '#1e40af', 
                      padding: '4px 10px', borderRadius: '20px', 
                      fontSize: '0.85rem', fontWeight: '600'
                    }}>
                      ₹{estimatedPrice} <span style={{fontSize:'0.75em', fontWeight:'400'}}>(est.)</span>
                    </span>
                 ) : (
                    // Show Rate per KM if distance unknown
                    <span style={{ 
                      background: '#f1f5f9', color: '#475569', 
                      padding: '4px 8px', borderRadius: '4px', 
                      fontSize: '0.8rem' 
                    }}>
                      ₹{vehicle.pricePerKm}/km
                    </span>
                 )}
              </div>
            </div>

            <div style={{ fontSize: '2.5rem' }}>
              {/* Simple emoji mapping based on name, or default */}
              {vehicle.name.includes("Mini") ? "🛻" : 
               vehicle.name.includes("Container") ? "🚛" : "🚚"}
            </div> 
          </div>
        );
      })}
    </div>
  );
};

export default VehicleList;