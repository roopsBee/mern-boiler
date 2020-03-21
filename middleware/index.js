const { check, validationResult } = require("express-validator");

//all middleware goes here

const middlewareObj = {};

// look up express validator and create middlewares for each field

middlewareObj.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(500).json({ msg: "incorrect credentials" });
};

middlewareObj.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(500).json({ msg: "You are already logged in" });
  }
  return next();
};

middlewareObj.userExists = (req, res, next) => {};

middlewareObj.validateEmail = (req, res, next) => {};

module.exports = middlewareObj;
