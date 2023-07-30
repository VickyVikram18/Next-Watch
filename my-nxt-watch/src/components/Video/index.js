import { useContext } from "react"
import {Link} from "react-router-dom"
import {formatDistanceStrict} from 'date-fns'
import "./index.css"
import Context from "../../context/Context"

const Video = (props) => {
    const {eachVideo} = props
    const { id,title,thumbnailUrl,channel,viewCount,publishedAt} = eachVideo
    const {name,profileImageUrl} = channel
    
    const timelapsed = formatDistanceStrict(new Date(publishedAt),new Date(),{
        addSuffix: true
      })
    
    const {isDark} = useContext(Context)

    return(
        <Link to={`/videos/${id}`}  className='video-card'>
                <img src={thumbnailUrl} alt="thumbnail" className='thumbnail-image'/>
                <div className='channel-container'>
                    <img src={profileImageUrl} alt="channelProfile" className='profile-image'/>
                    <div>
                        <h1 className={isDark ? "video-title dark-video-title" : "video-title light-video-title"}>{title}</h1>
                        <h1 className="channel-name">{name}</h1>
                        <ul className='views-container'>
                            <li className='video-views'>{viewCount} views</li>
                            <li className='video-posted'>{timelapsed}</li>
                        </ul>
                    </div>
                </div>
        </Link>
    )

}

export default Video