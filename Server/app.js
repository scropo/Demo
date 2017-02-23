//入口文件
import Koa from 'koa'
import logger from 'koa-logger'
import bodyparser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from 'kcors'
//import views from 'koa-views'
import serve from 'koa-static'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
//引入自定义路由模块
import viewer from './router/viewer'
import model from './router/model'
import attrs from './router/attrs'
import modelClass from './router/modelClass'
//Koa：nodejs的web开发框架
const app = new Koa()
app.use(cors());
//启用gzip压缩，提高数据传输效率
app.use(compress())
//缓存协商,根据etag判断待传输的数据有没有更新，没有更新返回304 Not Modified，不传输数据
app.use(conditional())
//给传输的数据添加标识
app.use(etag())
//Koa 日志输出
app.use(logger())
//静态资源目录
app.use(serve(process.env.NODE_SERVE || __dirname + '/../VGDesigner'))
//模版渲染中间件，指定模版目录和模版引擎
//app.use(views(__dirname + '/views', { map: { html: 'nunjucks' } }))
//解析请求body
app.use(bodyparser())
//路由
app.use(viewer.routes())
app.use(model.routes())
app.use(attrs.routes())
app.use(modelClass.routes())
//在指定端口启动服务
app.listen(process.env.PORT || 3000)
console.log(`Server running on port ${process.env.PORT || 3000}!\nnode version:${process.version}`);//字符串模板
