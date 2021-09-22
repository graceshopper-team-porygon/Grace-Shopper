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
<<<<<<< HEAD
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.authorization);
    const product = req.body.product;
    const newItem = await CartItem.create({
      quantity: req.body.quantity,
      userId: id,
      productId: product.id,
    });
    res.json(newItem);
  } catch (error) {
    next(error);
  }
});
router.put("/api/item", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.authorization);
    const updatedItem = await CartItem.findOne({
      where: { productId: req.body.product.id, userId:id },
    });
    await updatedItem.update({quantity: updatedItem.quantity + req.body.quantity})
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findByPk(id);
    await cartItem.destroy();
    res.send(cartItem);
  } catch (error) {
    next(error);
=======
>>>>>>> 3496507a58e5900dc876e5bdaa37623b7696133d
  }
});
