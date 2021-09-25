import axios from "axios";

const TOKEN = "token";

const REMOVE_CART_ITEM = "remove_cart_items";
const _removeCartItem = (id) => ({
  type: REMOVE_CART_ITEM,
  id,
});

const GET_CART_ITEMS = "get_cart_items";
const _getCartItems = (items) => ({
  type: GET_CART_ITEMS,
  items,
});

const ADD_TO_CART = "add_to_cart";
const _addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  cartItem,
});

const UPDATE_CART = "update_cart";
const _updateCart = (cartItem) => ({
  type: UPDATE_CART,
  cartItem,
});

const CLEAR_CART = "clear_cart";
export const clearCart = () => ({
  type: CLEAR_CART,
});

export const removeCartItem = (cartItemId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        //remove
        const res = await axios.delete(`/api/items/${cartItemId}`, {
          headers: { authorization: token },
        });

        dispatch(_removeCartItem(cartItemId));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const addToCart = (product, quantity = 1) => {
  return async (dispatch) => {
    try {
      let token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await axios.post(
          "/api/items",
          { product, quantity },
          {
            headers: { authorization: token },
          }
        );
        dispatch(_addToCart(res.data));

        //if no token, create temporary user, and then pass their token
        //we want the new item back so we pass it into the action creat
      }
    } catch (error) {
      //is it already in the cart? increment quantity
      //decrement quantity in the products database
      console.log(error);
    }
  };
};

export const updateCart = (productId, quantity = 1) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await axios.put(
          `/api/items`,
          {
            productId,
            quantity,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        // console.log(res.data);
        dispatch(_updateCart(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//put request

export const getCartItems = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await axios.get(`/api/items/`, {
          headers: {
            authorization: token,
          },
        });
        return dispatch(_getCartItems(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_CART:
      console.log(action);
      const newItems = state.map((item) => {
        if (item.id === action.cartItem.id)
          item.quantity = action.cartItem.quantity;
        return item;
      });
      return newItems;
    case REMOVE_CART_ITEM:
      const newCartItems = state.filter(
        (cartItem) => cartItem.id !== action.id
      );
      return newCartItems;
    case ADD_TO_CART:
      return [...state, action.cartItem];
    case GET_CART_ITEMS:
      return action.items;
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}
