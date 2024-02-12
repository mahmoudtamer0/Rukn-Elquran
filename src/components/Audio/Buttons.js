import React, { useEffect, useState, useRef } from 'react'
import './buttons.css'
import { useData } from '../../context/AppContext'
import { useClickAway } from '@uidotdev/usehooks'
import { useLocation } from 'react-router-dom'

function Button({ play, isPlaying }) {
    const { colors, setServer, reciters, getReciters, soraId, server, setSoraId } = useData()
    const [select, setSelect] = useState(false)
    const [elliBool, setElliBool] = useState(false)
    const [search, setSearch] = useState('')
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

    return (
        <div className='btn-container'>
            <div
                style={{ background: colors.sidBarColor }}
                ref={boxRef}
                className={`selectDiv ${select ? "d-block" : "noo"}`}
            >
                <div className='selectXdiv'>
                    <i style={{ color: colors.blackColor }}
                        onClick={() => setSelect(false)}
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