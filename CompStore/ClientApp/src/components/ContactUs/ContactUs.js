import React from 'react'
import Iframe from 'react-iframe'
import './ContactUs.scss'



export default function ContactUs() {
  return (
    <div>
        <div className='container form-container flex-wrap'>
            <div className="getInTouch col-md-7 col-sm-12">
                <div className="title">Get In Touch</div>
                <form className='col-12 d-flex flex-wrap'>
                    <input className='col-md-5 col-sm-12' type="text" placeholder='Name' />
                    <input className='col-md-5 col-sm-12' type="text" placeholder='Email' />
                    <input className='col-12 col-sm-12' type="text" placeholder='Subject' />
                    <textarea placeholder='Message' id="" cols="30" className='col-12' rows="10">
                    </textarea>
                    <button className='productBtn'>Send Message</button>
                </form>
            </div>
            <div className="contactUs col-md-5 col-sm-12">
                <div className="title">Contact Us</div>
                <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97236.44637545635!2d49.772559337807905!3d40.39469399735741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2zQmFrw7w!5e0!3m2!1str!2saz!4v1685251958234!5m2!1str!2saz" 
                    height="100%"
                    id=""
                    className="col-12"
                    display="block"
                    position="relative"
                    border="1px solid gray"/>
            </div>
        </div>
    </div>
  )
}
