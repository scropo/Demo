import Router from 'koa-router';
import { Collection } from './controller';

const collection = new Collection("viewer");
const viewer = new Router({
  prefix: '/viewer' //路径前缀
});

viewer
  .get('/get', async (ctx, next) => {
    await collection.get(ctx, next)
  })
  .post('/get', async (ctx, next) => {
    await collection.get(ctx, next)
  })
  .post('/save', async (ctx, next) => {
    await collection.save(ctx, next)
  })
  .post('/update', async (ctx, next) => {
    await collection.update(ctx, next)
  })

export default viewer
