const router = require("express").Router();
const { requireToken } = require("./gatekeeping");
const {
  models: { Order },
} = require("../db");
module.exports = router;

router.put("/", requireToken, async (req, res, next)=>{
  try {
    //fingure out how to get orderId from req.body
    const order = await Order.findByPk()
    //figure out how to get total from req.body
    order.update({ status: "Complete", total: })
    res.json(order);
  } catch (error) {
    next(error)
  }
})
