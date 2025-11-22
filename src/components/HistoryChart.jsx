import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function HistoryChart() {
  const { user } = useContext(AuthContext);
  const [userHistory, setHistory] = useState([]);

  useEffect(() => {
    if (!user?.username) return;

    async function getUserHistory() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/profile/${user.username}/history`
        );
        setHistory(response.data.userHistory);
      } catch (error) {
        console.error(error);
      }
    }

    getUserHistory();
  }, [user?.username]);

  return <button onClick={() => console.log(userHistory)}>Log user History</button>;
}