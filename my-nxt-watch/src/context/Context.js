import React from "react"

const Context  = React.createContext({
    savedVideosList : [],
    addVideoToSavedList : () => {},
    removeFromSavedList : () => {},
    isDark:"",
    toggleIsDark: () => {}
})

export default Context