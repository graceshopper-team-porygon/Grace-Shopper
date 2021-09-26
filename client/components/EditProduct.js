import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEditProduct } from "../store/products";

import {
  Button,
  Box,
  FormControl,
  FilledInput,
  InputLabel,
  Input,
} from "@material-ui/core";
import { PlaylistAddCheck } from "@material-ui/icons";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
      price: "",
      description: "",
      imageUrl: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.setState({
        name: this.props.product.name,
        quantity: this.props.product.quantity,
        price: this.props.product.price,
        description: this.props.product.description,
        imageUrl: this.props.product.imageUrl,
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
    this.props.fetchEditProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const { name, quantity, price, description, imageUrl } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="form-container">
        <h4>UPDATE PRODUCT</h4>
        <form onSubmit={handleSubmit} className="form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="input"
          />
          <br />

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            className="input"
          />
          <br />

          <label>Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            className="input"
          />
          <br />

          <label>Description</label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            className={"text-box"}
          />
          <br />

          <label>Product Image</label>
          <input
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
            className={"edit-img"}
          />
          <br />

          <Button
            variant="contained"
            type="submit"
            size="small"
            endIcon={<PlaylistAddCheck />}
          >
            Submit Changes
          </Button>
        </form>

        {/* MATERIAL UI FORM */}
        {/* <Box>
          <form>
            <FormControl onSubmit={handleSubmit}>
              <InputLabel>Name</InputLabel>
              <FilledInput name="name" value={name} onChange={handleChange} />
            </FormControl>

            <br />

            <Button type="submit">
              <PlaylistAddCheck />
            </Button>
          </form>
        </Box> */}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchEditProduct: (product) => dispatch(fetchEditProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(EditProduct);
