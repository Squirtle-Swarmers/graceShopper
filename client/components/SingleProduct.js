import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleProductThunk } from "../store/singleProduct";
import EditProductForm from "./EditProductForm";

export function SingleProduct(props) {
    useEffect(() => { props.setSingleProduct(props.match.params.productId) }, []);
    const { product } = props;
    const isAdmin = props.auth.isAdmin;
    console.log("// [SingleProduct Component] - props: ", props);

    const addToGuestCart =
  (id, price, imageUrl, name ) => {
    let cartItems =
      JSON.parse(localStorage.getItem("cart")) !== null
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
    let guestCartBuffer =
      JSON.parse(localStorage.getItem("guestCartBuffer")) !== null
        ? JSON.parse(localStorage.getItem("guestCartBuffer"))
        : [];

    let itemInCart = cartItems.filter((item) => Number(item.id) === Number(id));

    cartItems.forEach((item) => {
      if (item.id === id) {
        item.quantity++;
      }
    });

    guestCartBuffer.forEach((item) => {
      if (Number(item.id) === Number(id)) {
        item.quantity++;
      }
    });

    if (itemInCart.length === 0) {
      const newItem = {
        id,
        name,
        price,
        imageUrl,
        quantity: 1,
      };
      cartItems = [...cartItems, newItem];
      guestCartBuffer = [...guestCartBuffer, newItem];
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("guestCartBuffer", JSON.stringify(guestCartBuffer));
  };

    async function handleAdd(productId, quantityChange) {
        if (props.auth.id) {
            await axios.put(`/api/users/${props.auth.id}`, {"productId": productId, "quantityChange": quantityChange});
        } else {
            addToGuestCart(product.id, product.price, product.image, product.name)
        }
        window.alert("added to cart")
    }

    return (
        <div className="singleProductView">
            {isAdmin ? <EditProductForm /> : ''}

            <img src={product.image} className='singleImage' />
            <h2>{product.name}</h2>
            <h3> {product.price} </h3>
            <p>{product.description}</p>
            {/* if logged in and userType = customer display this: */}
            <button onClick={() => handleAdd(product.id, 1)}> Add to Cart </button>
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