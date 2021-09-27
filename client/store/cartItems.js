import axios from "axios";

const TOKEN = "token";
const CART = "cart";

const REMOVE_CART_ITEM = "remove_cart_items";
const _removeCartItem = (cartItem) => ({
  type: REMOVE_CART_ITEM,
  cartItem,
});

const GET_CART_ITEMS = "get_cart_items";
export const _getCartItems = (items) => ({
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

export const removeCartItem = (cartItem) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        //remove
        const res = await axios.delete(`/api/items/${cartItem.id}`, {
          headers: { authorization: token },
        });
        
      } else {
        const lsCart = JSON.parse(window.localStorage.getItem(CART));
        if (lsCart) {
          const newLsCart = lsCart.filter((item) => item.productId !== cartItem.product.id);
          window.localStorage.setItem(CART, JSON.stringify(newLsCart))
        }
      }
      dispatch(_removeCartItem(cartItem));
    } catch (e) {
      console.log(e);
    }
  };
};

//going to try to take care of all guest cart in one thunk rather than splitting into updateCart as well
export const addToCart = (product, quantity = 1) => {
  return async (dispatch) => {
    try {
      let token = window.localStorage.getItem(TOKEN);
      if (token) {
        console.log("in cart items token");
        const res = await axios.post(
          "/api/items",
          { product, quantity },
          {
            headers: { authorization: token },
          }
        );
        dispatch(_addToCart(res.data));

        //if no token, check if there's a cart on the local storage.
        //If there is, add this item to it.
      } else if (window.localStorage.getItem(CART)) {
        const lsCart = JSON.parse(window.localStorage.getItem(CART));
        console.log("in add to cart else if: lsCart", lsCart);
        //if that productId already exists, add it.
        for (let i = 0; i < lsCart.length; i++) {
          if (lsCart[i].productId === product.id) {
            console.log("found matching product id");
            lsCart[i].quantity = lsCart[i].quantity + 1;
            break;
            //if you've made it to the end and haven't updated, create new product object on cart
          } else if (i === lsCart.length - 1) {
            console.log("didnt find match, i: ", i);
            lsCart.push({
              productId: product.id,
              quantity: 1,
              product,
            });
            break;
          }
        }
        window.localStorage.setItem(CART, JSON.stringify(lsCart));
      } else {
        //if there's not, create a cart with this item
        // (they've just landed on page for first time)
        console.log("in add to cart else: creating cart", product);
        const newItem = [
          {
            productId: product.id,
            quantity: 1,
            product,
          },
        ];
        window.localStorage.setItem(CART, JSON.stringify(newItem));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCart = (productId, quantity = 1, inCart = false) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await axios.put(
          `/api/items`,
          {
            productId,
            quantity,
            inCart,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(_updateCart(res.data));
      } else {
        const lsCart = JSON.parse(window.localStorage.getItem(CART));
        if (lsCart) {
          for (let i = 0; i < lsCart.length; i++) {
            if (lsCart[i].productId === +productId) {
              lsCart[i].quantity = quantity;
            }
          }

          const updatedItem = lsCart.filter(
            (item) => item.productId === +productId
          );

          window.localStorage.setItem(CART, JSON.stringify(lsCart));
          dispatch(_updateCart(updatedItem[0]));
        }
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
      const newItems = state.map((item) => {
        console.log("REDUCER", action.cartItem);
        if (item.productId === action.cartItem.productId)
          item.quantity = action.cartItem.quantity;
        return item;
      });
      return newItems;
    case REMOVE_CART_ITEM:
      const newCartItems = state.filter(
        (cartItem) => cartItem.product.id !== action.cartItem.product.id
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
