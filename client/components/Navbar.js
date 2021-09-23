import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import  { Home, ShoppingCartOutlined } from '@material-ui/icons';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Plants & Pants
        </Typography>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to={"/"}>
                <Button><Home /></Button>
              </Link>
              <Link to='/myCart'>
                <Button><ShoppingCartOutlined /></Button>
              </Link>
              <Button onClick={handleClick}>
              {/* <a href="#" onClick={handleClick}>
                Logout
              </a> */}
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
        <hr />
      </Toolbar>
    </AppBar>
  </Box>
);

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
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
