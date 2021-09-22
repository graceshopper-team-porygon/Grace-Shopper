import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Paper,
  withStyles,
} from "@material-ui/core";
import { KeyboardArrowLeft, AddShoppingCart } from "@material-ui/icons";

const useStyles = (theme) => ({
  root: {
    maxWidth: "100%",
    maxHeight: 645,
    margin: "auto",
    "align-content": "center",
  },
  media: {
    height: "100%",
    width: 200,
    "border-top-left-radius": "10px",
    "border-bottom-right-radius": "10px",
  },
});

class SingleProduct extends Component {
  componentDidMount() {
    const productID = this.props.match.params.id;
    this.props.fetchSingleProduct(productID);
  }

  render() {
    console.log("PROPS", this.props);
    const { classes, product } = this.props;

    return (
      <div>
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
            <Typography gutterBottom variant="subtitle1" component="div">
              {product.description}
            </Typography>
            <br />
            <Typography gutterBottom variant="body1" component="div">
              Price: ${product.price}
              <br />
              {product.quantity <= 3 && product.quantity > 0
                ? `Only ${product.quantity} in Stock!`
                : product.quantity === 0
                ? "Out of Stock"
                : "In Stock"}
            </Typography>
          </CardContent>

          <CardActions>
            <Link to={"/products"}>
              <Button startIcon={<KeyboardArrowLeft />} size="small">
                All Products
              </Button>
            </Link>
            <Button endIcon={<AddShoppingCart />} size="small">
              Add To Cart
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(useStyles)(SingleProduct));
