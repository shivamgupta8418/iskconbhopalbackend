const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
   {
      image: {
         type: String,
         required: true,
      },
      heading: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      date: {
         type: String,
         required: true
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
