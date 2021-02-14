
const express = require('express')
const moment = require('moment')
const fs = require('fs')

const app = express()
const port = 8080


app.get('/', function (req, res) {
    res.send("{\"succes\":1}")
    let q = req.query
    let filename=`[${moment().format().split('T').join('_').split('+')[0]}]_`+q.filename+".bp";
    fs.writeFile(`./backups/${filename}`, q.body, function (err) {
        if (err) return console.log(err);
        else console.log(`[${moment().format()}] Zapisano ${filename}`);
    });
})
app.listen(port, () => {
    console.log(`Backup server listening at http://localhost:${port}`)
})