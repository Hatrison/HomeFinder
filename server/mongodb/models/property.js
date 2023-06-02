const mongoose = require("mongoose");

const PropertySchema = new mongoose.UserSchema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

exports.propertyModel = mongoose.model("Property", PropertySchema);
