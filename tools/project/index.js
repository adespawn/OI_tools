#!/usr/bin/env node
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const randomstring = require("randomstring");
const { error } = require('console');
const fs = require('fs');
const { prSettings, projErr } = require('./src/data');
let flags = new Map()
function ask(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}
function parseFlags(stID) {
    for (let i = parseInt(stID); i < process.argv.length; i++) {
        flags[process.argv[i]] = 1
    }
}
function isSet(flag) {
    if (flags[flag] != 1) return 0;
    return 1;
}
async function createProject(prID) {
    if (fs.existsSync(prID)) {
        console.log(`Folder with name "${prID}" already exists\nRemove this directory to create project`)
        return
    }
    fs.mkdirSync(prID)
    fs.mkdirSync(`${prID}/tests`)
    fs.mkdirSync(`${prID}/tests/in`)
    fs.mkdirSync(`${prID}/tests/out`)
    fs.mkdirSync(`${prID}/tmp`)
    fs.mkdirSync(`${prID}/bin`)
    let prSets = new prSettings(prID)
    if (!isSet("-nm")) {
        prSets.sol.push("main.cpp")
        fs.writeFileSync(`${prID}/main.cpp`, "int main(){}")
    }
    if (isSet("-V")) {
        exec(`code ${prID}`)
    }
    fs.writeFileSync(`${prID}/prs.json`, JSON.stringify(prSets, null, 4))
}
async function compile(path) {
    let cmpF = ""
    let outDir = path.slice(0, -4)
    if (isSet("-f")) {
        cmpF = "-Wall -Wextra -pedantic -std=c++17 -O2 -Wformat=2 -Wfloat-equal -Wlogical-op -Wshift-overflow=2 -Wduplicated-cond -Wcast-qual -Wcast-align -D_GLIBCXX_DEBUG -D_GLIBCXX_DEBUG_PEDANTIC -D_FORTIFY_SOURCE=2 -fsanitize=address -fsanitize=undefined -fno-sanitize-recover -fstack-protector"
    }
    const { stdout, stderr } = await exec(`g++ ${path} -o ${outDir} ${cmpF}`)
    if (stderr.length > 0) throw (stderr)
    return outDir
}

async function isProjectDir() {
    try {
        let d = fs.readFileSync("prs.json")
        return JSON.parse(d + "")
    } catch (e) {
        if (e.errno == -2)
            return -1;
    }
}

async function runSingleTest(testDir, binaryDir, code) {

    const { stdout, stderr } = await exec(`./${binaryDir} <tests/in/${testDir} >tmp/${testDir}_${code}.out`)
    if (stderr.length > 0) throw (stderr)
    const { cmpout, cmperr } = await exec(`comp tests/out/${testDir.split('.in')[0] + ".out"} tmp/${testDir}_${code}.out >tmp/${testDir}_${code}.log ${testDir}`)
    let diff = fs.readFileSync(`tmp/${testDir}_${code}.log`)
    if (diff != null && diff != undefined && diff.length > 0) {
        return [-1, diff + ""];
    } else {
        return [0, ""]
    }
}

async function testProgram(name) {

    let step = 0
    try {
        let binary = await compile(name)
        step++
        let res = new Map()
        let tests = fs.readdirSync("./tests/in")
        let code = randomstring.generate(5)
        for (file of tests) {
            let res=await runSingleTest(file, binary, code)
            if(res[0]!=0){
                console.log(`❌ TEST ${file} ❌\n${res[1]}`)
                if(isSet("-s")){
                    console.log("WRONG ANWSER (-s) EXITING")
                    return
                }
            }else{
                console.log(`✅ OK. ${file}`)
            }
        }

    }
    catch (e) {
        switch (step) {
            case 0:
                throw (new projErr(0, e.stderr))
            default:
                console.log(`UNEXPECTED ERROR\n${e}`)
                throw new projErr(-1, "ERROR")
                break;
        }
    }
}

async function runTestsInit(name) {
    if (await isProjectDir() == -1) {
        console.log("Canoot run test in non project directory")
        return
    }
    let file = ""
    if (name.length <= 0) {
        file = "*"
        console.log("No filename given: assuming all files")
    }
    else {
        switch (name) {
            case "*":
            case "a":
            case "all":
                file = "*"
                break;
            default:
                try {
                    fs.readFileSync(name)
                    file = name
                } catch (e) {
                    if (e.errno == -2) {
                        console.log("Cannot find specified file")
                        return;
                    }
                }
                break;
        }
    }
    if (file == "*") {
        let sets = await isProjectDir();
    }
    else {
        try {
            let res = await testProgram(file)
            console.log(res)
        } catch (e) {
            switch (e.code) {
                case 0:
                    console.log(`Error while compiling program\n${e.msg}`)
                    break;
            }
        }
    }

}
async function cleanTMP(){
    if(isProjectDir()){
        await exec("rm ./tmp/*")
        console.log("DONE")
    }
}
isProjectDir()
switch (process.argv[2]) {
    case "i":
    case "init":
    case "create":
        if (process.argv.length <= 3 || process.argv[3].length <= 0) {
            console.log("Invalit project name")
            break;
        }
        parseFlags(4)
        createProject(process.argv[3])
        break;
    case "c":
    case "comp":
    case "compile":
        if (process.argv.length <= 3 || process.argv[3].length <= 0) {
            console.log("Invalit filename")
            break;
        }
        parseFlags(4)
        compile(process.argv[3])
        break;
    case "r":
    case "run":
        let d = ""
        parseFlags(4)
        if (process.argv.length > 3 && process.argv[3].length > 0) {
            d = process.argv[3];
        }
        runTestsInit(d);
        break;
    case "clean":
        cleanTMP()
    break;
    default:
        console.log("Invalit arguments")
        break;
}