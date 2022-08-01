module.exports = function(req,res,next){
    res.status(404).send('Unable to find the requested resource');
}