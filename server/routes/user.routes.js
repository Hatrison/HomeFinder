const express = require("express");
const {
  getAllUsers,
  getUserInfoByID,
  createUser,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserInfoByID);
router.route("/").post(createUser);

module.exports = router;
