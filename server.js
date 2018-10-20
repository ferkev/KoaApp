const Koa = require('koa');
const json = require('koa-json');
const views = require('koa-views');
const bodyparser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const logger = require('koa-logger');

//Init Application
const app = new Koa();

//routes
const indexRouter = require('./routes/index');

onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use( json() );
app.use( logger() );
app.use(require('koa-static')(__dirname + '/public'))

//views
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//initialisation des router

app.use( indexRouter.routes() ).use( indexRouter.allowedMethods() );

//launch api on port 3000
app.listen(3000);