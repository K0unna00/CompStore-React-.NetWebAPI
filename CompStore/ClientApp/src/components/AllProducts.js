import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading/Loading'
import "./AllProduct.scss"
import BigCard from './BigCard'

export default function AllProducts() {
    const role = useSelector((state) => state.currentUser.role);

    const [load, setLoad] = useState(false)
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [typeIds, setTypeIds] = useState([]);
    const [sortValueState, setSortValueState] = useState(true);

    useEffect(() => {
        fetch('/product').then(result => result.json())
            .then((data) => {
                console.log(data);
                setProducts(data)
                setLoad(true)
            }
            );
        fetch('https://localhost:44420/product/getTypes').then(res => res.json())
            .then(data => setTypes(data));
    }, [])


    const saveTypeId = (e) =>{
        let array = typeIds;
        if(!array.includes(e)){
            array.push(e);
        }
        else{
            array.splice(array.indexOf(e),1)
        }
        setTypeIds(array);
    }

    const sortValue = (e) => {
        let value = (e === 'true')
        setSortValueState(value);
        console.log(sortValueState);
    }

    const applyFilter = () => {
        setLoad(false)
        let obj = {
            LowToHigh : sortValueState,
            TypeIds : typeIds
        }
        fetch("https://localhost:44420/product/filter", {
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
            .then(data =>{
                setProducts(data);
                setLoad(true);
                setTypeIds([]);
                setSortValueState(true);
            })
    }



    return (

        load ?
            <div>
                < div className="mainTitle" >Products</div >
                <div className='upper-section'>
                    {role === "administrator" ? <Link to="/createProduct" className="productBtn" > Add Product </Link> : ""}
                </div>
                <div className='main-section'>
                    <div className="allProducts">
                        {
                            (products != null) ? products.map((item) => <BigCard role={role} props={item} key={item.id} />) : <div>Loading ... </div>
                        }
                    </div>
                    <div className='filter-section'>
                        <label >
                            <select onChange={(e) => sortValue(e.target.value)}>
                                <option value={true}>Price - Low to high</option>
                                <option value={false}>Price - High to low</option>
                            </select>
                        </label>
                        {types.map(x => (
                            <label >
                                <input type="checkbox" key={x.id} value={x.id} onChange={(e) => saveTypeId(e.target.value)} />
                                <span>{x.name}</span>
                            </label>
                        ))}
                        <button type="" className='productBtn' onClick={applyFilter}>
                            Apply Filter
                        </button>


                    </div>
                </div>


            </div >
            :
            <Loading />
    )

}
