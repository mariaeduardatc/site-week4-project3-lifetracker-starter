"use strict";

const { getDatabaseUri } = require("./config");
const { Client } = require("pg");
require("colors");

// initializes a new postgres client with the pg package
const db = new Client({ connectionString: getDatabaseUri() });

db.connect((err) => {
    if (err) {
        console.error("connection error", err.stack);
    } else {
        console.log("Successfully connected to postgres database!".blue);
    }
});

module.exports = db