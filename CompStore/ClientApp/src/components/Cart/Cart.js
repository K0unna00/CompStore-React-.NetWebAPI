import React from 'react'
import './Cart.scss'
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import { setCount, add, remove } from '../../features/cartSlice'
import { Link } from 'react-router-dom';


export default function Cart() {
    const [dataFromBack, setDataFromBack] = useState([])
    const [trigger, setTrigger] = useState(0);
    const [load, setLoad] = useState(false)
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();


    useEffect(() => {
        setDataFromBack([]);
        setLoad(false)
        let items = JSON.parse(sessionStorage.getItem("CartItems"));
        if(items){
            items.map(x => (
                fetch(`https://localhost:44420/product/${x.id}`)
                    .then(res => res.json())
                    .then(data => {
    
                        data.count = x.count;
                        setDataFromBack(dataFromBack => [...dataFromBack, data]);
                    })
            ));
        }
        
        setLoad(true);
        console.log(dataFromBack);
    }, [trigger]);

    const removeItem = (e) => {
        let items = JSON.parse(sessionStorage.getItem('CartItems'));

        for (let i = 0; i < items.length; i++) {
            if (items[i].id === e) {
                items.splice(i, 1);
                break;
            }
        }
        if(items.length > 0) {
            sessionStorage.setItem('CartItems', JSON.stringify(items));
        }
        else{
            sessionStorage.removeItem('CartItems');
        }
        dispatch(remove())
        setTrigger(trigger + 1)
    }

    return (
        load ?
            <div className='cart-card'>
                <div className='title'>Shopping Cart</div>
                <div className='main-card'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Description</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Remove</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataFromBack ? <> {dataFromBack.map(x => (
                                    <tr>
                                        <td className='cart-desc'>
                                            <div className='cart-img'>
                                                <img src={`.././Images/${x.imgPath}`} alt='' />
                                            </div>
                                            <div className='name'>
                                                {x.name}
                                            </div>
                                        </td>
                                        <td className='quantity'>
                                            {/* <button type=""><i className='fa-solid fa-chevron-left'></i></button> */}
                                            <span>{x.count}</span>
                                            {/* <button type=""><i className='fa-solid fa-chevron-right' onClick={() => addToCard(x.id)} ></i></button> */}
                                        </td>
                                        <td>
                                            <button type="" onClick={() => removeItem(x.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                        <td>{x.price}$</td>
                                    </tr>
                                ))}
                                </>
                                    : ''
                            }



                        </tbody>
                    </table>
                    {
                        dataFromBack.length > 0 ? <div className='bottom'>
                            {/* <div className='total'>
                                        Total : {total} 
                                    </div> */}
                            <Link to="/deliveryPage" className='checkOut'>
                                Check Out
                            </Link>
                        </div> : ''
                    }

                </div>
            </div>
            :
            <Loading />
    )
}
