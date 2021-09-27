import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const CREATE_PRODUCTS = "CREATE_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

const TOKEN = "token";

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

const _deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

const _editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
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
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: created } = await axios.post("/api/products", product, {
          headers: { authorization: token },
        });
        dispatch(_createProducts(created));
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDeleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.delete(`/api/products/${id}`, {
          headers: { authorization: token },
        });
        dispatch(_deleteProduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchEditProduct = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: created } = await axios.put(
          `/api/products/${product.id}`,
          product,
          {
            headers: { authorization: token },
          }
        );
        dispatch(_editProduct(created));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    case EDIT_PRODUCT:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    default:
      return state;
  }
}
