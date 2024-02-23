import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./rec.css"
import "../sewar/sewar.css"
import landingImg from "../../images/quran-book.jpg"
import { useData } from '../../context/AppContext'
import PulseLoader from "react-spinners/PulseLoader";
import MoonLoader from "react-spinners/MoonLoader";
import { useTranslation } from 'react-i18next'

const Reciter = () => {
    const { colors, setServer, lang, soraId, setSoraId, font, setPlay, fontSize } = useData()
    const { recId } = useParams()
    const [sewarList, setSewarList] = useState([])
    const [sewar, setSewar] = useState([])
    const [newSewar, setNewSewar] = useState([])
    const [reciter, setReciter] = useState([])
    const [search, setSearch] = useState([])
    const [loading, setLoading] = useState(false)
    const { t, i18n } = useTranslation()


    useEffect(() => {
        fetch(`https://mp3quran.net/api/v3/suwar?language=${lang}`)
            .then(res => res.json())
            .then(data => setSewar(data.suwar))
        fetch(`https://www.mp3quran.net/api/v3/reciters?language=${lang}&reciter=${recId}`)
            .then(res => res.json())
            .then(data => setReciter(data.reciters[0]))
        fetch(`https://www.mp3quran.net/api/v3/reciters?language=${lang}&reciter=${recId}`)
            .then(res => res.json())
            .then(data => setSewarList(data.reciters[0].moshaf[0].surah_list.split(',')))
    }, [recId])



    // useEffect(() => {
    //     if (reciter != "") {
    //         setSewarList(reciter.moshaf[0].surah_list.split(','))
    //     }
    // }, [reciter])

    useEffect(() => {
        const newarr = []
        if (sewarList != '') {
            sewarList.map(soraList => {
                sewar?.map(soraName => {
                    if (soraName.id == soraList) {
                        newarr.push(soraName)
                        setNewSewar(newarr)
                    }
                })
            })
        }
    }, [sewarList])

    console.log(sewarList)


    const handlePlay = (sora) => {
        setSoraId(`${(sora.id.toString().padStart(3, 0))}.mp3`)
        setServer(`${reciter.moshaf[0].server}${(sora.id.toString().padStart(3, 0))}.mp3`)
        setPlay(true)
    }

    const handleDownload = async (sora) => {
        try {
            setLoading(true)
            setSoraId(sora.id)
            const audioUrl = `${reciter.moshaf[0].server}${(sora.id.toString().padStart(3, 0))}.mp3`;
            const response = await fetch(audioUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${sora.name}(القارئ ${reciter.name}).mp3`); // Change the filename if needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch {

        }
        setLoading(false)
        setSoraId("")
    }

    return (
        <div className=''>
            <div className='landing' style={{ height: "350px" }}>
                <div className='landing-img'>
                    <img src={landingImg} alt='...' />
                </div>
                <div className='text-center landing-text '>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h2 className={`landingTitle ${lang == "eng" ? "font2" : null}`}
                            style={{ fontFamily: font }}> {reciter.name}</h2>
                    </div>
                    <div className='recDivSearch'>
                        <input
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type='text'
                            className='inpForSearch'
                            placeholder={t("reciters.search_surah_for_reciter")} />
                    </div>
                </div>
            </div>

            <div className='container mainRec'>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>{t("reciters.all_surahs_reciter")}</h2>
                {newSewar.length > 0 ?
                    <div className='sewarBoxes'>
                        {newSewar.filter((item) => {
                            return search !== "" ? item.name.toLowerCase().includes(search) : sewar
                        }).map((sora, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <button
                                    key={index}
                                    onClick={() => handlePlay(sora)}
                                    style={{
                                        backgroundColor: "transparent",
                                        border: `1px solid ${colors.borderColor}`,
                                        width: "100%"
                                    }}
                                    className={`soraBox 
                            ${soraId == `${sora.id.toString().padStart(3, 0)}.mp3` && "soraBoxActiv"}`}
                                >
                                    <div className='soraDet'>
                                        <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }} className='soraNumberDiv'>
                                            <span style={{ color: colors.blackColor }} className='soraNumber'>
                                                {soraId == `${sora.id.toString().padStart(3, 0)}.mp3` ?
                                                    <i className="fa-solid fa-pause"></i>
                                                    :
                                                    <i className="fa-solid fa-play"></i>
                                                }
                                            </span>
                                        </div>
                                        <span style={{ color: colors.blackColor }} >
                                            {`${lang == "ar" ? (index + 1).toLocaleString("ar-SA") : (index + 1)}`}
                                        </span>
                                        <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }}
                                            className='soraName'>
                                            {sora.name}
                                        </span>
                                    </div>

                                </button>
                                {loading && soraId == sora.id ?
                                    <div
                                        className={`ayahsCount btnDownLoadDiv 
                                        ${lang == "ar" ? "downLeft" : "dowmRight"}`}
                                        style={{
                                            color: colors.greyColor,
                                            backgroundColor: "transparent",
                                            border: "none",
                                            left: "15px"
                                        }}>
                                        <MoonLoader
                                            color='#0075ff'
                                            loading={true}
                                            size={30}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                    : <button
                                        className={`ayahsCount btnDownLoadDiv ${loading ? "opaa" : ""}
                                        ${lang == "ar" ? "downLeft" : "downRight"} 
                                        `}
                                        disabled={loading}
                                        onClick={() => handleDownload(sora)}
                                        style={{
                                            color: colors.greyColor,
                                            backgroundColor: "transparent",
                                            border: "none"
                                        }}>
                                        <i className="downLoadBtn fa-solid fa-download"></i>
                                    </button>

                                }

                            </div>
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
        </div >
    )
}

export default Reciter