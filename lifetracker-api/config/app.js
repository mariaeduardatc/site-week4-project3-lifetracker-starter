"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = express.Router()

const { BadRequestError, NotFoundError, Unauthorized } = require("../utils/error")
const authRoutes = require("../routes/auth");
const { authenticateJWT } = require('../routes/auth')

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// routes
app.use("/auth", authRoutes)

// health check
app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
})




module.exports = app