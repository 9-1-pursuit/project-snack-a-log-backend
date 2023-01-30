// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const snackController = require("./controllers/snackController")
// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors()); 
app.use("/snacks", snackController);


// ROUTES
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Snack Team 6 Snack-A-Log App");
});
  
app.get("/not-found", (req, res) => {
    res.status(404).json({ error: "page does not exist" });
});
  
app.get("*", (req, res) => {
    res.redirect("/not-found");
});

//I like using redirect but we can change if needed -TRIANE

// EXPORT
module.exports = app;