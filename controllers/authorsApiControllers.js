const author = require('../models/author');



//GET AUTHORS MY EMAIL
const getAuthors = async(req,res)=>{
  let authorsData;  
  try{
     
      if(req.query.email){
          authorsData = await author.getAuthorsByEmail(req.query.email)
      }
      else{
         authorsData = await author.getAllAuthors();
      }
      res.status(200).json(authorsData);
    }
    catch(error){
      res.status(404).json("not found");
    }
  }



  //CREATE POST AUTHOR
  const createAuthor = async(req,res)=>{
    try{
        const newAuthor = req.body;
        const response = await author.createAuthor(newAuthor)
        res.status(200).json({"usuario creado": newAuthor.email})
    }
    catch(error){

    }
  }
  

//UPDATE PUT AUTHOR

const updateAuthor = async(req,res)=>{
    try{
        if(req.body.email){
            const response = await author.updateAuthorData(req.body)
            res.status(200).json({'message':`Usuario actualizado: ${req.body.email}`})
        }
    }
    catch(error){
        res.status(400).json({"fewpofkw": "peowkf"});
    }
}


//DELETE AUTHOR

const deleteAuthor = async(req,res)=>{
    try{
        if(req.body.email){
            const response = await author.deleteAuthorData(req.body)
            res.status(200).json({'message':`Se ha borrado: ${req.body.email}`})
        }
    }
    catch(error){
        res.status(400).json({"fewpofkw": "peowkf"});
    }
}


//CREATE AUTHORS TABLE

const createAuthorsTable = async(req,res)=>{
  try{
    const response = await author.createAuthorsTable();
    res.status(200).json({'message':"Se ha creado la tabla de 'authors'" })
  }
  catch(error){
    res.status(400).json({"error": "No se ha podido crear la tabla"})
  }
}


//DELETE AUTHORS TABLE

const deleteAuthorsTable = async(req,res)=>{
  try{
    const response = await author.deleteAuthorsTable()
    res.status(200).json({'message':"Se ha borrado la tabla de 'authors'"})
    
 }
  catch(error){
    res.status(400).json({"error": "No se ha podido eliminar la tabla"});
}
}


  module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    createAuthorsTable,
    deleteAuthorsTable
  }