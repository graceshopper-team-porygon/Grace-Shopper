import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { fetchAllUsers } from "../store/users";
import { Box, AppBar, Toolbar, Typography, Button, Badge } from "@material-ui/core";
import {
  Home,
  ShoppingCartOutlined,
  Group,
  AddCircleOutline,
} from "@material-ui/icons";
import { clearCart, getCartItems, _getCartItems } from "../store/cartItems";
import { clearUsers } from "../store/users";
import {me} from '../store/auth'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      cartCount: 0
    }
  }

  async componentDidMount(){
    this.props.me()
    if (window.localStorage.getItem("cart")) {
      await this.props.setCart(JSON.parse(window.localStorage.getItem("cart")));
    } else {
    await this.props.getCartItems();
    }
    this.setState({
      cartCount: this.props.cartItems.map(item => item.quantity).reduce((acc, cur) => acc + cur, 0)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    let newCount = this.props.cartItems.map(item => item.quantity).reduce((acc, cur) => acc + cur, 0)
    if (prevState.cartCount !== newCount) {
      this.setState({
        cartCount: newCount
      })
    }
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
                    <Badge badgeContent={this.state.cartCount} color="primary">
                      <ShoppingCartOutlined />
                    </Badge>
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
                      <Badge badgeContent={this.state.cartCount} color="primary">
                        <ShoppingCartOutlined />
                      </Badge>
                    </Button>
                  </Link>
                  <Button onClick={handleClick}>Logout</Button>
                  <Link to={"/addproduct"}>
                    <Button endIcon={<AddCircleOutline />}>New Product</Button>
                  </Link>
                  <Link to="/users">
                    <Button endIcon={<Group />}>Users List</Button>
                  </Link>
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
                      <Badge badgeContent={this.state.cartCount} color="primary">
                        <ShoppingCartOutlined />
                      </Badge>
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
    isAdmin: !!state.auth.isAdmin,
    cartItems: state.cartItems
  };
};

const mapDispatch = (dispatch) => {
  return {
    me(){
      dispatch(me())
    },
    getCartItems: () => dispatch(getCartItems()),
    setCart: (cart) => dispatch(_getCartItems(cart)),
    handleClick() {
      dispatch(logout());
      dispatch(clearCart());
      dispatch(clearUsers());
    },

    fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
