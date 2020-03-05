const Koa = require('koa');
const app = new Koa();
require('dotenv').config()

app.use(ctx => {
  ctx.body = 'Hello Koa'
});

app.listen(process.env.API_PORT);