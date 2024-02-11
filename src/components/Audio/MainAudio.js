import React, { useEffect, useRef, useState } from 'react'
import { useData } from '../../context/AppContext'
import Slider from "./Slider"
import ControlPanel from './ControlPanel'

const MainAudio = () => {
    const { server, setServer, sideBarOpen, colors } = useData()
    const audioRef = useRef()
    const [audioBool, setAudioBool] = useState(true)


    useEffect(() => {
        if (server == undefined) {
            setAudioBool(false)
        } else {
            audioRef.current?.play()
            setIsPlaying(true)
            setAudioBool(true)
        }
    }, [server])

    const handleClick = () => {
        setServer()
    }

    //design

    const [percentage, setPercentage] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(0.5)

    const onChange = (e) => {
        const audio = audioRef.current
        audio.currentTime = (audio.duration / 100) * e.target.value
        setPercentage(e.target.value)
    }

    const play = () => {
        const audio = audioRef.current
        audio.volume = 1

        if (!isPlaying) {
            setIsPlaying(true)
            audio.play()
        }

        if (isPlaying) {
            setIsPlaying(false)
            audio.pause()
        }
    }

    const getCurrDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }

    return (
        < div >
            {/* <div className={`${audioBool ? "cancelAudio" : "audioFalse"}`}><button onClick={() => handleClick()}><i className="fa-solid fa-xmark"></i></button></div>
            <audio src={`${server}`}
                ref={audioRef}
                type="audio/mpeg"
                controls className={audioBool ? "audio" : "audioFalse"}>
                <div>d</div>
                <source src={`${server}`} type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio> */}

            <div style={{ backgroundColor: colors.navColor }} className={` app-container ${audioBool ? "cancelAudio" : "audioFalse"}`}>
                <Slider percentage={percentage} onChange={onChange} />
                <audio
                    ref={audioRef}
                    onTimeUpdate={getCurrDuration}
                    onLoadedData={(e) => {
                        setDuration(e.currentTarget.duration.toFixed(2))
                    }}
                    src={`${server}`}
                ></audio>
                <ControlPanel
                    play={play}
                    isPlaying={isPlaying}
                    duration={duration}
                    currentTime={currentTime}
                />
            </div>

        </div >
    )
}

export default MainAudio