const util = require('util');
const execFile = util.promisify(require('child_process').exec);
let DEBUG = 0
if(DEBUG==1){
    console.log(`run_program.js (src/) is in DEBUG mode`)
}
module.exports = {
    name: "run",
    run: async function (command, test) {
        try {
            if(DEBUG!=0)console.log(`${test} started`)
            const { stdout } = await execFile(command);
            if(DEBUG!=0)console.log(`${test} ended`)
        } catch (e) {
            console.log(`Cannot launch program for test ${test}:\n${e}`)
        }
    },
    time: async function (command, test) {
        try {
        }
        catch (e) {
            console.log(`Cannot launch program for test ${test}:\n${e}`)
        }
    }
}