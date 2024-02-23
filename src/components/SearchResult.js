import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useData } from '../context/AppContext'
import "./sewar/sewar.css"
import './landing/landing.css'

import { useTranslation } from 'react-i18next'
import PulseLoader from "react-spinners/PulseLoader";
const SearchResult = () => {
    const { colors, font, fontSize, setPageScrollTo, lang, searchResults, getReciters, reciters } = useData()
    const { t, i18n } = useTranslation()
    const [sewar, setSewar] = useState([])
    const [search, setSearch] = useState("")

    const handleClick = () => {
        setPageScrollTo(0)
    }

    const { radio, getRadio, setServer, server, setSearchResults, setLoadingForSearch } = useData()

    const handlePlay = (radio) => {
        setServer(`${radio.url}`)
    }

    const getData = async () => {
        try {
            setLoadingForSearch(true)
            getRadio()
            fetch(`https://mp3quran.net/api/v3/suwar?language=${lang}`)
                .then(res => res.json())
                .then(data => setSewar(data.suwar))
            getReciters()
        } catch { }
        setLoadingForSearch(false)
    }

    useEffect(() => {
        getData()
    }, [searchResults])

    const handlesubmit = (e) => {
        e.preventDefault()
        if (search != '') {
            setSearchResults(search)
        }
    }
    return (
        <div className='mainRec' style={{ minHeight: "65vh", paddingTop: "100px" }}>
            <div className='container'>
                <div className='searchInputDiv' style={{ position: "relative" }}>
                    <form onSubmit={handlesubmit}>
                        <input
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            style={{ backgroundColor: colors.searchColor, color: colors.black }}
                            type='text'
                            className='inpForSearch'
                            placeholder={t("landing.search")} />
                        <i onClick={handlesubmit} className={`${lang == "eng" ? "rightI" : "leftI"} fa-solid fa-magnifying-glass`}></i>
                    </form>
                </div>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", margin: "50px 0" }}>
                    {t("sora.searchResults")} "{searchResults}"
                </h2>
                {sewar.length > 0 ?
                    <div className='sewarBoxes row justify-content-between align-items-center'>
                        {sewar?.filter((item) => {
                            return searchResults !== "" ? item.name.toLowerCase().includes(searchResults) : sewar
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
                                            {lang == "ar" ?
                                                <span style={{ color: colors.blackColor }} className='soraNumber '>
                                                    {sora.number != undefined && sora.number.toLocaleString('ar-EG') || sora.id.toLocaleString('ar-EG')}
                                                </span>
                                                :
                                                <span style={{ color: colors.blackColor }} className='soraNumber '>
                                                    {sora.number != undefined && sora.number || sora.id}
                                                </span>
                                            }
                                        </div>
                                        <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }} className='soraName'>  {t("home.surah")} {sora.name}</span>
                                    </div>
                                    {sora.numberOfAyahs != undefined &&
                                        <div className='ayahsCount' style={{ color: colors.greyColor }}>
                                            {sora.numberOfAyahs != undefined && sora.numberOfAyahs.toLocaleString('ar-EG')}  آيات</div>
                                    }
                                </NavLink>
                            )
                        })}
                        {reciters?.filter((item) => {
                            return searchResults !== "" ? item.name.toLowerCase().includes(searchResults) : reciters
                        }).map((rec, index) => {
                            return (
                                <NavLink
                                    key={index}
                                    to={`/reciters/${rec.id}`}
                                    style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                    className="soraBox d-flex justify-content-between align-items-center"
                                >
                                    <div className='soraDet'>
                                        <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }} className='soraNumberDiv'>
                                            <span style={{ color: colors.blackColor }} className='soraNumber'>{lang == "ar" ? (index + 1).toLocaleString("ar-SA") : (index + 1)}</span>
                                        </div>
                                        <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }} className='soraName'>{t("reciters.reciter")} {rec.name}</span>
                                    </div>
                                </NavLink>
                            )
                        })}
                        {radio?.filter((item) => {
                            return searchResults !== "" ? item.name.toLowerCase().includes(searchResults) : radio
                        }).map((radio, index) => (
                            <button
                                key={radio.id}
                                onClick={() => handlePlay(radio)}
                                style={{ backgroundColor: "transparent", border: `1px solid ${colors.borderColor}` }}
                                className={`soraBox d-flex align-items-center
                            ${server == radio.url && "soraBoxActiv"}`}
                            >
                                <div className='soraDet'>
                                    <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }} className='soraNumberDiv'>
                                        <span style={{ color: colors.blackColor }} className='soraNumber'>
                                            {server == radio.url ?
                                                <i className="fa-solid fa-pause"></i>
                                                :
                                                <i className="fa-solid fa-play"></i>
                                            }
                                        </span>
                                    </div>
                                    <span style={{ color: colors.blackColor }} >
                                        {lang == "ar" ? (index + 1).toLocaleString("ar-SA") : (index + 1)}
                                    </span>
                                    <span style={{ color: colors.blackColor, fontSize: fontSize, fontFamily: font }} className='soraName'>{radio.name}</span>
                                </div>

                            </button>
                        ))}
                    </div>
                    :
                    <div className='loaderDivSora'>
                        <PulseLoader
                            color='#0075ff'
                            loading={true}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                }

            </div>
        </div>
    )
}

export default SearchResult