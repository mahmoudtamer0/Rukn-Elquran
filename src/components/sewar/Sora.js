import React, { useEffect, useRef, useState, useTransition } from 'react'
import { Link, useParams, NavLink } from 'react-router-dom'
import { useData } from '../../context/AppContext'
import './sewar.css'
import './sewar.css'
import { useLocation } from 'react-router-dom'
import { useClickAway } from "@uidotdev/usehooks";
import SideBar from './SideBar'
import MoonLoader from "react-spinners/MoonLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { useTranslation } from 'react-i18next'

const SoraMain = () => {

    let { soraNum } = useParams()
    const {
        getAyahs, ayahs,
        setScrollBool, colors,
        server, setServer,
        setSoraNow,
        sideBarOpen,
        lang, setPlay,
        setLastSoras, lastSoras,
        getReciters, reciters,
        pageScrollTo, font
    } = useData()

    const spanref = useRef(null)
    const [pages, setPages] = useState({})
    const [soraName, setSoraName] = useState('')
    const [audioBool, setAudioBool] = useState(false)
    const [tafseer, setTafseer] = useState([])
    const [tafseerBoxBool, setTafseerBoxBool] = useState(false)
    const [ayahInTafseer, setAyahInTafseer] = useState('')
    const [theTafseer, setTheTafseer] = useState('')
    const history = useLocation();
    const [pageNow, setPageNow] = useState()
    const [scrollY, setScrollY] = useState(0)
    const bts = [...document.querySelectorAll('.tafseerBtn')];
    const ays = [...document.querySelectorAll('.ayahSpan')];
    const pags = [...document.querySelectorAll('.soraPage')];
    const [firstPageNumber, setFirstPageNumber] = useState(0)
    const { t, i18n } = useTranslation()


    // start handling tafseer function

    const getTafseer = () => {
        if (lang == "ar") {
            fetch(`https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${soraNum}`)
                .then(res => res.json())
                .then(data => setTafseer(data.result))
        } else {
            fetch(`https://quranenc.com/api/v1/translation/sura/english_saheeh/${soraNum}`)
                .then(res => res.json())
                .then(data => setTafseer(data.result))
        }

    }

    const handleTafseer = (ayah) => {
        bts.map(bt => {
            bt.classList.remove("visible")
            bt.classList.add("hide")
        })
        ays.map(bt => {
            bt.classList.remove("ayahClickedDark")
        })
        ays.map(bt => {
            bt.classList.remove("ayahClickedLight")
        })

        if (JSON.parse(localStorage.getItem("mode")) == "light") {
            document.querySelector(`.ayahSpan${ayah.numberInSurah}`)?.classList.add("ayahClickedLight")

        } else {
            document.querySelector(`.ayahSpan${ayah.numberInSurah}`)?.classList.add("ayahClickedDark")
        }


        let filter = tafseer?.filter(item => item.aya == ayah.numberInSurah)
        setAyahInTafseer(filter[0].arabic_text)
        setTheTafseer(filter[0].translation)
        document.querySelector(`.tafseer${ayah.numberInSurah}`)?.classList.remove("hide")
        document.querySelector(`.tafseer${ayah.numberInSurah}`)?.classList.add("visible")
    }

    const handleTafseerClose = (ayahNum) => {
        document.querySelector(`.tafseer${ayahNum}`).classList.remove("visible")
        document.querySelector(`.tafseer${ayahNum}`).classList.add("hide")
        document.querySelector(`.ayahSpan${ayahNum}`)?.classList.remove("ayahClicked")
        ays.map(bt => {
            bt.classList.remove("ayahClickedDark")
        })
        ays.map(bt => {
            bt.classList.remove("ayahClickedLight")
        })
    }

    const handleDetailedTafseer = (ayah) => {
        setTafseerBoxBool(true)
        ays.map(bt => {
            bt.classList.remove("ayahClickedDark")
        })
        ays.map(bt => {
            bt.classList.remove("ayahClickedLight")
        })
    }

    const handleTafseerBoxClose = () => {
        bts.map(bt => {
            bt.classList.remove("visible")
            bt.classList.add("hide")
        })
        ays.map(bt => {
            bt.classList.remove("ayahClickedDark")
        })
        ays.map(bt => {
            bt.classList.remove("ayahClickedDark")
        })
        setTafseerBoxBool(false)
    }

    const boxRef = useClickAway(() => {
        setTafseerBoxBool(false)
    });

    // end handling tafseer function

    // start handling single ayah play
    const handleAyaPlay = (ayah) => {
        bts.map(bt => {
            bt.classList.remove("visible")
            bt.classList.add("hide")
        })
        setServer(ayah.audio)
    }
    // end handling single ayah play

    // start handling the sora play
    const handlePlayClick = () => {
        setServer(`${reciters[0]?.moshaf[0]?.server}${soraNum.padStart(3, 0)}.mp3`)
        setPlay(true)
    }

    const handlePauseClick = () => {
        setServer("")
    }
    // start handling the sora play

    // start style for single ayah on hover
    const handleMouseOver = (e) => {
        if (JSON.parse(localStorage.getItem("mode")) == "light") {
            e.target.classList.add("hoverAyahLight")
        } else {
            e.target.classList.add("hoverAyahDark")
        }
    }
    const handleMouseOut = (e) => {
        e.target.classList.remove("hoverAyahLight")
        e.target.classList.remove("hoverAyahDark")
    }
    // end style for single ayah on hover

    //start getting reciters tafseer and ayahs and the soraName
    useEffect(() => {
        getReciters()
        getTafseer()
        setTimeout(() => {
            getAyahs(soraNum)
        }, 1000)
        fetch(`https://api.alquran.cloud/v1/surah/${soraNum}/ar.alafasy`)
            .then(res => res.json())
            .then(data => setSoraName(data.data.name))
    }, [])
    //end getting reciters tafseer and ayahs and the soraName

    useEffect(() => {
        window.scrollTo(0, document.querySelector(`.page${pageScrollTo}`)?.offsetTop - 50)
    }, [ayahs])


    //start handle the function of sora history
    useEffect(() => {
        setFirstPageNumber(pags[0]?.className.split("soraPage page")[1])
    }, [pages])

    useEffect(() => {
        const index = lastSoras.findIndex(sora => sora.soraId == soraNum);
        if (soraName != "") {
            if (index !== -1) {
                const updatedProducts = [...lastSoras.slice(0, index), ...lastSoras.slice(index + 1), {
                    soraName: soraName,
                    soraId: soraNum,
                    firstPageNumber: firstPageNumber || 0,
                    PageNow: pageNow
                }];
                setLastSoras(updatedProducts)
            } else {
                setLastSoras([...lastSoras, {
                    firstPageNumber: firstPageNumber,
                    soraName: soraName,
                    soraId: soraNum,
                    PageNow: pageNow
                }])
            }
        }
    }, [reciters, scrollY])


    //end handle the function of sora history

    useEffect(() => {
        if (tafseerBoxBool == false) {
            bts.map(bt => {
                bt.classList.remove("visible")
                bt.classList.add("hide")
            })

            ays.map(bt => {
                bt.classList.remove("ayahClickedDark")
            })
            ays.map(bt => {
                bt.classList.remove("ayahClickedDark")
            })
        } else return
    }, [tafseerBoxBool])

    useEffect(() => {
        if (server.includes(`${soraNum.padStart(3, 0)}.mp3`)) {
            setAudioBool(false)
        } else {
            setAudioBool(true)
        }
    }, [server])

    useEffect(() => {
        setScrollBool(true)
    }, [history])

    useEffect(() => {
        // Group data by page number
        const groupedPages = {};
        ayahs.forEach(item => {
            const { page } = item;
            if (!groupedPages[page]) {
                groupedPages[page] = [];
            }
            groupedPages[page].push(item);
        });
        setPages(groupedPages);
        setSoraNow(soraName)
    }, [ayahs]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
            if (pags.length == 0) {
                return
            } else {
                pags.map(page =>
                (
                    page.offsetTop - 50 <= scrollY &&
                    setPageNow(page?.className.split("soraPage page")[1])
                )
                )
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY])


    return (
        <div
            className={`Sora ${!sideBarOpen ? "soraMargin0" : null}`}>
            <SideBar soraNum={soraNum} />
            <div className='soraContent'>
                <div className='text-center soraMainName'>
                    <h1 style={{ color: colors.blackColor }}> {soraName}</h1>
                </div>
                <div className='besmAllah'>
                    <h2
                        style={{ color: colors.blackColor }}
                        className='text-center'>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h2>
                </div>
                {ayahs.length > 0 ?
                    <>
                        <div
                            style={{
                                backgroundColor: colors.navColor
                            }}
                            ref={boxRef} className={tafseerBoxBool ? "tafseerBox boxVisible" : "tafseerBox"}>
                            <div className='tafseerBoxCloseBtn'>
                                <button
                                    style={{
                                        color: colors.blackColor
                                    }}
                                    onClick={() => {
                                        handleTafseerBoxClose()
                                    }
                                    }><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <div className='boxContent'>
                                <div className='boxAyah'>{ayahInTafseer}</div>
                                <hr
                                    style={{
                                        color: colors.blackColor
                                    }}
                                ></hr>
                                <div
                                    style={{
                                        color: colors.blackColor
                                    }}
                                    className='boxTafseer'>{theTafseer}</div>
                            </div>
                        </div>
                        <div>
                            <div className='audioButton'>
                                {reciters.length > 0 ?
                                    <>
                                        {audioBool ?
                                            <>
                                                <button onClick={() => handlePlayClick()}>
                                                    <i className="fa-solid fa-play"></i>  {t("sora.play_btn")}
                                                </button>
                                            </>
                                            : <>
                                                <button className='audioStop' onClick={() => handlePauseClick()}>
                                                    <i className="fa-solid fa-stop"></i>   {t("sora.pause_btn")}
                                                </button>
                                            </>}
                                    </> : <div className='mb-5' style={{ padding: "0 10px" }}>
                                        <MoonLoader
                                            color='#0075ff'
                                            loading={true}
                                            size={30}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                }
                                <h5 style={{ color: colors.greyColor, fontSize: "15px", marginBottom: "25px" }}>{t("sora.p1")}</h5>
                            </div>
                            {Object.keys(pages).map((pageNumber, index) => (
                                < div
                                    style={{ borderBottom: `1px solid ${colors.borderColor}` }}
                                    className={`soraPage page${pageNumber}`}
                                    key={pageNumber}>
                                    <p style={{ color: colors.blackColor }} className='pAyah'>
                                        {pages[pageNumber].map((item) => (
                                            <span key={item.numberInSurah}>
                                                <span
                                                    className={`tafseerBtn hide tafseer${item.numberInSurah}`}>
                                                    <button
                                                        className='btnTafseer'
                                                        onClick={() => handleDetailedTafseer(item)}
                                                    >
                                                        <span style={{ fontSize: "15px", fontFamily: font }}>{t("sora.tafseer_ayah")}</span>
                                                    </button>
                                                    <button
                                                        className='btnTa48eel'
                                                        onClick={() => handleAyaPlay(item)}
                                                    >
                                                        <i style={{ fontSize: "20px" }} className="fa-solid fa-play"></i>
                                                        <span style={{ fontSize: "13px", fontFamily: font }}>{t("sora.ta48eel_ayah")}</span>
                                                    </button>
                                                    <i
                                                        className="fa-solid fa-circle-xmark ii"
                                                        onClick={() => handleTafseerClose(item.numberInSurah)}
                                                    >
                                                    </i>
                                                </span>
                                                <span
                                                    ref={spanref}
                                                    onMouseOut={(e) => handleMouseOut(e)}
                                                    onMouseOver={(e) => handleMouseOver(e)}
                                                    onClick={() => handleTafseer(item)}
                                                    className={`ayahSpan ayahSpan${item.numberInSurah}`}>
                                                    {item.text.includes("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ") ?
                                                        item.text.split("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ").toString()
                                                        : item.text}
                                                    <span style={{ margin: "7px" }}>{item.numberInSurah.toLocaleString('ar-EG')}</span>
                                                </span>
                                            </span>
                                        ))}
                                    </p>
                                    <div style={{ color: colors.blackColor }} className='text-center mt-3'> <span>
                                        {lang == "ar" ?
                                            (pageNumber.toString()).toLocaleString('ar-EG')
                                            :
                                            pageNumber
                                        }
                                    </span> </div>
                                </div>
                            ))}
                        </div>
                        <div className='text-center nextButtons'>
                            {+soraNum > 1 && <Link
                                to={`/Rukn-Elquran/sewar/${+soraNum - 1}`}
                                onClick={() => history?.push(`${+soraNum - 1}`)}
                                style={{ color: "white", backgroundColor: colors.mainColor }}>
                                {lang == "ar" ?
                                    <i className="fa-solid fa-chevron-right"></i>
                                    :
                                    <i className="fa-solid fa-chevron-left"></i>
                                }
                                <span style={{ marginRight: "10px" }}>
                                    {t("sora.previous_surah")}
                                </span>
                            </Link>}
                            {+soraNum <= 113 &&
                                < Link
                                    to={`/Rukn-Elquran/sewar/${+soraNum + 1}`}
                                    onClick={() => history?.push(`${+soraNum + 1}`)}
                                    style={{ color: "white", backgroundColor: colors.mainColor }}>
                                    <span style={{ marginLeft: "10px" }}>
                                        {t("sora.next_surah")}
                                    </span>
                                    {lang == "ar" ?
                                        <i className="fa-solid fa-chevron-left"></i>
                                        :
                                        <i className="fa-solid fa-chevron-right"></i>
                                    }

                                </Link>}

                        </div>
                    </>
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

export default SoraMain