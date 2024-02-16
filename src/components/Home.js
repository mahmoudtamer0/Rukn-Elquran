import React from 'react'
import { LastSec } from "./lastsection/LastSec";
import Landing from "./landing/Landing";
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useData } from '../context/AppContext'
import "./sewar/sewar.css"
import DateToday from './date/DateToday';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t, i18n } = useTranslation()
    const { sewar, getSewar,
        colors, setSideBarOpen,
        font, fontSize,
        reciters, getReciters, lang, mode, setPageScrollTo } = useData()

    useEffect(() => {
        getReciters()
        getSewar()
    }, [])

    const handleClick = () => {
        setSideBarOpen(true)
        setPageScrollTo(0)
    }

    return (
        <div>
            <Landing />
            <LastSec />

            <DateToday />

            <div className='Sewar' style={{ paddingTop: "65px" }}>
                <div className='container'>
                    <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>{t("navBar.sewar")}</h2>
                    <div className='sewarBoxes row justify-content-between align-items-center'>
                        {sewar?.slice(0, 9).map(sora => {
                            return (
                                <NavLink
                                    key={sora.number}
                                    onClick={() => handleClick()}
                                    to={`/Rukn-Elquran/sewar/${sora.number || sora.id}`}
                                    style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                    className='soraBox d-flex justify-content-between align-items-center'>
                                    <div className='soraDet'>
                                        <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }}
                                            className='soraNumberDiv soraNumSpecial'>
                                            <span style={{ color: colors.blackColor }} className='soraNumber '>
                                                {sora.number != undefined && sora.number.toLocaleString('ar-EG') || sora.id}
                                            </span>
                                        </div>
                                        <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }} className='soraName'>{sora.name.split("سُورَةُ ")}</span>
                                    </div>
                                    {sora.numberOfAyahs != undefined &&
                                        <div className='ayahsCount' style={{ color: colors.greyColor }}>
                                            {sora.numberOfAyahs != undefined && sora.numberOfAyahs.toLocaleString('ar-EG')}  آيات</div>
                                    }
                                </NavLink>
                            )
                        })}
                    </div>
                    <div className='mt-5 text-center linkForMore'>
                        <NavLink
                            to={`/Rukn-Elquran/sewar`}
                            className={mode == "dark?" ? "dark" : "light"}
                            style={{ color: colors.mainColor }}
                        >{t("home.more_surahs")}
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className='container mainRec'>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>{t("navBar.reciters")}</h2>

                <div className='sewarBoxes justify-content-between align-items-center'>
                    {reciters.slice(0, 9).map((rec, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={`/Rukn-Elquran/reciters/${rec.id}`}
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className="soraBox d-flex justify-content-between align-items-center"
                            >
                                <div className='soraDet'>
                                    <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }} className='soraNumberDiv'>
                                        <span style={{ color: colors.blackColor }} className='soraNumber'>{lang == "ar" ? (index + 1).toLocaleString("ar-SA") : (index + 1)}</span>
                                    </div>
                                    <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }} className='soraName'>{rec.name}</span>
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
                <div className='mt-5 text-center linkForMore'>
                    <NavLink
                        to={`/Rukn-Elquran/reciters`}
                        className={mode == "dark?" ? "dark" : "light"}
                        style={{ color: colors.mainColor }}
                    >{t("home.more_reciters")}
                    </NavLink>
                </div>
            </div>

        </div>
    )
}

export default Home