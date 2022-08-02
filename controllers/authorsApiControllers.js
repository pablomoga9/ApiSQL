const entry = require('../models/entry');

const getAuthors = async(req,res)=>{
    try{
      let authors;
      if(req.query.email){
          authors = await entry.getAuthorsByEmail(req.query.email)
      }
      else{
         authors = await entry.getAllAuthors();
      }
      res.status(200).json(authors);
    }
    catch(error){
      res.status(404).json("not found");
    }
  }

  const createAuthor = async(req,res)=>{
    try{
        newAuthor = req.body;
        const response = await entry.createAuthor(newAuthor)
        res.status(200).json({"usuario creado": req.body.email})
    }
    catch(error){

    }
  }
  


  module.exports = {
    getAuthors,
    createAuthor
  }