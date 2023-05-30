import React from 'react'
import './Product.scss'
import { Link } from 'react-router-dom';

//import img1 from './notebook1.png'
//import img2 from './monitor.png'

export default function products() {
    return (
        <div className="container products" id='products'>
            <div className="title">
                Best Seller Products
            </div>
            <div className="cards">
                <div className="bigcard">
                    <div className="line"></div>
                    <div className="card">
                        <div className="title">
                            Gigabyte Aero 15
                        </div>
                        <div className="subtitle">Gaming Notebook</div>
                        <div className="desc">
                            {/*<img src={img1} alt="" />*/}
                            <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ut tempora eos nisi architecto fugiat perferendis unde, possimus, odit maiores et, dicta quam error eligendi similique ad totam labore ratione.
                        </div>
                    </div>
                </div>
                <div className="bigcard">
                    <div className="line"></div>
                    <div className="card">
                        <div className="title">
                            Rampage SLICE
                        </div>
                        <div className="subtitle">Gaming Notebook</div>
                        <div className="desc">
                            {/*<img src={img2} alt="" />*/}
                            <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ut tempora eos nisi architecto fugiat perferendis unde, possimus, odit maiores et, dicta quam error eligendi similique ad totam labore ratione.
                        </div>
                    </div>
                </div>

            </div>
            <div className="icons">
                <i className="fa-solid fa-laptop"></i>
                <i className="fa-solid fa-desktop"></i>
                <i className="fa-solid fa-computer"></i>
                <i className="fa-solid fa-laptop-code"></i>
                <i className="fa-solid fa-keyboard"></i>
                <i className="fa-solid fa-power-off"></i>
            </div>
            <div className="showProduct">
                <button>
                    <Link tag={Link} className="text-dark nav-item" to="/products">Show All Products</Link>
                </button>
            </div>

        </div>
    )
}
