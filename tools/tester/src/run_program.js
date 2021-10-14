const util = require('util');
const exec = util.promisify(require('child_process').exec);
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
            if(DEBUG!=0)console.log(`${test} started: ${command}`)
            if(DEBUG!=0)console.log(`/var/tester/src/oiejq.sh ${command}`)
            const stdout  = await exec(`/var/tester/src/oiejq.sh ${command}`);
            /* exec(`/var/tester/src/oiejq.sh ${command}`,{},error=>{
                console.log(error);
            }); */
            let time =Number(stdout['stderr'].split('Time: ')[1].split('ms')[0])
            if(DEBUG!=0)console.log("time: ",time,"ms")
            if(DEBUG!=0)console.log(`${test} ended`)
            return time;
        }
        catch (e) {
            console.log(`Cannot launch program for test ${test}:\n${e}`)
        }
    },
    revoke_perms: async function (dir,is_dir){
        const  stdout  = await exec(`whoami`);
        if(stdout.stdout=='root'||stdout.stdout=='root\n'){
            let command=`chmod 766${(is_dir)?' -R':''} ${dir}`
            await exec(command)
        }
    }
}