import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const AllYearBar = () => {
  const labels = [2020,2021,2022,2023];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Profit",
        backgroundColor: "blue",
        borderColor: "blue",
        data: [3120435, 4320435, 5220535,],
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default AllYearBar;