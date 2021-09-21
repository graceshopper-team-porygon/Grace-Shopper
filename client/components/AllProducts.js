import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products'

export class AllProducts extends React.Component {
  constructor() {
    super()
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      //will need to map over this.props.products and render out cards
      <h1>All Products Page</h1>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts);
