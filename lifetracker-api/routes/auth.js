"use strict"

const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.get('/me', async (req, res) => {
    return res.json({})
})