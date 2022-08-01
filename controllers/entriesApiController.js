const entry = require('../models/entry');

//getEntries()
//createEntry

const getEntries = async(req,res)=>{
    let entries;
    if(req.query.email){
        entries = await entry.getEntriesByEmail(req.query.email)
    }
    else{
       entries = await entry.getAllEntries();
    }
    res.status(200).json(entries);
}

const createEntry = async(req,res)=>{
    const newEntry = req.body;
    const response = await entry.createEntry(newEntry)
    res.status(200).json({"saved":response})
}

module.exports = {
    getEntries,
    createEntry
}