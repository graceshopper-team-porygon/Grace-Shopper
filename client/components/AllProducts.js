import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import { addToCart, getCartItems, updateCart } from "../store/cartItems";
import {
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import { PlaceTwoTone } from "@material-ui/icons";

const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 445,
    margin: "auto",
  },
  media: {
    height: 200,
    width: "100%",
  },
});

export class AllProducts extends React.Component {
  constructor() {
    super();
    this.addClickHandler = this.addClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
    this.props.getCartItems();
  }
  addClickHandler(product) {
    const isItemInCart = this.props.cartItems.filter(
      (item) => item.productId === product.id
    );
    const idxOfProd = this.props.products.indexOf(product);
    this.props.products[idxOfProd].quantity--;
    if (isItemInCart.length !== 1) {
      this.props.addToCart(product);
    } else {
      this.props.updateCart(product.id);
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={3} justifyContent="center">
          {this.props.products.map((product) => (
            <Grid item key={product.id} xs={12} md={6} lg={4}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    Price: ${(product.price / 100).toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/products/${product.id}`}>
                    <Button size="small">Learn More</Button>
                  </Link>
                  <Button
                    onClick={() => this.addClickHandler(product)}
                    size="small"
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    cartItems: state.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addToCart: (item) => dispatch(addToCart(item)),
    getCartItems: () => dispatch(getCartItems()),
    updateCart: (productId, qty = 1) => dispatch(updateCart(productId, qty)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(useStyles)(AllProducts));
