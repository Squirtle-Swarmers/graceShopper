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
          <div className = "cards">
              {products.map((product) => (
                <div key={product.id} className="card">
                    < Link to={`products/${product.id}`}>
                        <div className="image-container"><img className="card-img" src={product.image} alt="product-image" /></div>
                    </Link>
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