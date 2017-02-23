import Router from 'koa-router';
import { Collection } from './controller';

const collection = new Collection("attrs");
const attrs = new Router({
  prefix: '/attrs' //路径前缀
});

attrs
  .get('/get', async (ctx, next) => {
    await collection.get(ctx, next)
  })
  .post('/get', async (ctx, next) => {
    await collection.get(ctx, next)
  })

export default attrs
