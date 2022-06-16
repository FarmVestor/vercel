import { useContext } from "react"
import { AuthContext } from "context/AuthContext"
import { useNavigate } from "react-router-dom"
import { AppContext } from "context/AppContext"
export const useRequest = () => {
    const ctx = useContext(AuthContext)
    const appCtx = useContext(AppContext)
    const navigate = useNavigate()
    
    const sendRequest = async (url, headers, body, config = {}, method = 'GET') => {
        let options = {
            headers: {},
            body: body
        }
        // options.body = body

        options.method = method
        if (config?.auth) {
            options.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
        }
        if (config.type === 'json') {
            options.headers['Content-Type'] = 'application/json'
            options.body = JSON.stringify(body)
        }

        options.headers = { ...options.headers, ...headers }

        return await fetch(url, options)
            .then(async response => {
                if (response.status == 401) {
                    navigate('/Sign-in')
                    return

                }
                return response.json().then(data => {
                    if (config.snackbar) {
                        appCtx.snackbar.setMessage(data?.messages?.join(' '))
                        if (data.success) {
                            
                            appCtx.snackbar.setType('success')
                        } else {
                            appCtx.snackbar.setType('error')

                        }
                        appCtx.snackbar.setOpen(true)
                    }
                    if(data.success && config.redirect){
                        navigate(config.redirect)
                    }
                    return data
                })
            })
            .catch(e => console.log(e))
    }
    return sendRequest
}