import React from 'react'
import { useState, useEffect } from 'react';
import landingImg from "../images/quran-book.jpg"
import { useData } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import PulseLoader from "react-spinners/PulseLoader";
import LandingSection from './LandingSection';

const Radio = () => {

    const { radio, getRadio, colors, setServer, server, font, fontSize, lang } = useData()
    const [search, setSearch] = useState([])
    const { t, i18n } = useTranslation()

    useEffect(() => {
        getRadio()
    }, [])

    const handlePlay = (radio) => {
        setServer(`${radio.url}`)
    }

    return (
        <div>
            <LandingSection setSearch={setSearch} name={t("radio.quran_radios")} searchFor={t("radio.search_for_quran_radios")} />

            <div className='container mainRec'>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>{t("radio.all_radios")}</h2>
                {radio?.length > 0 ?
                    <div className='sewarBoxes '>
                        {radio?.filter((item) => {
                            return search !== "" ? item.name.toLowerCase().includes(search) : radio
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

export default Radio