import { useState } from "react";
import {Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login";
import VideoItemDetails from "./components/VideoItemDetails"
import Trending from "./components/Trending";
import Gaming from "./components/Gaming";
import ProtectedRoute from "./components/ProtectedRoute";
import SavedVideos from "./components/SavedVideos"
import Context from "./context/Context";
import "./App.css"
import NotFound from "./components/NotFound";

const App = () => {
  const [savedVideosList,setSavedVideosList] = useState([])
  const [isDark,setIsDark] = useState(false)

  const addVideoToSavedList = (video) =>{
    setSavedVideosList(prevList => [...prevList,video])
  }

  const removeFromSavedList = (video) => {
    setSavedVideosList(prevList => prevList.filter((eachVideo) => eachVideo.id !== video.id))
  }

  const toggleIsDark = () => {
    setIsDark(prevValue => !prevValue)
  }

  return (
    <Context.Provider 
      value={{
              savedVideosList,
              addVideoToSavedList,
              removeFromSavedList,
              isDark,
              toggleIsDark
            }}
    >
      <Routes>
        <Route path="/" element={<ProtectedRoute renderComponent={<Home/>}/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/videos/:id" element={<ProtectedRoute renderComponent={<VideoItemDetails/>}/>} />
        <Route path="/trending" element={<ProtectedRoute renderComponent={<Trending/>}/>} />
        <Route path="/gaming" element={<ProtectedRoute renderComponent={<Gaming/>}/>} />
        <Route path="/saved-videos" element={<ProtectedRoute renderComponent={<SavedVideos/>}/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Context.Provider>
  )
}

export default App;
