import React from "react"


export default React.createContext({
    token: null,
    userId: null,
    login: (loginId, token, tokenExpiration) => { },
    logout: () => { }
})