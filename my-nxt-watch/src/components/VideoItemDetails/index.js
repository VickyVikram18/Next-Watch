import { useState,useEffect } from "react"
import ReactPlayer from "react-player"
import {useParams} from "react-router-dom"
import {AiOutlineLike,AiOutlineDislike} from "react-icons/ai"
import {MdPlaylistAdd} from "react-icons/md"
import Cookies from "js-cookie"
import {formatDistanceStrict} from 'date-fns'
import LogoHeader from "../LogoHeader"
import Sidebar from "../Sidebar"
import "./index.css"

const VideoItemDetails = () => {
    const [videoDetails,setVideoDetails] = useState({})
    const [channel,setChannel] = useState({})
    const [publishedAt,setPublishedAt] = useState('')
    const {id} = useParams()
    const jwtToken = Cookies.get("jwt_token")

    useEffect (()=> {
        const getVideoItemDetails = async () => {
            const url = `https://apis.ccbp.in/videos/${id}`
            const options = {
                method : "GET",
                headers : {
                    Authorization : `Bearer ${jwtToken}`
                }
            }

            const response = await fetch(url,options)
            const data = await response.json()
            const unformattedData = data.video_details
            const formattedData = {
                id:unformattedData.id,
                title:unformattedData.title,
                videoUrl:unformattedData.video_url,
                thumbnailUrl:unformattedData.thumbnail_url,
                channel:{
                    name:unformattedData.channel.name,
                    profileImageUrl:unformattedData.channel.profile_image_url,
                    subscriberCount:unformattedData.channel.subscriber_count
                },
                viewCount:unformattedData.view_count,
                publishedAt:unformattedData.published_at,
                description:unformattedData.description
            }

            const timelapsed = formatDistanceStrict(new Date(formattedData.publishedAt),new Date(),{
            addSuffix: true
            })
            
            setChannel(formattedData.channel)
            setPublishedAt(timelapsed)
            setVideoDetails(formattedData)
        }
        getVideoItemDetails()
    },[id,jwtToken])

     const {title,videoUrl,viewCount,description} = videoDetails

    const {name,profileImageUrl,subscriberCount} = channel
    
    return (
    <div className="route-main-container">
        <LogoHeader/>
        <div className="route-sidebar-content-container">
            <Sidebar/>
            <div className="video-details-container">
                <div className="responsive-container">
                    <ReactPlayer url={videoUrl} width="100%" />
                </div>
                <h1 className="video-detail-heading">{title}</h1>
                <div className="video-detail-views-likes-container">
                    <ul className='views-container'>
                        <li className='video-views'>{viewCount} views</li>
                        <li className='video-posted'>{publishedAt}</li>
                    </ul>

                    <div className="video-detail-likes-container">  
                        <div className="like-action-container">
                            <AiOutlineLike className="like-action-icon" />
                            <p className="like-action-text">Like</p>
                        </div>
                        <div className="like-action-container">
                            <AiOutlineDislike className="like-action-icon" />
                            <p className="like-action-text">Dislike</p>
                        </div>
                        <div className="like-action-container">
                            <MdPlaylistAdd className="like-action-icon" />
                            <p className="like-action-text">Save</p>
                        </div>
                    </div>
                </div>
                <hr className="horizontal-ruler"/>
                <div className='channel-container'>
                    <img src={profileImageUrl} alt="channel-profile-logo" className='profile-image'/> 
                    <div className="channel-information">
                        <h1 className="video-detail-channel-name">{name}</h1>
                        <p className="video-detail-channel-subscribers">{subscriberCount} subscribers</p>
                        <p className="video-detail-channel-description">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default VideoItemDetails
