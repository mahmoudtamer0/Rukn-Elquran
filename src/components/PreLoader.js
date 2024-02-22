import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useData } from '../context/AppContext'
const PreLoader = () => {
    const [loading, setLoading] = useState(true)
    const { t, i18n } = useTranslation()
    const { font, colors } = useData()

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1800)
    }, [])
    return (
        <div className={`preloader ${!loading && "d-none"}`} style={{ backgroundColor: colors.preLoader }}>
            <div className="preloaderText">
                <span className="ruknSpan" style={{ fontFamily: font }}> {t("navBar.logo1")} </span>
                <span className="quranSpan" style={{ fontFamily: font }}> {t("navBar.logo2")} </span>
            </div>
            <div className="bySpan">by Mahmoud Tamer</div>
        </div>
    )
}

export default PreLoader