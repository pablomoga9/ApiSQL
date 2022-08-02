const entry = require('../models/entry');

//getEntries()
//createEntry

const getEntries = async(req,res)=>{
  try{
    let entries;
    if(req.query.email){
        entries = await entry.getEntriesByEmail(req.query.email)
    }
    else{
       entries = await entry.getAllEntries();
    }
    res.status(200).json(entries);
  }
  catch(error){
    res.status(404).json("not found");
  }
}

const createEntry = async(req,res)=>{
  try{
    const newEntry = req.body;
    const response = await entry.createEntry(newEntry)
    res.status(200).json({"saved":response})
  }
  catch(error){
    console.log(error);
    res.status(400).json({error_detail:error.detail,error_code:error.code});
  }
}

const updateEntry = async(req,res)=>{
    try{
        // const newData = req.body;
        // console.log(req.body.title)
        if(req.body.title){
            const response = await entry.updateEntryData(req.body)
            res.status(200).json({'updated':response})
        }
    }
    catch(error){
        res.status(400).json({"fewpofkw": "peowkf"});
    }
}


const deleteEntry = async(req,res)=>{
    try{
        const response = await entry.deleteEntry(req.body)
        res.status(200).json({message: `Se ha borrado la entry ${req.body.title} `})
    }
    catch(error){
        res.status(400).json({error_detail:error.detail,error_code:error.code});
    }
}

const createEntriesTable = async(req,res)=>{
  try{
    const response = await entry.createEntriesTable();
    res.status(200).json({'message':"Se ha creado la tabla de 'entries'" })
  }
  catch(error){
    res.status(400).json({"error": "No se ha podido crear la tabla"})
  }
}
const deleteEntriesTable = async(req,res)=>{
  try{
    const response = await entry.deleteEntriesTable()
    res.status(200).json({'message':"Se ha borrado la tabla de 'entries'"})
    
 }
  catch(error){
    res.status(400).json({"error": "No se ha podido eliminar la tabla"});
}
}


module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry,
    createEntriesTable,
    deleteEntriesTable
}