const checkApiKey = function(req,res,next){
    if(req.query.API_KEY){
        next();//Pasa a la siguiente tarea
    }else{
        //Mandar mensaje de error
        res.status(401).send("Error. API KEY no provista")
    }
}

module.exports = checkApiKey;