import { useEffect ,useState} from "react"
import Cookies from "js-cookie"
import {AiOutlineClose,AiOutlineSearch} from "react-icons/ai"
import LogoHeader from "../LogoHeader"
import Sidebar from "../Sidebar"
import Video from "../Video"
import "./index.css"

const Home = () => {
    const [homeVideosList,setHomeVideosList] = useState([])
    const [searchInput,setSearchInput] = useState("")

    const jwtToken = Cookies.get("jwt_token")

    const getHomeVideos = async () => {
        const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            method:"GET"
        }

        const response = await fetch(url,options)
        const data = await response.json()
        const formattedData = data.videos.map((eachItem)=> ({
            id: eachItem.id,
            title: eachItem.title,
            thumbnailUrl: eachItem.thumbnail_url,
            channel: {
                name:eachItem.channel.name, 
                profileImageUrl:eachItem.channel.profile_image_url
            },
            viewCount: eachItem.view_count,
            publishedAt: eachItem.published_at
        }))
        setHomeVideosList(formattedData) 
    }

    useEffect(()=> {
        getHomeVideos()
    },[])

    return(
        <div className="route-main-container">
            <LogoHeader/>
            <div className="route-sidebar-content-container">
                <Sidebar/>
                <div className="home-content-container">
                    <div className="nxt-watch-premium-container">
                        <div>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo" className="app-logo"/>
                            <p className="banner-content">Buy Nxt Watch Premium prepaid plans with UPI</p>
                            <h1 className="get-premium">GET IT NOW</h1>
                        </div>
                        <div>
                            <button type="button" className="close-button">
                                <AiOutlineClose/>
                            </button>
                        </div>
                    </div>
                    <div className="search-video-cards-continater">
                        <div className="search-contaner">
                            <input type="search" placeholder="Search" className="search-input"/>
                            <button type="button" className="search-button">
                                <AiOutlineSearch/>
                            </button>
                        </div>
                        <div className="video-cards-container">
                            {
                                homeVideosList.map((eachVideo)=> <Video eachVideo={eachVideo} key={eachVideo.id}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home