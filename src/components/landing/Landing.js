import { Link } from 'react-router-dom';
import landingLogo from '../../images/quran-mazid-hero-calio.png'
import landingImg from '../../images/quran-book.jpg'
import './landing.css'
import { useData } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";

function Landing() {

    const { colors, reciters, getReciters, lang } = useData()
    const [search, setSearch] = useState("")
    const [sewar, setSewar] = useState([])
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        getReciters()
        fetch(`https://mp3quran.net/api/v3/suwar?language=${lang}`)
            .then(res => res.json())
            .then(data => setSewar(data.suwar))
    }, [])

    const handleClose = () => {
        document.querySelector(".searchBox").classList.add("hide")
        document.querySelector(".searchBox").classList.remove("visibleSearchBox")
    }

    useEffect(() => {
        if (focused) {
            document.querySelector(".searchBox").classList.remove("hide")
            document.querySelector(".searchBox").classList.add("visibleSearchBox")
        } else {
            document.querySelector(".searchBox").classList.add("hide")
            document.querySelector(".searchBox").classList.remove("visibleSearchBox")
        }
    }, [focused])

    useEffect(() => {
        if (search == "") {
            handleClose()
        } else {
            document.querySelector(".searchBox").classList.remove("hide")
            document.querySelector(".searchBox").classList.add("visibleSearchBox")
        }
    }, [search])

    const boxRef = useClickAway(() => {
        handleClose()
    })

    return (
        <div className='landing'>
            <div className='landing-img'>
                <img src={landingImg} />
            </div>
            <div className='text-center landing-text '>
                <div className='d-flex align-items-center justify-content-center'>
                    <img style={{ width: "65px" }} src={landingLogo} alt='..' />
                    <h2 className='landingTitle'> ركن القرآن</h2>
                </div>
                <div className='landDesc'>
                    <p style={{ margin: "0", color: "#dbdbdb", maxWidth: "100%" }}>موقع لقراءة و تلاوة و تفسير القران الكريم</p>
                    <p style={{ maxWidth: "100%", margin: "0", marginTop: "20px", marginBottom: "20px", color: "#dbdbdb" }}>اكتشف أناقة القرآن الرائعة - تعمق في الآيات العميقة والحكمة الخالدة للقرآن، مصدر الإلهام والإرشاد للجميع.</p>
                </div>
                <div className='inpDiv'>
                    <div className='inpMainDiv'>
                        <div className='searchInputDiv' style={{ position: "relative" }}>
                            <input
                                onBlur={() => {
                                    setTimeout(() => {
                                        setFocused(false)
                                    }, 300);
                                }}
                                onFocus={() => setFocused(true)}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ backgroundColor: colors.searchColor, color: colors.black }}
                                type='text'
                                placeholder='ماذا تريد ان تقرا او تسمع؟ ' />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className='fastLinksDiv text-end mt-3 '>
                            {/* <p style={{ width: "fit-content" }}>لينكات سريعة: </p> */}
                            <div className='fastLinks'>
                                <Link to={`/Rukn-Elquran/sewar/1`}>الفاتحة</Link>
                                <Link to={`/Rukn-Elquran/sewar/2`}>البقرة</Link>
                                <Link to={`/Rukn-Elquran/reciters/107`}>مشاري العفاسي</Link>
                                <Link to={`/Rukn-Elquran/reciters/105`}>محمود خليل الحصري</Link>
                            </div>

                        </div>
                        <div ref={boxRef} style={{ borderColor: colors.borderColor }} className='searchBox text-end hide'>
                            <div className='mb-3'>
                                <p style={{ color: colors.greyColor, margin: "0" }}>السور :</p>
                                {
                                    sewar.filter((item) => {
                                        return item.name.includes(search) ? search : null
                                    }).map(link => {
                                        return (
                                            <Link
                                                key={link.id}
                                                to={`/Rukn-Elquran/sewar/${link.id}`}
                                                className='searchMainLink'>
                                                <span>{link.name}</span>
                                                <i className="fa-solid fa-arrow-left"></i>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            <hr></hr>
                            <div>
                                <p style={{ color: colors.greyColor, margin: "0" }}>القراء :</p>
                                {
                                    reciters.filter((item) => {
                                        return item.name.includes(search) ? search : null
                                    }).map(link => {
                                        return (
                                            <Link
                                                key={link.id}
                                                to={`/Rukn-Elquran/reciters/${link.id}`}
                                                className='searchMainLink'>
                                                <span>{link.name}</span>
                                                <i className="fa-solid fa-arrow-left"></i>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Landing;