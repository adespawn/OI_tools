const fs = require('fs').promises;
const default_settings = require('./default_settings.js')
// const settings
module.exports = {
    name: "core",
    init: async function () {
        let data;
        try {
            const a = await fs.readFile("settings.json", "utf8")
            data=JSON.parse(a);
            console.log(a)
            
        }
        catch (e) {
            // console.log(e)
            fs.writeFile('./settings.json', default_settings.settings, function (err) {
                if (err)
                    return console.log('❌ ' + err);
            });
            console.log('⚠️  Stworzono plik ustawień, zmodyfikuj ustawienia do włassnych potezeb i uruchom ponownie');
            return -1;
        }
        return data;
    }
}