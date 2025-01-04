// Widget.js
import React from "react";

function Widget({ title, value, icon, color }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: color,
      padding: "10px",
      borderRadius: "8px",
      margin: "10px",
      color: "#fff",
    }}>
      <div style={{ fontSize: "2rem", marginRight: "10px" }}>{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default Widget;
