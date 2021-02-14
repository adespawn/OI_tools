/* 
██    ██ ███████ ████████  █████  ██     ██      █████  ██████  ██████  ███████ ███████     ███████ ███████ ██████  ██     ██ ███████ ██████   █████  
██    ██ ██         ██    ██   ██ ██     ██     ██   ██ ██   ██ ██   ██ ██      ██          ██      ██      ██   ██ ██     ██ ██      ██   ██ ██   ██ 
██    ██ ███████    ██    ███████ ██  █  ██     ███████ ██   ██ ██████  █████   ███████     ███████ █████   ██████  ██  █  ██ █████   ██████  ███████ 
██    ██      ██    ██    ██   ██ ██ ███ ██     ██   ██ ██   ██ ██   ██ ██           ██          ██ ██      ██   ██ ██ ███ ██ ██      ██   ██ ██   ██ 
 ██████  ███████    ██    ██   ██  ███ ███      ██   ██ ██████  ██   ██ ███████ ███████     ███████ ███████ ██   ██  ███ ███  ███████ ██   ██ ██   ██ */

let server = '10.0.1.47'

/* 
██    ██ ███████ ████████  █████  ██     ██      █████  ██████  ██████  ███████ ███████     ███████ ███████ ██████  ██     ██ ███████ ██████   █████  
██    ██ ██         ██    ██   ██ ██     ██     ██   ██ ██   ██ ██   ██ ██      ██          ██      ██      ██   ██ ██     ██ ██      ██   ██ ██   ██ 
██    ██ ███████    ██    ███████ ██  █  ██     ███████ ██   ██ ██████  █████   ███████     ███████ █████   ██████  ██  █  ██ █████   ██████  ███████ 
██    ██      ██    ██    ██   ██ ██ ███ ██     ██   ██ ██   ██ ██   ██ ██           ██          ██ ██      ██   ██ ██ ███ ██ ██      ██   ██ ██   ██ 
 ██████  ███████    ██    ██   ██  ███ ███      ██   ██ ██████  ██   ██ ███████ ███████     ███████ ███████ ██   ██  ███ ███  ███████ ██   ██ ██   ██ */






//reszta kodu
const fs = require('fs');
const { exit } = require('process');
const request = require('request');
const http = require('http')
let file = process.argv[2]
let dir = process.argv[3]
function fend(){
    exit();
}
fs.readFile(dir, 'utf8', function (err, data) {
    if (err) console.log("err", err)
    // console.log(data)
    let url = `http://${server}`
    // console.log(url)
    let rdata=new Map;
    rdata.body=data
    rdata.filename=file
    jsond=JSON.stringify(rdata);
    bf=Buffer(jsond)
    // console.log(bf.toString('base64'))
     options = {
        uri: url,
        port: 8080,
        json: false,
        method: 'POST',
        href: '',
        pathname: '/'
    };
    var req = http.request(options, function(res)
    {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
       console.log("Odpowiedź serwera: " + chunk);
     });
    });
    req.write(bf.toString('base64'));
    req.end();
/*    request(options, (err, res) => {
      if (err) { return console.log(err); }
      console.log(res.body,"zakończono przesyłać");
      setTimeout(fend, 2000);
    }); */
    
});