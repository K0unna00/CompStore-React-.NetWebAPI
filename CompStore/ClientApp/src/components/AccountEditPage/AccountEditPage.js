import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountEditPage() {

    const navigate = useNavigate();
    const [success, setSuccess] = useState(true);
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passwordCheck, setCheckPass] = useState(true);

    const handleSubmit = (e) => {
      e.preventDefault();
      if(password === confirmPass){
        setCheckPass(true);
        let userId = sessionStorage.getItem("UserId");
        let obj= {
          UserId : userId,
          Email : email,
          Password : password
        }
        fetch("https://localhost:44420/account/editProfile", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(data){
            navigate('/')
          }
          
        }
          
          )
      }
      else{
        setCheckPass(false);
      }
    }

    useEffect(() => {
        let userId = sessionStorage.getItem("UserId");
        fetch(`https://localhost:44420/account/getUser/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data)
          setEmail(data.email)
        })
    }, [])
  return (
    <>
      <form className='flex-container' onSubmit={handleSubmit}>
            <div className="Mycard">
                <div className="title">Edit Profile</div>
                {
                  userData != null ? <> <input value={email}  onChange={(e) => setEmail(e.target.value)} type="email"  className='longInput' placeholder={userData.email}/>
                  <input type="password"  className='longInput'onChange={(e) => setPassword(e.target.value)} placeholder='New Password'/>
                  <input type="password"  className='longInput'onChange={(e) => setConfirmPass(e.target.value)} placeholder='Confirm Password'/>
                  {
                    passwordCheck ? ' ' : <div className="errorMessage"><p className="text-danger">Password and Confirm Password must be same</p></div>
                  }
                  {
                      success ? ' ' : <div className="errorMessage"><p className="text-danger">Inputs is not Valid</p></div>
                  }
                  <div className="button">
                      <button type='submit'>Submit</button>
                  </div> </> : ''
                }
                
            </div>
        </form>
    </>
  )
}
