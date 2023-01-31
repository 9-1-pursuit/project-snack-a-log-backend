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
    const copy = { ...req.body }
    const updatedSnack2 = req.body.name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
    copy.name = updatedSnack2
    try {
      const snack = await createSnack(copy)
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
