import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", 'Aug', 'Sep','Oct','Nov','Dec'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Profit",
        backgroundColor: "blue",
        borderColor: "blue",
        data: [120435, 320435, 220535, 140535, 190535, 240535, 280535],
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;