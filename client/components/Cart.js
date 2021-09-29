import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCartItems,
  removeCartItem,
  clearCart,
  updateCart,
  addToCart,
} from "../store/cartItems";
import order, { closeOrder, setOrder } from "../store/order";
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Delete, Done } from "@material-ui/icons";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      didFetch: false,
      quantity: {},
      total: 0,
      updated: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.getCartItems();
    const quantities= this.props.cartItems.reduce((acc, curr)=>(
      {...acc, [curr.productId]:curr.quantity}
    ),{})

    this.setState({
      didFetch: true,
      total: this.props.cartItems
        .map((item) => item.quantity * item.product.price)
        .reduce((prev, curr) => prev + curr, 0),
        quantity: quantities
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const total = this.props.cartItems
      .map((item) => item.quantity * item.product.price)
      .reduce((prev, curr) => prev + curr, 0);

    if (prevState.total !== total) {
      this.setState({ total });
    }
  }

  checkoutClickHandler() {
    if (window.localStorage.getItem("token")) {
      const orderId = this.props.cartItems[0].orderId;
      const total = this.state.total;
      const order = { total, orderId };
      this.props.clearCart();
      this.props.closeOrder(order);
    }
  }

  handleChange(e) {
    this.setState({
      quantity: {
        ...this.state.quantity,
        [e.target.name]: e.target.value,
      },
      updated: true,
    });

    this.props.updateCart(e.target.name, e.target.value, true);
  }
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

            {!this.state.didFetch ? (
              <TableBody>
                <TableRow>
                  <TableCell>Loading...</TableCell>
                </TableRow>
              </TableBody>
            ) : this.props.cartItems.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell>Time to go shopping</TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {this.props.cartItems.map((item) => (
                  <TableRow
                    key={item.product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.product.name}
                    </TableCell>
                    <TableCell align="right">
                      <Select
                        name={item.product.id.toString()}
                        value={
                          this.state.quantity[item.product.id]
                            ? this.state.quantity[item.product.id]
                            : ""
                        }
                        onChange={this.handleChange}
                      >
                        {Array(item.quantity < 10 ? 10 : item.quantity + 5)
                          .fill("")
                          .map((x, i) => {
                            return (
                              <MenuItem key={i} value={i + 1}>
                                {i + 1}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      <Button onClick={() => this.props.removeCartItem(item)}>
                        <Delete />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {(item.quantity * (item.product.price / 100)).toFixed(2)}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell />
                  <TableCell></TableCell>
                  <TableCell />
                  <TableCell align="right">
                    Total:
                    {(this.state.total / 100).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {window.localStorage.getItem("token") ? (
          <Link to="/checkout">
            <Button onClick={() => this.checkoutClickHandler()}>
              Checkout
            </Button>
          </Link>
        ) : (
          <Link to="/signup">
            <Button onClick={() => this.checkoutClickHandler()}>
              Checkout
            </Button>
          </Link>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    cartItems: state.cartItems,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCartItems: () => dispatch(getCartItems()),
    removeCartItem: (item) => dispatch(removeCartItem(item)),
    addToCart: (item, qty) => dispatch(addToCart(item, qty)),
    closeOrder: (order) => dispatch(closeOrder(order)),
    clearCart: () => dispatch(clearCart()),
    updateCart: (productId, quantity, inCart) =>
      dispatch(updateCart(productId, quantity, inCart)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
