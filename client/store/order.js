import axios from "axios";

const TOKEN = "token";

const CLOSE_ORDER = "CLOSE_ORDER";

const SET_ORDER = "SET_ORDER";

const SET_TOTAL = "SET TOTAL"

//dispatch this on checkout using total in local state!
export const setTotal=(total)=>({
  type: SET_TOTAL,
  total
})

const _setOrder = (order) => {
  return {
    type: SET_ORDER,
    order,
  };
};

const _closeOrder = (order) => ({
  type: CLOSE_ORDER,
  order,
});



export const setOrder = (data) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const existOrder = await axios.get("api/orders", {
          headers: {
            authorization: token,
          },
        });
        if (existOrder.data === "no open orders") {
          const newOrder = await axios.post("api/orders", data, {
            headers: {
              authorization: token,
            },
          });
          return dispatch(_setOrder(newOrder.data));
        }
        return dispatch(_setOrder(existOrder.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const closeOrder = (order) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await axios.put(
          `/api/orders`,
          {
            orderId: order.orderId,
            total: order.total,
          },
          {
            headers: { authorization: token },
          }
        );
        dispatch(_closeOrder(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    case CLOSE_ORDER:
      return action.order;
    case SET_TOTAL:
      return {...state, ...action.total}
    default:
      return state;
  }
}
