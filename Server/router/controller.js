import arangojs from 'arangojs';
import { objectArraySort } from '../lib';

const OK = 0,
    EXISTS = 1,
    ERROR = 2;

console.time('initdb')
const host = process.env.ARANGODB_HOST || 'localhost';
const port = process.env.ARANGODB_PORT || 8529;
const username = process.env.ARANGODB_USERNAME || 'test';
const password = process.env.ARANGODB_PASSWORD || 'test';
const database = process.env.ARANGODB_DB || 'designer';
const db = arangojs(`http://${host}:${port}`);

db.useBasicAuth(username, password);
db.useDatabase(database);
console.timeEnd('initdb')

export class Collection {
    constructor(collection) {
        console.time(`${collection} constructor`)
        this.collectionName = collection;
        this.collection = db.collection(collection);
        console.timeEnd(`${collection} constructor`)
    }
    async get(ctx, next) {
        const query = ctx.method === 'GET' ? ctx.request.query : ctx.request.body
        const _orderby = query._orderby || "_key",
            _sort = query._sort || "asc"
        delete query._orderby
        delete query._sort
        let cursor = {}
        try {
            console.time('arango get')
            cursor = typeof query.query === 'string' ?
                await db.query(
                    `FOR d IN ${this.collectionName}
                    FILTER ${query.query}
                    RETURN d`) :
                await this.collection.byExample(query)
            console.timeEnd('arango get')
        } catch (err) {
            console.error(err.stack)
            return ctx.body = { status: ERROR, data: { msg: "系统开小差了！" } };
        }
        const docs = cursor._result
        if (!docs.length) return ctx.body = { status: ERROR, data: { msg: "信息不存在！" } };
        objectArraySort(docs, _orderby, _sort)
        ctx.body = { status: OK, data: docs };
    }
    async save(ctx, next) {
        //ctx.request.body.xml = JSON.parse(ctx.request.body.xml);
        try {
            //检查数据是否已存在
            const cursor = await this.collection.byExample({ filename: ctx.request.body.filename })
            console.log({ status: EXISTS, data: {msg:'数据已存在！'} })
            if (cursor._result.length) return ctx.body = { status: EXISTS, data: {msg:'数据已存在！'} };//数据已存在
            //保存数据
            console.time('arango post')
            const meta = await this.collection.save(ctx.request.body);
            console.timeEnd('arango post')
            ctx.body = { status: OK, data: {_key:meta._key} };
        } catch (err) {
            console.error(err.stack)
            ctx.body = { status: ERROR, data: { msg: "系统开小差了！" } };
        }
    }
    async update(ctx, next) {
        try {
            console.time('arango update')
            let meta = await this.collection.updateByExample({ filename: ctx.request.body.filename }, ctx.request.body);
            if(!meta.updated)meta = await this.collection.save(ctx.request.body);
            console.timeEnd('arango update')
            ctx.body = { status: OK, data: {_key:meta._key} };
        } catch (err) {
            console.error(err.stack);
            ctx.body = { status: ERROR, data: { msg: err.stack } };//数据更新失败
        }
    }
}
