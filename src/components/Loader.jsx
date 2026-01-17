import React from "react";

const Loader = ({ size = "40px", color = "#2563eb" }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `4px solid #e2e8f0`,
    borderTop: `4px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "20px auto"
  };

  return (
    <div className="loader-container" style={{ textAlign: "center", width: "100%" }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;