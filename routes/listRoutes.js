const express = require("express");
const { check, validationResult } = require("express-validator");

const {
  checkAuthenticated,
  isListExistsAndOwner,
  checkValidationErrors,
} = require("../middleware");
const List = require("../models/ListModel");
const {
  serverError,
  fetchedLists,
  createList,
  nameExists,
  listDeleted,
} = require("./responses");

const router = express.Router();

// @route   GET /list
// @desc    get all of users lists
// @access  Private
router.get("/", checkAuthenticated, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id }, "name");
    return res.status(200).json({ ...fetchedLists, lists });
  } catch (error) {
    console.log(error);
    return res.status(500).json(serverError);
  }
});

// @route   POST /list
// @desc    create a new list
// @access  Private
router.post(
  "/",
  checkAuthenticated,
  [check("name", "Name is required").not().isEmpty()],
  checkValidationErrors,
  async (req, res) => {
    const name = req.body.name;
    const user = req.user.id;
    const newList = { name, user };

    try {
      const isName = await List.findOne(
        { user: req.user.id, name: name },
        "name"
      );

      if (isName) {
        return res.status(200).json(nameExists);
      }

      list = new List(newList);
      await list.save();
      return res.status(200).json({ ...createList, list });
    } catch (error) {
      console.log(error);
      return res.status(500).json(serverError);
    }
  }
);

// @route   GET /list/:id
// @desc    show a single list
// @access  Private
router.get(
  "/:id",
  checkAuthenticated,
  isListExistsAndOwner,
  async (req, res) => {
    res.status(200).json(req.list);
  }
);

// @route   PATCH /list/:id
// @desc    update list name
// @access  Private
router.patch(
  "/:id",
  checkAuthenticated,
  isListExistsAndOwner,
  [check("name", "Name is required").not().isEmpty()],
  checkValidationErrors,
  async (req, res) => {
    let list = req.list;

    try {
      list.name = req.body.name;
      await list.save();
      return res.status(200).json(list);
    } catch (error) {
      console.log(error);
      return res.status(500).json(serverError);
    }
  }
);

// @route   DELETE /list/:id
// @desc    delete a list
// @access  Private
router.delete(
  "/:id",
  checkAuthenticated,
  isListExistsAndOwner,
  async (req, res) => {
    let list = req.list;
    try {
      await List.findOneAndDelete({ _id: list._id });
      return res.status(200).json(listDeleted);
    } catch (error) {
      console.log(error);
      return res.status(500).json(serverError);
    }
  }
);

module.exports = router;
