const koaRouter = require('koa-router');
const router = new koaRouter();

router.get('/', async (ctx, next) => {
  await ctx.render('index');
  next();
})

module.exports = router;