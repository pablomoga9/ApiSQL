const db_queries_entries = {
    getEntriesByEmail:`SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    WHERE a.email=$1
    ORDER BY e.title;`,
    getAllEntries: `
    SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    ORDER BY e.title; `,
    createEntry: `INSERT INTO entries(title,content,id_author,category) 
    VALUES ($1,$2,
    (SELECT id_author FROM authors WHERE email=$3),$4)`,
    deleteEntry: `
    DELETE FROM entries
    WHERE title = $1`,
    updateEntryData: `
    UPDATE entries
    SET content = $2, category = $3
    WHERE title = $1`
}

module.exports = db_queries_entries;