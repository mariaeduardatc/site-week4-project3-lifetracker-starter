"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// put errors here later maybe
const config = require("./config");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));



// health check
app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })