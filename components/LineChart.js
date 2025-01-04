// LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Operaciones diarias",
      data: [2000, 1800, 1500, 1700, 2000],
      fill: false,
      borderColor: "#007bff",
      tension: 0.1,
    },
  ],
};

function LineChart() {
  return <Line data={data} />;
}

export default LineChart;
