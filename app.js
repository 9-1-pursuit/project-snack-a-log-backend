const express = require('express')
const cors = require('cors')
const app = express()
const snacksController = require("./controllers/snackController")


app.use(express.json())
app.use(cors())
app.use("/snacks", snacksController)

// CONFIGURATION
app.get("/", (req , res) => {
    res.send("Welcome to the Snacks App")
})


// MIDDLEWARE
app.get("*", (req , res) => {
    res.status(404).send("Page not found")
})


module.exports = app
