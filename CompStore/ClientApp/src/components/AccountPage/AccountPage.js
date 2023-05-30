import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import './AccountPage.scss'


export default function AccountPage() {

    const [userData, setUserData] = useState(null);


    useEffect(() => {
        let userId = sessionStorage.getItem("UserId");
        fetch(`https://localhost:44420/account/getUser/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data)
            })
    }, [])


    return (
        <div className='account-container' >
            <div className="title">Profile</div>
            <div className="Mycard">
                {userData ?
                    <>
                        <div className='content'>
                            <div className='Name'>
                                UserName : <span>{userData.userName}</span> 
                            </div>
                            <div className='Email'>
                                Email : <span>{userData.email}</span>
                            </div>
                        </div>
                        <div className="button">
                            <Link to="/cart" className='productBtn'>Go Cart</Link>
                            <Link to="/productReview" className='productBtn'>Go Purchase History</Link>
                            <Link to="/userAccountEdit" className='productBtn'>Edit Profile</Link>
                        </div>
                    </> : ''}
            </div>
        </div>
    )
}
