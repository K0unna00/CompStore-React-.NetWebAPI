import React from 'react'
import Loading from '../Loading/Loading'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ProductReview() {
    const [load, setLoad] = useState(true)
    let userId = sessionStorage.getItem("UserId");
    const [reviewData, setReviewData] = useState([])
    const [prodData, setProdData] = useState([])


    const addReview = (e) =>{
        console.log(e);
    }

    useEffect(() => {
        fetch(`https://localhost:44420/product/boughtItems/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setReviewData(reviewData => [...reviewData, data]);
                data.forEach(x => {
                    fetch(`https://localhost:44420/product/${x.productId}`)
                        .then(res => res.json())
                            .then(newData => {
                                setProdData( x => [...x, newData])
                            })
                });
            })
    }, [])


    return (

        load ?
            <div className='cart-card'>
                <div className='title'>Purchase History</div>
                <div className='main-card'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Review</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                prodData ? <> {prodData.map((x , index) => (
                                    <tr>
                                        <td className='cart-desc'>
                                            <div className='cart-img'>
                                                <img src={`.././Images/${x.imgPath}`} alt='' />
                                            </div>
                                            <div className='name'>
                                                {x.name}
                                            </div>
                                        </td>
                                        <td>{x.price}$</td>
                                        <td>
                                            <Link type="button" className='productBtn' to={"/productReview/" + reviewData[0][index].id}>
                                                {reviewData[0][index].point ? "Edit Review" : "Review"}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </>
                                    : ''
                            }
                        </tbody>
                    </table>

                </div>
            </div>
            :
            <Loading />
    )
}
