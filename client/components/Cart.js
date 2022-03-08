import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrderThunk } from "../store/cart";

export function Cart(props) {
  console.log("// [ AllProducts Functional Component ] - props: ", props);
  useEffect(() => {
    props.setCart(props.auth.id)
  }, [])
  const cart = props.cart;
  console.log("// [ Cart Component ] - props.cart", cart);
  return (
    <div>
      <h1>cart should be here im bitch</h1>
    </div>
  )

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
  };
}

export default connect(mapState, mapDispatch)(Cart);
