// services/animeAPI.js

// Fetch top anime
export default async function getData(page=1) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=25&page=${page}`)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const { data } = await response.json();
      return data;
    } catch (e) {
      console.error("Could not fetch anime data:", e);
      return [];
    }
  }
  
  // ✅ New function: Search for anime by title
  export async function searchAnime(query) {
    if (!query) return [];
  
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=15`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const { data } = await response.json();
      return data;
    } catch (e) {
      console.error("Could not search anime:", e);
      return [];
    }
  }