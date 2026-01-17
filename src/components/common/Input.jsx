import React from "react";

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  name,
  required = false,
  ...props
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <label htmlFor={name} style={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={styles.input}
        {...props}
      />
    </div>
  );
};

const styles = {
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
};

export default Input;
