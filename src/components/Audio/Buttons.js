import React, { useEffect, useState, useRef } from 'react'
import './buttons.css'
import { useData } from '../../context/AppContext'
import { useClickAway } from '@uidotdev/usehooks'
import { useLocation } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'
import { useTranslation } from 'react-i18next'

function Button({ play, isPlaying }) {
    const { colors, setServer, reciters, getReciters, soraId, server, setSoraId, lang } = useData()
    const [select, setSelect] = useState(false)
    const [selectReciters, setSelectReciters] = useState(false)
    const [elliBool, setElliBool] = useState(false)
    const [search, setSearch] = useState('')
    const [downLoaded, setDownLoaded] = useState(<i style={{ color: colors.greyColor }} class="fa-solid fa-download"></i>)
    const [loading, setLoading] = useState(false)
    const { t, i18n } = useTranslation()
    useEffect(() => {
        getReciters()
    }, [])

    const { pathname } = useLocation()

    useEffect(() => {
        if (server.includes("https://backup.qurango.net/")) {
            setElliBool(false)
        } else {
            setElliBool(true)
        }

        setDownLoaded(<i style={{ color: colors.greyColor }} class="fa-solid fa-download"></i>)
    }, [server])

    const handleElliClick = () => {
        if (select == false) {
            setSelect(true)
        } else {
            setSelect(false)
        }
    }

    const handleBtnClick = (rec) => {
        setSelect(false)
        setServer(`${rec.moshaf[0].server}${soraId}`)
    }

    const boxRef = useClickAway(() => {
        setSelect(false)
    })

    const box2Ref = useClickAway(() => {
        setSelectReciters(false)
    })

    const handleDownload = async () => {
        try {
            setLoading(true)
            const audioUrl = server;
            const response = await fetch(audioUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `RuknElQuran_${soraId.split(".mp3")[0]}.mp3`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch {

        }
        setLoading(false)
        setDownLoaded(<i style={{ color: colors.mainColor }} class="fa-solid fa-check"></i>)
    }


    return (
        <div className='btn-container'>
            <div
                style={{ background: colors.sidBarColor }}
                ref={box2Ref}
                className={`selectDiv ${selectReciters ? "d-block" : "noo"}`}
            >
                <div className='selectXdiv'>
                    <i style={{ color: colors.blackColor }}
                        onClick={() => setSelectReciters(false)}
                        className="fa-solid fa-xmark mb-4"></i>
                </div>
                <div className='sideBarInput mb-4'>
                    <input
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        placeholder='ابحث عن قارئ'
                        style={{ backgroundColor: colors.searchColor }}
                        type='text' />
                </div>
                {reciters.filter((item) => {
                    return search !== "" ? item.name.toLowerCase().includes(search) : reciters
                }).map(rec => (
                    <button
                        key={rec.id}
                        onClick={() => handleBtnClick(rec)}
                        className='btnnnnn'>
                        <button
                            style={{ borderColor: colors.borderColor, color: colors.blackColor }}>{rec.name}
                        </button>
                        {server == `${rec.moshaf[0].server}${soraId}` ?
                            <i class="fa-solid fa-check"></i> : null
                        }
                    </button>
                ))}
            </div>

            <div
                style={{
                    background: colors.sidBarColor,
                    width: "200px", height: "130px"
                }}
                ref={boxRef}
                className={`selectDiv ${select ? "d-block" : "noo"}`}
            >
                <button
                    disabled={loading}
                    onClick={() => handleDownload()}
                    className=
                    {`btnnnnn 
                    ${lang == "ar" ? "justify-content-end" : "justify-content-start"}
                     ${loading ? "opaaa" : ""}`}>
                    <span
                        style={{ borderColor: colors.borderColor, color: colors.blackColor }}>
                        {t("audio.download")}
                    </span>
                    {!loading
                        ?
                        downLoaded
                        :
                        <MoonLoader
                            color='#0075ff'
                            loading={true}
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    }
                </button>
                <button
                    onClick={() => {
                        setSelectReciters(true)
                        setSelect(false)
                    }}
                    className={`btnnnnn ${lang == "ar" ? "justify-content-end" : "justify-content-start"}`}>
                    <span
                        style={{ borderColor: colors.borderColor, color: colors.blackColor }}>
                        {t("audio.rec_change")}
                    </span>
                </button>
            </div>



            <div className={`ellipsis ${elliBool == true ? "d-block" : "d-none"}`}>
                <i
                    onClick={() => handleElliClick()}
                    className="fa-solid fa-ellipsis">
                </i>
            </div>
            <div className='btnMainDiv'>
                <div onClick={play} className={isPlaying ? 'btn-stop' : 'btn-play'}></div>
            </div>
            <div className='Xdiv'>
                <i
                    onClick={() => {
                        setServer("")
                        setSoraId("")
                    }}
                    className="fa-solid fa-xmark"></i></div>
        </div >
    )
}
export default Button