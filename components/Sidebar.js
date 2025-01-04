// Sidebar.js
import React from "react";
import { FaHome, FaFileAlt, FaCog, FaChartLine } from "react-icons/fa";

function Sidebar() {
  return (
    <div style={{ width: "250px", background: "#f4f4f4", height: "100vh", padding: "10px" }}>
      <h2>Dashboard</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <FaHome /> Documentos Tributarios
        </li>
        <li>
          <FaFileAlt /> Invalidaciones
        </li>
        <li>
          <FaChartLine /> Contingencias
        </li>
        <li>
          <FaCog /> Configuración
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
