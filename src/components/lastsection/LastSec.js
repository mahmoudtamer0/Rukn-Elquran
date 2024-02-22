import React, { useEffect, useState } from 'react'
import { useData } from '../../context/AppContext'
import "./last-sec.css"
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const LastSec = () => {
    const { colors, lastSoras, font, setPageScrollTo } = useData()
    const { t, i18n } = useTranslation()

    return (
        <div className="mainLatSec" style={{ paddingTop: "100px" }}>
            <div className='container mainRec' style={{ position: "relative" }}>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}
                >{t("home.befor")}</h2>
                {lastSoras.length > 0 ?
                    <div className='lastMainBoxes d-flex align-items-center'>
                        {lastSoras.slice(-10).reverse().map((sora, index) => (
                            <NavLink
                                key={sora.soraName}
                                onClick={() => setPageScrollTo(sora.PageNow)}
                                to={`${sora.soraName != "اذكار" ?
                                    `/quran/surah/${sora.soraId}`
                                    : "/azkar"}`}
                                className='mainBox'
                                style={{ borderColor: colors.borderColor, color: colors.blackColor }}>
                                <div className='boxHead d-flex justify-content-between align-items-center'>
                                    <span>{sora.soraName}</span>
                                    <span>{sora.soraId}</span>
                                </div>
                                <div className='boxBody' style={{ backgroundColor: colors.navColor }}>
                                    <div style={{ fontFamily: font, fontSize: "2rem" }}>{sora.soraName.split("سُورَةُ")}</div>

                                    <>
                                        {
                                            sora.PageNow != "" ?
                                                <div style={{ fontSize: "17px" }}>
                                                    <span style={{ fontFamily: font }}> {t("home.page")} </span>
                                                    <span> {sora.PageNow}</span>

                                                </div>
                                                :
                                                null
                                        }
                                    </>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    :
                    <div style={{ color: colors.greyColor, fontSize: "20px" }}>{t("home.no_surahs")}</div>
                }
            </div>
        </div>
    )
}