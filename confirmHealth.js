const confirmHealth = (snack) => {
    const {protein, fiber, added_sugar} = snack
  if (protein === null || fiber=== null || added_sugar === null ){
    return null
  } 

  if ( fiber >= 5 || protein >= 5 && added_sugar <5){
    return true 
  } else {
    return false
  }
};

module.exports = confirmHealth;
