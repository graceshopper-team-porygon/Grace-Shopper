const router = require("express").Router();
const { requireToken } = require("./gatekeeping");
const {
  models: { Order },
} = require("../db");
module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    let existOrder = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: "In Progress",
      },
    });
    //sends an array w mystery boolean
    res.send(existOrder[0]);
  } catch (error) {
    next(error);
  }
});

// router.post("/", requireToken, async (req, res, next) => {
//   try {
//     let newOrder = await Order.create({ userId: req.user.id });
//     res.send(newOrder);
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
      },
    });
    order.update({ status: "Complete", total: req.body.total });
    res.json(order);
  } catch (error) {
    next(error);
  }
});
