import {useState,useContext} from "react"
import {Navigate, useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import Context from "../../context/Context"
import "./index.css"

const Login = () => {

    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [errormsg,setErrormsg] = useState('')
    const [displayPassword,setDisplayPassword] = useState(false)
    const navigate = useNavigate()
    const {isDark} = useContext(Context)
 
    const handleUser = (e) => {
        setUserName(e.target.value)
    } 

    const handlePassword = (e) => {
        setPassword(e.target.value)
    } 

    const handleCheckbox = (e) => {
        setDisplayPassword(e.target.checked)
    }

    const displayType = displayPassword? "text" : "password"
    let jwtToken = Cookies.get("jwt_token")

    const submitForm = async (event) => {
        event.preventDefault()
        const url = "https://apis.ccbp.in/login"
        const userDetails = {
            username,password
        }
        const options = {
            method:"POST",
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url,options)
        const data = await response.json()

        if(response.ok){
            jwtToken = data.jwt_token
            Cookies.set("jwt_token",jwtToken,{expires:30})
            navigate('/')
        }else{
            setErrormsg(data.error_msg)
        }
    }

    if(jwtToken !== undefined){
        console.log("Cookies");
        return <Navigate to="/"/>
    }

    return (
        <div className={ isDark ? "main-container dark-theme" : "main-container light-theme"}> 
            <div className={isDark ? "login-container dark-login-container" : "login-container light-login-container"}>
                <img src={isDark ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"} alt="logo" className="logo"/>
                <form onSubmit={submitForm}>
                    <div className="input-container">
                        <label htmlFor="userName" className={isDark ? "label dark-label" : "label light-label"}>USERNAME</label>
                        <input type="text" placeholder="Username" id="userName" className="input" onChange={handleUser} value={username}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className={isDark ? "label dark-label" : "label light-label"}>PASSWORD</label>
                        <input type={displayType} placeholder="Password" id="password" className="input" onChange={handlePassword} value={password}/>
                    </div>
                    <div className="password-container">
                        <input type="checkBox" id="showPassword" className="checkbox" onChange={handleCheckbox}/>
                        <label htmlFor="showPassword" className={isDark ? "show dark-show" : "show light-show"}>Show Password</label>
                    </div>
                    <button type="submit" className="button">Login</button>
                    {errormsg!== "" && <p className="error-msg">*{errormsg}</p>}
                </form>
            </div>
        </div>
    )
}

export default Login