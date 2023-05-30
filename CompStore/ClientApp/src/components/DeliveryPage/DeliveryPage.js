import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCount, add, remove } from '../../features/cartSlice'


export default function DeliveryPage() {
  const navigate = useNavigate();
  const [dataFromBack, setDataFromBack] = useState([]);
  const [load , setLoad] = useState(false);
  const dispatch = useDispatch();


  const buyItems = () => {
    setDataFromBack([]);
    setLoad(false)
    let items = JSON.parse(sessionStorage.getItem("CartItems"));
    let userId = sessionStorage.getItem("UserId");
    if(items && userId){
        items.map(x => (
            fetch(`https://localhost:44420/product/review/${x.id}/${userId}`)
                .then(res => res.json())
                .then(data => {
                    if(data){
                      sessionStorage.removeItem("CartItems")
                      dispatch(remove())
                      navigate('/checkOutPage')
                    }
                })
        ));
    }
    
  }


  return (
    <div>
        <div className='container form-container flex-wrap'>
            <div className="getInTouch">
                <div className="title">Shipping Address</div>
                <form className='col-12 d-flex flex-wrap'>
                    <input className='col-12 col-sm-12' type="text" placeholder='Address' />
                    <input className='col-md-5 col-sm-12' type="text" placeholder='City' />
                    <input className='col-md-5 col-sm-12' type="text" placeholder='Country' />
                    <input className='col-md-5 col-sm-12' type="text" placeholder='PostalCode' />
                    <input className='col-md-5 col-sm-12' type="tel" placeholder='Phone' />
                    <textarea placeholder='Message (Optional)' id="" cols="30" className='col-12' rows="10">
                    </textarea>
                    <button to="/checkOutPage" type='button' onClick={buyItems} className='productBtn'>Done</button>
                </form>
            </div>
        </div>
    </div>
  )
}
