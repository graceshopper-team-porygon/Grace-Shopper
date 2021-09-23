const { models } = require("../db/");

//checks if user is logged in (cant just sneak in postman)
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("got here>>>>>>", token);
    const user = await models.User.findByToken(token);
    console.log("is there a user????", user);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

//checks if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send("no way buddy");
  else next();
};

module.exports = { isAdmin, requireToken };
