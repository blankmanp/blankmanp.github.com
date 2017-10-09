var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {
    var url = req.url;
    var filePath = path.resolve(__dirname, './index.html');
    if (url !== '/') {
        filePath = path.resolve(__dirname, '.' + url);
    }
    if (url.indexOf('.js') !== -1) {
        res.setHeader('Content-Type', 'text/javascript');
    } else if (url.indexOf('.css') !== -1) {
        res.setHeader('Content-Type', 'text/css');
    } else {
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    }
    if (fs.existsSync(filePath)) {
        res.end(fs.readFileSync(filePath));
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", 'text/html;charset=UTF-8');
        res.end("抱歉我找不到该文件诶~");
    }
})

server.listen(3000);