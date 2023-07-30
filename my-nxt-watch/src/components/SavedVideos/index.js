import { useContext} from "react"
import Sidebar from "../Sidebar"
import LogoHeader from "../LogoHeader"
import TrendingVideoCard from "../TrendingVideoCard"
import Context from "../../context/Context"
import {MdPlaylistAdd} from "react-icons/md"
import "./index.css"

const Trending =() => {
    
    const {isDark,savedVideosList} = useContext(Context)

    return (
        <div className={isDark? "route-main-container dark-theme-route-bg-color" : "route-main-container"}>
            <LogoHeader/>
            <div className="route-sidebar-content-container">
                <Sidebar/>
                <div className="route-content-conatiner">
                    <div className={isDark ? "route-icon-bar-container dark-icon-bar-bg" : "route-icon-bar-container light-icon-bar-bg"}>
                        <div className="route-icon-conatiner">
                            <MdPlaylistAdd className={isDark ? "route-icon dark-route-icon-bg" : "route-icon light-route-icon-bg"}/>
                            <h1 className={isDark ? "route-icon-heading dark-route-icon-heading" : "route-icon-heading light-route-icon-heading"}>Saved Videos</h1>
                        </div>
                    </div>
                    <div className={isDark ? "trending-videos-conatiner dark-trending-videos-bg" : "trending-videos-conatiner light-trending-videos-bg"}>
                        {
                            savedVideosList.length!==0 ? 
                            savedVideosList.map((eachVideo => <TrendingVideoCard eachVideo={eachVideo} key = {eachVideo.id}/>))
                            : (
                                <div className="not-saved-video-conatiner">
                                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt= "no saved videos" className="no-saved-image"/>
                                    <h1 className={isDark ? "no-saved-videos-heading dark-failure-heading": "no-saved-videos-heading light-failure-heading"}>No saved videos found</h1>
                                    <p className="no-saved-videos-description">You can save your videos while wtaching them</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending