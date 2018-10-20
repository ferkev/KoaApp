//paquets
const Koa = require('koa');
const convert = require('koa-convert');
const json = require('koa-json');
const views = require('koa-views');
const bodyparser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const error = require('koa-error');

//Init Application
const app = new Koa();

//routes
const indexRouter = require('./routes/index');

onerror(app);

// middlewares
app.use( convert(bodyparser()) )
app.use( convert(json()) );
app.use( convert(logger()) );
app.use( convert(require('koa-static')(__dirname + '/public') ))

//views
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//initialisation des routes
app.use( indexRouter.routes() ).use( indexRouter.allowedMethods() );


// // catch 404 and forward to error handler
app.use(error({
  engine: 'ejs',
  template: __dirname + '/views/error.ejs'
}));

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});



//launch api on port 3000
app.listen(3000);