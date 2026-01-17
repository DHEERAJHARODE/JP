import React from "react";

const Card = ({ children, style = {}, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "16px",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
