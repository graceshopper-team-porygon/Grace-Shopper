import axios from "axios";

const TOKEN = "token";

const CLOSE_ORDER = "CLOSE_ORDER";

const SET_ORDER = "SET_ORDER";

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
  switch (action) {
    case SET_ORDER:
      return { ...state, ...action.order };
    case CLOSE_ORDER:
      console.log(action);
      return action.order;
    default:
      return state;
  }
}
