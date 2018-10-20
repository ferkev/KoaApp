const koaRouter = require('koa-router');
const router = new koaRouter();

router.get('/', async (ctx, next) => {
  await ctx.render('index', { title: 'Myapp'});
  next();
})

module.exports = router;