import React from 'react'
import './buttons.css'

function Button({ play, isPlaying }) {
    return (
        <div className='btn-container'>
            <div className='btnMainDiv'>
                <div onClick={play} className={isPlaying ? 'btn-stop' : 'btn-play'}></div>
            </div>
        </div>
    )
}
export default Button