import {FaMoon} from "react-icons/fa"
import "./index.css"

const LogoHeader =() => {
    const hi = "hello"

    return (
        <div className = "logo-conatiner">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo" className="app-logo"/>
            <div className="theme-container">
                <FaMoon className="theme-icon"/>
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" className="my-profile-image"/>
                <button type="button" className="btn">Logout</button>
            </div>
        </div>
    )

}

export default LogoHeader