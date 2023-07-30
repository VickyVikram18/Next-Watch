import { useState,useEffect,useContext } from "react"
import Sidebar from "../Sidebar"
import LogoHeader from "../LogoHeader"
import GamingVideoCard from "../GamingVideoCard"
import { ThreeDots } from "react-loader-spinner"
import FailureView from "../FailureView"
import {SiYoutubegaming} from "react-icons/si"
import Context from "../../context/Context"
import Cookies from "js-cookie"
import "./index.css"

const apiStatusConsts = {
    initial:"INITIAL",
    isLoading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const Gaming =() => {
    const [videosList,setVideosList] = useState([])
    const [apiStatus,setApiStatus] = useState(apiStatusConsts.initial)

    const jwtToken = Cookies.get("jwt_token")
    const {isDark} = useContext(Context)

    const getVideosList = async () => {
        setApiStatus(apiStatusConsts.isLoading)
        const url="https://apis.ccbp.in/videos/gaming"
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
                viewCount:eachItem.view_count
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
        videosList.map((eachVideo => <GamingVideoCard eachVideo={eachVideo} key = {eachVideo.id}/>))
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
                            <SiYoutubegaming className={isDark ? "route-icon dark-route-icon-bg" : "route-icon light-route-icon-bg"}/>
                            <h1 className={isDark ? "route-icon-heading dark-route-icon-heading" : "route-icon-heading light-route-icon-heading"}>Gaming</h1>
                        </div>
                    </div>
                    <div className={isDark ? "gaming-cards-conatiner dark-trending-videos-bg" : "gaming-cards-conatiner light-trending-videos-bg"}>
                        {
                            renderView()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gaming