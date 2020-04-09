const { check, validationResult } = require("express-validator");
const { alreadyLoggedIn, notLoggedIn } = require("../routes/responses");
const List = require("../models/ListModel");

const {
  serverError,
  notOwnerOfList,
  listNotFound,
  validationError,
} = require("../routes/responses");

//all middleware goes here

const middlewareObj = {};

// look up express validator and create middlewares for each field

middlewareObj.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(500).json(notLoggedIn);
};

middlewareObj.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    const { name, email } = req.user;
    const user = { name, email };
    return res.status(500).json({ ...alreadyLoggedIn, user });
  }
  return next();
};

middlewareObj.isListExistsAndOwner = async (req, res, next) => {
  const listId = req.params.id;

  try {
    const list = await List.findOne({ _id: listId });
    // check if list exits
    if (!list) {
      return res.status(401).json(listNotFound);
    }
    // check if owner of list
    if (list.user != req.user.id) {
      return res.status(200).json(notOwnerOfList);
    }
    req.list = list;
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
};

middlewareObj.checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ...validationError,
      errors: errors.array(),
    });
  }
  return next();
};

module.exports = middlewareObj;
