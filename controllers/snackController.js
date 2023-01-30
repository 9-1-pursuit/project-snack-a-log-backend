const express = require('express')
const snacks = express.Router()
const {checkName, checkBoolean, validateImage}= require('../validations/checkSnacks')
const {
    getAllSnacks, 
    getSnack, 
    createSnack, 
    deleteSnack, 
    updateSnack} = require('../queries/snacks')

//INDEX 
snacks.get('/', async(req,res)=>{
    const {snacksId} = req.params
    try {
        const allSnacks = await getAllSnacks(snacksId)
        res.status(200).json(allSnacks)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
});


//SHOW 

snacks.get('/:id', async(req, res)=>{
    const {id}= req.params
    const snack = await getSnack(id)
    console.log('snacks', snacks)
    if(!snacks.message){
        res.status(200).json(snack)
    }else {
        res.status(400).json({error:"Not found"})
    }
});

//CREATE 
snacks.post("/",checkName, checkBoolean, async(req, res)=>{
    try {
        const snack = await createSnack(req.body)
        res.status(200).json(snack)
    } catch (error) {
        res.status(500).json.apply({error:error})
    }
})

//DELETE
snacks.delete('/:id', async(req,res)=>{
    try {
        const {id}= req.params
        const deletedSnack = await deleteSnack(id)
        res.status(200).json(deletedSnack)
    } catch (error) {
        res.status(404).json({error:"Id not found"})
    }
})

//UPDATE

snacks.put('/:id',checkName, checkBoolean, validateImage, async(req,res)=>{
    try {
        const {id}=req.params
        const updatedSnack = await updateSnack(id)
        res.status(200).json(updatedSnack)
    } catch (error) {
        res.status(404).json({error:" snack not found"})
    }
})

module.exports = snacks;