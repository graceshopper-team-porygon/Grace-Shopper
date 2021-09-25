import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems, removeCartItem } from "../store/cartItems";
import React, { useState, useEffect } from "react";
// import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { didFetch: false };
  }
  async componentDidMount() {
    await this.props.getCartItems();
    this.setState({ didFetch: true });
  }

  checkoutClickHandler() {}

  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.cartItems.map((item) => (
                <TableRow
                  key={item.product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.product.name}
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    {(item.quantity * (item.product.price / 100)).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {/* want to send the whole item so that i can increase the quanitity in the products db */}
                    <Button onClick={() => this.props.removeCartItem(item.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to="/checkout">
<<<<<<< HEAD
          <Button onClick={() => this.checkoutClickHandler()}>Checkout</Button>
=======
          <Button onClick={() => console.log("clicked!")}>Checkout</Button>
>>>>>>> 7b58d9943f7d3118724b5883bb23c9cade51a661
        </Link>
        <Link to="/">
          <Button>Back to Products</Button>
        </Link>
        <div>
          Total: {(this.props.cartItems.map((item) => item.quantity * item.product.price).reduce((prev, curr) => prev + curr, 0) / 100).toFixed(2)}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    cartItems: state.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCartItems: () => dispatch(getCartItems()),
    removeCartItem: (id) => dispatch(removeCartItem(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
