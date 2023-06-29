"use strict"

const app = require("./config/app")
const { PORT } = require("./config/config")
// const PORT = 3001
app.listen(PORT, function () {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})