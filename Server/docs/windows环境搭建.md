## Windows环境搭建

1. 安装node

 - [下载安装nodist](https://github.com/marcelklehr/nodist/releases/download/v0.8.8/NodistSetup-v0.8.8.exe)
  
 - 安装node:`nodist add latest&&nodist latest`
  
 - 检查:`node -v`

2. 安装配置arangodb

 - [下载安装arangodb](https://www.arangodb.com/repositories/arangodb31/Windows7/x86_64/ArangoDB3-3.1.8-1_win64.exe)

 - 将 arangodb_home\usr\bin 目录添加到 PATH 系统环境变量

 - arangodbd 命令启动服务,arangosh 命令启动客户端
  
 - 修改root密码:
 
   `require('@arangodb/users').update('root','新密码')`
  
 - 创建数据库：
 
   `db._createDatabase('新数据库')`
  
 - 创建用户:
  
     ```javascript
     var users=require('@arangodb/users');
     users.save('新用户','用户密码');
     users.grantDatabase('用户名','数据库');
     ````
    
 - 访问数据库:
 
   `arangosh --server.username 用户名 --server.database 数据库`
  
 - 创建集合:
 
   `db._create('集合名')`
