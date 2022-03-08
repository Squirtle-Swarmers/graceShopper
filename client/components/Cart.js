import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrderThunk } from "../store/cart";
import { updateCartThunk } from "../store/cart";
import { Link } from "react-router-dom";

export function Cart(props) {
  console.log("// [ AllProducts Functional Component ] - props: ", props);
  useEffect(() => {
    props.setCart(props.auth.id)
  }, [])
  const cart = props.cart;
  const productsForOrder = props.cart.orders;
  console.log("// [ Cart Component ] - props.cart", cart);
  if (Array.isArray(productsForOrder) && productsForOrder.length) {
    return (
      <div className="listView">
        <div className="cards">
            {productsForOrder[0].products.map((product) => (
                <div key={product.id} className="card">
                    < Link to={`products/${product.id}`}>
                        <div className="image-container"><img className="card-img" src={product.image} alt="product-image" /></div>
                    </Link>
                    <h4>{product.name}</h4>
                    <p> Price: {product.price} </p>
                    <p>Quantity: {product.orderDetails.quantity}</p>
                    <button onClick={() => props.updateCart(props.auth.id, product.id, -1)}>-</button>
                    <button onClick={() => props.updateCart(props.auth.id, product.id, 0)}>Remove From Cart</button>
                    <button onClick={() => props.updateCart(props.auth.id, product.id, 1)}>+</button>
                </div>
            ))}
        </div>
      </div>
    )
  } else {
    return (<p>no orders</p>)
  }

}

function mapState(state) {
  console.log("// logging state from mapState in AllProducts", state);
  return {
    cart: state.cart,
    auth: state.auth
  }

}

function mapDispatch(dispatch) {
  return {
    setCart: (userId) => dispatch(fetchOrderThunk(userId)),
    updateCart: (userId, productId, quantityChange) => dispatch(updateCartThunk(userId, productId, quantityChange))
  };
}

export default connect(mapState, mapDispatch)(Cart);
