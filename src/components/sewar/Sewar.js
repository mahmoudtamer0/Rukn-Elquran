import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useData } from '../../context/AppContext'
import "./sewar.css"
import landingImg from '../../images/quran-book.jpg'
import { useTranslation } from 'react-i18next'
import LandingSection from '../LandingSection'

const Sewar = ({ sewarLength }) => {
    const { colors, setSideBarOpen, font, fontSize, setPageScrollTo, lang } = useData()
    const [search, setSearch] = useState('')
    const [sewar, setSewar] = useState([])
    const { t, i18n } = useTranslation()

    const getSewar = () => {
        fetch(`https://mp3quran.net/api/v3/suwar?language=${lang}`)
            .then(res => res.json())
            .then(data => setSewar(data.suwar))
    }

    useEffect(() => {
        getSewar()
    }, [])
    const handleClick = () => {
        setSideBarOpen(true)
        setPageScrollTo(0)
    }

    return (
        <div>
            <LandingSection setSearch={setSearch} name={t("home.all_surahs")} searchFor={t("home.search_for_surah")} />
            <div className='mainRec'>
                <div className='container'>
                    <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "20px" }}>{t("navBar.sewar")}</h2>
                    <div className='sewarBoxes row justify-content-between align-items-center'>
                        {sewar?.filter((item) => {
                            return search !== "" ? item.name.toLowerCase().includes(search) : sewar
                        }).map(sora => {
                            return (
                                <NavLink
                                    key={sora.number}
                                    onClick={() => handleClick()}
                                    to={`/quran/surah/${sora.number || sora.id}`}
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
                </div>
            </div>
        </div>
    )
}

export default Sewar;