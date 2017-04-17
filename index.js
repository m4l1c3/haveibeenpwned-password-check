'use strict';

let http = require('http'),
    fs = require('fs'),
    server = http.createServer((req, res) => {
            displayForm(res);
    }),
    port = 1185;

function displayForm(res) {
    fs.readFile('form.html', (err, data) => {
        res.writeHead(200, {
           'Content-Type' : 'text/html',
           'Content-Length': data.length
        });

        res.write(data);
        res.end();
    });
}

server.listen(port);
console.log('server listening on port: ' + port);