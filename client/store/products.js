import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';

const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  }
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get('/api/products');
      const data = result.data;
      dispatch(setProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
};

export default function productsReducer (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
};
