import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    token: window.localStorage.getItem('token') || null,
    userId:window.localStorage.getItem('userId') || null, 
    userTypeId:window.localStorage.getItem('userTypeId') || null, 

    login: (token) => {},
    logout: () => {},
    setUserId:()=>{},
    setUserTypeId:()=>{},
    

})

export const AuthProvider = (props) => {
    const [token, setToken] = useState(window.localStorage.getItem('token'))
    const [userId, setUserId] = useState(null)
    const [userTypeId, setUserTypeId] = useState(null)


    const [isAuthenticated, setIsAuthenticated] = useState(!!token)
    
    const login = (token) => {
        setToken(token)
        window.localStorage.setItem('token', token)
        setIsAuthenticated(true)
    }
    const logout = () => {
        setToken(null)
        window.localStorage.removeItem('token')
        setIsAuthenticated(false)
    }
    return <AuthContext.Provider value={{
        isAuthenticated,
        token,
        login,
        logout,
        userId,
        setUserId,
        userTypeId,
        setUserTypeId,
       

    }}>
        {props.children}
    </AuthContext.Provider>
}