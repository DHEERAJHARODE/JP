import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
      onClick={onClose} // Close when clicking background
    >
      <div 
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "400px",
          position: "relative",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button 
            onClick={onClose}
            style={{ 
              background: "transparent", 
              border: "none", 
              fontSize: "1.5rem", 
              cursor: "pointer",
              lineHeight: "1"
            }}
          >
            &times;
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;