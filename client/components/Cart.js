import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrderThunk } from "../store/cart";
import { updateCartThunk } from "../store/cart";
import { Link } from "react-router-dom";

export function Cart(props) {
  // console.log("// [ AllProducts Functional Component ] - props: ", props);
  // console.log('test')
  const fetch_GuestCart = () => {
      try {
        let cartItems =
          JSON.parse(localStorage.getItem("cart")) !== null
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
            // console.log(cartItems, 'this is cartitems')
        return cartItems
      } catch (error) {
        console.log(error);
      }
  
  };

  const update_GuestCart = (itemId, task) => {
      let cartItems =
        JSON.parse(localStorage.getItem("cart")) !== null
          ? JSON.parse(localStorage.getItem("cart"))
          : [];
  
      cartItems.map((item) => {
        if (Number(item.id) === Number(itemId)) {
          if (task === "subtract" && item.quantity > 1) {
            item.quantity -= 1;
            return item;
          }
          if (task === "add") {
            item.quantity += 1;
            return item;
          }
          if (task === "remove") {
            cartItems = cartItems.filter(
              (product) => Number(product.id) !== Number(itemId)
            );
          }
        } else {
          return item;
        }
      });
  
      localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  
  useEffect(() => {
    props.setCart(props.auth.id)
  }, [])
  let guestCart = (!props.auth.id) ? fetch_GuestCart() : [];
  console.log('this is guestcart', guestCart)
  const cart = props.cart;
  const productsForOrder = props.cart.orders;
  // console.log("// [ Cart Component ] - props.cart", cart);
  // console.log(props.auth.id)
  if (!props.auth.id) {
    console.log('not logged in')
    return (
      <div className="listView">
      <div className="cards">
          {guestCart.map((product, i) => (
              <div key={product.id} className="card">
                  < Link to={`products/${product.id}`}>
                      <div className="image-container"><img className="card-img" src={product.imageUrl} alt="product-image" /></div>
                  </Link>
                  <h4>{product.name}</h4>
                  <p> Price: {product.price} </p>
                  <p>Quantity: {product.quantity}</p>
                  <button onClick={() => update_GuestCart(product.id, 'subtract')}>-</button>
                  <button onClick={() => update_GuestCart(product.id, 'remove')}>Remove From Cart</button>
                  <button onClick={() => update_GuestCart(product.id,'add')}>+</button>
              </div>
          ))}
      </div>
    </div>

    )
  } else {
    console.log('checking this')
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
                      <button onClick={() => {
                        product.orderDetails.quantity < 2 ? props.updateCart(props.auth.id, product.id, 0) : props.updateCart(props.auth.id, product.id, -1)
                        }}>-</button>
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
