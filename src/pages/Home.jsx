import popularAnime from "/src/assets/Anime_pop.webp";
import "../css/Home.css";

export default function Home() {
  return (
    <div className="main-content">
      <div className="home-container">
        
        <h2 className="home-title">AniTrack-r</h2>
        <p className="home-subtitle">List All Your Favorite Anime</p>

        <div className="home-hero-wrapper">
          <img src={popularAnime} className="home-hero-image" />
        </div>

      </div>
    </div>
  );
}