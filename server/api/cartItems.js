const router = require("express").Router();
const {
  models: { User, CartItem, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.authorization);
    const items = await CartItem.findAll({
      where: { userId: id },
      include: { model: Product },
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});
