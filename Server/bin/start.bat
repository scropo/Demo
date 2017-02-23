start arangod
cd C:\Users\wajianhu\Downloads\nginx
nginx -s stop
start nginx
cd C:\Users\wajianhu\Documents\GitHub\lab2012
set NODE_ENV=production
set NODE_SERVE=C:\Users\wajianhu\Documents\GitHub\Demo\VGDesigner-min\VGDesigner
call node_modules\.bin\webpack 
call node_modules\.bin\gulp
mklink /J "..\Demo\VGDesigner-min\VGServer\node_modules" "node_modules"
cd ..\Demo\VGDesigner-min\VGServer &&npm start
cd ..\..\..\lab2012
