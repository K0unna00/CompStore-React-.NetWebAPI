import React from 'react'
import './hero.scss'
import heroPng from './hero.png'
import { Link } from 'react-router-dom'

export default function hero() {
    return (
        <div className="container hero" id='hero'>
            <div className="left">
                <div className="name">Best Computer <br /> Accessories</div>
                <div className="line"></div>
                <Link to="/contactUs"><i className="fa-solid fa-arrow-up-right-from-square"></i>Contact Us</Link>
            </div>
            <div className="right">
                <img src={heroPng} alt="" className="me" />
            </div>
        </div>
    )
}
