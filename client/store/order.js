import axios from "axios";

const TOKEN = "token";

const CLOSE_ORDER = "CLOSE_ORDER";

const _closeOrder = (order) => ({
  type: CLOSE_ORDER,
  order,
});

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
        dispatch(_closeOrder(res.data.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
