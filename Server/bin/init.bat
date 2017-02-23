set repo=--registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/mirrors/node
REM set repo=
::npm(node 包管理器)安装 node 运行时依赖
call npm i --save %repo% ^
babel-plugin-transform-es2015-modules-commonjs ^
babel-preset-es2017 ^
babel-register ^
koa@next ^
koa-bodyparser@next ^
koa-compress@next ^
koa-logger@next ^
koa-router@next ^
kcors@next ^
arangojs
REM goto start
call npm i --save %repo% ^
koa-conditional-get@next ^
koa-etag@next ^
koa-static@next ^
koa-views@next ^
mocha ^
nunjucks ^
should
::npm安装 node 开发依赖
call npm i --save-dev %repo% ^
babel-preset-react ^
react ^
react-dom ^
react-router ^
webpack ^
bower ^
babel-loader ^
css-loader ^
extract-text-webpack-plugin ^
gulp ^
gulp-htmlmin ^
gulp-imagemin ^
gulp-clean-css ^
gulp-uglify ^
style-loader ^
url-loader ^
file-loader ^
gulp-replace ^
gulp-concat ^
del ^
codemirror ^
xml2js ^
js-yaml
::bower(前端包管理器)安装前端依赖
REM call node_modules\.bin\bower i --save ^
REM bootstrap ^
REM font-awesome ^
REM jquery ^
REM nedb ^
REM codemirror
REM :start
