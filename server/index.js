const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
var serve = require('koa-static-server');

const generateData = require('./generateData');
const router = require('./routes');

const app = new Koa();
app.use(bodyParser());
app.use(cors());
app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve({ rootDir: 'server/uploads', rootPath: '/images' }))
  .listen(3030, () => console.log('API Server listening on port 3030'));

generateData();
