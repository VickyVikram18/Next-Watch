import { useContext } from "react"
import Context from "../../context/Context"
import "./index.css"

const FailureView = (props) => {
    const {handleRetry} = props
    const {isDark} = useContext(Context)

    return(
        <div className="failure-view">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure" className="failure-image"/>
            <h1 className={isDark ? "failure-heading dark-failure-heading" : "failure-heading light-failure-heading"}>Oops! Something Went Wrong</h1>
            <p className="failure-description">We are having some trouble to complete your request. Please try again.</p>
            <button type="button" onClick={handleRetry} className="failure-button">Retry</button>
        </div>
    )
}

export default FailureView