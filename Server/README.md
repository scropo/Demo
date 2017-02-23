#ModelDesigner

## TODOS

- nginx/性能
- save add timestamp
- arango文档
- 图结构

##架构

- 服务端开发语言： [Node.js v4](https://nodejs.org/zh-cn)
- Web开发： [Koa v2](https://github.com/koajs/koa)
- 页面渲染： [React](https://facebook.github.io/react)
- 数据库： [ArangoDB](https://www.arangodb.com)
- 代码检查： [CodeMirror](http://codemirror.net)
- 数据格式转换： [JS-YAML](https://github.com/nodeca/js-yaml)
    [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)(xml<==>json<==>yaml)
- 网络拓扑： [mxGraph](https://github.com/jgraph/mxgraph)

## 关于性能

- 数据传输： Gulp 代码压缩、 Gzip 压缩、 ServiceWorker离线访问
- 系统服务： nginx 静态资源代理、请求转发
- 数据传输格式； 压缩版 json [JSONH](https://github.com/WebReflection/JSONH)

## 关于数据

    ```
    server:         XML<==>JSON<==>YAML (如有必要)
                             │
    network:               JSONH
                             │
    browser: XML(源数据)<==>JSON(传输数据)<==>yaml(目标数据)
    ```

## 接口整理

1. EditorUi.js

    mxgraph AJAX传输前使用 encodeURIComponent()将XML转码，需要使用 decodeURIComponent()解码

2. XML2JSON转换

    ```javascript
					xml2js.parseString(xml, function (err, result) {
                        if(err)return;
						xml = JSON.stringify(result)
						new mxXmlRequest(SAVE_URL, 'filename=' + encodeURIComponent(name) +
							'&xml=' + xml).simulate(document, '_blank');
					})
    ```

3. JSON2XML转换

    ```javascript
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(json);
    ```

4. AJAX实现

    mxXmlRequest.js

5. DB 管理

    ```bash
    db._createDatabase('Designer') #创建
    db._dropDatabase('Designer') #删除
    db._useDatabase('Designer') #切换
    ```

6. Collection 管理

    ```bash
    db._collections() #列表
    db._create('Model') #创建
    db._createEdgeCollection('Model') #创建
    db._drop('Model') #删除
    ```

7. Document 管理

    ```javascript
        let db = arangojs(`http://${host}:${port}`);
        db.useBasicAuth(username, password);
        db.useDatabase(database);
        const collection = db.collection('Model');//切换集合
        const meta = await collection.save({_key:'Drawing1.xml', filename: 'Drawing1.xml',  xml: 'xml' })//插入
        await collection.update('Drawing1.xml', {xml: 'json'})//更新
        await collection.document('Drawing1.xml')//查询
        await collection.remove('Drawing1.xml')//删除
        await collection.import(docs)//批量插入
        await collection.all()//查询所有
        await collection.truncate()//删除所有
        let result = await db.query(aql`RETURN ${Date.now()}`)//aql模板字符串查询
    ```
