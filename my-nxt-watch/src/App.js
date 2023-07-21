import {Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login";
import VideoItemDetails from "./components/VideoItemDetails"
import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/videos/:id" element={<VideoItemDetails/>}/>
    </Routes>
  )
}

export default App;
