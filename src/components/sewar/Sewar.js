import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useData } from '../../context/AppContext'
import "./sewar.css"
import landingImg from '../../images/quran-book.jpg'
import { useTranslation } from 'react-i18next'

const Sewar = () => {
    const { sewar, getSewar, colors, setSideBarOpen, font, fontSize, setPageScrollTo, lang } = useData()
    const [search, setSearch] = useState('')
    const { t, i18n } = useTranslation()

    useEffect(() => {
        getSewar()
    }, [])

    const handleClick = () => {
        setSideBarOpen(true)
        setPageScrollTo(0)
    }

    return (
        <div>
            <div className='landing' style={{ height: "350px" }}>
                <div className='landing-img'>
                    <img src={landingImg} alt='...' />
                </div>
                <div className='text-center landing-text '>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h2 style={{ fontFamily: font, }}
                            className={`landingTitle ${lang == "eng" ? "font2" : null}`}>
                            {t("home.all_surahs")}
                        </h2>
                    </div>
                    <div className='recDivSearch'>
                        <input
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type='text'
                            placeholder={t("home.search_for_surah")} />
                    </div>
                </div>
            </div>

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