const express = require("express"); 
const snacks = express.Router(); 
//VALIDATIONS SHOULD BE CALLED HERE
const {
    getAllSnacks, getAsnack, createSnacks, updateSnacks, deleteSnacks
} = require("../queries/snacks"); 

//INDEX

snacks.get("/", async (req, res) => {
    const allSnacks = await getAllSnacks(); 
    if (allSnacks[0]) {
        res.status(200).json(allSnacks);
    } else {
        res.status(500).json({error: "Problem With The Server"})
        //Getting 500 message please look over to find ERROR
    }
});
//SHOW
snacks.get("/:id", async (req, res) => {
    const {id} = req.params; 
    const snack = await getAsnack(id); 
    if(!snack.message) {
        res.status(200).json(snack)
    }else{
        res.status(404).json({error: "Page Not Found"})
    }
});

//CREATE
snacks.post("/", async (req, res) => {
    try {
        const createSnack = await createSnacks(req.body);
        res.status(200).json(createSnack)
    } catch (error) {
        res.status(500).json({error: "Problem With The Server"})
    }
});

//UPDATE
snacks.put("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const updateSnack = await updateSnacks(id, req.body); 
        if(updateSnack.id) {
            res.status(200).json(updateSnack)
        }else{
            res.status(404).json({error: "Page Not Found"})
        }
    } catch (error) {
        res.status(500).json({error: "Problem With The Server"})
    } 
});

//DELETE
snacks.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const deleteSnack = await deleteSnacks(id); 
        res.status(200).json(deleteSnack) 
    } catch (error) {
        res.status(404).json({error: "Page Not Found"})
    }
});

module.exports = snacks;