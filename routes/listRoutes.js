const express = require("express");
const { check } = require("express-validator");

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

// @route   GET /api/list
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

// @route   POST /api/list
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
        return res.status(400).json(nameExists);
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

// @route   GET /api/list/:id
// @desc    show a single list
// @access  Private
router.get(
  "/:id",
  checkAuthenticated,
  isListExistsAndOwner,
  async (req, res) => {
    const { name, _id, items } = req.list;
    list = { name, _id, items };
    res.status(200).json({ list });
  }
);

// @route   PATCH /api/list/:id
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
      return res.status(200).json({ list });
    } catch (error) {
      console.log(error);
      return res.status(500).json(serverError);
    }
  }
);

// @route   PATCH /api/list/:id/reorder
// @desc    reorder list
// @access  Private
router.patch(
  "/:id/reorder",
  checkAuthenticated,
  isListExistsAndOwner,
  [
    check("from", "From is required").not().isEmpty(),
    check("to", "To is required").not().isEmpty(),
  ],
  checkValidationErrors,
  async (req, res) => {
    try {
      let list = req.list;
      const { from, to } = req.body;

      const removedItem = list.items.splice(from, 1);
      list.items.splice(to, 0, ...removedItem);
      list.save();

      res.status(200).json({ list });
    } catch (error) {
      console.log(error);
      return res.status(500).json(serverError);
    }
  }
);

// @route   DELETE /api/list/:id
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
