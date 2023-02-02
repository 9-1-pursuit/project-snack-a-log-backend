const db = require("../db/dbConfig.js");


const getAllSnacks = async () => {
    try{
        const allSnacks = await db.any("SELECT * FROM snacks")
    return allSnacks
    } catch(e){
        return e
    }
}

const getSnack = async (id) => {
    try{
        const oneSnack = await db.one("SELECT * FROM snacks WHERE id=$1", id)
    return oneSnack
    } catch(e){
        return e
    }
}


const createSnack = async (snack) =>{
    try{
        const newSnack = await db.one(
            "INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image, selected, bookmarked ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [snack.name, snack.fiber, snack.protein, snack.added_sugar, snack.is_healthy, snack.image, snack.selected, snack.bookmarked]
        )
        return newSnack
    }catch(e) {
        return e
    }
}

const deleteSnack = async (id) => {
    try{
        const deletedSnack = await db.one("DELETE FROM snacks WHERE id=$1 RETURNING *", id)
    return deletedSnack
    } catch(e){
        return e
    }
}

const updateSnack = async (id, snack) => {
    try{
        const updatedSnack = await db.one("UPDATE snacks SET name=$1, fiber=$2, protein=$3, added_sugar=$4, is_healthy=$5, image=$6, selected=$7, bookmarked=$8 WHERE id=$9 RETURNING *", 
        [snack.name, snack.fiber, snack.protein, snack.added_sugar, snack.is_healthy, snack.image, snack.selected, snack.bookmarked, id])
    return updatedSnack
    } catch(e){
        return e
    }
}

module.exports = {getAllSnacks, getSnack, createSnack, deleteSnack, updateSnack};
