import { useContext } from "react"
import {Link} from "react-router-dom"
import Context from "../../context/Context"
import "./index.css"

const GamingVideoCard =(props) => {
    const {eachVideo} = props
    const {id,title,thumbnailUrl,viewCount} = eachVideo
    const {isDark} = useContext(Context)

    return (
        <Link to={`/videos/${id}`} className="gaimg-card-conatiner">
           <img src={thumbnailUrl} alt="thumbnail" className="gaimg-card-thumbnail"/>
            <h1 className={isDark? "gaimg-card-title dark-trending-video-title" : "gaimg-card-title light-trending-video-title"}>{title}</h1>
            <p className='gaimg-card-views'>{viewCount} watching worldwide</p>
        </Link>
    )
}

export default GamingVideoCard