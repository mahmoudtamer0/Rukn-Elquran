import React from 'react'
import { useState, useEffect } from 'react';
import landingImg from "../images/quran-book.jpg"
import { useData } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

const Radio = () => {

    const { radio, getRadio, colors, setServer, server, font, fontSize, lang } = useData()
    const [search, setSearch] = useState([])
    const [soraId, setSoraId] = useState()
    const { t, i18n } = useTranslation()

    useEffect(() => {
        getRadio()
    }, [])

    const handlePlay = (radio) => {
        setServer(`${radio.url}`)
    }

    return (
        <div>
            <div className='landing' style={{ height: "350px" }}>
                <div className='landing-img'>
                    <img src={landingImg} alt='..' />
                </div>
                <div className='text-center landing-text '>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h2
                            style={{ fontFamily: font, }}
                            className={`landingTitle ${lang == "eng" ? "font2" : null}`}>{t("radio.quran_radios")}</h2>
                    </div>
                    <div className='recDivSearch'>
                        <input
                            className='inpForSearch'
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type='text'
                            placeholder={t("radio.search_for_quran_radios")} />
                    </div>
                </div>
            </div>

            <div className='container mainRec'>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>{t("radio.all_radios")}</h2>
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
            </div>
        </div>
    )
}

export default Radio