const router = require('express').Router();

//is this the name of model and where it is located and how it is exported?
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
