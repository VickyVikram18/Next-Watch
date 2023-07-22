import {Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login";
import VideoItemDetails from "./components/VideoItemDetails"
import Trending from "./components/Trending";
import Gaming from "./components/Gaming";
import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/videos/:id" element={<VideoItemDetails/>}/>
      <Route path="/trending" element={<Trending/>}/>
      <Route path="/gaming" element={<Gaming/>}/>
    </Routes>
  )
}

export default App;
