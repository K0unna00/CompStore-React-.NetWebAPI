import React from 'react'
import './AboutUs.scss'
import aboutUsPhoto from './christian-wiediger-c3ZWXOv1Ndc-unsplash.jpg'

export default function AboutUs() {
    return (
        <div className="container aboutUs" id='hero'>
            <div className="left">
                <div className="name">About Us</div>
                <div className="line"></div>
                <div className='content'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className='image'>
                    <img src={aboutUsPhoto} alt="" />
                </div>
                <button><i className="fa-solid fa-arrow-up-right-from-square"></i>Contact Us</button>
            </div>

        </div>
    )
}
