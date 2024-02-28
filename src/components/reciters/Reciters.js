import React, { useEffect, useRef, useState } from 'react'
import { useData } from '../../context/AppContext';
import landingImg from '../../images/quran-book.jpg'
import "./rec.css"
import "../sewar/sewar.css"
import { NavLink } from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader";
import { useTranslation } from 'react-i18next';
import LandingSection from '../LandingSection';
const Reciters = () => {

    const {
        reciters, getReciters,
        colors, font, fontSize,
        lang
    } = useData()
    const [search, setSearch] = useState('')
    const { t, i18n } = useTranslation()

    useEffect(() => {
        getReciters()
    }, [])


    return (
        <div>
            <LandingSection setSearch={setSearch} name={t("reciters.all_reciters")} searchFor={t("reciters.search_for_reciter")} />
            <div className='container mainRec'>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>{t("reciters.all_reciters")}</h2>
                {reciters.length > 0 ?
                    <div className='sewarBoxes justify-content-between align-items-center'>
                        {reciters.filter((item) => {
                            return search !== "" ? item.name.toLowerCase().includes(search) : reciters
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
                                        <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }} className='soraName'>{rec.name}</span>
                                    </div>
                                </NavLink>
                            )
                        })}
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
        </div >

    )
}
export default Reciters;