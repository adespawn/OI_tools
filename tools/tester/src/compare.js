const util = require('util');
const execFile = util.promisify(require('child_process').exec);
module.exports = {
compare : async function(f1,f2,id){
    try {
        com_command=`/var/tester/src/compare ${f1} ${f2} ${id}`
        const {stdout} = await execFile(com_command);
        if(stdout.length > 1){
            console.log(stdout)
            return -1;
        }else{
            return 1;
        }
    }catch(e){
        console.log(`Cannot compare files:\n${e}`)
    }
}
}