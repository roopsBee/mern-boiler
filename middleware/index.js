const { check, validationResult } = require("express-validator");

//all middleware goes here

const middlewareObj = {};

// look up express validator and create middlewares for each field
middlewareObj.validateEmail = (req, res, next) => {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
};

module.exports = middlewareObj;
