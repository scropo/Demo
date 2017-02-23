import Router from 'koa-router';
import { Collection } from './controller';

const collection = new Collection("modelClass");
const model = new Router({
  prefix: '/modelClass'
});

model
  .get('/get', async (ctx, next) => {
    await collection.get(ctx, next)
  })
  .post('/get', async (ctx, next) => {
    await collection.get(ctx, next)
  })
  .post('/save', async (ctx, next) => {
    await collection.save(ctx, next)
  })

export default model
