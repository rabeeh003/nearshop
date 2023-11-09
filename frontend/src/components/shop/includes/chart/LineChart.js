import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", 'Aug', 'Sep','Oct','Nov','Dec'];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Orders",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [100, 240, 530, 420, 310, 390, 450],
    },{
        label: "Billing",
        backgroundColor: "green",
        borderColor: "green",
        data: [300, 500, 460, 700, 239, 330, 470],
      },
  ],
};

const LineChart = () => {
  return (
    <div style={{fontSize:'20px'}}>
      <Line data={data} />
    </div>
  );
};

export default LineChart;