import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleProductThunk } from "../store/singleProduct";
import EditProductForm from "./EditProductForm";

export function SingleProduct(props) {
    useEffect(() => { props.setSingleProduct(props.match.params.productId) }, []);
    const { product } = props;
    const isAdmin = props.auth.isAdmin;
    console.log("// [SingleProduct Component] - props: ", props)
    return (
        <div className="singleProductView">
            {isAdmin ? <EditProductForm /> : ''}

            <img src={product.image} className='singleImage' />
            <h2>{product.name}</h2>
            <h3> {product.price} </h3>
            <p>{product.description}</p>
            {/* if logged in and userType = customer display this: */}
            <button> Add to Cart </button>
            {/* else:  */}
        </div>
    )
}

function mapState(state) {
    console.log("// logging state from mapState in SingleProduct", state);
    return {
        product: state.singleProduct,
        auth: state.auth
    }
}

function mapDispatch(dispatch) {
    return { setSingleProduct: (productId) => dispatch(fetchSingleProductThunk(productId)) };
}

export default connect(mapState, mapDispatch)(SingleProduct);