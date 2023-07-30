import {Link,useLocation} from "react-router-dom"
import {AiFillHome} from "react-icons/ai"
import {HiFire} from "react-icons/hi2"
import {MdPlaylistAdd} from "react-icons/md"
import {SiYoutubegaming} from "react-icons/si"
import Context from "../../context/Context"
import "./index.css"
import { useContext } from "react"

const routeConsts = {
    home : '/',
    trending : '/trending',
    gaming : '/gaming',
    savedVideos : '/saved-videos'
}

const Sidebar = () => {
    const location= useLocation()
    const {pathname} = location
    const {isDark} = useContext(Context)

    const homeContainerStyle = pathname === routeConsts.home ? `link-container active-container ${isDark ? "dark-active-container" : "light-active-container"} `: 'link-container'
    const trendingContainerStyle = pathname === routeConsts.trending ? `link-container active-container ${isDark ? "dark-active-container" : "light-active-container"}`: 'link-container'
    const gamingContainerStyle = pathname === routeConsts.gaming ? `link-container active-container ${isDark ? "dark-active-container" : "light-active-container"}`: 'link-container'
    const savedVideosContainerStyle = pathname === routeConsts.savedVideos ? `link-container active-container ${isDark ? "dark-active-container" : "light-active-container"}`: 'link-container'
    
    const homeIconStyle = pathname === routeConsts.home ? 'link-icon active-icon': 'link-icon'
    const trendingIconStyle = pathname === routeConsts.trending ? 'link-icon active-icon': 'link-icon'
    const gamingIconStyle = pathname === routeConsts.gaming ? 'link-icon active-icon': 'link-icon'
    const savedVideosIconStyle = pathname === routeConsts.savedVideos ? 'link-icon active-icon': 'link-icon'
    
    const homeHeadingStyle = pathname === routeConsts.home ? `link-heading active-heading ${isDark ? "dark-active-heading" : "light-active-heading"}`: 'link-heading'
    const trendingHeadingStyle = pathname === routeConsts.trending ? `link-heading active-heading ${isDark ? "dark-active-heading" : "light-active-heading"}`: 'link-heading'
    const gamingHeadingStyle = pathname === routeConsts.gaming ? `link-heading active-heading ${isDark ? "dark-active-heading" : "light-active-heading"}`: 'link-heading'
    const savedVideosHeadingStyle = pathname === routeConsts.savedVideos ? `link-heading active-heading ${isDark ? "dark-active-heading" : "light-active-heading"}`: 'link-heading'
    

    return(
        <div className="sidebar-container">
            <div className="links-container">
                <Link to={routeConsts.home} className={homeContainerStyle}>
                    <AiFillHome className={homeIconStyle}/>
                    <h1 className={homeHeadingStyle} >Home</h1>
                </Link>
                <Link to={routeConsts.trending} className={trendingContainerStyle}>
                    <HiFire className={trendingIconStyle}/>
                    <h1 className={trendingHeadingStyle}>Trending</h1>
                </Link>
                <Link to={routeConsts.gaming} className={gamingContainerStyle}>
                    <SiYoutubegaming className={gamingIconStyle}/>
                    <h1 className={gamingHeadingStyle}>Gaming</h1>
                </Link>
                <Link to={routeConsts.savedVideos} className={savedVideosContainerStyle}>
                    <MdPlaylistAdd className={savedVideosIconStyle}/>
                    <h1 className={savedVideosHeadingStyle}>Saved Videos</h1>
                </Link>
            </div>
            <div className="contact-container">
                <h1 className={isDark ? "contact-heading dark-contact-heading" : "contact-heading light-contact-heading"}>CONTACT US</h1>
                <div>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook logo" className="social-media-logo"/>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="twitter logo" className="social-media-logo"/>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" alt="linked in logo" className="social-media-logo"/>
                </div>
                <p className={isDark ? "footer-content dark-contact-heading" : "footer-content light-contact-heading"}>Enjoy!Now to see your channels and recommendations!</p>
            </div>
        </div>
    )
}

export default Sidebar