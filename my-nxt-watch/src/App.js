import {Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login";
import VideoItemDetails from "./components/VideoItemDetails"
import Trending from "./components/Trending";
import Gaming from "./components/Gaming";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute renderComponent={<Home/>}/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/videos/:id" element={<ProtectedRoute renderComponent={<VideoItemDetails/>}/>} />
      <Route path="/trending" element={<ProtectedRoute renderComponent={<Trending/>}/>} />
      <Route path="/gaming" element={<ProtectedRoute renderComponent={<Gaming/>}/>} />
    </Routes>
  )
}

export default App;
