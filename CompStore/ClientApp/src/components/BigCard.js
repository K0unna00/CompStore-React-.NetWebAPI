import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setCount, add, remove } from '../features/cartSlice'


export default function BigCard(props) {
    const dispatch = useDispatch();

    const [avgRate, setAvgRate] = useState(0);

    let navigation = useNavigate();
    let data = props.props;
    let role = props.role;

    
    
    const calcAvrg = () => {
        let sum = 0;
        let count = 0;
        console.log(data);
        data.reviews.forEach(e => {
            if(e.point > 0) {
                count++;
                sum += e.point
            }
        });
        setAvgRate(sum/count);
    }
    
    useEffect(() => {
        calcAvrg();
    },[])

    const deleteFunc = (id) => {
        window.sessionStorage.setItem("deleteID", id);
        navigation("/deleteProduct");
    }
    const addToCard = (e) => {

        let items = JSON.parse(sessionStorage.getItem('CartItems'));
        if (items == null) {
            let obj = {
                id: e,
                count: 1
            }
            let array = [obj]
            sessionStorage.setItem('CartItems', JSON.stringify(array))
            dispatch(setCount(1))
        }
        else {
            let check = false;
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === e) {
                    items[i].count++;
                    check = true;
                    break;
                }
                else {
                    check = false;
                }
            }
            if (!check) {

                let obj = {
                    id: e,
                    count: 1
                }
                items.push(obj);
                dispatch(add())
            }
            sessionStorage.setItem('CartItems', JSON.stringify(items));
        }

    }
    return (

        <div className="productCard" key={data.id}>
            <div className="line"></div>
            <div className="card">
                <div className="title">
                    {data.name}
                </div>
                <div className="Price">
                    <span>Price : {data.price}$</span>
                    {avgRate > 0  ? <span>
                            <i className='fa-solid fa-star'></i>
                            {avgRate}
                        </span> : ''}
                        
                </div>
                <div className="img">
                    <img src={`./Images/${data.imgPath}`} alt='' />
                </div>
                <div className="adminBTNs d-flex">
                    {
                        role === "administrator" ?
                            <button className="productBtn" onClick={() => deleteFunc(data.id)}> Delete </button> : ""
                    }
                    {
                        role === "user" ? <button onClick={() => addToCard(data.id)} className="productBtn" > Add To Cart </button> : ""
                    }
                    <Link to={"/products/" + data.id} className="productBtn" >See Details</Link>
                </div>
            </div>
        </div>
    )
}
