import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSingleProduct } from "../store/singleProduct";

class SingleProduct extends Component {
  componentDidMount() {
    const productID = this.props.match.params.id;
    this.props.fetchSingleProduct(productID);
  }

  render() {
    return (
      <div>
        <h1>SINGLE PRODUCT</h1>
        <p></p>
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
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
