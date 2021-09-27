import axios from "axios";
import { EDIT_PRODUCT } from "./products";

const SINGLE_PRODUCT = "SINGLE_PRODUCT";

const singleProduct = (product) => {
  return {
    type: SINGLE_PRODUCT,
    product,
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(singleProduct(data));
  };
};

export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.product;
    case EDIT_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
