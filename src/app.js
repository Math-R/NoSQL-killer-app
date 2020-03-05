require('dotenv').config()
const Koa = require('koa');
const router = require('./Player/player.route');
const koaBody = require('koa-body');

const app = new Koa();

app
  .use(koaBody())
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
  })
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(process.env.API_PORT);