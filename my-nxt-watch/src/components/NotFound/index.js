import { useContext } from "react"
import Context from "../../context/Context"
import LogoHeader from "../LogoHeader"
import Sidebar from "../Sidebar"
import "./index.css"

const NotFound = () => {
    const {isDark} = useContext(Context)

    return (
        <div className={isDark? "route-main-container dark-theme-route-bg-color" : "route-main-container"}>
            <LogoHeader/>
            <div className="route-sidebar-content-container">
                <Sidebar/>
                <div className={isDark ? "not-found-content-conatiner dark-not-found-bg" : "not-found-content-conatiner light-not-found-bg"}>
                    <img src={isDark ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"} alt="not found" className="failure-image"/>
                    <h1 className={isDark ? "failure-heading dark-failure-heading" : "failure-heading light-failure-heading"}>Page Not Found.</h1>
                    <p className="failure-description">we are sorry the page you requested could not be found.</p>
                </div>
            </div>
        </div>
    )
}

export default NotFound