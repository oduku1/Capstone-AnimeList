import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);


export default function GenreChart() {
    const { userAnime } = useContext(AuthContext);
    const genreCounts = {};
  
    // Count occurrences of each genre
    userAnime.forEach((anime) => {
      const genres = anime.genres || [];
      genres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });
  
    // Sort by frequency and pick top 5
    const top5 = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  
    const labels = top5.map(([genre]) => genre);     // genre names
    const values = top5.map(([_, count]) => count);  // genre counts
  
    const data = {
      labels,
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
  