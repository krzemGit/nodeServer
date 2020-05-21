const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    let extname = path.extname(filePath);

    let contentType = 'text/html'

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    };

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'contentType': 'text/html' });
                    res.end(content)
                })
            } else {
                res.writeHead(500);
                res.end('Error code: ' + err.code)
            }
        } else {
            res.writeHead(200, { 'contentType': contentType });
            res.end(content)
        }
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running on port: ' + PORT));