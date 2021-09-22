import axios from "axios";

const TOKEN = 'token'
const GET_CART_ITEMS = "get_cart_items";

const _getCartItems = (items) => ({
  type: GET_CART_ITEMS,
  items,
});

export const getCartItems = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if(token){
      const res = await axios.get(`/api/items/`,{
        headers:{
          authorization: token
        }
      });
      return dispatch(_getCartItems(res.data));}
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
