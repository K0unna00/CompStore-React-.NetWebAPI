import React from 'react'
import { Link } from 'react-router-dom'
import "./CheckOutPage.scss"

export default function CheckOutPage() {
    return (
        <div className='flex-container'>
            <div className="Mycard">
                <div className="title">Your Purchase Succesfully Done <br/>
                    <i className='fa-solid fa-circle-check'></i>
                </div>
                <div className="button">
                    <Link to="/productReview">Review Our Products</Link>
                </div>
            </div>
        </div>
    )
}
