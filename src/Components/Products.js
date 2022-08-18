import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom';
import Loading from './Loading';
const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState("All");

    const getProducts = async () => {
        setLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products`)
        const results = await response.json()
        setData(results)
        setFilter(results)
        setLoading(false)

    }

    function filterProducts(comingVlaue) {
        if (comingVlaue === "All") {
            setFilter(data)
        } else {
            setFilter(data.filter(product => product.category === comingVlaue.toLowerCase()))
        }

        setActive(comingVlaue)
    }
    useEffect(() => {
        getProducts()
    }, [])

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className={`${active === "All" ? ' btn btn-dark me-2' : 'btn btn-outline-dark me-2'}  `} onClick={(e) => filterProducts(e.target.textContent)}>All</button>
                    <button className={`${active === "Men's Clothing" ? ' btn btn-dark me-2' : 'btn btn-outline-dark me-2'}  `} onClick={(e) => filterProducts(e.target.textContent)}>Men's Clothing</button>
                    <button className={`${active === "Women's Clothing" ? ' btn btn-dark me-2' : 'btn btn-outline-dark me-2'}  `} onClick={(e) => filterProducts(e.target.textContent)}>Women's Clothing</button>
                    <button className={`${active === "Jewelery" ? ' btn btn-dark me-2' : 'btn btn-outline-dark me-2'}  `} onClick={(e) => filterProducts(e.target.textContent)}>Jewelery</button>
                    <button className={`${active === "Electronics" ? ' btn btn-dark me-2' : 'btn btn-outline-dark me-2'}  `} onClick={(e) => filterProducts(e.target.textContent)}>Electronics</button>
                </div>
                {filter.map(product => (
                    <div className="col-md-3 mb-4" key={product.id}>
                        <div className="card h-100 text-center p-4" >
                            <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                            <div className="card-body">
                                <h5 className="card-title mb-4">{product.title.substring(0, 12)}</h5>
                                <Link to={`/productDetails/${product.id}`} className="btn btn-outline-dark">Buy Now</Link>
                            </div>
                        </div>
                    </div>

                ))}
            </>
        )

    }


    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Latest Products </h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}

export default Products
