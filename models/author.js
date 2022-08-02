require('dotenv').config()
const authorQueries = require('../queries/author.queries');
const { Pool } = require('pg');
const pool = require('../utils/db_pgsql')





  //AUTHORS

const getAuthorsByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect();
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
        client = await pool.connect(); 
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
        client = await pool.connect(); 
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


const createAuthorsTable = async(author)=>{
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query(authorQueries.createAuthorTable)
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
const deleteAuthorsTable = async(author)=>{
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query(authorQueries.deleteAuthorsTable)
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


const authors = {
    getAuthorsByEmail,
    getAllAuthors,
    createAuthor,
    updateAuthorData,
    deleteAuthorData,
    createAuthorsTable,
    deleteAuthorsTable
}

module.exports = authors;

