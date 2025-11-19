import { useState, useEffect } from "react"
import "../css/SingleAnime.css"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function SingleAnime() {
    const [selectedAnime, setSelectedAnime] = useState(null)
    const {anime_id} = useParams()

    function getAirDate(dateString) {
        if (!dateString) return "N/A";
      
        const date = new Date(dateString);
        const month = date.getMonth() + 1;   // fix zero-index
        const day = date.getDate();
        const year = date.getFullYear();
        
        return `${month}/${day}/${year}`;
      }

   
    useEffect(()=>{
        async function fetchAnimeData(){
            const res = await axios.get(`https://api.jikan.moe/v4/anime/${anime_id}`);
            setSelectedAnime(res.data.data)
        }
        fetchAnimeData()
    }

    ,[anime_id])

    if (!selectedAnime) {
        return <p>No anime selected.</p>
    }
    
    return (
      
          <div className="anime-main-content">
      
            {/* LEFT SIDE */}
            <div className="anime-page-left">
              <h3>{selectedAnime.title}</h3>
              <h5>{selectedAnime.title === selectedAnime.title_english ? selectedAnime.title_japanse : selectedAnime.title_english  }</h5>

      
              <img
                src={selectedAnime.images?.jpg?.large_image_url}
                className="anime-image"
                alt="Anime"
              />
              <p>MyAnimeList Score: {selectedAnime.score}</p>
              <p>Genres: {selectedAnime.genres.map(genre=> genre.name).join(", ")}</p>
              <p>Aired: From {getAirDate(selectedAnime?.aired?.from)} To {getAirDate(selectedAnime?.aired?.to)} </p>
      
              <button>Add To List</button>
            </div>
      
            {/* RIGHT SIDE */}
            <div className="anime-page-right">
      
              <div className="summary synopsis-box">
                <h4>Synopsis</h4>
                <p>{selectedAnime.synopsis}</p>
              </div>

              <div className="summary">
    <h4>Information</h4>
    <p><strong>Aired:</strong> {selectedAnime.aired?.string || "Unknown"}</p>
    <p><strong>Episodes:</strong> {selectedAnime.episodes || "N/A"}</p>
    <p><strong>Status:</strong> {selectedAnime.status}</p>
    <p><strong>Type:</strong> {selectedAnime.type}</p>
    <p><strong>Score:</strong> {selectedAnime.score || "No score yet"}</p>
  </div>

  <div className="summary">
    <h4>Studio(s)</h4>
    <p>
      {selectedAnime.studios.length > 0
        ? selectedAnime.studios.map(s => s.name).join(", ")
        : "Unknown"}
    </p>
  </div>

  <div className="summary">
    <h4>Producers</h4>
    <p>
      {selectedAnime.producers.length > 0
        ? selectedAnime.producers.map(p => p.name).join(", ")
        : "Unknown"}
    </p>
  </div>

  {selectedAnime.trailer?.embed_url && (
    <div className="summary">
      <h4>Trailer</h4>
      <iframe
        src={selectedAnime.trailer.embed_url}
        title="Anime Trailer"
        width="100%"
        height="300"
        style={{ borderRadius: "12px", border: "none" }}
        allowFullScreen
      />
    </div>
  )}


      
            </div>
            <button className="log-btn" onClick={() => console.log(selectedAnime)}>
            Log Anime
          </button>
      
          </div>
      
          
      
       
      );
}