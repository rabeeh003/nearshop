import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = () => {
  // Dummy data for delivery and billing
  const deliveryData = [
    { updated_date: "2023-01-01" },
    { updated_date: "2023-02-05" },
    { updated_date: "2023-03-10" },
    { updated_date: "2023-04-15" },
  ];

  const billData = [
    { updated_date: "2024-01-05" },
    { updated_date: "2023-02-08" },
    { updated_date: "2023-03-12" },
    { updated_date: "2023-04-18" },
  ];

  const generateChartData = (data, type) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const filteredData = data
      ? data.filter((item) => {
          const orderDate = new Date(item.updated_date);
          return (
            orderDate.getFullYear() === currentYear &&
            orderDate.getMonth() <= currentMonth
          );
        })
      : [];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chartData = {
      labels: months.slice(0, currentMonth + 1),
      datasets: [
        {
          label: type === "orders" ? "Delivered" : "Billed",
          backgroundColor: type === "orders" ? "rgb(255, 99, 132)" : "green",
          borderColor: type === "orders" ? "rgb(255, 99, 132)" : "green",
          data: Array.from({ length: currentMonth + 1 }, (_, i) => {
            return filteredData.filter(
              (item) => new Date(item.updated_date).getMonth() === i
            ).length;
          }),
        },
      ],
    };
    return chartData;
  };

  const combinedChartData = {
    labels: [],
    datasets: [],
  };

  if (deliveryData && billData) {
    const deliveryChartData = generateChartData(deliveryData, "orders");
    const billChartData = generateChartData(billData, "billing");

    combinedChartData.labels = deliveryChartData.labels;
    combinedChartData.datasets = [
      deliveryChartData.datasets[0],
      billChartData.datasets[0],
    ];
  }

  return (
    <div style={{ fontSize: "20px" }}>
      <h2>Combined Orders and Billing</h2>
      <Line data={combinedChartData} />
    </div>
  );
};

export default LineChart;
