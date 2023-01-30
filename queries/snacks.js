const db = require("../db/dbConfig.js");
//MEMO: This is the same as Bookmarks2  with slight verations to fit if don't like change

//INDEX
const getAllSnacks = async () => {
    try {
        const allSnacks = await db.any("SELECT * FROM snacks"); 
        return allSnacks
    } catch (error){
        return error
    }
};

//SHOW
const getAsnack = async () => {
    try {
        const snack = await db.one("SELECT * FROM snacks WHERE id=$1", id);
        return snack
    } catch (error){
        return error
    }
};

//CREATE
const createSnacks = async (snack) => {
    try {
        const createSnack = await db.one(
            "INSERT INTO snacks (name, fiber, protien, added_sugar, is_healthy, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [
                snack.name, 
                snack.fiber,
                snack.protien,
                snack.is_healthy,
                snack.image
            ]
        );
        return createSnack
    } catch (error){
        return error
    }
};

//UPDATE 
const updateSnacks = async (id, snack) => {
    //I figure edit snacks would be this to keep them from meshing -TRIANE
    try {
        const updateSnack = await db.one(
            "UPDATE snacks SET (name=$1, fiber=$2, protien=$3, added_sugar=$4, is_healthy=$5, image=$6) WHERE id=$7 RETURNING *", [
                snack.name, 
                snack.fiber,
                snack.protien,
                snack.is_healthy,
                snack.image,
                id
            ]
        );
        return updateSnack
    } catch (error) {
        error
    }

}; 

//DELETE
const deleteSnacks = async (id) => {
    try {
        const deleteSnack = await db.one(
            "DELETE FROM snacks WHERE ID = $1 RETURNING *", id);
            return deleteSnack
    } catch (error) {
        return error
    }
}; 

module.exports = {
    getAllSnacks, getAsnack, createSnacks, updateSnacks, deleteSnacks
};
