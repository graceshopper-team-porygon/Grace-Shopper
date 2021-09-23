import { connect } from "react-redux";
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

  render() {
    return (
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
            {props.cartItems.map((item) => (
              <TableRow
                key={item.product.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.product.name}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  {(item.quantity * item.product.price).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button onClick={() => this.props.removeCartItem(item.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    getCartItems: (user) => dispatch(getCartItems(user)),
    removeCartItem: (id) => dispatch(removeCartItem(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
