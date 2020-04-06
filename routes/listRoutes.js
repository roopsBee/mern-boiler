const express = require("express");
const { check, validationResult } = require("express-validator");

const { checkAuthenticated, isListExistsAndOwner } = require("../middleware");
const List = require("../models/ListModel");
const {
  serverError,
  fetchedLists,
  createList,
  nameExists,
  notOwnerOfList,
  listNotFound,
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
// @desc    show a list
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
// @desc    update list
// @access  Private
router.patch(
  "/:id",
  checkAuthenticated,
  isListExistsAndOwner,
  async (req, res) => {
    let list = req.list;

    try {
      // if received name, update name
      if (req.body.name) {
        const { name } = req.body;
        list.name = name;
        await list.save();
        return res.status(200).json(list);
      }

      // if received item with id, update item
      let items = list.items;
      let newItem = req.body.item;
      if (newItem._id) {
        const updatedItems = items.map((item) => {
          if (item._id == newItem._id) {
            return (item = newItem);
          }
          return item;
        });
        list.items = updatedItems;
        list.save();
        return res.status(200).json(updatedItems);
      }

      // create item if no id passed
      if (!newItem._id) {
        items.push(newItem);
        list.items = items;
        await list.save();
        return res.status(200).json(list);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(serverError);
    }
  }
);

// @route   DELETE /list/:id
// @desc    delete a list
// @access  Private

module.exports = router;
