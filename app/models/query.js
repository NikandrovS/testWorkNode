const query = require('mysql-query-promise');
const config = require('config');
const tableName = config.product.tableName;

const crud = {
    startBooks: 3,
    getAll: async (count) => {
        return query(`SELECT * FROM ${tableName} LIMIT ? OFFSET 0`,[Number(count)]);
    },
    countAll: async () => {
        return query(`SELECT count(*) as max FROM ${tableName};`);
    },
    create: async ( {title, author, description, date, image} ) => {
        return await query(`INSERT INTO ${tableName} (title, author, description, date, image) VALUES (?,
        ?, ?, ?, ?);`, [title, author, description, date, image]);
    },
    update: async (id, inner)=> {
        let uBook = {};
        switch (typeof inner === 'object') {
            case inner.hasOwnProperty('newTitle'):
                uBook.title = String(inner.newTitle);
                break;
            case inner.hasOwnProperty('newAuthor'):
                uBook.author = String(inner.newAuthor);
                break;
            case inner.hasOwnProperty('newDescription'):
                uBook.description = String(inner.newDescription);
                break;
            case inner.hasOwnProperty('newDate'):
                uBook.date = Number(inner.newDate);
                break;
        }
        query(`UPDATE ${tableName} SET ? WHERE (id = ?);`, [uBook, id]);
    },
};
module.exports = crud;