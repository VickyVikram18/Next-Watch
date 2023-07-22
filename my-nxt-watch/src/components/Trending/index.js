import { useState,useEffect } from "react"
import Sidebar from "../Sidebar"
import LogoHeader from "../LogoHeader"
import TrendingVideoCard from "../TrendingVideoCard"
import {HiFire} from "react-icons/hi2"
import Cookies from "js-cookie"
import "./index.css"

const Trending =() => {
    const [videosList,setVideosList] = useState([])

    const jwtToken = Cookies.get("jwt_token")

    useEffect(()=> {
        const getVideosList = async () => {
            const url="https://apis.ccbp.in/videos/trending"
            const options = {
                method : "GET",
                headers : {
                    Authorization : `Bearer ${jwtToken}`
                }
            }

            const response = await fetch(url,options)
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
        }

        getVideosList()
    },[jwtToken])

    return (
        <div className="route-main-container">
            <LogoHeader/>
            <div className="route-sidebar-content-container">
                <Sidebar/>
                <div className="route-content-conatiner">
                    <div className="route-icon-bar-container">
                        <div className="route-icon-conatiner">
                            <HiFire className="route-icon"/>
                            <h1 className="route-icon-heading">Trending</h1>
                        </div>
                    </div>
                    <div className="trending-videos-conatiner">
                        {
                            videosList.map((eachVideo => <TrendingVideoCard eachVideo={eachVideo} key = {eachVideo.id}/>))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending