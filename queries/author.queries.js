const db_queries_authors = {
    getAuthorsByEmail: `
    SELECT *
    FROM authors
    WHERE email=$1`,
    getAllAuthors: `
    SELECT *
    FROM authors
     `,
     createAuthor: `INSERT INTO authors(id_author,name,surname,email,image) 
     VALUES ($1,$2,$3,$4,$5)`,
     updateAuthorData: `
     UPDATE authors
     SET id_author = $1, name = $2, surname = $3, image = $5
     WHERE email = $4`,
     deleteAuthorData: `
     DELETE FROM authors
     WHERE email = $4`,
}

module.exports = db_queries_authors;