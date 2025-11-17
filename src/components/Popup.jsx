import { useContext, useState,useEffect} from "react";
import { AuthContext } from "../context/AuthContext";

export default function Popup({ selectedAnime, onClose }) {
  const user = useContext(AuthContext)

  if (!selectedAnime) return null; // safety check
  const { title, genres, images,episodes } = selectedAnime;
  const image = images?.jpg?.image_url;


  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setEpisodesWatched(0);
    setRating(0);
    setStatus(null);
  }, [selectedAnime]);



  const handleSubmit = async (e)=>
  {
    e.preventDefault();
    try{
      const res = await axios.post("/api/users/:userId/anime",{ 

      })

    }
    catch(e){

    }
  }
  

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedAnime.title}</h2>

        <img
          src={selectedAnime.images?.jpg?.image_url}
          alt={selectedAnime.title}
          className="popup-image"
        />

        <p>Episodes: {selectedAnime.episodes || "N/A"}</p>
        <p>Status: {selectedAnime.status || "Unknown"}</p>

        {user && 
        <>
        <p>hi {user.user}</p>
         <form onSubmit={handleSubmit}>
        <input></input>
        </form>
        </>
       
        
        }



        <button className="popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
