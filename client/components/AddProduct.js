import React from "react";
import { connect } from "react-redux";
import { createProduct } from "../store/products";

import { Button } from "@material-ui/core";
import { AddBoxOutlined } from "@material-ui/icons";

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
      <div className="form-container">
        <h4>ADD PRODUCT</h4>
        <form onSubmit={this.handleSubmit} className="add-form">
          <label htmlFor="product_name">
            <small>Product Name</small>
          </label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange}
            className="input"
          />
          <label>
            <small>Price</small>
          </label>
          <input
            name="price"
            value={price}
            onChange={this.handleChange}
            className="input"
          />
          <label>
            <small>Quantity</small>
          </label>
          <input
            name="quantity"
            value={quantity}
            onChange={this.handleChange}
            className="input"
          />
          <label>
            <small>Description</small>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={this.handleChange}
            className={"text-box"}
          />
          <br />
          {/* <button type="submit">Add Product</button> */}
          <Button
            variant="contained"
            type="submit"
            size="small"
            endIcon={<AddBoxOutlined />}
          >
            Submit Changes
          </Button>
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
