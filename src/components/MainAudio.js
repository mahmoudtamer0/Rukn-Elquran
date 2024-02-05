import React, { useEffect, useRef, useState } from 'react'
import "../components/reciters/rec.css"
import { useData } from '../context/AppContext'

const MainAudio = () => {
    const { server, soraId, setSoraId } = useData()
    const audioRef = useRef()
    const [audioBool, setAudioBool] = useState(false)


    useEffect(() => {
        if (soraId == "") {
            setAudioBool(false)
        } else {
            audioRef.current?.play()
            setAudioBool(true)
        }
    }, [soraId])

    const handleClick = () => {
        setSoraId("")
    }

    // className = { audioBool? "audio": "audioFalse" }
    return (
        < div >
            <div className={audioBool ? "cancelAudio" : "audioFalse"}><button onClick={() => handleClick()}><i class="fa-solid fa-xmark"></i></button></div>
            <audio src={`${server}${soraId}.mp3`}
                ref={audioRef}
                type="audio/mpeg"
                controls className={audioBool ? "audio" : "audioFalse"}>
                <div>d</div>
                <source src={`${server}${soraId}.mp3`} type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio>
        </div >
    )
}

export default MainAudio