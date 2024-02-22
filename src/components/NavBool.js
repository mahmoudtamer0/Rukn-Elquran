import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useData } from "../context/AppContext"

const NavBool = () => {
    const { setScrollBool } = useData()
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname.includes("/quran/surah/") || pathname.includes("/azkar")) {
            setScrollBool(true)
        } else {
            setScrollBool(false)
        }

        if (pathname.includes("/sewar/")) {
            window.scrollTo(0, 0);
        } else window.scrollTo(0, 0);

    }, [pathname])
}

export default NavBool