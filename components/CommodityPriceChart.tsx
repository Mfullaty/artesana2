'use client'
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceData {
  date: string;
  value: string;
}

const CommodityPriceChart = ({
  resource,
  resourceName,
}: {
  resource: string;
  resourceName: string;
}) => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchPriceData = async () => {
      const response = await fetch(`/api/alphavantage/${resource}`);
      const data = await response.json();

      // Filter data for entries from 2010 onward
      const filteredData = data.data.filter((entry: PriceData) => {
        const year = parseInt(entry.date.split("-")[0], 10);
        return year >= 2010;
      });

      setPriceData(filteredData.reverse()); // Reverse to get older data first
      setLoading(false);
    };
    fetchPriceData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Prepare chart data
  const chartData = {
    labels: priceData.map((entry) => entry.date),
    datasets: [
      {
        label: `Global Price Index of ${resourceName}`,
        data: priceData.map((entry) => parseFloat(entry.value)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Global Price Index of ${resourceName} (Monthly)`,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default CommodityPriceChart;
