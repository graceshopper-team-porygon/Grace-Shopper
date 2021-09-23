const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeeping");

router.get("/", async (req, res, next) => {
  try {
    const result = await Product.findAll();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await Product.findByPk(req.params.id);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//need to add requireToken and isAdmin after verify that this works through browser
router.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    res.send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
