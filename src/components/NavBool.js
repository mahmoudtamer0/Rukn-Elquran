import { useEffect } from "react"

import { useLocation } from "react-router-dom"
import { useData } from "../context/AppContext"

const NavBool = () => {
    const { setScrollBool } = useData()
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname.includes("/Rukn-Elquran/sewar/")) {
            return
        } else {
            setScrollBool(false)
        }

        window.scrollTo(0, 0);
    }, [pathname])
}

export default NavBool