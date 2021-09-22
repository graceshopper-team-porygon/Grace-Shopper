import axios from "axios";

const GET_CART_ITEMS = "get_cart_items";

const _getCartItems = (items) => ({
  type: GET_CART_ITEMS,
  items,
});

export const getCartItems = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/items/${id}`);
      dispatch(_getCartItems(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.items;
    default:
      return state;
  }
}
