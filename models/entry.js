require('dotenv').config()
const entryQueries = require('../queries/entry.queries');
const { Pool } = require('pg');
const pool = require('../utils/db_pgsql')





  //ENTRIES
// GET
const getEntriesByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query(entryQueries.getEntriesByEmail,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

// GET
const getAllEntries = async () => {
    let client,result;
    try{
        client = await pool.connect(); 
        const data = await client.query(entryQueries.getAllEntries)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}
// ALTER TABLE entries
// ADD UNIQUE(title);


// CREATE
const createEntry = async (entry) => {
    const {title,content,email,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); 
        const data = await client.query(entryQueries.createEntry,[title,content,email,category])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

// DELETE 
const deleteEntry = async(entry)=>{
    const {title,content,email,category} = entry;
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query(entryQueries.deleteEntry,[title])
        result = data.rowCount
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        client.release();    
    }
    return result
}





//UPDATE
const updateEntryData = async (entry)=>{
    
    const {title,content,category} = entry;
    console.log("este es el entry" +title)
    let client,result;
    client = await pool.connect();
    try{
       console.log(title,content,category)
        const data = await client.query(entryQueries.updateEntryData,[title,content,category])
        result = data.rowCount
        console.log(result)
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        client.release();    
    }
    return result
}


//CREATE ENTRIES TABLE

const createEntriesTable = async(entry)=>{
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query(entryQueries.createEntriesTable)
        result = data.rowCount;
    }catch(err){
        console.log(err)
        throw err;
    }
    finally{
        client.release()
    }
    return result;
}

//DELETE ENTRIES TABLE

const deleteEntriesTable = async(entry)=>{
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query(entryQueries.deleteEntriesTable)
        result = data.rowCount;
    }
    catch(error){
        console.log(err)
        throw err;
    }
    finally{
        client.release()
    }
    return result;
    
}




// Pruebas

    getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data))



// getAllEntries()
// .then(data=>console.log(data))



let newEntry = {
    title:"noticia desde Node",
    content:"va a triunfar esto22",
    email:"alejandru@thebridgeschool.es",
    category:"sucesos"}

// createEntry(newEntry)
// .then(data=>console.log(data))

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntryData,
    deleteEntry,
    createEntriesTable,
    deleteEntriesTable
}

module.exports = entries;