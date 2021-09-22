const router = require('express').Router();

const { models: { Product } }= require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const result = await Product.findAll();
    res.send(result);
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await Product.findByPk(req.params.id);
    res.send(result);
  } catch (err) {
    next(err)
  }
});
