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

router.post("/", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.authorization);
    let newItem = await CartItem.create({
      quantity: req.body.quantity,
      userId: id,
      productId: req.body.product.id,
    });
    //decrement from product quantity in database
    const product = await Product.findByPk(req.body.product.id);
    product.update({ quantity: product.quantity - req.body.quantity });
    //make sure cartItems array gets an item that includes a product before getCartItems is called
    newItem = await CartItem.findOne({
      where: { id: newItem.id },
      include: Product,
    });
    res.json(newItem);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.authorization);
    const updatedItem = await CartItem.findOne({
      where: { productId: req.body.productId, userId: id },
    });
    await updatedItem.update({
      quantity: updatedItem.quantity + req.body.quantity,
    });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findByPk(id);
    const product = await Product.findByPk(cartItem.productId);
    product.update({ quantity: product.quantity + cartItem.quantity });
    await cartItem.destroy();
    res.send(cartItem);
  } catch (error) {
    next(error);
  }
});

// router.delete("/", async (req, res, next) => {
//   try {
//     const { id } = await User.findByToken(req.headers.authorization);
//     const cartItemsToDestroy = await CartItem.findAll({
//       where: {
//         userId: id }
//       })
//     await cartItemsToDestroy.destroy();
//     res.send(cartItemsToDestroy);
//   } catch (error) {
//     next(error)
//   }
// })
