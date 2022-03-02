import React, {useEffect} from "react";
import { connect } from "react-redux";
import { fetchProductsThunk } from "../store/products";
import { Link } from "react-router-dom";

export function AllProducts (props) {
    console.log("// [ AllProducts Functional Component ] - props: ", props);
    useEffect(() => {
        props.setProducts()
    }, [])
    const products = props.products;
    return (
      <div className = "listView">
          <p> I'm bitch </p>
          <div className = "cards">
              {products.map((product) => (
                <div key={product.id} className="card">
                    <div className="image-container"><img className="card-img" src={product.image} alt="product-image" /></div>
                    <h4>{product.name}</h4>
                    <p> Price: {product.price} </p>
                </div>
                ))}
            </div>
      </div>
    );
  }

function mapState(state){
    console.log("// logging state from mapState in AllProducts", state);
    return {products: state.products}
}

function mapDispatch(dispatch) {
    return { setProducts: () => dispatch(fetchProductsThunk()) };
}
  
export default connect(mapState, mapDispatch)(AllProducts);