const express = require("express")

const { getAllSnacks , getSnack , createSnack , deleteSnack, updateSnack } = require("../queries/snacks")


const {confirmHealth} = require("../confirmHealth")


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
 
 

 snacks.post("/", confirmHealth, async (req, res,next) => {

   try {
     const snack = await createSnack(req.body);
     res.json(snack);
   } catch (error) {
     res.status(400).json({ error: error });
   }
 });
 
 
 
 snacks.delete("/:id", async (req ,res) => {
   const {id} = req.params
   const deletedSnacks = await deleteSnack(id)
   if(deletedSnacks.id){
     res.status(200).json(deletedSnacks)
   }
   else{
     res.status(404).json({error: "Snacks not found"})
   }
 })
 
 
 
 snacks.put("/:id",confirmHealth,  async (req, res, next) => {

   const { id } = req.params;
   const updatedSnacks = await updateSnack(id, req.body);
   res.status(200).json(updatedSnacks);
 });




 module.exports = snacks
 