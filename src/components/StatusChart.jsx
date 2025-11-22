import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatusChart() {
  const { userAnime } = useContext(AuthContext);

  if (!userAnime || userAnime.length === 0) {
    return <p style={{ textAlign: "center" }}>No anime data yet.</p>;
  }

  const statusCounts = {};
  userAnime.forEach((anime) => {
    const status = anime.status || "Unknown";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const labels = Object.keys(statusCounts);
  const values = Object.values(statusCounts);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#FF6B6B",
          "#4ECDC4", 
          "#FFD93D", 
          "#1A535C", 
          "#C77DFF", 
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "gray" },
      },
    },
  };

  return ( 
    <div style={{ width: "300px", margin: "auto" }}>
      <Doughnut data={chartData} options={options} />
    </div> 
  );
}