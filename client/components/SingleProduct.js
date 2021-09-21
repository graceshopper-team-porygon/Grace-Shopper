import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSingleProduct } from "../store/singleProduct";

class SingleProduct extends Component {
  render() {
    return (
      <div>
        <h1></h1>
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
