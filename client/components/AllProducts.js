import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    maxWidth: 345,
    margin: 'auto'
  },
  media: {
    height: '100%',
    width: '100%'
  }
})

export class AllProducts extends React.Component {
  constructor() {
    super()
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    console.log(this.props.products)
    const {classes} = this.props;
    return (
      <div>
        <Grid container>
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
                    Price: {plant.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
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
