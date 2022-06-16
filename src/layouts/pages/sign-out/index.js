import { useContext, useEffect } from "react";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignOut() {
    const navigate = useNavigate()
    const ctx = useContext(AuthContext)
    useEffect(() => {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("userTypeId")
        window.localStorage.removeItem("userId")
        ctx.logout()
        navigate('/Sign-in')
    }, [])
    return <></>
}

export default SignOut