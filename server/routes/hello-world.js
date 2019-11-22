const router = require('koa-router')();

async function helloworld(ctx) {
  ctx.body = { greeting: 'Hello world' };
}

router.get('/', helloworld);

module.exports = router.routes();
