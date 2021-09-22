import React from "react";
import { connect } from "react-redux";
import { getCartItems } from "../store/cartItems";
//get cartItems thunk
//render all the items
//tests
class Cart extends React.Component {
  constructor() {
    super();
    this.state = { didFetch: false };
  }
  async componentDidMount() {
    await this.props.getCartItems(this.props.userId);
    this.setState({ didFetch: true });
  }
  render() {
    if (!this.state.didFetch) return <h1>Loading...</h1>;
    else if (this.props.cartItems.length === 0)
      return <h1>Time to go shopping</h1>; //make this a link back to products
    return this.props.cartItems.map((item, i) => {
      return (
        <div key={i + item.id} className="item-row">
          <div className="item-name">{item.product.name}</div>
          <div className="item-total-price">{item.product.price * item.quantity}</div>
        </div>
      );
    });
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    cartItems: state.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return { getCartItems: (user) => dispatch(getCartItems(user)) };
};

export default connect(mapState, mapDispatch)(Cart);
