require('dotenv').config()
const Koa = require('koa');
const router = require('./Player/player.route');

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(process.env.API_PORT);