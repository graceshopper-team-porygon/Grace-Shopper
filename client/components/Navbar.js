import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Box, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import  { Home, ShoppingCartOutlined } from '@material-ui/icons';
import { clearCart } from "../store/cartItems"
import {getAuth,me} from '../store/auth'


class Navbar extends React.Component{
  constructor(){
    super()
  }
  componentDidMount(){
this.props.me()
  }
  render(){
  return(
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" style={{backgroundColor: "#458a55"}}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Plants & Pants
        </Typography>
        <nav>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to={"/"}>
                <Button><Home /></Button>
              </Link>
              <Link to='/myCart'>
                <Button><ShoppingCartOutlined /></Button>
              </Link>
              <Button onClick={this.props.handleClick}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to={"/"}>
                <Button><Home /></Button>
              </Link>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
              <Link to='/myCart'>
                <Button><ShoppingCartOutlined /></Button>
              </Link>
            </div>
          )}
        </nav>
        <br />
      </Toolbar>
    </AppBar>
    <Toolbar />
    <div>
      <br/>
    </div>
  </Box>
);
}}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearCart())
    },
    // getAuth(){
    //   dispatch(getAuth())
    // }
    me(){
      dispatch(me())
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);
