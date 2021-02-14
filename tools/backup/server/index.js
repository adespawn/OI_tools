
const express = require('express')
const moment = require('moment')
const fs = require('fs')

const app = express()
const http = require('http')
const port = 8080


http.createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let buff = Buffer(body, 'base64');
        let q = JSON.parse( buff.toString('utf-8'));
        let filename = `[${moment().format().split('T').join('_').split('+')[0]}]_` + q.filename + ".bp";
        fs.writeFile(`./backups/${filename}`, q.body, function (err) {
            if (err) return console.log(err);
            else console.log(`[${moment().format()}] Zapisano ${filename}`);
            response.write(`{"succes":1}`)
            response.end()
        });
    });

}).listen(8080);
