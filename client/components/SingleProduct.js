import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import { fetchSingleProduct } from "../store/singleProduct";
import { addToCart, getCartItems, updateCart } from "../store/cartItems";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import { KeyboardArrowLeft, AddShoppingCart } from "@material-ui/icons";

const useStyles = () => ({
  root: {
    maxWidth: "100%",
    maxHeight: 800,
    margin: 25,
    display: "flex",
    "padding-bottom": 25,
    "justify-content": "flex-start",
  },
  media: {
    height: 350,
    width: 250,
    "justify-content": "center",
    "border-top-left-radius": "15px",
    "border-bottom-right-radius": "15px",
  },
  content: {
    display: "flex",
    "flex-direction": "column",
    "align-content": "center",
  },
  content1: {
    "padding-top": 25,
    "flex-grow": 5,
  },
  content2: {
    "flex-grow": 1,
  },
  buttons: {
    margin: 25,
    "justify-content": "space-between",
  },
  hr: {
    margin: 25,
  },
});

class SingleProduct extends Component {
  constructor() {
    super();

    this.addClickHandler = this.addClickHandler.bind(this);
  }

  async componentDidMount() {
    const productID = this.props.match.params.id;
    this.props.fetchSingleProduct(productID);
    this.props.getCartItems();
  }

  addClickHandler(product) {
    const isItemInCart = this.props.cartItems.filter(
      (item) => item.productId === product.id
    );
    this.props.product.quantity--;
    product.orderId = this.props.order.id;
    if (isItemInCart.length !== 1) {
      this.props.addToCart(product);
    } else {
      this.props.updateCart(product.id);
    }
  }

  render() {
    const { classes, product, isAdmin } = this.props;

    return (
      <div>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            component="img"
            image={product.imageUrl}
            alt={product.name}
          />

          <hr className={classes.hr} />

          <CardContent className={classes.content}>
            <div className={classes.content1}>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.description}
              </Typography>
            </div>

            <div className={classes.content2}>
              <Typography gutterBottom variant="body1" component="div">
                Price: ${(product.price / 100).toFixed(2)}
                <br />
                {product.quantity <= 3 && product.quantity > 0
                  ? `Only ${product.quantity} in Stock!`
                  : product.quantity === 0
                  ? "Out of Stock"
                  : "In Stock"}
              </Typography>
            </div>
          </CardContent>
        </Card>

        <CardActions className={classes.buttons}>
          <Link to={"/"}>
            <Button startIcon={<KeyboardArrowLeft />} size="small">
              All Products
            </Button>
          </Link>
          <Button
            onClick={() => this.addClickHandler(product)}
            endIcon={<AddShoppingCart />}
            size="small"
          >
            Add To Cart
          </Button>
        </CardActions>

        {isAdmin ? (
          // EDIT PRODUCT FORM APPEARS ONLY IF YOU ARE ADMIN
          <div>
            <div>
              <hr />
              <EditProduct />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    cartItems: state.cartItems,
    isAdmin: !!state.users.length,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addToCart: (product, quantity = 1) =>
      dispatch(addToCart(product, quantity)),
    getCartItems: () => dispatch(getCartItems()),
    updateCart: (productID, quantity = 1) =>
      dispatch(updateCart(productID, quantity)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(useStyles)(SingleProduct));
