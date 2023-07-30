import { useContext } from "react" 
import {FaMoon} from "react-icons/fa"
import {BsFillSunFill} from "react-icons/bs"
import Popup from "reactjs-popup"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Context from "../../context/Context"
import "./index.css"

const LogoHeader =() => {

    const navigate = useNavigate()
    const {isDark,toggleIsDark} = useContext(Context)

    const handleLogo = () => {
        navigate('/')
    }

    const handleConfirm = () => {
        console.log("Confirmed")
        Cookies.remove("jwt_token")
        navigate("/login")
    }

    const handelTheme = () => {
        toggleIsDark()
    }

    return (
        <div className = "logo-conatiner">
            <button type="button" className="logo-button-container" onClick={handleLogo}>
                <img src={isDark? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"} alt="logo" className="app-logo"/>
            </button>
            <div className="theme-container">
                <button type="button" onClick={handelTheme} className="theme-button">
                    {isDark? <BsFillSunFill className="theme-icon dark-theme"/> : <FaMoon className="theme-icon light-theme"/>}
                </button>
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" className="my-profile-image"/>
                <div className="popup-container">
                    <Popup
                        modal
                        trigger = {
                            <button type="button" className={isDark? "btn dark-btn" : "btn light-btn"}>Logout</button>
                        }
                    >
                        {
                            close => (
                                <div className="popup-content">
                                    <p className="popup-heading">Are you sure you want to logout?</p>
                                    <div className="popup-button-container">
                                        <button type="button" onClick={()=>close()} className="cancel-button">Cancel</button>
                                        <button type="button" onClick={handleConfirm} className="confirm-button">Confirm</button>
                                    </div>
                                </div>
                            )
                        }
                        
                    </Popup>
                </div>
            </div>
        </div>
    )

}

export default LogoHeader