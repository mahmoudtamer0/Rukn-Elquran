import React, { Children } from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';



const DataContext = createContext();
const AppContext = ({ children }) => {

    const [colors, setColors] = useState({
        mainColor: "#0075ff",
        whiteColor: "white",
        blackColor: "black",
        greyColor: "#666",
        borderColor: "#ebeef0",
        soraNumberDiv: "#f4f5f6",
        navColor: "#f7f7f7",
        searchColor: " rgb(244 244 244/1)",
        iconBackGround: "#0075ff4a",
        appColor: "white",
        progress: "#ddd",
        sidBarColor: "white"
    })
    const [sewar, setSewar] = useState([])
    const [mode, setMode] = useState(
        JSON.parse(localStorage.getItem("mode")) ?
            JSON.parse(localStorage.getItem("mode")) : "light")
    const [reciters, setReciters] = useState([])
    const [server, setServer] = useState("")
    const [radio, setRadio] = useState()
    const [soraId, setSoraId] = useState("")
    const [soraNow, setSoraNow] = useState("")
    const [ayahs, setAyahs] = useState([])
    const [scrollBool, setScrollBool] = useState(false)
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const [element, setElement] = useState()
    const [play, setPlay] = useState(false)
    const { t, i18n } = useTranslation()
    const [sewarApi, setSewarApi] = useState('https://api.alquran.cloud/v1/surah')
    const [font, seFont] = useState(`'Noto Sans Arabic', sans - serif`)
    const [fontSize, setFontSize] = useState("1.7rem")
    const [lang, setLang] = useState(JSON.parse(localStorage.getItem("lang")) ?
        JSON.parse(localStorage.getItem("lang")) : "ar")


    const getSewar = () => {
        if (lang == "ar") {
            fetch("https://api.alquran.cloud/v1/surah")
                .then(res => res.json())
                .then(data => setSewar(data.data))
        } else {
            fetch("https://mp3quran.net/api/v3/suwar?language=eng")
                .then(res => res.json())
                .then(data => setSewar(data.suwar))
        }
    }

    const getRadio = () => {
        fetch(`https://mp3quran.net/api/v3/radios?language=${lang}`)
            .then(res => res.json())
            .then(data => setRadio(data.radios))
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

    const handleArLanguage = () => {
        window.location.reload()
        i18n.changeLanguage("ar")
        localStorage.setItem("lang", JSON.stringify("ar"))
        localStorage.setItem("langi18", JSON.stringify(i18n))
    }

    const handleEngLanguage = () => {
        window.location.reload()
        i18n.changeLanguage("eng")
        localStorage.setItem("lang", JSON.stringify("eng"))
        localStorage.setItem("langi18", JSON.stringify(i18n))
    }

    useEffect(() => {
        if (lang == "eng") {
            seFont(`'Noto Sans Arabic', sans-serif`)
            setFontSize('1.3rem')
            document.querySelector("body").classList.add("ltr")
        } else {
            setFontSize('1.7rem')
            seFont('alfont_com_AlFont_com_pdms-saleem-quranfont')
        }
    }, [lang])

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
                progress: "#4c4c4c",
                sidBarColor: "#343a40"
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
                navColor: "#f7f7f7",
                searchColor: " rgb(244 244 244/1)",
                iconBackGround: "#0075ff4a",
                appColor: "white",
                progress: "#ddd",
                sidBarColor: "white"
            })
        }
    }, [mode])


    const getReciters = () => {
        fetch(`https://www.mp3quran.net/api/v3/reciters?language=${lang}`)
            .then(res => res.json())
            .then(data => setReciters(data.reciters))
    }

    const getAyahs = (soraNum) => {
        fetch(`https://api.alquran.cloud/v1/surah/${soraNum}/ar.alafasy`)
            .then(res => res.json())
            .then(data => setAyahs(data.data.ayahs))
    }

    useEffect(() => {
        getReciters()
    }, [])

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
                getRadio, radio, lang,
                handleEngLanguage, handleArLanguage, font,
                play, setPlay, fontSize
            }}>
            {children}
        </DataContext.Provider>
    )
}
export const useData = () => {
    return useContext(DataContext)
}
export default AppContext