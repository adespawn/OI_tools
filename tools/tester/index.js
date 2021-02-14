const core = require('./src/core.js');
let settings;
async function main() {
    settings =await core.init();
    if(settings==-1){
        return;
    }
    const test_init = await core.init_tests()
    if(test_init==-1){
        return;
    }
    await core.init_threads()
}
main()