// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const snackController = require("./controllers/snackController")

// CONFIGURATION
const app = express()

// MIDDLEWARE
app.use(express.json());
app.use(cors()); 
// app.use("/snacks", snackController);


// ROUTES
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the snack app");
  });
  
  app.get("/not-found", (req, res) => {
    res.status(404).json({ error: "page does not exist" });
  });
  
  app.get("*", (req, res) => {
    res.redirect("/not-found");
  });

// EXPORT
module.exports = app;