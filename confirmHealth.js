const confirmHealth = (snack) => {
    // console.log(snack)
    const protein = 5
    const fiber = 5
    const sugar = 5
    const health = protein && fiber && sugar
    
    if (fiber > 5){
        return true
    }else if (snack.protein >5) {
        return true
    } else if(snack.protein > 5 && snack.fiber > 5){
        return true
    } else if(snack.sugar > 5){
        return false
    } else if(snack.protein > 5 && snack.sugar > 5){
        return false
    } else if(snack.protein < 6 && snack.fiber < 6 && snack.sugar > 5){
        return false
    } else if(snack.protein < 5 || snack.fiber < 5 && snack.sugar > 5){
        return false
    } else if(!health){
        return res.status(404).json("Provide a  fiber, protein, and sugar value!")
    }
};

module.exports = confirmHealth;