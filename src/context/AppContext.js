import React, { Children } from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';



const DataContext = createContext();
const AppContext = ({ children }) => {

    const [colors, setColors] = useState({
        mainColor: "#0075ff",
        whiteColor: "white",
        blackColor: "black",
        greyColor: "#666",
        borderColor: "#ebeef0",
        soraNumberDiv: "#f4f5f6",
        navColor: "white",
        searchColor: " rgb(244 244 244/1)",
        iconBackGround: "#0075ff4a",
        appColor: "white",
        progress: "#ddd"
    })
    const [sewar, setSewar] = useState([])
    const [mode, setMode] = useState(
        JSON.parse(localStorage.getItem("mode")) ?
            JSON.parse(localStorage.getItem("mode")) : "light")
    const [reciters, setReciters] = useState([])
    const [server, setServer] = useState()
    const [soraId, setSoraId] = useState("")
    const [soraNow, setSoraNow] = useState("")
    const [ayahs, setAyahs] = useState([])
    const [scrollBool, setScrollBool] = useState(false)
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const [element, setElement] = useState()


    const getSewar = () => {
        fetch("https://api.alquran.cloud/v1/surah")
            .then(res => res.json())
            .then(data => setSewar(data.data))
    }

    const handleLightMode = () => {
        if (mode == "dark") {
            setMode("light")
            localStorage.setItem("mode", JSON.stringify("light"))
        } else {
            setMode("dark")
            localStorage.setItem("mode", JSON.stringify("dark"))
        }
    }

    useEffect(() => {
        if (mode == "dark") {
            document.querySelector("body").classList.add("darkApp")
            setColors({
                mainColor: "#0075ff",
                whiteColor: "black",
                blackColor: "#e7e9ea",
                greyColor: "#666",
                borderColor: "#464b50",
                soraNumberDiv: "#343a40",
                navColor: "#343a40",
                searchColor: " rgb(244 244 244/1)",
                iconBackGround: " rgb(37 48 59/1)",
                appColor: "#1e2329",
                progress: "#4c4c4c"
            })
        } else {
            document.querySelector("body").classList.remove("darkApp")
            setColors({
                mainColor: "#0075ff",
                whiteColor: "white",
                blackColor: "black",
                greyColor: "#666",
                borderColor: "#ebeef0",
                soraNumberDiv: "#f4f5f6",
                navColor: "white",
                searchColor: " rgb(244 244 244/1)",
                iconBackGround: "#0075ff4a",
                appColor: "white",
                progress: "#ddd"
            })
        }
    }, [mode])


    const getReciters = () => {
        fetch("https://www.mp3quran.net/api/v3/reciters?language=ar")
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
                setScrollBool, element, setElement,
                sideBarOpen, setSideBarOpen,
                soraNow, setSoraNow,
                handleLightMode,
            }}>
            {children}
        </DataContext.Provider>
    )
}
export const useData = () => {
    return useContext(DataContext)
}
export default AppContext