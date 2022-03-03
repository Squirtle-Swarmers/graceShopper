import React, {useEffect} from "react";
import { connect } from "react-redux";
import { fetchSingleProductThunk } from "../store/singleProduct";

export function SingleProduct(props) {
    useEffect (()=> {props.setSingleProduct(props.match.params.productId)}, []); 
    const product = props.singleProduct;
    return (
        <div className = "singleProductView">
            <img src = {product.image} className = 'singleImage' />
            <h2>{product.name}</h2> 
            <h3> {product.price} </h3> 
            <p>{product.description}</p> 
            <button> Add to Cart </button> 
        </div>
    )
}

function mapState(state){
    console.log("// logging state from mapState in SingleProduct", state);
    return {singleProduct: state.singleProduct}
}

function mapDispatch(dispatch) {
    return { setSingleProduct: (productId) => dispatch(fetchSingleProductThunk(productId)) };
}
  
export default connect(mapState, mapDispatch)(SingleProduct);