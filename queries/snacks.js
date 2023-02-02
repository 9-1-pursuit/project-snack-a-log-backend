const db = require("../db/dbConfig.js")
// ROUTES

//All - (Index) route
const getAllSnack = async () => {
  try {
    const allSnacks = await db.any("SELECT * FROM snacks")
    return allSnacks
  } catch (error) {
    return error
  }
}

// One (Show) Route
const getOneSnack = async (id) => {
  try {
    const oneSnacks = await db.one("SELECT * FROM snacks WHERE id=$1", id)
    return oneSnacks
  } catch (error) {
    return error
  }
}

// CREATE - (New) route
const createSnack = async (snacks) => {
  try {
    const createdOneSnacks = await db.one(
      "INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        snacks.name,
        snacks.fiber,
        snacks.protein,
        snacks.added_sugar,
        snacks.is_healthy,
        snacks.image,
      ]
    )
    return createdOneSnacks
  } catch (error) {
    return error
  }
}

// DELETE
const deleteSnack = async (id) => {
  try {
    const deletedSnacks = await db.one(
      "DELETE FROM snacks WHERE id=$1 RETURNING *",
      id
    )
    return deletedSnacks
  } catch (error) {
    return error
  }
}

// UPDATE
const updateSnack = async (id, snacks) => {
  try {
    const updatedSnacks = await db.one(
      "UPDATE snacks SET name, fiber, protein, added_sugar, is_healthy, image WHERE id=$6 RETURNING *",
      [
        snacks.name,
        snacks.fiber,
        snacks.protein,
        snacks.added_sugar,
        snacks.is_healthy,
        snacks.image,
        id,
      ]
    )
    return updatedSnacks
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllSnack,
  getOneSnack,
  createSnack,
  deleteSnack,
  updateSnack,
}
