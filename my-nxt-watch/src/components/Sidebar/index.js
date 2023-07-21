import {Link} from "react-router-dom"
import {AiFillHome} from "react-icons/ai"
import {HiFire} from "react-icons/hi2"
import {MdPlaylistAdd} from "react-icons/md"
import {SiYoutubegaming} from "react-icons/si"
import "./index.css"

const Sidebar = () => {
    const hi= "hello"

    return(
        <div className="sidebar-container">
            <div className="links-container">
                <Link className="link-container">
                    <AiFillHome className="link-icon"/>
                    <h1 className="link-heading">Home</h1>
                </Link>
                <Link className="link-container">
                    <HiFire className="link-icon"/>
                    <h1 className="link-heading">Treanding</h1>
                </Link>
                <Link className="link-container">
                    <SiYoutubegaming className="link-icon"/>
                    <h1 className="link-heading">Gaming</h1>
                </Link>
                <Link className="link-container">
                    <MdPlaylistAdd className="link-icon"/>
                    <h1 className="link-heading">Saved Videos</h1>
                </Link>
            </div>
            <div className="contact-container">
                <h1 className="contact-heading">CONTACT US</h1>
                <div>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook logo" className="social-media-logo"/>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="twitter logo" className="social-media-logo"/>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" alt="linked in logo" className="social-media-logo"/>
                </div>
                <p className="footer-content">Enjoy!Now to see your channels and recommendations!</p>
            </div>
        </div>
    )
}

export default Sidebar