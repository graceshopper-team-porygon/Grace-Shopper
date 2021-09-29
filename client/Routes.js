import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Checkout from "./components/Checkout";
import Users from "./components/Users";

/**
 * COMPONENT
 */
class Routes extends Component {


  render() {

    return (
      <div>
      
        <Switch>
          <Route path="/" exact component={AllProducts} />
          <Route path="/products/:id" exact component={SingleProduct} />
          <Route path="/myCart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/users" component={Users} />
        </Switch>
      
      </div>
    );
  }
}


export default withRouter(Routes);
