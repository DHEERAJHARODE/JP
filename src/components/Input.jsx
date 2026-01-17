import React from "react";

const Input = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  name, 
  error,
  required = false 
}) => {
  return (
    <div style={{ marginBottom: "15px", width: "100%" }}>
      {label && (
        <label 
          style={{ 
            display: "block", 
            marginBottom: "6px", 
            fontWeight: "500", 
            color: "#1e293b" 
          }}
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "12px 16px",
          border: error ? "1px solid #ef4444" : "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "1rem",
          outline: "none",
          transition: "border-color 0.2s"
        }}
        onFocus={(e) => e.target.style.borderColor = "#2563eb"}
        onBlur={(e) => !error && (e.target.style.borderColor = "#e2e8f0")}
      />
      {error && (
        <span style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;