import { useState,useEffect } from "react"
import Sidebar from "../Sidebar"
import LogoHeader from "../LogoHeader"
import GamingVideoCard from "../GamingVideoCard"
import {SiYoutubegaming} from "react-icons/si"
import Cookies from "js-cookie"
import "./index.css"

const Gaming =() => {
    const [videosList,setVideosList] = useState([])

    const jwtToken = Cookies.get("jwt_token")

    useEffect(()=> {
        const getVideosList = async () => {
            const url="https://apis.ccbp.in/videos/gaming"
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
                viewCount:eachItem.view_count
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
                            <SiYoutubegaming className="route-icon"/>
                            <h1 className="route-icon-heading">Gaming</h1>
                        </div>
                    </div>
                    <div className="gaming-cards-conatiner">
                        {
                            videosList.map((eachVideo => <GamingVideoCard eachVideo={eachVideo} key = {eachVideo.id}/>))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gaming