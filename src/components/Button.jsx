import React from "react";

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", // primary, secondary, outline, danger
  isLoading = false, 
  disabled = false,
  style = {}
}) => {
  
  const baseStyle = {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    opacity: disabled || isLoading ? 0.7 : 1,
    ...style
  };

  const variants = {
    primary: { background: "#2563eb", color: "white" },
    secondary: { background: "#64748b", color: "white" },
    outline: { background: "transparent", border: "2px solid #2563eb", color: "#2563eb" },
    danger: { background: "#ef4444", color: "white" },
    success: { background: "#16a34a", color: "white" }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{ ...baseStyle, ...variants[variant] }}
    >
      {isLoading ? "cw..." : children}
    </button>
  );
};

export default Button;