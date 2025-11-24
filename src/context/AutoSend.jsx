import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export default function AutoSend() {
  const { user, userAnime } = useContext(AuthContext);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sent) return; 

    const interval = setInterval(async () => {
      if (!user || !userAnime || userAnime.length === 0) {
        console.log("Waiting for AuthContext data...");
        return;
      }

      console.log("Sending to Express:", user, userAnime);

      try {
        const res = await axios.post("http://localhost:3000/recommend", {
          user,
          anime: userAnime,
        });
        console.log("Response from Express:", res.data);
        setSent(true);      
        clearInterval(interval);
      } catch (error) {
        console.error("Failed to send:", error);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [user, userAnime, sent]);

  return null;
}
