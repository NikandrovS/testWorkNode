const Routes = require('koa-router');
const router = new Routes();
const books = require('../models/query');
const render = require('../models/render');

router
    .get('/', async (ctx, next) => {
        render.page = await books.getAll(render.startBooks);
        const totalBooks = await books.countAll();
        render.max = totalBooks[0].max;
        ctx.response.body = render.pug(render.page, render.max, render.startBooks);
    })
    .post('/', async (ctx, next) => {
        const form = ctx.request.body;

        if (form.title) {
            await books.create(ctx.request.body);
        }
        if (form.count) {
            if ( form.count.match(/[0-9]/g) ) {
                render.startBooks = form.count;
            } else {
                console.log('Пожалуйста введите число');
            }
        }

        ctx.redirect('/');
    })
    .post('/update/:id', async (ctx, next) => {
        await books.update(ctx.params.id, ctx.request.body);
        ctx.redirect('/');
    });

module.exports = router;