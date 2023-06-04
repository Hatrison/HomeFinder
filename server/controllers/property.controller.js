const { default: mongoose } = require("mongoose");
const Property = require("../mongodb/models/property.js");
const User = require("../mongodb/models/user.js");
const dotenv = require("dotenv");
const { v2: cloudinary } = require("cloudinary");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).limit(req.query._end);

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyExists = await Property.findOne({ _id: id }).populate(
      "creator"
    );

    if (propertyExists) res.status(200).json(propertyExists);
    else res.status(404).json({ message: "Property does not exist" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get the property details, please try again later",
    });
  }
};

const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      price,
      location,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyToDelete = await Property.findById({ _id: id }).populate(
      "creator"
    );

    if (!propertyToDelete) {
      throw new Error("Property not found");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    propertyToDelete.deleteOne({ session });

    propertyToDelete.creator.allProperties.pull(propertyToDelete);

    await propertyToDelete.creator.save({ session });

    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete property, please try again later" });
  }
};

module.exports = {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
