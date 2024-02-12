import React, { useEffect, useRef, useState } from 'react'
import { useData } from '../../context/AppContext';
import landingImg from '../../images/quran-book.jpg'
import "./rec.css"
import "../sewar/sewar.css"
import { Link, NavLink } from 'react-router-dom';
const Reciters = () => {

    const {
        sewar, getSewar,
        reciters, getReciters,
        setServer, setSoraId, colors, font, fontSize
    } = useData()
    const [sewarList, setSewarList] = useState([])
    const [newSewar, setNewSewar] = useState([])
    const [search, setSearch] = useState('')

    const [numberOfRec, setNumberOfRec] = useState(20)

    useEffect(() => {
        getSewar()
        getReciters()
    }, [])


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


    const handleSoraClick = (sora) => {
        const padSora = sora.padStart(3, '0')
        setSoraId(padSora)
    }




    return (
        <div>
            <div className='landing' style={{ height: "350px" }}>
                <div className='landing-img'>
                    <img src={landingImg} />
                </div>
                <div className='text-center landing-text '>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h2 className='landingTitle'>قراء القرأن</h2>
                    </div>
                    <div className='recDivSearch'>
                        <input
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type='text'
                            placeholder='ابحث عن القارئ' />
                    </div>
                </div>
            </div>

            <div className='container mainRec'>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>جميع القراء</h2>
                <div className='sewarBoxes justify-content-between align-items-center'>
                    {reciters.filter((item) => {
                        return search !== "" ? item.name.toLowerCase().includes(search) : reciters
                    }).map((rec, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={`/Rukn-Elquran/reciters/${rec.id}`}
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className="soraBox d-flex justify-content-between align-items-center"
                            >
                                <div className='soraDet'>
                                    <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }} className='soraNumberDiv'>
                                        <span style={{ color: colors.blackColor }} className='soraNumber'>{(index + 1).toLocaleString('ar-EG')}</span>
                                    </div>
                                    <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }} className='soraName'>{rec.name}</span>
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div >

    )
}
export default Reciters;