const router = require("express").Router();
module.exports = router;

<<<<<<< HEAD
router.use('/users', require('./users'))
router.use('/items', require('./cartItems'))
router.use('/products', require('./products'))
=======
router.use("/users", require("./users"));
router.use("/items", require("./cartItems"));
router.use("/products", require("./products"));
>>>>>>> 3496507a58e5900dc876e5bdaa37623b7696133d

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
