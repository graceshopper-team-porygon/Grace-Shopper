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
    let order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: "In Progress"
      }
    })
    console.log(order)
    let newItem = await CartItem.create({
      quantity: req.body.quantity,
      userId: req.user.id,
      productId: req.body.product.id,
      curPrice: req.body.product.price,
      orderId: order.id
    });
    console.log('before product', newItem)
    // decrement from product quantity in database
    // const product = await Product.findByPk(req.body.product.id);
    //make sure cartItems array gets an item that includes a product before getCartItems is called
    newItem = await CartItem.findOne({
      where: { id: newItem.id },
      include: Product,
    });
    console.log('after product', newItem)
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
    //  const product = await Product.findByPk(req.body.productId);
    if (req.body.inCart) updatedItem.update({ quantity: req.body.quantity });
    else
      updatedItem.update({
        quantity: updatedItem.quantity + req.body.quantity,
      });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findByPk(id);
    if (cartItem.userId === req.user.id) {
      await cartItem.destroy();
      res.send(cartItem);
    }
  } catch (error) {
    next(error);
  }
});
