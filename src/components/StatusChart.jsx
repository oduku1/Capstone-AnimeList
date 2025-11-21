import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { data } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);


export default function StatusChart() {
    const { userAnime } = useContext(AuthContext);
  
    // 1. Create the object that will store counts
    const statusCounts = {};
  
    // 2. Fill it using forEach
    userAnime.forEach((anime) => {
      const status = anime.status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const labels = Object.keys(statusCounts);
    const values = Object.values(statusCounts);

    const data = {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
                "#FF6B6B", // red
                "#4ECDC4", // teal
                "#FFD93D", // yellow
                "#1A535C", // deep green/blue
                "#C77DFF", // violet
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
            labels: { color: "white" },
          },
        },
      };
    
  
      return (
        <div style={{ width: "300px", margin: "auto" }}>
          <Doughnut data={data} options={options} />
        </div>
      );
  }