import { useEffect } from "react"

import { useLocation } from "react-router-dom"
import { useData } from "../context/AppContext"

const NavBool = () => {
    const { setScrollBool, setAzkarBool } = useData()
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname.includes("/Rukn-Elquran/quran/surah/") || pathname.includes("/Rukn-Elquran/azkar")) {
            setScrollBool(true)
        } else {
            setScrollBool(false)
        }

        if (pathname.includes("/Rukn-Elquran/sewar/")) {
            window.scrollTo(0, 0);
        } else window.scrollTo(0, 0);

    }, [pathname])
}

export default NavBool