
const express = require('express')
const moment = require('moment')
const fs = require('fs')

settings = 'settings.json'
const app = express()
const http = require('http')
const port = 8080
const bcrypt = require('bcrypt');
let set
fs.readFile(settings, 'utf8', function (err, settR) {
    if (err) console.log("err", err)
    set = JSON.parse(settR)
    console.log("wczytano ustawienia")
});
http.createServer((request, response) => {
    let IP= request.connection.remoteAddress
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let buff = Buffer(body, 'base64');
        let q = JSON.parse(buff.toString('utf-8'));
        console.log(q.auth)
        bcrypt.compare(set.pass, q.auth, function (err, res) {
            if (err) console.log(err)
            else {
                if (res) {
                    // console.log("potwierdzam")
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

    });

}).listen(8080);
