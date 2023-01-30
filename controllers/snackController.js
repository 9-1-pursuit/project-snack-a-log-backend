const express = require("express")

const { getAllSnacks , getSnack , createSnacks , deleteSnacks, updateSnacks } = require("../queries/snacks")

const snacks = express.Router()


snacks.get("/", async (req , res) => {
    const allSnacks = await getAllSnacks()

     if(allSnacks[0]){
         res.status(200).json(allSnacks)
     }
     else{
         res.status(500).json({error: "server error"})
     }
 })


snacks.get("/:id", async (req , res) => {
     const {id} = req.params
     const snack = await getSnack(id);
     if(!snack.message){
         res.json(snack)
     }
     else{
         res.status(404).json({error: "not found"})
     }
 })


 snacks.post("/",  async (req, res) => {
   try {
    // check fiber, protein, and added sugar values
    const fiber = req.body.fiber;
    const protein = req.body.protein;
    const added_sugar = req.body.added_sugar;

    // Set the is_heatlhy variable based on fiber, protein, and added sugar values
    let is_healthy = false; 
    if(fiber >=5 && protein >= 5 && added_sugar <= 5){
      is_healthy = true;
    }

    // Store the req.body and the is_healthy variable in a new object
    const  newBody = { ...req.body, is_healthy: is_healthy}
    
    // send the newbody object to the database
    const snack = await createSnacks(newBody)
    res.json(snack);
  } catch (error) {
    res.status(400).json({ error: error });
  }
 });


 snacks.delete("/:id", async (req ,res) => {
   const {id} = req.params
   const deletedSnacks = await deleteSnacks(id)
   if(deletedPlays.id){
     res.status(200).json(deletedSnacks)
   }
   else{
     res.status(404).json("Game not found")
   }
 })




 snacks.put("/:id", async (req, res) => {
   const { id } = req.params;
   const updatedSnacks = await updateSnacks(id, req.body);
   res.status(200).json(updatedSnacks);
 });


 module.exports = snacks
