import {Link} from "react-router-dom"
import {formatDistanceStrict} from "date-fns"
import "./index.css"

const TrendingVideoCard =(props) => {
    const {eachVideo} = props
    const {id,title,thumbnailUrl,channel,viewCount,publishedAt} = eachVideo
    
    const timelapsed = formatDistanceStrict(new Date(publishedAt),new Date(),{
        addSuffix:true
    })

    return (
        <Link to={`/videos/${id}`} className="trending-video-card-conatiner">
           <img src={thumbnailUrl} alt="thumbnail" className="trending-video-thumbnail"/>
           <div className="trending-card-content">
                <h1 className="trending-video-title">{title}</h1>
                <p className="trending-channel-name">{channel.name}</p>
                <ul className='trending-views-container'>
                    <li className='trending-video-views'>{viewCount} views</li>
                    <li className='trending-video-posted'>{timelapsed}</li>
                </ul>
           </div>
        </Link>
    )
}

export default TrendingVideoCard