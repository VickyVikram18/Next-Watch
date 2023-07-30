import { useEffect ,useState, useContext} from "react"
import {ThreeDots} from "react-loader-spinner"
import Cookies from "js-cookie"
import {AiOutlineClose,AiOutlineSearch} from "react-icons/ai"
import LogoHeader from "../LogoHeader"
import Sidebar from "../Sidebar"
import FailureView from "../FailureView"
import Video from "../Video"
import Context from "../../context/Context"
import "./index.css"

const apiStatusConsts = {
    initial:"INITIAL",
    isLoading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const Home = () => {
    const {isDark} = useContext(Context)
    const [homeVideosList,setHomeVideosList] = useState([])
    const [searchInput,setSearchInput] = useState("")
    const [apiStatus,setApiStatus] = useState(apiStatusConsts.initial)
    const [bannerClassName,setBannerClassName] = useState("nxt-watch-premium-container")

    const jwtToken = Cookies.get("jwt_token")
    
    const getHomeVideos = async () => {
        setApiStatus(apiStatusConsts.isLoading)
        const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            method:"GET"
        }

        const response = await fetch(url,options)
        if(response.ok){
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
            setApiStatus(apiStatusConsts.success)
        }else{
            setApiStatus(apiStatusConsts.failure)
        }
    }

    useEffect(()=> {
        getHomeVideos()
    },[])

    const handleRetry = () => {
        getHomeVideos()
    }

    // const handleSearchKeyDown = (e) => {
    //     if(e.key === "Enter"){
    //         getHomeVideos()
    //     }
    // }

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearch = () => {
        getHomeVideos()
    }

    const handleCloseBanner = () => {
        console.log("banner clicked")
        setBannerClassName("remove-banner")
    }

    const renderLoaderView = () => (
        <div className="loader">
            <ThreeDots color="#3b82f6" height="80" width="80"/>
        </div>
    )

    const renderSuccessView = () => {

        if(homeVideosList.length!==0){
            return(
                homeVideosList.map((eachVideo)=> <Video eachVideo={eachVideo} key={eachVideo.id}/>)
            )
        }else{
            return(
                <div className="failure-view">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" alt="no videos" className="failure-image"/>
                    <h1 className={isDark ? "failure-heading dark-failure-heading" : "failure-heading light-failure-heading"}>No Search results found</h1>
                    <p className="failure-description">Try different key words or remove search filter</p>
                    <p className="no-videos-retry">Retry</p>
                </div>
            )
        }
    }

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

    return(
        <div className={isDark? "route-main-container dark-theme-route-bg-color" : "route-main-container"}>
            <LogoHeader/>
            <div className="route-sidebar-content-container">
                <Sidebar/>
                <div className="home-content-container">
                    <div className={bannerClassName}>
                        <div>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo" className="app-logo"/>
                            <p className="banner-content">Buy Nxt Watch Premium prepaid plans with UPI</p>
                            <h1 className="get-premium">GET IT NOW</h1>
                        </div>
                        <div>
                            <button type="button" className="close-button" onClick={handleCloseBanner}>
                                <AiOutlineClose/>
                            </button>
                        </div>
                    </div>
                    <div className={isDark? "search-video-cards-continater dark-theme-bg-color" : "search-video-cards-continater light-theme-bg-color"}>
                        <div className="search-contaner">
                            <input type="search" placeholder="Search" className="search-input" value={searchInput} onChange={handleSearchInput}/>
                            <button type="button" className="search-button" onClick={handleSearch}>
                                <AiOutlineSearch/>
                            </button>
                        </div>
                        <div className="video-cards-container">
                            {
                                renderView()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home