import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products'
import { CardActionArea,
          Card,
          Grid,
          CardActions,
          CardContent,
          CardMedia,
          Button,
          Typography,
          withStyles } from '@material-ui/core';

const useStyles = theme => ({
  root: {
    maxWidth: 345,
    maxHeight: 445,
    margin: 'auto'
  },
  media: {
    height: 200,
    width: '100%'
  }
})

export class AllProducts extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          >
          {this.props.products.map(plant => (
            <Grid item key={plant.id} xs={12} md={6} lg={4}>
              <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    image={plant.imageUrl}
                    alt={plant.name}
                    />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {plant.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Price: ${plant.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                    <Button size="small">Add To Cart</Button>
                  </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(
  mapState,
  mapDispatch)
  (withStyles(useStyles)(AllProducts));
