const router = require("express").Router();
const { requireToken } = require("./gatekeeping");
const {
  models: { User, CartItem, Product, Order },
} = require("../db");
module.exports = router;

// router.get("/", requireToken, async (req, res, next) => {
//   try {
//     const items = await CartItem.findAll({
//       where: { userId: req.user.id },
//       include: { model: Product },
//     });
//     res.json(items);
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: "In Progress",
      },
    });
    if (order) {
      const items = await CartItem.findAll({
        where: { orderId: order.id },
        include: { model: Product },
      });
      res.json(items);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    let newItem = await CartItem.create({
      quantity: req.body.quantity,
      userId: req.user.id,
      productId: req.body.product.id,
      curPrice: req.body.product.price,
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

router.put("/", requireToken, async (req, res, next) => {
  try {
    const updatedItem = await CartItem.findOne({
      where: { productId: req.body.productId, userId: req.user.id },
    });
    const product = await Product.findByPk(req.body.productId);
    product.update({ quantity: product.quantity - req.body.quantity });
    updatedItem.update({ quantity: updatedItem.quantity + req.body.quantity });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireToken, async (req, res, next) => {
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
