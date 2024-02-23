import { useState, useRef, useEffect } from 'react'
import './slider.css'
import './thumb.css'
import { useData } from '../../context/AppContext'

function Slider({ percentage = 0, onChange }) {
    const [position, setPosition] = useState(0)
    const [marginLeft, setMarginLeft] = useState(0)
    const { server } = useData()
    const [radioNow, setRadioNow] = useState(false)
    const [progressBarWidth, setProgressBarWidth] = useState(0)

    const rangeRef = useRef()
    const thumbRef = useRef()

    useEffect(() => {
        const rangeWidth = rangeRef.current.getBoundingClientRect().width
        const thumbWidth = thumbRef.current.getBoundingClientRect().width
        const centerThumb = (thumbWidth / 100) * percentage * -1
        const centerProgressBar =
            thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage
        setPosition(percentage)
        setMarginLeft(centerThumb)
        setProgressBarWidth(centerProgressBar)
    }, [percentage])

    useEffect(() => {
        if (server.includes("https://backup.qurango.net/")) {
            setRadioNow(true)
        } else setRadioNow(false)
    }, [server])

    return (
        <div className='slider-container'>
            <div
                className={`progress-bar-cover ${radioNow ? "progress-bar-live" : ""}`}
                style={{
                    width: `${progressBarWidth}px`
                }}
            ></div>
            <div
                className={`thumb ${radioNow ? "thumbLive" : ""}`}
                ref={thumbRef}
                style={{
                    left: `${position}%`,
                    marginLeft: `${marginLeft}px`
                }}
            ></div>
            <input
                type='range'
                value={position}
                ref={rangeRef}
                step='0.01'
                className='range'
                onChange={onChange}
            />
        </div>
    )
}

export default Slider