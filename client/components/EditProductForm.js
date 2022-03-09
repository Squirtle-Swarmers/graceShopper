import React from "react";
import { connect } from "react-redux";
import { fetchSingleProductThunk, updateSingleProductThunk } from '../store/singleProduct'

class EditProductForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            price: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.setProduct(this.props.product.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.product !== this.props.product) {
            this.setState({
                name: this.props.product.name || "",
                price: this.props.product.price || 0,
            });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.updateProduct({ ...this.props.product, ...this.state });
    }
    render() {
        console.log("// [ EditProductForm ] - props", this.props)
        return (
            <div>
                <h4> Update this Product's Information: </h4>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name"> Name: </label>
                    <input
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.name}
                    />

                    <label htmlFor="price"> Price </label>
                    <input
                        name="price"
                        onChange={this.handleChange}
                        value={this.state.price}
                    />

                    <button type="submit"> Update </button>
                </form>
                <hr />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(" // [ EditProductForm/mapstateToProps] - state: ", state)
    return {
        product: state.singleProduct,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProduct: (product) => dispatch(updateSingleProductThunk(product)),
        setProduct: (productId) => fetchSingleProductThunk(productId),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm);