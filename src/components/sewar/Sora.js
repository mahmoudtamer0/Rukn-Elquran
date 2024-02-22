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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SoraMain = () => {

    let { soraNum } = useParams()
    let { ayahNum } = useParams()
    const {
        getAyahs, ayahs,
        setScrollBool, colors,
        server, setServer,
        setSoraNow,
        sideBarOpen,
        lang, setPlay,
        setLastSoras, lastSoras,
        getReciters, reciters,
        pageScrollTo, font,
        fontAyahSize,
        handlePlusFontSize, handleMinusFontSize,
        pageNow, setPageNow,
        loading
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
    const [scrollY, setScrollY] = useState(0)
    const bts = [...document.querySelectorAll('.tafseerBtn')];
    const ays = [...document.querySelectorAll('.ayahSpan')];
    const pags = [...document.querySelectorAll('.soraPage')];
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


    useEffect(() => {
        ays.map(aya => (
            aya?.className.split("ayahSpan")[2] == ayahNum && (
                setServer(aya.dataset.audio)
            )
        ))
        ays.map(aya => (
            aya?.className.split("ayahSpan")[2] == ayahNum && (
                window.scrollTo(0, document.querySelector(`.ayahSpan${aya?.className.split("ayahSpan")[2]}`)?.offsetTop - 200)
            )
        ))

        if (JSON.parse(localStorage.getItem("mode")) == "light") {
            ays.map(aya => (
                aya?.className.split("ayahSpan")[2] == ayahNum && (
                    document.querySelector(`.ayahSpan${aya?.className.split("ayahSpan")[2]}`).classList.add("ayahClickedLight")
                )
            ))
        } else {
            ays.map(aya => (
                aya?.className.split("ayahSpan")[2] == ayahNum && (
                    document.querySelector(`.ayahSpan${aya?.className.split("ayahSpan")[2]}`).classList.add("ayahClickedDark")
                )
            ))
        }
    }, [reciters])


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
        getAyahs(soraNum)
        setTimeout(() => {
        }, 1000)
        fetch(`https://api.alquran.cloud/v1/surah/${soraNum}/ar.alafasy`)
            .then(res => res.json())
            .then(data => setSoraName(data.data.name))
    }, [soraNum])
    //end getting reciters tafseer and ayahs and the soraName

    useEffect(() => {
        window.scrollTo(0, document.querySelector(`.page${pageScrollTo}`)?.offsetTop - 50)
    }, [pages])


    //start handle the function of sora history
    useEffect(() => {
        setPageNow()
    }, [ayahs])

    useEffect(() => {
        const index = lastSoras.findIndex(sora => sora.soraId == soraNum);
        if (index !== -1) {
            if (pags.length != 0) {
                setPageNow()
                const updatedProducts = [...lastSoras.slice(0, index), ...lastSoras.slice(index + 1), {
                    soraName: soraName,
                    soraId: soraNum,
                    PageNow: pageNow == undefined ? pags[0]?.className.split("soraPage page")[1] : pageNow
                }];
                setLastSoras(updatedProducts)
            }
        } else {
            if (pags.length != 0) {
                setPageNow()
                setLastSoras([...lastSoras, {
                    soraName: soraName,
                    soraId: soraNum,
                    PageNow: pageNow == undefined ? pags[0]?.className.split("soraPage page")[1] : pageNow
                }])
            }
        }
    }, [scrollY])


    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
            if (pags[0]?.offsetTop < scrollY) {
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
            } else {
                setPageNow(pags[0]?.className.split("soraPage page")[1])
            }

        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [scrollY])
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

    const handleCopied = () => {
        toast.success('تم نسخ رابط الايه, يمكنك ارساله لمن تريد', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        bts.map(bt => {
            bt.classList.remove("visible")
            bt.classList.add("hide")
        })
        setTimeout(() => {
            ays.map(bt => {
                bt.classList.remove("ayahClickedDark")
            })
            ays.map(bt => {
                bt.classList.remove("ayahClickedDark")
            })
        }, 4000);
    }
    return (
        <div
            className={`Sora ${!sideBarOpen ? "soraMargin0" : null}`}>
            <SideBar soraNum={soraNum} />
            <div className={`soraContent ${fontAyahSize > 2 && "soraContentW700"}`}>
                <div className='text-center soraMainName'>
                    <h1 style={{ color: colors.blackColor }}> {soraName}</h1>
                </div>
                <div className='besmAllah'>
                    <h2
                        style={{ color: colors.blackColor }}
                        className='text-center'>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h2>
                </div>
                <div className='d-flex justify-content-between align-items-center divSettingsSora'>
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
                    </div>
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
                </div>
                {!loading ?
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

                            <h5 className='divSettingsH' style={{ color: colors.greyColor, fontSize: "15px", marginBottom: "25px" }}>{t("sora.p1")}</h5>
                            {Object.keys(pages).map((pageNumber, index) => (
                                < div
                                    style={{ borderBottom: `1px solid ${colors.borderColor}` }}
                                    className={`soraPage page${pageNumber}`}
                                    key={pageNumber}>
                                    <p style={{ color: colors.blackColor }}
                                        className={`
                                        pAyah 
                                        ${fontAyahSize == 1 && "f30px"}
                                        ${fontAyahSize == 2 && "f35px"} 
                                        ${fontAyahSize == 3 && "f40px"}
                                        `}>
                                        {pages[pageNumber].map((item) => (
                                            <span key={item.numberInSurah}>
                                                <span
                                                    style={{ backgroundColor: colors.navColor }}
                                                    className={`tafseerBtn hide tafseer${item.numberInSurah}`}>
                                                    <button
                                                        style={{
                                                            border: `1px solid ${colors.borderColor}`,
                                                            backgroundColor: colors.navColor,
                                                            color: colors.blackColor
                                                        }}
                                                        className='btnTafseer'
                                                        onClick={() => handleDetailedTafseer(item)}
                                                    >
                                                        <span style={{ fontSize: "15px" }}>{t("sora.tafseer_ayah")}</span>
                                                    </button>
                                                    <button
                                                        style={{
                                                            border: `1px solid ${colors.borderColor}`,
                                                            backgroundColor: colors.navColor,
                                                            color: colors.blackColor
                                                        }}
                                                        className='btnTa48eel'
                                                        onClick={() => handleAyaPlay(item)}
                                                    >
                                                        <i style={{ fontSize: "20px" }} className="fa-solid fa-play"></i>
                                                    </button>
                                                    <CopyToClipboard text={`${window.location.origin}/quran/surah/${soraNum}/ayah/${item.numberInSurah}`}
                                                        onCopy={() => handleCopied()}>
                                                        <button
                                                            style={{
                                                                border: `1px solid ${colors.borderColor}`,
                                                                backgroundColor: colors.navColor,
                                                                color: colors.blackColor
                                                            }}
                                                            className='btnTa48eel'
                                                        >
                                                            <i style={{ fontSize: "20px" }} class="fa-solid fa-share-nodes"></i>
                                                        </button>
                                                    </CopyToClipboard>
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
                                                    data-audio={item.audio}
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
                                to={`/quran/surah/${+soraNum - 1}`}
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
                                    to={`/quran/surah/${+soraNum + 1}`}
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

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div >
    )
}

export default SoraMain