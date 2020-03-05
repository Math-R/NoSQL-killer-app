require('dotenv').config()
const Koa = require('koa');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = new Koa();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ctx => {
  ctx.body = 'Hello Koa'
});

app.listen(process.env.API_PORT);