import { connect } from "react-redux";
import { getCartItems } from "../store/cartItems";
//import React from 'react'
import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
    return (
      <TableContainer component={Paper}>
          <Table sx = {{minWidth:650}} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align = "right">Quantity</TableCell>
                      <TableCell align = "right">Total Cost</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {this.props.cartItems.map(item=>(
                      <TableRow key= {item.product.name} sx={{'&:last-child td, &:last-child th':{border:0}}}>
                          <TableCell component = 'th'scope = 'row'>{item.product.name}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align = "right">{(item.quantity*item.product.price).toFixed(2)}</TableCell>
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
  return { getCartItems: (user) => dispatch(getCartItems(user)) };
};

export default connect(mapState, mapDispatch)(Cart);
