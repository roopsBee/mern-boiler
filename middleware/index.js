const { check, validationResult } = require("express-validator");

//all middleware goes here

const middlewareObj = {};

// look up express validator and create middlewares for each field

middlewareObj.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(500).json({
    message: "You are not logged in",
    severity: "error"
  });
};

middlewareObj.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(500).json({
      message: "You are already logged in",
      severity: "error"
    });
  }
  return next();
};

module.exports = middlewareObj;
