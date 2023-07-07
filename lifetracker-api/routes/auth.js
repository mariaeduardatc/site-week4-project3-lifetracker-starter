// "use strict"

const express = require("express");
const User = require("../models/user");
const Exercise = require("../models/exercise");
const Sleep = require("../models/sleep");
const jwt = require("jsonwebtoken");
const router = express.Router();

// // POST /users - create a new user
router.post("/register", async (req, res) => {
  try {
    const user = await User.register(req.body);
    const token = jwt.sign(
      { user_id: user.id, firstName: user.firstName },
      "SECRET-KEY",
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token:token, user });
  } catch (err) {
    throw err;
  }
});

router.post("/login", async function (req, res) {
  try {
    const user = await User.login(req.body);
    const token = jwt.sign(
      { user_id: user.id, firstName: user.firstName },
      "SECRET-KEY",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ token: token, user });
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

router.get("/getexercise/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const exerciseById = await Exercise.getExerciseById(userId);
    return res.status(200).json({ exerciseById });
  } catch (err) {
    throw err;
  }
});

router.post("/sleep/create", async function (req, res) {
  try {
    const sleep = await Sleep.addSleep(req.body);
    return res.status(200).json({ sleep });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
