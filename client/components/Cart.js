import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrderThunk } from "../store/cart";

export function Cart(props) {
  console.log("// [ AllProducts Functional Component ] - props: ", props);
  useEffect(() => {
    props.setCart(props.auth.id)
  }, [])
  const cart = props.cart;
  const productsForOrder = props.cart.orders;
  console.log("cart: ", cart);
  if (Object.keys(cart).length === 0) {
    return <p> CART IS EMPTY </p>
  } else if (cart.orders.length === 0) {
    return <p> There are no orders in your cart </p>
  } else {
    return (
      <div>
        <p> Here Are your Products: </p>
        {cart.orders[0].products[0].name}
      </div>
    )


    // return (
    //   <div>
    //     <h1>cart should be here im bitch</h1>
    //     <div>
    //       <h1> Items in Cart </h1>
    //     </div>
    //   </div>
    // )
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
  };
}

export default connect(mapState, mapDispatch)(Cart);
