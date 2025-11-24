import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function GenreChart() {
  const { userAnime } = useContext(AuthContext);
  const genreCounts = {};
  const genreTotals = {};

  // Count genre totals & averages
  userAnime.forEach((anime) => {
    if (!anime.rating || anime.rating === 0) return; // skip unrated anime

    anime.genres.forEach((genre) => {
      genreTotals[genre] = (genreTotals[genre] || 0) + anime.rating;
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  const genreAverages = Object.keys(genreTotals).map((genre) => ({
    genre,
    value: genreTotals[genre] / genreCounts[genre],
  }));

  const data = {
    labels: genreAverages.map((g) => g.genre),
    datasets: [
      {
        label: "Avg Score by Genre",
        data: genreAverages.map((g) => g.value),
        backgroundColor: "rgba(232, 63, 122, 0.3)",
        borderColor: "#e83f7a",
        borderWidth: 2,
        pointBackgroundColor: "#e22d8e",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#e83f7a",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 10,
        angleLines: { color: "#555" },
        grid: { color: "#444" },
        pointLabels: { color: "gray", font: { size: 14 } },
        ticks: {
          backdropColor: "transparent",
          color: "#ccc",
          stepSize: 2,
        },
      },
    },
    plugins: {
      legend: { labels: { color: "gray" } },
    },
  };

  return data.labels.length > 0 ? (
    <div className="bg-[#111] p-6 rounded-xl shadow-xl max-w-xl mx-auto">
      <h2 className="text-center text-white text-lg mb-4">
        Genre Score Radar
      </h2>
      <Radar data={data} options={options} />
    </div>
  ) : (
    <p className="text-gray-800 dark:text-gray-400 text-center mt-4">
      No rated genres available
    </p>
  );
}
