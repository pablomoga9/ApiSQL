require('dotenv').config()
const entryQueries = require('../queries/entry.queries');
const { Pool } = require('pg');
const pool = require('../utils/db_pgsql')


//GET ENTRY BY EMAIL

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

// GET ALL ENTRIES

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


// CREATE AN ENTRY

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

// DELETE AN ENTRY BY TITLE
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


//UPDATE ENTRY BY TITLE

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


//Exports

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