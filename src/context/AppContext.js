import React, { Children } from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';



const DataContext = createContext();
const AppContext = ({ children }) => {

    const [colors, setColors] = useState({
        mainColor: "#795548",
        whiteColor: "white",
        blackColor: "black",
        greyColor: "#666",
        borderColor: "#ebeef0",
        searchColor: " rgb(244 244 244/1)"
    })
    const [sewar, setSewar] = useState([])
    const [reciters, setReciters] = useState([])
    const [server, setServer] = useState()
    const [soraId, setSoraId] = useState("")
    const [ayahs, setAyahs] = useState([])
    const [scrollBool, setScrollBool] = useState(false)
    const [element, setElement] = useState()
    const history = useLocation();

    const getSewar = () => {
        fetch("https://api.alquran.cloud/v1/surah")
            .then(res => res.json())
            .then(data => setSewar(data.data))
    }


    const getReciters = () => {
        fetch(" https://www.mp3quran.net/api/v3/reciters?language=ar")
            .then(res => res.json())
            .then(data => setReciters(data.reciters))
    }

    const getAyahs = (soraNum) => {
        fetch(`https://api.alquran.cloud/v1/surah/${soraNum}/ar.alafasy`)
            .then(res => res.json())
            .then(data => setAyahs(data.data.ayahs))
    }





    return (
        <DataContext.Provider value=
            {{
                setSewar, getReciters,
                sewar, getSewar,
                reciters, setReciters,
                server, setServer,
                soraId, setSoraId,
                ayahs, getAyahs,
                colors, scrollBool,
                setScrollBool, element, setElement
            }}>
            {children}
        </DataContext.Provider>
    )
}
export const useData = () => {
    return useContext(DataContext)
}
export default AppContext