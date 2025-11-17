import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function SingleAnime(){
    const {selectedAnime } = useContext(AuthContext)
    return(
    <>
    <div className="main-content">

        <div className="page-left">
            <img src={selectedAnime.images?.jpg?.large_image_url} className="anime-image">
            </img>

        </div>

        <div className="page-right">

        </div>

    </div>
    
    
    
    </>)
}