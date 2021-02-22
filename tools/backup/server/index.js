
const express = require('express')
const moment = require('moment')
const fs = require('fs')
const NodeRSA = require('node-rsa');


settings = 'settings.json'
KEY = 'PRIV.key'
const app = express()
const http = require('http')
const port = 8080
const bcrypt = require('bcrypt');
let set,pubKEY
fs.readFile(settings, 'utf8', function (err, settR) {
    if (err) console.log("err", err)
    set = JSON.parse(settR)
    console.log("wczytano ustawienia")
});
fs.readFile(KEY, 'utf8', function (err, key) {
    if (err) console.log("err", err)
    pubKEY=new NodeRSA(key)
});
http.createServer((request, response) => {
    let IP = request.connection.remoteAddress
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        try {
            body = Buffer.concat(body).toString();
            let decryptedData= pubKEY.decrypt(body)
            let q = JSON.parse(decryptedData);
            bcrypt.compare(set.pass, q.auth, function (err, res) {
                if (err) console.log(err)
                else {
                    if (res) {
                        let filename = `[${moment().format().split('T').join('_').split('+')[0]}]_` + q.filename + ".bp";
                        fs.writeFile(`./backups/${filename}`, q.body, function (err) {
                            if (err) return console.log(err);
                            else console.log(`[${moment().format()}] Zapisano ${filename}`);
                            response.write(`{"succes":1}`)
                            response.end()
                        });
                    } else {
                        console.log(`[${moment().format()}] Atempted acces with wrong password from ${IP}, raw data:\n${buff}`)
                        response.write(`{"succes":0,"error":"wrong password"}`)
                        response.end()
                    }
                }
            });
        } catch (e) {
            response.write(`{"succes":0,"error":"error occurred"}`)
            response.end()
        }

    });

}).listen(8080);
