const core = require('./src/core.js');
let settings;
async function main() {
    // console.log("A")
    settings =await core.init();
    if(settings==-1){
        return;
    }
    console.log(settings)

}
main()