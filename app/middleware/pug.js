const app = require('../index');
const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app,
});

module.exports = pug;