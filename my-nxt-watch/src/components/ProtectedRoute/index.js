import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"

const ProtectedRoute = (props) => {
    const {renderComponent} = props
    const jwtToken = Cookies.get("jwt_token")

    if(jwtToken === undefined){
       return <Navigate to="/login"/>
    }
    return renderComponent
}

export default ProtectedRoute