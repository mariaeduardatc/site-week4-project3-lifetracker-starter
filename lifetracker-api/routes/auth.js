// "use strict"

const express = require("express");
const User = require("../models/user");
const Exercise = require("../models/exercise");
const router = express.Router();

// // POST /users - create a new user
router.post("/register", async (req, res) => {
  try {
    const user = await User.register(req.body);
    res.status(201).json({ user });
  } catch (err) {
    throw err;
  }
});

router.post("/login", async function (req, res) {
  try {
    const user = await User.login(req.body);
    return res.status(200).json({ user });
  } catch (err) {
    throw err;
  }
});

router.post("/exercise/create", async function (req, res) {
  try {
    const exercise = await Exercise.addExercise(req.body);
    return res.status(200).json({ exercise });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
