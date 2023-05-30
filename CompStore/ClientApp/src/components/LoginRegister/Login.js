import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './loginRegister.scss'
import { useSelector, useDispatch } from 'react-redux'
import { authorize, saveId, saveRole, saveName } from '../../features/currentUserSlice'

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [success, setSuccess] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            UserName: name,
            Password: pass
        }
        fetch("https://localhost:44420/account/login", {
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
            .then((data) => {
                console.log(data);
                if (data.user != null) {
                    console.log(data)
                    navigate("/");
                    dispatch(authorize(true))
                    dispatch(saveId(data.id))
                    dispatch(saveRole(data.role))
                    dispatch(saveName(data.user.userName))
                    sessionStorage.setItem("IsAuth", true)
                    sessionStorage.setItem("role", data.role)
                    sessionStorage.setItem("UserId", data.user.id)
                    sessionStorage.setItem("UserName", data.user.userName)
                }
                else {
                    console.log("salam");
                    setSuccess(false);
                }
            } )

    }



    return (
        <form className='flex-container' onSubmit={handleSubmit}>
            <div className="Mycard">
                <div className="title">Login</div>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id='name' placeholder='User Name' />
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id='password' placeholder='Password' />
                <div className="button">
                    <button type='submit'>Log In</button>
                </div>
                {
                    success ? ' ': <div className="errorMessage"><p className="text-danger">Inputs is not Valid</p></div>
                }
            </div>
        </form>
    )
}
