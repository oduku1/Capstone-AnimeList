import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/Profile.css";
import StatusChart from "../components/StatusChart";
import GenreChart from "../components/GenreChart";

export default function ProfilePage() {
  const { user, userAnime } = useContext(AuthContext);

  if (!user)
    return (
      <div className="main-content">
        <p>Loading...</p>
      </div>
    );

    function getDuration(durationStr){
      if(!durationStr) return 0; 
      let hours = 0;
      let minutes = 0; 

      const hrMatch = durationStr.match(/(\d+)\s*hr/);
      if (hrMatch) {
        hours = parseInt(hrMatch[1], 10);
      }

      const minMatch = durationStr.match(/(\d+)\s*min/);
      if (minMatch) {
        minutes = parseInt(minMatch[1], 10);
      }

      return hours * 60 + minutes;
    }


    const totalMinutesWatched = userAnime.reduce((total,anime)=>{
      const durationPerEpisode = getDuration(anime.anime_duration)
      const episodesWatched = anime.episodesWatched; 
      return total + durationPerEpisode * episodesWatched
    },0) // value of total which is the second argument, an accumulator


 const daysWatched = (totalMinutesWatched / (60 * 24)).toFixed(2); // 2 decimal places





  return (
    <div className="profile-page">
      <h2 className="profile-title">Hello {user.username}!</h2>
      <p className="profile-subtitle">Join Date: Nov 2025</p>

      <div className="profile-panels">
        <div className="panel-left">
          <div className="profile-box">
            <h3>Your Top 5 Genres</h3>
            <div className="genre-bars">
              <GenreChart/>
            </div>
          </div>

          <div className="profile-box">
            <h3>Your Statuses</h3>
            <div className="genre-bars">
              <StatusChart/>
            </div>
            
            
          </div>

          <div className="profile-box">
            <h3>Activity History</h3>
            <div className="heatmap"></div>
          </div>
        </div>

        <div className="panel-right">
          <div className="profile-box">
            <h3>Total Anime</h3>
            <p>{userAnime.length}</p>
          </div>

          <div className="profile-box">
            <h3>Days Watched</h3>
            <p>{daysWatched} Days</p>
          </div>

          <div className="profile-box">
            <h3>Average Score</h3>
            <p>
              {userAnime.length > 0
                ? (
                    userAnime
                      .map((anime) => anime.rating || 0)
                      .reduce((a, b) => a + b, 0) / userAnime.length
                  ).toFixed(2)
                : "No ratings yet"}
            </p>
          </div>
          <button onClick={() => console.log(userAnime)}></button>
        </div>
      </div>
    </div>
  );
}
