import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../LoginRegister/loginRegister.scss'

export default function Delete(props) {
    let navigation = useNavigate();
    let id = window.sessionStorage.getItem('deleteID');
    const deleteFunc = () => {
        window.sessionStorage.removeItem('deleteID');
        fetch("https://localhost:44420/product/delete", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data) {
                    navigation("/products");
                    console.log(data);
                }
            })
    }

    return (
        <form className='flex-container'>
            <div className="Mycard">
                <div className="title text-red">Are You Sure ? !</div>
                <div className="button">
                    <button type='button' onClick={deleteFunc}> Yes </button>
                    <Link to="/products"> No </Link>
                </div>
            </div>
        </form>
    )
}
