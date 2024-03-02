import React, { useEffect, useState } from 'react'
import { useData } from '../../context/AppContext'
import '../sewar/sewar.css'
import { useTranslation } from 'react-i18next'

export const Azkar = () => {
    const {
        colors,
        lang,
        font,
        setServer,
        server,
        lastSoras,
        setLastSoras,
        pageScrollTo,
        handlePlusFontSize,
        handleMinusFontSize,
        fontAyahSize,
    } = useData()
    const { t, i18n } = useTranslation()
    const [azkar, setAzkar] = useState([])
    const [scrollY, setScrollY] = useState(0)
    const zekrs = [...document.querySelectorAll('.soraPage')];
    const [pageNow, setPageNow] = useState()
    const [soraName, setSoraName] = useState("اذكار")

    useEffect(() => {
        fetch(`https://www.hisnmuslim.com/api/en/27.json`)
            .then(res => res.json())
            .then(data => setAzkar(data[Object.keys(data)[0]]))
    }, [])

    const handlePlayClick = (audio) => {
        setServer(audio)
    }

    useEffect(() => {
        const index = lastSoras.findIndex((sora) => sora.soraName === soraName)
        if (index !== -1) {
            const updatedProducts = [...lastSoras.slice(0, index), ...lastSoras.slice(index + 1), {
                soraName: soraName,
                soraId: pageNow == undefined ? "1" : pageNow,
                PageNow: pageNow == undefined ? "" : pageNow
            }];
            setLastSoras(updatedProducts)
        } else {
            setLastSoras([...lastSoras, {
                soraName: soraName,
                soraId: pageNow,
                PageNow: pageNow == undefined ? "" : pageNow
            }])
        }
    }, [scrollY])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
            if (zekrs.length == 0) {
                return
            } else {
                zekrs.map(page =>
                (
                    page.offsetTop - 50 <= scrollY &&
                    setPageNow(page?.className.split("soraPage zekr")[1])
                )
                )
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY])


    useEffect(() => {
        window.scrollTo(0, document.querySelector(`.zekr${pageScrollTo}`)?.offsetTop - 50)
    }, [azkar])
    return (
        <div
            className={`Sora`} style={{ marginRight: "0" }}>
            <div className='soraContent'>
                <div className='besmAllah'>
                    <h2
                        style={{ color: colors.blackColor, fontFamily: font }}
                        className={`text-center ${lang == "eng" && "h2Eng"}`}>{t("home.azkar")}</h2>
                </div>

                <>
                    <div>
                        {azkar?.map((zekr, index) => (
                            < div
                                style={{ borderBottom: `1px solid ${colors.borderColor}` }}
                                className={`soraPage zekr${index + 1}`}
                                key={zekr.ID}>
                                <div className='d-flex justify-content-between align-items-center divSettingsSora'>
                                    <div className='audioButton'>
                                        {server !== zekr.AUDIO ?
                                            <button onClick={() => handlePlayClick(zekr.AUDIO)}>
                                                <i className="fa-solid fa-play"></i>  {t("home.play_azkar_btn")}
                                            </button>
                                            :
                                            <button className='audioStop' onClick={() => setServer("")}>
                                                <i className="fa-solid fa-stop"></i>   {t("sora.pause_btn")}
                                            </button>
                                        }
                                    </div>

                                    {index == 0 ?
                                        <div className='d-flex justify-content-between align-items-center plusFontSizeDiv'>
                                            <h5 style={{ color: colors.greyColor, fontSize: "15px", margin: "0" }}>{t("sora.font_size")}</h5>
                                            <button
                                                className={`${fontAyahSize == 1 && "btnDisable"}`}
                                                onClick={() => handleMinusFontSize()}
                                            ><i className="fa-solid fa-minus"></i></button>
                                            <span style={{ color: colors.blackColor }}>{fontAyahSize}</span>
                                            <button
                                                className={`${fontAyahSize == 3 && "btnDisable"}`}
                                                onClick={() => handlePlusFontSize()}
                                            ><i className="fa-solid fa-plus"></i></button>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <p style={{ color: colors.blackColor }}
                                    className=
                                    {`pAyah 
                                        ${lang == "eng" && "ayaheng"} 
                                        fontTo${fontAyahSize}
                                    `}>
                                    <span>
                                        <span

                                            className={`ayahSpan `}>
                                            {lang == "ar" ? zekr.ARABIC_TEXT : zekr.TRANSLATED_TEXT}
                                        </span>
                                    </span>
                                </p>
                                <div style={{ color: colors.blackColor }} className='text-center mt-3'> <span>{(index + 1).toLocaleString("ar-EG")}</span> </div>
                            </div>
                        ))}
                        {/* {Object.keys(pages).map(pageNumber => (
                            
                        ))} */}
                    </div>
                </>
            </div>
        </div >
    )
}
