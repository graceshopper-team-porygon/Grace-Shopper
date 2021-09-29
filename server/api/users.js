const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { isAdmin, requireToken } = require("./gatekeeping");
module.exports = router;

//we want to put requireToken and isAdmin on all api routes!

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "createdAt"],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id);
    await userToDelete.destroy();
    res.send(userToDelete);
  } catch (err) {
    next(err);
  }
});
