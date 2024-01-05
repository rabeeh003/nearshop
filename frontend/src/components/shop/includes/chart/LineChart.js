import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";


const LineChart = ({ deliveryData, billData }) => {
  // Function to generate chart data based on delivery and billing data
  const generateChartData = (data, type) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const filteredData = data ? data.filter(item => {
      const orderDate = new Date(item.updated_date);
      return orderDate.getFullYear() === currentYear && orderDate.getMonth() <= currentMonth;
    }) : [];

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = {
      labels: months.slice(0, currentMonth + 1),
      datasets: [
        {
          label: type === 'orders' ? 'Orders' : 'Billing',
          backgroundColor: type === 'orders' ? "rgb(255, 99, 132)" : "green",
          borderColor: type === 'orders' ? "rgb(255, 99, 132)" : "green",
          data: Array.from({ length: currentMonth + 1 }, (_, i) => {
            return filteredData.filter(item => new Date(item.updated_date).getMonth() === i).length;
          }),
        },
      ],
    };
    return chartData;
  };

  let combinedChartData = {
    labels: [],
    datasets: [],
  };

  if (deliveryData) {
    const deliveryChartData = generateChartData(deliveryData, 'orders');
    combinedChartData = {
      labels: deliveryChartData.labels,
      datasets: [deliveryChartData.datasets[0]],
    };
  }

  if (billData) {
    const billChartData = generateChartData(billData, 'billing');
    if (combinedChartData.labels.length === 0) {
      combinedChartData = {
        labels: billChartData.labels,
        datasets: [billChartData.datasets[0]],
      };
    } else {
      combinedChartData.datasets.push(billChartData.datasets[0]);
    }
  }

  return (
    <div style={{ fontSize: "20px" }}>
      <h2>Combined Orders and Billing</h2>
      <Line data={combinedChartData} />
    </div>
  );
};

export default LineChart;