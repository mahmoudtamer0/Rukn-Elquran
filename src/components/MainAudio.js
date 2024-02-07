import React, { useEffect, useRef, useState } from 'react'
import "../components/reciters/rec.css"
import { useData } from '../context/AppContext'

const MainAudio = () => {
    const { server, setServer, sideBarOpen } = useData()
    const audioRef = useRef()
    const [audioBool, setAudioBool] = useState(true)


    useEffect(() => {
        if (server == undefined) {
            setAudioBool(false)
        } else {
            audioRef.current?.play()
            setAudioBool(true)
        }
    }, [server])

    const handleClick = () => {
        setServer()
    }

    return (
        < div >
            <div className={`${audioBool ? "cancelAudio" : "audioFalse"}`}><button onClick={() => handleClick()}><i className="fa-solid fa-xmark"></i></button></div>
            <audio src={`${server}`}
                ref={audioRef}
                type="audio/mpeg"
                controls className={audioBool ? "audio" : "audioFalse"}>
                <div>d</div>
                <source src={`${server}`} type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio>
        </div >
    )
}

export default MainAudio