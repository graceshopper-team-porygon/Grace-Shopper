const router = require('express').Router()
const { models: { User,CartItem }} = require('../db')
module.exports = router


router.get('/:id',async (req, res, next) => {
  try {
    const items = await CartItem.findAll({
where: {userId : req.params.id}
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})