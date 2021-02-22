const NodeRSA = require('node-rsa');
const fs = require('fs');
const key = new NodeRSA();
key.generateKeyPair();
// console.log(key)
/* console.log(key.exportKey())
console.log(key.exportKey('pkcs8-public'))
console.log(key.exportKey('pkcs1')) */
fs.writeFile(`PUB.key`, key.exportKey('pkcs8-public'), function (err) {
if(err)console.log(err)

})
fs.writeFile(`PRIV.key`, key.exportKey('pkcs1'), function (err) {
    if(err)console.log(err)
    
    })