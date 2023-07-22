import {Link} from "react-router-dom"
import "./index.css"

const GamingVideoCard =(props) => {
    const {eachVideo} = props
    const {id,title,thumbnailUrl,viewCount} = eachVideo

    return (
        <Link to={`/videos/${id}`} className="gaimg-card-conatiner">
           <img src={thumbnailUrl} alt="thumbnail" className="gaimg-card-thumbnail"/>
            <h1 className="gaimg-card-title">{title}</h1>
            <p className='gaimg-card-views'>{viewCount} watching worldwide</p>
        </Link>
    )
}

export default GamingVideoCard