

const confirmHealth = (req, res) => {
  //   const { fiber, protein, added_sugar } = snacks
  //I need a variable where i will store a boolean after I check the fiber, protein and added sugar values
  // check fiber, protein, and added sugar values
  let fiber = req.body.fiber
  let protein = req.body.protein
  let added_sugar = req.body.added_sugar

  //i need a conditional to set the is_healthy variable to true or false based on fiber, protein and addes sugar
  // Set the is_heatlhy variable based on fiber, protein, and added sugar values
  let is_healthy = false
  if (fiber && protein && added_sugar) {
    if (fiber >= 5 && protein >= 5 && added_sugar <= 5) {
      is_healthy = true
    }
    // //i need to store the req.body and the new variable into a new object to send to the db
    // Store the req.body and the is_healthy variable in a new object
    const newBody = { ...req.body, is_healthy: is_healthy }

    // send the newbody object to the database
    res.status(200).json(newBody)
    next()
    {
      res.status(400).json({ error: "Snack not Healthy" })
    }
  }
}
module.exports = confirmHealth
