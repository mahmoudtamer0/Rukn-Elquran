import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PreLoader = () => {
    const [loading, setLoading] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname.includes("/Rukn-Elquran/sewar/")) {
            setLoading(false)
        } else {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1800)
        }
    }, [])
    return (
        <div className={`preloader ${!loading && "d-none"}`}>
            <div className="preloaderText">
                <span className="ruknSpan"> رُكْنُ </span>
                <span className="quranSpan"> اَلْقُرْآنِ</span>
            </div>
            <div className="bySpan">by Mahmoud Tamer</div>
        </div>
    )
}

export default PreLoader