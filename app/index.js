const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./middleware/routes');
const config = require('config');
const serve = require("koa-static");
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve('public'));

module.exports = app;

app.listen(config.server.port, () => {
    console.log(`Project started at http://localhost:${config.server.port}`);
});