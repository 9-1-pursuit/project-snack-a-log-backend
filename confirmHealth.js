
const confirmHealth = (req,res, next) => {
    let healthStatus = false

    if(req.body.fiber <5 && 
        req.body.protein <5){
            
            console.log(req.body.fiber)

        if( healthStatus === req.body.is_healthy){
            console.log ("line10 correct" ,healthStatus)
            next();
        }else {
            console.log ("line13" ,healthStatus)
            console.error( "is_healthy status incorrect" );
        next();
        }

    }else if (req.body.added_sugar >= 6){
        
        if(req.body.is_healthy === healthStatus){
            console.log ("line21 correct" , healthStatus)
            next();
        }else {
            console.log ("line24" ,req.body.is_healthy)
            console.error( "is_healthy status incorrect" );
            next();
        }
    } else{
        
        if(req.body.is_healthy === healthStatus){
            console.log ("line30 correct" , healthStatus)
            next();
        }else {
            console.log ("line33" ,req.body.is_healthy)
            console.error( "is_healthy status incorrect" );
            next();
        }
        
    }

};

// Sugar is more than 5
// Protein is less than 5 and Fiber is less than 5

module.exports = {confirmHealth};
