import { useState,useEffect,useContext } from "react"
import Sidebar from "../Sidebar"
import LogoHeader from "../LogoHeader"
import TrendingVideoCard from "../TrendingVideoCard"
import FailureView from "../FailureView"
import Context from "../../context/Context"
import { ThreeDots } from "react-loader-spinner"
import {HiFire} from "react-icons/hi2"
import Cookies from "js-cookie"
import "./index.css"

const apiStatusConsts = {
    initial:"INITIAL",
    isLoading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const Trending =() => {
    const [videosList,setVideosList] = useState([])
    const [apiStatus,setApiStatus] = useState(apiStatusConsts.initial)

    const jwtToken = Cookies.get("jwt_token")
    const {isDark} = useContext(Context)

    const getVideosList = async () => {
        setApiStatus(apiStatusConsts.isLoading)
        const url="https://apis.ccbp.in/videos/trending"
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
        }

        const response = await fetch(url,options)
        if(response.ok){
            const data = await response.json()
            const {videos} = data

            const formattedData = videos.map(eachItem => ({
                id:eachItem.id,
                title:eachItem.title,
                thumbnailUrl:eachItem.thumbnail_url,
                channel:eachItem.channel,
                viewCount:eachItem.view_count,
                publishedAt:eachItem.published_at
            }))
            setVideosList(formattedData)
            setApiStatus(apiStatusConsts.success)
        }else{
            setApiStatus(apiStatusConsts.failure)
        }    
    }

    useEffect(()=> {
        getVideosList()
    },[jwtToken])

    const handleRetry = () => {
        console.log("clicked")
        getVideosList()
    }

    const renderLoaderView = () => (
        <div className="loader">
            <ThreeDots color="#3b82f6" height="80" width="80"/>
        </div>
    )

    const renderSuccessView = () => (
        videosList.map((eachVideo => <TrendingVideoCard eachVideo={eachVideo} key = {eachVideo.id}/>))
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

    return (
        <div className={isDark? "route-main-container dark-theme-route-bg-color" : "route-main-container"}>
            <LogoHeader/>
            <div className="route-sidebar-content-container">
                <Sidebar/>
                <div className="route-content-conatiner">
                    <div className={isDark ? "route-icon-bar-container dark-icon-bar-bg" : "route-icon-bar-container light-icon-bar-bg"}>
                        <div className="route-icon-conatiner">
                            <HiFire className={isDark ? "route-icon dark-route-icon-bg" : "route-icon light-route-icon-bg"}/>
                            <h1 className={isDark ? "route-icon-heading dark-route-icon-heading" : "route-icon-heading light-route-icon-heading"}>Trending</h1>
                        </div>
                    </div>
                    <div className={isDark ? "trending-videos-conatiner dark-trending-videos-bg" : "trending-videos-conatiner light-trending-videos-bg"}>
                        {
                           renderView()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending