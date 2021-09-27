import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { fetchAllUsers } from "../store/users";
import { Box, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import {
  Home,
  ShoppingCartOutlined,
  Group,
  AddCircleOutline,
} from "@material-ui/icons";
import { clearCart } from "../store/cartItems";
import { getAuth, me } from "../store/auth";

// const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
// import  { Home, ShoppingCartOutlined } from '@material-ui/icons';
// import { clearCart } from "../store/cartItems"
// import {getAuth,me} from '../store/auth'

class Navbar extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.me();
  }
  render() {
    const { isLoggedIn, isAdmin, handleClick } = this.props;

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: "#458a55" }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Plants & Pants
            </Typography>
            <nav>
              {isLoggedIn && !isAdmin ? (
                <div>
                  {/* The navbar will show these links after you log in */}
                  <Link to={"/"}>
                    <Button>
                      <Home />
                    </Button>
                  </Link>
                  <Link to="/myCart">
                    <Button>
                      <ShoppingCartOutlined />
                    </Button>
                  </Link>
                  <Button onClick={handleClick}>Logout</Button>
                </div>
              ) : isLoggedIn && isAdmin ? (
                <div>
                  {/* The navbar will show these links after you log in IF YOU ARE ADMIN */}
                  <Link to={"/"}>
                    <Button>
                      <Home />
                    </Button>
                  </Link>
                  <Link to="/myCart">
                    <Button>
                      <ShoppingCartOutlined />
                    </Button>
                  </Link>
                  <Button onClick={handleClick}>Logout</Button>
                  <Link to={"/addproduct"}>
                    <Button endIcon={<AddCircleOutline />}>New Product</Button>
                  </Link>
                  <Link to="/users">
                    <Button endIcon={<Group />}>Users List</Button>
                  </Link>
                  <Button onClick={this.props.handleClick}>Logout</Button>
                </div>
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <Link to={"/"}>
                    <Button>
                      <Home />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                  <Link to="/myCart">
                    <Button>
                      <ShoppingCartOutlined />
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
            <br />
          </Toolbar>
        </AppBar>
        <Toolbar />
        <div>
          <br />
        </div>
      </Box>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    users: state.users,
    isAdmin: !!state.users.length,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearCart());
    },
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    // getAuth(){
    //   dispatch(getAuth())
    // }
    me() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
