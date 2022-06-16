import {createContext, useState} from 'react'
export const FarmLocation =createContext({
    place:[],
    setPlace:()=>{}
})
export const FarmLocProvider =({children})=>{
    const [place, setPlace] = useState([])
    return <FarmLocation.Provider value={{
        place,
        setPlace,
    }}>
        {children}
    </FarmLocation.Provider>
}