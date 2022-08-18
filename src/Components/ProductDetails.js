import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading';
import { AiOutlineStar } from "react-icons/ai"
import {  useDispatch } from "react-redux"
import { ToastContainer } from 'react-toastify';

const ProductDetails = () => {
    let dispatch = useDispatch(state => state)

    const { id } = useParams()
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProduct = async () => {
        setLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const results = await response.json()
        setProduct(results)
        setLoading(false)

    }

    function ShowProduct() {
        return (
            <>
                <div className="col-md-6" >
                    <img src={product.image} alt={product.title} height="400px" width="400px" />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50 ">{product.category}</h4>
                    <h1 className="display-5 ">{product.title}</h1>
                    <p className="lead fw-bolder">Rating : {product.rating && product.rating.rate} <AiOutlineStar /></p>
                    <h3 className="fw-bold my-4 display-6">$ {product.price}</h3>
                    <p className="lead">$ {product.description}</p>
                    <button className="btn btn-outline-dark" onClick={() => dispatch({ type: "ADD_ITEM", payload: product }) }>Add to Cart</button>
                    <Link to="/cart" className="btn btn-dark ms-2">Go to Cart</Link>
                </div>

            </>
        )
    }
    useEffect(() => {
        getProduct()
        

    }, [])

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row py-3">
                    {loading ? <Loading type="details" /> : <ShowProduct />}
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default ProductDetails
