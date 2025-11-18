import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function SingleAnime() {
    const { selectedAnime } = useContext(AuthContext)

    // If no anime selected (for example after refresh), stop the page
    if (!selectedAnime) {
        return <p>No anime selected.</p>
    }

    return (
        <>
            <div className="main-content">
                <div className="page-left">
                    <img
                        src={selectedAnime.images?.jpg?.large_image_url}
                        className="anime-image"
                        alt="Anime"
                    />
                </div>

                <div className="page-right">
                    {/* your right side content */}
                </div>
            </div>
        </>
    )
}