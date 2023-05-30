import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import './ReviewPage.scss'
import { useState } from 'react';

export default function ReviewPage() {
    const reviewStars = [1, 2, 3, 4, 5];
    const [point, setPoint] = useState(0);
    const [message, setMessage] = useState('');
    const [check , setCheck] = useState(true);
    const { productId } = useParams();
    const navigate = useNavigate();


    const setPointFunc = (e) => {
        console.log(e);
        setPoint(e);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let obj = {
            Message: message,
            Point: point,
            ReviewId:productId
        }
        fetch("https://localhost:44420/product/reviewProd", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                if(data){
                    setCheck(true); 
                    navigate("/productReview")
                }
                else{
                    setCheck(false); 
                }
            })
    }


    return (
        <form className='flex-container' onSubmit={(e) => submitHandler(e)}>
            <div className="Mycard">
                <div className="title text-dark">Review</div>
                <textarea className='col-12' rows="5" cols="30" type="text" id='name' placeholder='Your Review' onChange={(e) => setMessage(e.target.value)}></textarea>
                <div className='stars'>
                    {
                        reviewStars.map((x) => (
                            x > point ? <i className='fa-regular fa-star' onClick={() => setPointFunc(x)}></i> : <i className='fa-solid fa-star' onClick={() => setPointFunc(x)}></i>
                        ))
                    }

                </div>
                <div className='validation'>
                    {check ? "" : <p className='text-danger'>Point and Message Ruquired</p>}
                </div>
                <div className="button">
                    <button type='submit'>Submit</button>
                </div>
            </div>
        </form>

    )
}
