// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Factura Electrónica", "Crédito Fiscal", "Nota de Crédito", "Retención"],
  datasets: [
    {
      data: [4809, 28, 3, 8],
      backgroundColor: ["#dc3545", "#007bff", "#28a745", "#ffc107"],
    },
  ],
};

function PieChart() {
  return <Pie data={data} />;
}

export default PieChart;
