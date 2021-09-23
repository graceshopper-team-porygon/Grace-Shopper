import React from "react";
import { connect } from "react-redux";
import { createProduct } from "../store/products";

export class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      quantity: "",
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addProduct({ ...this.state });
  }

  render() {
    const { name, price, quantity, description } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="product_name">
              <small>Product Name</small>
            </label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>
              <small>Price</small>
            </label>
            <input name="price" value={price} onChange={this.handleChange} />
          </div>
          <div>
            <label>
              <small>Quantity</small>
            </label>
            <input
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>
              <small>Description</small>
            </label>
            <textarea
              name="description"
              rows="4"
              cols="40"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    addProduct: (product) => {
      dispatch(createProduct(product, history));
    },
  };
};

export default connect(null, mapDispatch)(AddProduct);
