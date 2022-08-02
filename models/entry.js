require('dotenv').config()
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
        const data = await client.query(`
                SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
                FROM entries AS e
                INNER JOIN authors AS a
                ON e.id_author=a.id_author
                WHERE a.email=$1
                ORDER BY e.title;`,[email])
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
        const data = await client.query(`
                SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
                FROM entries AS e
                INNER JOIN authors AS a
                ON e.id_author=a.id_author
                
                ORDER BY e.title; `)
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
        const data = await client.query(`INSERT INTO entries(title,content,id_author,category) 
                                    VALUES ($1,$2,
                                    (SELECT id_author FROM authors WHERE email=$3),$4)`
                                    ,[title,content,email,category])
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
        const data = await client.query(`
        DELETE FROM entries
        WHERE title = $1`,[title])
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
        const data = await client.query(`
        UPDATE entries
        SET content = $2, category = $3
        WHERE title = $1`,[title,content,category])
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
        const data = await client.query(`
                SELECT *
                FROM authors
                WHERE email=$1`,[email])
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
        const data = await client.query(`
                SELECT *
                FROM authors
                 `)
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
        const data = await client.query(`INSERT INTO authors(id_author,name,surname,email,image) 
                                    VALUES ($1,$2,$3,$4,$5)`,[id_author,name,surname,email,image])
                                    
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
      
        const data = await client.query(`
        UPDATE authors
        SET id_author = $1, name = $2, surname = $3, image = $5
        WHERE email = $4`,[id_author,name,surname,email,image])
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
        const data = await client.query(`
        DELETE FROM authors
        WHERE email = $4`,[id_author,name,surname,email,image])
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