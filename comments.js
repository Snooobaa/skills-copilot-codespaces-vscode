// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var comments = [];

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;

    if (pathname === '/') {
        fs.readFile('./index.html', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/submit') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found');
            } else {
                var ext = path.extname(pathname);
                if (ext === '.css') {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                } else if (ext === '.js') {
                    res.writeHead(200, { 'Content-Type': 'application/x-javascript' });
                }
                res.end(data);
            }
        });
    }
});

server.listen(3000, '