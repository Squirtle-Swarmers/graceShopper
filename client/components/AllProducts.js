import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProductsThunk, deleteAProductThunk } from "../store/products";
import { Link } from "react-router-dom";
import AddProductForm from './AddProductForm'

export function AllProducts(props) {
    console.log("// [ AllProducts Functional Component ] - props: ", props);
    useEffect(() => {
        props.setProducts()
    }, [])
    const products = props.products;
    const handleDelete = props.deleteAProduct;
    if (products.length === 0) {
        return (<p> No Products to Display </p>)
    } else {
        return (
            <div className="listView">
                {props.auth.isAdmin ? <AddProductForm /> : ""}

                <div className="cards">
                    {products.map((product) => (
                        <div key={product.id} className="card">
                            < Link to={`products/${product.id}`}>
                                <div className="image-container"><img className="card-img" src={product.image} alt="product-image" /></div>
                            </Link>
                            <h4>{product.name}</h4>
                            <p> Price: {product.price} </p>
                            <button> Add to Cart </button>
                            {props.auth.isAdmin ? <button type="button" onClick={() => handleDelete(product.id)}> Delete Product </button> : ''}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}

function mapState(state) {
    console.log("// logging state from mapState in AllProducts", state);
    return {
        products: state.products,
        auth: state.auth
    }

}

function mapDispatch(dispatch) {
    return {
        setProducts: () => dispatch(fetchProductsThunk()),
        deleteAProduct: (product) => dispatch(deleteAProductThunk(product))
    };
}

export default connect(mapState, mapDispatch)(AllProducts);