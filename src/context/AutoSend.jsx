import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";


export default function AutoSend() {
  const { user, userAnime } = useContext(AuthContext);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sent) return;
    if (!user || !userAnime || userAnime.length === 0) return;

    async function sendData() {
      try {
        const res = await axios.post("http://localhost:3000/recommend", {
          user,
          anime: userAnime,
        });

        console.log("Response from backend:", res.data);
        setSent(true);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }

    sendData();
  }, [user, userAnime, sent]);

  return null;
}