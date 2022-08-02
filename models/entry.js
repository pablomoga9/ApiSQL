require('dotenv').config()
const entryQueries = require('../queries/entry.queries');
const authorQueries = require('../queries/author.queries');
console.log("este es el console log de" + process.env.dbPass);
const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: process.env.dbUser,
    database: process.env.dbDatabase,
    password: process.env.dbPass
  })





  //ENTRIES
// GET
const getEntriesByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
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
        client = await pool.connect(); // Espera a abrir conexion
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
        client = await pool.connect(); // Espera a abrir conexion
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





//AUTHORS

const getAuthorsByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorQueries.getAuthorsByEmail,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const getAllAuthors = async ()=>{
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorQueries.getAllAuthors)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result

}


const createAuthor = async (author) => {
    const {id_author,name,surname,email,image} = author;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorQueries.createAuthor,[id_author,name,surname,email,image])
                                    
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


const updateAuthorData = async (author)=>{
    
    const {id_author,name,surname,email,image} = author;
    console.log("este es el author" +email)
    let client,result;
    client = await pool.connect();
    try{
      
        const data = await client.query(authorQueries.updateAuthorData,[id_author,name,surname,email,image])
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



const deleteAuthorData = async(author)=>{
    const {id_author,name,surname,email,image} = author;
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query(authorQueries.deleteAuthorData,[id_author,name,surname,email,image])
        result = data.rowCount
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        client.release();    
    }
    return result
}





const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntryData,
    deleteEntry,
    getAuthorsByEmail,
    getAllAuthors,
    createAuthor,
    updateAuthorData,
    deleteAuthorData
}

module.exports = entries;