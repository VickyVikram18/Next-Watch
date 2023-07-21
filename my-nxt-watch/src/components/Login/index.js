import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Login = () => {

    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [errormsg,setErrormsg] = useState('')
    const [displayPassword,setDisplayPassword] = useState(false)
    const navigate = useNavigate()

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

    const submitForm = async (event) => {
        event.preventDefault()
        console.log("form submitted")
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
        console.log(data)

        if(response.ok){
            const jwtToken = data.jwt_token
            Cookies.set("jwt_token",jwtToken,{expires:30})
            navigate('/')
        }else{
            setErrormsg(data.error_msg)
        }
    }

    return (
        <div className="main-container"> 
            <div className="login-container">
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo" className="logo"/>
                <form onSubmit={submitForm}>
                    <div className="input-container">
                        <label htmlFor="userName" className="label">USERNAME</label>
                        <input type="text" placeholder="Username" id="userName" className="input" onChange={handleUser} value={username}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className="label">PASSWORD</label>
                        <input type={displayType} placeholder="Password" id="password" className="input" onChange={handlePassword} value={password}/>
                    </div>
                    <div className="password-container">
                        <input type="checkBox" id="showPassword" className="checkbox" onChange={handleCheckbox}/>
                        <label htmlFor="showPassword" className="show">Show Password</label>
                    </div>
                    <button type="submit" className="button">Login</button>
                    {errormsg!== "" && <p>{errormsg}</p>}
                </form>
            </div>
        </div>
    )
}

export default Login