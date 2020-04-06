const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: { type: String },
  items: [
    {
      text: { type: String },
      done: { type: Boolean },
    },
  ],
});
children: [{ name: "string" }];

module.exports = List = mongoose.model("list", ListSchema);
