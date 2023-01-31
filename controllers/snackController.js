const express = require("express")
const confirmHealth = require("../confirmHealth")

const {
  getAllSnack,
  getOneSnack,
  createSnack,
  deleteSnack,
  updateSnack,
} = require("../queries/snacks")

const {
  checkName,
  checkBoolean,
  validateAndSetImage,
} = require("../validations/checkSnacks")

const snacks = express.Router()

snacks.get("/", async (req, res) => {
  const allSnacks = await getAllSnack()

  if (allSnacks[0]) {
    res.status(200).json(allSnacks)
  } else {
    res.status(500).json({ error: "server error" })
  }
})

snacks.get("/:id", async (req, res) => {
  const { id } = req.params
  const snack = await getOneSnack(id)
  if (!snack.message) {
    res.json(snack)
  } else {
    res.status(404).json({ error: "not found" })
  }
})

snacks.post(
  "/",
  validateAndSetImage,
  checkName,
  checkBoolean,
  confirmHealth,
  async (req, res) => {
    try {
      // //I need a variable where i will store a boolean after I check the fiber, protein and added sugar values
      // // check fiber, protein, and added sugar values
      // let fiber = req.body.fiber
      // let protein = req.body.protein
      // let added_sugar = req.body.added_sugar

      // //i need a conditional to set the is_healthy variable to true or false based on fiber, protein and addes sugar
      // // Set the is_heatlhy variable based on fiber, protein, and added sugar values
      // let is_healthy = false
      // if (fiber && protein && added_sugar) {
      //   if (fiber >= 2 && protein >= 5 && added_sugar <= 5) {
      //     is_healthy = true
      //   } else if (fiber >= 2 && sugar > 5) {
      //     is_healthy = false
      //   } else if (protein >= 5 && added_sugar > 5) {
      //     is_healthy = false
      //   } else if (fiber < 2 || protein < 5) {
      //     is_healthy = false
      //   }
      // } else {
      //   is_healthy = null
      // }
      // // //i need to store the req.body and the new variable into a new object to send to the db
      // // Store the req.body and the is_healthy variable in a new object
      // const newBody = { ...snacks, is_healthy: is_healthy }

      // // send the newbody object to the database
      const snack = await createSnack(req.body)
      res.status(200).json(snack)
    } catch (error) {
      res.status(400).json({ error: "Snack not Healthy" })
    }
  }
)

snacks.delete("/:id", async (req, res) => {
  const { id } = req.params
  const deletedSnacks = await deleteSnack(id)
  if (deletedSnacks.id) {
    res.status(200).json(deletedSnacks)
  } else {
    res.status(404).json("Snack not found")
  }
})

snacks.put(
  "/:id",
  checkName,
  checkBoolean,
  validateAndSetImage,
  validateAndSetImage,
  async (req, res) => {
    const { id } = req.params
    const updatedSnacks = await updateSnack(id, req.body)
    updatedSnacks.id === true
      ? res.status(200).json(updatedSnacks)
      : res.status(404).json({ error: "Page not found" })
  }
)

module.exports = snacks
