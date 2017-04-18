'use strict';

let http = require('http'),
    fs = require('fs'),
    port = 1185,
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    pwnd = require('haveibeenpwned')(),
    app = express();
    app.listen(port, () => {
        console.log('server listening on port: ' + port);
    });
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/checkpasswordagainstapi', (req, res) => {
    if(req.body !== 'undefined' && req.body.email !== '') {
        let email = req.body.email;
        
        pwnd.breachedAccount(email, (err, data) => {
            if(!err) {
                if(data.length)
                    return res.send({"Pwnd": true});
                else
                    return res.send({"Pwnd": false});
            }
            return res.send({"Pwnd": true});
        });
    }
});