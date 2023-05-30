import React, {useEffect, useState } from 'react';
import {NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { authorize, saveRole } from '../features/currentUserSlice'
import { setCount, add, remove } from '../features/cartSlice'
import './NavMenu.scss';

export default function NavMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.currentUser.isAuth);
    const itemCount = useSelector((state) => state.cart.itemCount);
    const userName = useSelector((state) => state.currentUser.name);
    const userRole = useSelector((state) => state.currentUser.role);
    const [data, setData] = useState(false);
    const [role, setRole] = useState(window.sessionStorage.getItem("role"));
    const [name, setName] = useState(window.sessionStorage.getItem("UserName"));
    const [id, setId] = useState('');


    useEffect(() => {
        var info = ("true" == window.sessionStorage.getItem("IsAuth"));
        var id = window.sessionStorage.getItem("UserId");
        setId(id);
        
        let items = JSON.parse(sessionStorage.getItem('CartItems'));
        if(items){
            dispatch(setCount(items.length))
        }
        else{
            dispatch(setCount(0))

        }
        console.log(items);
        // setName(name);
        // setRole(role);
        setData(info);
        dispatch(authorize(info));
        dispatch(saveRole(role));
        
    }, [])
    
    const LogOut = () => {
        window.sessionStorage.setItem('IsAuth', false);
        window.sessionStorage.removeItem('role');
        window.sessionStorage.removeItem('UserName');
        window.sessionStorage.removeItem('UserId');
        window.sessionStorage.removeItem('CartItems');
        dispatch(saveRole(''));
        dispatch(authorize(false));
        setData(false);
        fetch(`https://localhost:44420/account/logout/${id}`); 
        navigate("/");
    }
    

    
    

    return (
        <header>
            <div className="container">
                <div className="title">
                    CompStore 
                </div>
                <nav>
                    <NavLink tag={Link} className="text-dark nav-item" to="/">Home</NavLink>
                    <NavLink tag={Link} className="text-dark nav-item" to="/products">Products</NavLink>
                    <NavLink tag={Link} className="text-dark nav-item" to="/contactUs">Contact</NavLink>
                    <NavLink tag={Link} className="text-dark nav-item" to="/aboutUs">About Us</NavLink>
                    {isAuth ? IsAuthorize(isAuth) : ( data ? IsAuthorize() : IsDeAuthorize())}
                </nav>
            </div>
        </header>
    )

    function IsDeAuthorize() {
        return (
            <div className="userSection">
                <NavLink tag={Link} className="text-dark nav-item" to="/login" >Login</NavLink>

                <NavLink tag={Link} className="text-dark nav-item" to="/register" >Register </NavLink>
            </div>
            )
    }
    function IsAuthorize() {
        return (
            <div className="userSection">

                <Link to="/userAccount" className="text-dark nav-item" >{name ? name : userName}</Link>

                <NavLink onClick={LogOut} className="text-dark nav-item" >LogOut</NavLink>

                <Link to="/cart" className="text-dark nav-item cart-icon" >
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>{itemCount}</span>
                </Link>

            </div>
        )
    }

    
}


