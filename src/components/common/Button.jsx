import React from "react";

const Button = ({ children, onClick, type = "button", styleType = "primary", ...props }) => {
  const baseStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  };

  const styles = {
    primary: { ...baseStyle, background: "#3b82f6", color: "#fff" },
    secondary: { ...baseStyle, background: "#e5e7eb", color: "#111" },
    danger: { ...baseStyle, background: "#ef4444", color: "#fff" },
  };

  return (
    <button onClick={onClick} type={type} style={styles[styleType]} {...props}>
      {children}
    </button>
  );
};

export default Button;
