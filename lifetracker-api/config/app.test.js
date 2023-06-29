const request = require("supertest")

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const app = require("./app")