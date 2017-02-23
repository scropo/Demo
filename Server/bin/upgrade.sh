export NODE_ENV=production
export NODE_SERVE=/mnt/editor/VGDesigner
_path='/mnt'
mv $_path/editor $_path/editor$(date +%Y%m%d)
mv $_path/publish $_path/editor
cd $_path/editor/VGServer
npm config rm proxy
npm config rm http-proxy
npm config rm https-proxy
npm config set no-proxy .huawei.com
npm config set registry http://rnd-mirrors.huawei.com/npm-registry/
npm i
pm2 restart pm2.json
cp nginx.conf /etc/nginx/nginx.conf
nginx -s reload
