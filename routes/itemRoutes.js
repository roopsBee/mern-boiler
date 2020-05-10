const express = require("express");
const { check } = require("express-validator");
const {
  checkAuthenticated,
  isListExistsAndOwner,
  checkValidationErrors,
} = require("../middleware");
const List = require("../models/ListModel");
const { serverError, itemDeleted } = require("./responses");

const router = express.Router({ mergeParams: true });

// @route   POST /api/list/:id/item
// @desc    add a new item to list
// @access  Private
router.post(
  "/",
  checkAuthenticated,
  isListExistsAndOwner,
  [check("text", "Item text is required").not().isEmpty()],
  checkValidationErrors,
  async (req, res) => {
    let list = req.list;
    let newItem = { text: req.body.text, done: false };

    try {
      list.items.push(newItem);
      await list.save();
      return res.status(200).json({ list });
    } catch (error) {
      console.log(error);
      return res.status(500).json(serverError);
    }
  }
);

// @route   PATCH /api/list/:id/item/:itemid
// @desc    update list
// @access  Private
router.patch(
  "/:itemid",
  checkAuthenticated,
  isListExistsAndOwner,
  [
    check("text", "Item text is required").not().isEmpty(),
    check("_id", "Id is requied").not().isEmpty(),
    check("done", "Done is required").not().isEmpty(),
  ],
  checkValidationErrors,
  async (req, res) => {
    try {
      const { _id, text, done } = req.body;
      let newItem = { text, done, _id };

      const list = await List.findOneAndUpdate(
        { "items._id": _id },
        { $set: { "items.$": newItem } },
        { new: true }
      );
      res.status(200).json({ list });
    } catch (error) {
      console.log(error);
      return res.status(500).json(serverError);
    }
  }
);

// @route   DELETE /api/list/:id/item/:itemid
// @desc    delete a item
// @access  Private
router.delete(
  "/:itemid",
  checkAuthenticated,
  isListExistsAndOwner,
  async (req, res) => {
    const list = req.list;
    try {
      list.items.pull(req.params.itemid);
      list.save();
      return res.status(200).json({ list });
    } catch (error) {
      console.log(error);
      return res.status(500).json(serverError);
    }
  }
);

module.exports = router;
