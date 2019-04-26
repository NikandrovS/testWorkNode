const pug = require('../middleware/pug');

const crud = {
    startBooks: 3,
    page: undefined,
    max: undefined,
    pug: (page, total, current) =>
        pug.render('test', {
            max: total,
            count: current,
            books: page.slice(0, this.startBooks)
        })
};
module.exports = crud;