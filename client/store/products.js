import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const CREATE_PRODUCTS = "CREATE_PRODUCTS";

const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

const _createProducts = (product) => {
  return {
    type: CREATE_PRODUCTS,
    product,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get("/api/products");
      const data = result.data;
      dispatch(setProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createProduct = (product, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post("/api/product", product);
    dispatch(_createProducts(created));
    history.push("/");
  };
};

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
