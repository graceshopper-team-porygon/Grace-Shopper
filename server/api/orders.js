const router = require("express").Router();
const { requireToken } = require("./gatekeeping");
const {
  models: { Order },
} = require("../db");
module.exports = router;

router.put("/", requireToken, async (req, res, next) => {
  try {
    //fingure out how to get orderId from req.body
    const order = await Order.findByPk(req.body.orderId);
    console.log("TOTALL BACKEND", req.total);
    order.update({ status: "Complete", total: req.body.total });
    res.json(order);
  } catch (error) {
    next(error);
  }
});
