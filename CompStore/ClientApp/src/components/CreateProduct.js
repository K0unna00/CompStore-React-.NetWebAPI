import React, { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
import axios from "axios";


import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState('');
    const [type, setType] = useState(1);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState(null);
    const [success, setSuccess] = useState(true);


    const [allTypes, setAllTypes] = useState([]);

    useEffect( () => {
        fetch('https://localhost:44420/product/getTypes').then(res => res.json())
            .then(data => setAllTypes(data))
    }, [])

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name != '' && desc != '' && file != null) {
            let obj = {
                Name: name,
                Price: price,
                Summary: desc,
                ProductTypeId: type
            }
            console.log(obj)
            fetch("https://localhost:44420/product/create", {
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
                    console.log(data + " ");
                    const formData = new FormData();
                    formData.append("formFile", file);
                    formData.append("productId", data);
                    formData.append("fileName", fileName);
                    const res = axios.post(`https://localhost:44420/product/uploadFile/`, formData).then(result => navigate("/products"));


                })
        }
        else {
            setSuccess(false)
        }
    }
    return (

        <form className='flex-container' onSubmit={handleSubmit}>
            <div className="Mycard">
                <div className="title">Create New Product</div>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id='name' placeholder='Product Name' />
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" id='price' placeholder='Price' />
                <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text" id='desc' placeholder='Description' />
                <input type="file" onChange={saveFile} />
                <label>
                    Product Type : 
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        {
                            allTypes.map(x => <option value={x.id} key={x.id}>{x.name}</option>)
                        }
                        
                    </select>
                </label>
                {
                    success ? ' ' : <div className="errorMessage"><p className="text-danger">Inputs is not Valid</p></div>
                }
                <div className="button">
                    <button type='submit'>Create</button>
                </div>
            </div>
        </form>

    )
}
