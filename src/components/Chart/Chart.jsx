import React, { useRef } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Day-by-day overview",
    },
  },
};

export default function Chart({ sessionForDates, dataInfo }) {
  const labels = sessionForDates;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Average Count",
        data: dataInfo.count,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Average Length",
        data: dataInfo.average_length,
        borderColor: "rgba(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Average Distance",
        data: dataInfo.average_distance,
        borderColor: "rgba(235, 53, 162)",
        backgroundColor: "rgba(235, 53, 162, 0.5)",
      },
      {
        label: "Average Age",
        data: dataInfo.average_age,
        borderColor: "rgba(86, 53, 162)",
        backgroundColor: "rgba(86, 53, 162, 0.5)",
      },
    ],
  };
  return (
    <Bar
      options={options}
      data={chartData}
    />
  );
}
