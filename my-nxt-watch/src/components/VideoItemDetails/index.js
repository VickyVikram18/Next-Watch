import { useState,useEffect,useContext } from "react"
import ReactPlayer from "react-player"
import {useParams} from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
import {AiOutlineLike,AiOutlineDislike} from "react-icons/ai"
import {MdPlaylistAdd} from "react-icons/md"
import Cookies from "js-cookie"
import {formatDistanceStrict} from 'date-fns'
import LogoHeader from "../LogoHeader"
import Sidebar from "../Sidebar"
import FailureView from "../FailureView"
import Context from "../../context/Context"
import "./index.css"

const apiStatusConsts = {
    initial:"INITIAL",
    isLoading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const VideoItemDetails = () => {
    
    const {id} = useParams()
    const {isDark,savedVideosList,addVideoToSavedList,removeFromSavedList} = useContext(Context)

    const filteredList = savedVideosList.filter((eachVideo)=> eachVideo.id === id)

    const isSavedInitial = filteredList.length!==0 ? filteredList[0].isSaved : false

    const [videoDetails,setVideoDetails] = useState({})
    const [channel,setChannel] = useState({})
    const [publishedAt,setPublishedAt] = useState('')
    const [isLiked,setIsLiked] = useState(false)
    const [isDisLiked,setIsDisLiked] = useState(false)
    const [isSaved,setIsSaved] = useState(isSavedInitial)
    const [apiStatus,setApiStatus] = useState(apiStatusConsts.initial)
    const jwtToken = Cookies.get("jwt_token")

    const handleSave = () => {
        setIsSaved(true)
        const videoToSave = {
            ...videoDetails,
            isSaved: true
        }
        addVideoToSavedList(videoToSave)
    }

    const handleRemove = () => {
        setIsSaved(false)
        const videoToSave = {
            ...videoDetails,
            isSaved: false
        }
        removeFromSavedList(videoToSave)
    }

    const getVideoItemDetails = async () => {
        setApiStatus(apiStatusConsts.isLoading)
        const url = `https://apis.ccbp.in/videos/${id}`
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
        }

        const response = await fetch(url,options)
        if(response.ok){
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
            setApiStatus(apiStatusConsts.success)
        }else{
            setApiStatus(apiStatusConsts.failure)
        }
    }

    useEffect (()=> {
        getVideoItemDetails()
    },[])

    const handleRetry = () => {
        getVideoItemDetails()
    }

    const renderLoaderView = () => (
        <div className="loader">
            <ThreeDots color="#3b82f6" height="80" width="80"/>
        </div>
    )

    const renderSuccessView = () => (
            <div>
                <div className="responsive-container">
                    <ReactPlayer url={videoUrl} width="100%" />
                </div>
                <h1 className={isDark ? "video-detail-heading dark-text" : "video-detail-heading light-text"}>{title}</h1>
                <div className="video-detail-views-likes-container">
                    <ul className='views-container'>
                        <li className='video-views'>{viewCount} views</li>
                        <li className='video-posted'>{publishedAt}</li>
                    </ul>

                    <div className="video-detail-likes-container">  
                        <button className={isLiked ? "like-action-container active-like" :"like-action-container"} onClick={handleLike}>
                            <AiOutlineLike className="like-action-icon" />
                            <p className="like-action-text">Like</p>
                        </button>
                        <button className={isDisLiked ? "like-action-container active-dislike" :"like-action-container"} onClick={handleDisLike}>
                            <AiOutlineDislike className="like-action-icon" />
                            <p className="like-action-text">Dislike</p>
                        </button>
                        <button className="like-action-container" onClick={isSaved ? handleRemove : handleSave}>
                            <MdPlaylistAdd className={isSaved ? "save-action-icon active-saved" : "save-action-icon active-save"} />
                            {
                                isSaved ? <p className="save-action-text active-saved">Saved</p> : <p className="save-action-text active-save">Save</p>
                            }
                        </button>
                    </div>
                </div>
                <hr className={isDark ? "horizontal-ruler dark-ruler" : "horizontal-ruler light-ruler"}/>
                <div className='channel-container'>
                    <img src={profileImageUrl} alt="channel-profile-logo" className='profile-image'/> 
                    <div className="channel-information">
                        <h1 className={isDark ? "video-detail-channel-name dark-text" : "video-detail-channel-name light-text"}>{name}</h1>
                        <p className="video-detail-channel-subscribers">{subscriberCount} subscribers</p>
                        <p className={isDark ? "video-detail-channel-description dark-text" : "video-detail-channel-description light-text"}>{description}</p>
                    </div>
                </div>
            </div>
    )

    const renderFailureView =() => (
        <FailureView handleRetry={handleRetry}/>
    )

    const renderView = () => {
        switch (apiStatus){
            case apiStatusConsts.success:
                return renderSuccessView()
            case apiStatusConsts.failure:
                return renderFailureView()
            case apiStatusConsts.isLoading:
                return renderLoaderView()
            default:
                return null
        }
    }

    const {title,videoUrl,viewCount,description} = videoDetails

    const {name,profileImageUrl,subscriberCount} = channel

    const handleLike = () => {
        setIsLiked((prevIsLiked) => !prevIsLiked)
        setIsDisLiked((prevIsDisLiked) => {
            if(prevIsDisLiked){
                return false
            }
            return prevIsDisLiked
        })
    }

    const handleDisLike = () => {
        setIsLiked((prevIsLiked) => {
            if(prevIsLiked){
                return false
            }
            return prevIsLiked
        })
        setIsDisLiked((prevIsDisLiked) => !prevIsDisLiked)
    }
    
    return (
    <div className={isDark? "route-main-container dark-theme-route-bg-color" : "route-main-container"}>
        <LogoHeader/>
        <div className="route-sidebar-content-container">
            <Sidebar/>
            <div className={isDark ? "video-details-container dark-video-details-bg" : "video-details-container light-video-details-bg"}>
                {
                    renderView()
                }
            </div>
        </div>
    </div>
    )
}

export default VideoItemDetails
