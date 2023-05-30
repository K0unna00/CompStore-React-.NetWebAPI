import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './loginRegister.scss'
import { useSelector, useDispatch } from 'react-redux'

export default function Register() {
    const navigate = useNavigate();
    const [check, setCheck] = useState(true);
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            UserName: name,
            Password: pass,
            Email: email
        }
        fetch("https://localhost:44420/account/register", {
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
                if (data) {
                    navigate("/login");
                }
                else {
                    setCheck(false);
                }
            })

    }



    return (
        <form className='flex-container' onSubmit={handleSubmit}>
            <div className="Mycard">
                <div className="title">Register</div>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id='name' placeholder='User Name' />
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id='password' placeholder='Password' />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='email' placeholder='Email' />
                <div className="button">
                    <button type='submit'>Register</button>
                </div>
                {
                    check ? ' ' : < div className="errorMessage"><p className="text-danger">Inputs is not Valid</p></div>

                }
                

            </div>
        </form>
    )
}
