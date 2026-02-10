import React from "react";

const VehicleList = ({ vehicles = [], onSelect, selectedVehicle, distance = 0 }) => {
  return (
    <div style={styles.container}>
      {vehicles.map((vehicle) => {
        const estimatedPrice = distance > 0 
          ? Math.round(vehicle.pricePerKm * distance) 
          : 0;

        const isSelected = selectedVehicle?.id === vehicle.id;

        return (
          <div 
            key={vehicle.id} 
            onClick={() => onSelect(vehicle)}
            style={{
              ...styles.card,
              ...(isSelected ? styles.selectedCard : {}),
            }}
          >
            {/* --- इमेज सेक्शन (Full Size & No Margin) --- */}
            <div style={styles.imageSection}>
               {vehicle.image ? (
                 <img 
                   src={vehicle.image} 
                   alt={vehicle.name} 
                   style={styles.vehicleImage} 
                 />
               ) : (
                 <span style={{fontSize: '4rem'}}>🚚</span> 
               )}
            </div>

            {/* --- डिटेल्स सेक्शन --- */}
            <div style={styles.detailsSection}>
              
              <div style={styles.headerRow}>
                <h3 style={styles.vehicleName}>{vehicle.name}</h3>
                {isSelected && <span style={styles.selectedBadge}>✓ Selected</span>}
              </div>

              <p style={styles.description}>{vehicle.description}</p>

              <div style={styles.specsGrid}>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Capacity</span>
                  <span style={styles.specValue}>{vehicle.capacity}</span>
                </div>
                <div style={styles.specItem}>
                   <span style={styles.specLabel}>Size</span>
                   <span style={styles.specValue}>{vehicle.size}</span>
                </div>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.priceRow}>
                 {distance > 0 ? (
                    <div>
                      <span style={{fontSize: '0.9rem', color: '#64748b'}}>Total Estimate:</span>
                      <div style={{fontSize: '1.4rem', fontWeight: '800', color: '#2563eb'}}>
                        ₹{estimatedPrice}
                      </div>
                    </div>
                 ) : (
                    <div style={styles.rateTag}>
                      ₹{vehicle.pricePerKm}/km
                    </div>
                 )}
                 
                 <button style={{
                    ...styles.actionButton,
                    background: isSelected ? '#2563eb' : 'white',
                    color: isSelected ? 'white' : '#2563eb',
                    border: isSelected ? 'none' : '2px solid #2563eb'
                 }}>
                   {isSelected ? 'Selected' : 'Select'}
                 </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- Updated Styles ---
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '10px 0'
  },
  card: {
    display: 'flex',
    flexDirection: 'row', 
    background: 'white',
    borderRadius: '16px', // पूरे कार्ड की रेडियस
    border: '1px solid #e2e8f0',
    overflow: 'hidden', // यह जरुरी है ताकि इमेज बाहर न निकले
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    minHeight: '220px', 
    flexWrap: 'wrap', 
  },
  selectedCard: {
    border: '2px solid #2563eb',
    boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.25)',
    transform: 'scale(1.005)' 
  },
  
  // --- इमेज सेक्शन में बदलाव ---
  imageSection: {
    flex: '1 1 250px',
    background: '#f1f5f9', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0', 
    minHeight: '200px',
    position: 'relative' // इमेज को सही से सेट करने के लिए
  },
  
  vehicleImage: {
    width: '100%',     
    height: '100%',    
    objectFit: 'cover', // ✅ यह इमेज को पूरा बॉक्स भरने पर मजबूर करेगा (No Margin)
    display: 'block'    // एक्स्ट्रा गैप हटाने के लिए
  },
  
  // ... बाकी स्टाइल्स ...
  detailsSection: {
    flex: '2 1 300px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  vehicleName: {
    margin: 0,
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  selectedBadge: {
    background: '#dbeafe',
    color: '#1e40af',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  description: {
    color: '#64748b',
    fontSize: '0.95rem',
    margin: '0 0 16px 0',
    lineHeight: '1.5'
  },
  specsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '16px',
    marginBottom: '20px'
  },
  specItem: {
    background: '#f8fafc',
    padding: '10px',
    borderRadius: '8px', // हल्की रेडियस यहाँ भी
    border: '1px solid #e2e8f0'
  },
  specLabel: {
    display: 'block',
    fontSize: '0.75rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px'
  },
  specValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#334155'
  },
  divider: {
    height: '1px',
    background: '#e2e8f0',
    marginBottom: '16px',
    marginTop: 'auto'
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px'
  },
  rateTag: {
    fontSize: '1.1rem', 
    fontWeight: '600', 
    color: '#475569',
    background: '#f1f5f9',
    padding: '8px 16px',
    borderRadius: '8px'
  },
  actionButton: {
    padding: '10px 24px',
    borderRadius: '50px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.95rem'
  }
};

export default VehicleList;