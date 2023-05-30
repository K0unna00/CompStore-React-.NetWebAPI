import { Log } from 'oidc-client';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setCount, add, remove } from '../../features/cartSlice'
import './ProudyctDetail.scss'


export default function ProductDetail() {
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const { productId } = useParams();

    useEffect(() => {
        console.log(productId);
        fetch(`https://localhost:44420/product/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
            });
    }, []);

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
        <>
            <div className='flex-container'>
                <div className="myCard">
                    {
                        data ? <><div className="title">{data.name}</div>
                            <div className='cardImage'>
                                <img src={`.././Images/${data.imgPath}`} alt='' />
                            </div>
                            <div className='content'>
                                <div className='subtitle'>
                                    Summary : {data.summary}
                                </div>
                                <div className='subtitle'>
                                    Price : {data.price}$
                                </div>
                            </div>
                            <div className="productBtn">
                                <button type='submit' onClick={() => addToCard(data.id)}>Add To Cart</button>
                            </div>
                            <div className='reviews'>
                                {data.reviews.map(x => (
                                    <div key={x.id} className='review'>
                                        <div className='userName'>
                                            {x.user.userName} :
                                        </div>
                                        <div className='rate'>
                                            <i className='fa-solid fa-star'></i>
                                            {x.point}
                                        </div>
                                        <div className='Message'>
                                            {x.reviewMessage}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </> : ''
                    }

                </div>
            </div>
        </>
    )
}

