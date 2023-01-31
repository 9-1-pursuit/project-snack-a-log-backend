const confirmHealth = (snack, next) => {

if(snack.fiber <5 && 
    snack.protein <5){
    
    let healthStatus = false 

        if(healthStatus === snack.is_healthy){
            next()
        }else {
            console.log ("line10" ,healthStatus)
            res.status(400).json({ error: "is_healthy status incorrect" });
          }

    }else if (snack.added_sugar >5){
        let healthStatus = false 
        if(healthStatus === snack.is_healthy){
            console.log ("line18" ,healthStatus)
            next()
        }else {
            res.status(400).json({ error: "is_healthy status incorrect" });
          }
    }

};

// Sugar is more than 5
// Protein is less than 5 and Fiber is less than 5

module.exports = confirmHealth;
