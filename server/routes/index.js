const router = require('koa-router')();
const helloWorldRoutes = require('./hello-world');

router.use('/api/v1', helloWorldRoutes);

module.exports = router;
