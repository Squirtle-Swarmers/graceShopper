import React from 'react';
import { connect } from 'react-redux';
import { addNewProductThunk } from '../store/products';

export class AddProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: 0,
      description: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addNewProduct({ ...this.state });
    this.setState({ name: "", price: 0, description: "" })
  }

  render() {
    const { name, price, description } = this.state;
    const { handleSubmit, handleChange } = this;


    return (
      <div>
        <h3> Add A New Product </h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Product Name: </label>
          <input name="name" onChange={handleChange} value={name} placeholder="required" required />

          <label htmlFor="price">Price: </label>
          <input name="price" onChange={handleChange} value={price} placeholder="required" required />

          <label htmlFor="description">Description: </label>
          <input name="description" onChange={handleChange} value={description} />


          <button className="button" type="submit">Add Product</button>
        </form>
        <hr />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewProduct: (newProduct) => dispatch(addNewProductThunk(newProduct, history)),
  };
};

export default connect(null, mapDispatchToProps)(AddProductForm);