const express = require("express")

const {
  getAllSnacks,
  getOneSnacks,
  createSnacks,
  deleteSnacks,
  updateSnacks,
} = require("../queries/snacks")

const {
  checkName,
  checkBoolean,
  validateImage,
} = require("../validations/checkSnacks")

const snacks = express.Router()

snacks.get("/", async (req, res) => {
  const allSnacks = await getAllSnacks()

  if (allSnacks[0]) {
    res.status(200).json(allSnacks)
  } else {
    res.status(500).json({ error: "server error" })
  }
})

snacks.get("/:id", async (req, res) => {
  const { id } = req.params
  const snack = await getOneSnacks(id)
  if (!snack.message) {
    res.json(snack)
  } else {
    res.status(404).json({ error: "not found" })
  }
})

snacks.post("/", validateImage, checkName, checkBoolean, async (req, res) => {
  try {
    //I need a variable where i will store a boolean after I check the fiber, protein and added sugar values
    // check fiber, protein, and added sugar values
    const fiber = req.body.fiber
    const protein = req.body.protein
    const added_sugar = req.body.added_sugar

    //i need a conditional to set the is_healthy variable to true or false based on fiber, protein and addes sugar
    // Set the is_heatlhy variable based on fiber, protein, and added sugar values
    let is_healthy = false
    if (fiber && protein && added_sugar) {
      if (fiber >= 2 && protein >= 5 && added_sugar <= 5) {
        is_healthy = true
      } else if (fiber >= 2 && sugar > 5) {
        is_healthy = false
      } else if (protein >= 5 && added_sugar > 5) {
        is_healthy = false
      } else if (fiber < 2 || protein < 5) {
        is_healthy = false
      }
    } else {
      is_healthy = null
    }
    // //i need to store the req.body and the new variable into a new object to send to the db
    // Store the req.body and the is_healthy variable in a new object
    const newBody = { ...snacks, is_healthy: is_healthy }

    // send the newbody object to the database
    const snack = await createSnacks(newBody)
    res.json(snack)
  } catch (error) {
    res.status(400).json({ error: "Snack not Healthy" })
  }
})

snacks.delete("/:id", async (req, res) => {
  const { id } = req.params
  const deletedSnacks = await deleteSnacks(id)
  if (deletedSnacks.id) {
    res.status(200).json(deletedSnacks)
  } else {
    res.status(404).json("Snack not found")
  }
})

snacks.put("/:id", checkName, checkBoolean, validateImage, async (req, res) => {
  const { id } = req.params
  const updatedSnacks = await updateSnacks(id, req.body)
  updatedSnacks.id === true
    ? res.status(200).json(updatedSnacks)
    : res.status(404).json({ error: "Page not found" })
})

module.exports = snacks
