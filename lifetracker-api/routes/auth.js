// "use strict"

const express = require("express")
const User = require("../models/user")
const router = express.Router()

// // POST /users - create a new user
router.post('/register', async (req, res) => {
    try{
        const user = await User.register(req.body)
        res.status(201).json({user})
    } catch(err) {
        throw err
    }
    
})

module.exports = router