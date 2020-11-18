const fs_p = require('fs').promises;
const fs = require('fs');
const compare = require('./compare.js');
const default_settings = require('./default_settings.js')
const download = require('./download.js');
const run = require('./run_program.js');
let running_threads = 0, tasks_done = 0, correct = 0, wrong = 0, runned = 0
const DEBUG = 0
if(DEBUG!=0){
    console.log(`core.js (./src) in debug mode`)
}
let settings = new Map(), test_settings = new Map();
let task_queue = [], wrong_tests=[];
function compareNumbers(a, b) {
    return a - b
 }
async function createPath(path, mask) {
    cb = function (err) {
        if (err) {
            console.log(err)
        }
    }
    mask = 0744
    await fs.mkdir(path, mask, function (err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null);
            else cb(err);
        } else cb(null);
    });
}
async function init_thread(id, settings) {
    if(DEBUG!=0)console.log("thread_inicialized")
    let task;
    while (true) {
        task = await get_task();
        if (task == -1) {
            running_threads--
            if(DEBUG!=0)console.log(`Thread ${id} finished, ${running_threads} remaining`)
            if(running_threads==0){
                summary()
            }
            
            return;
        }
        if (settings['download'] == true) await download.download_group(test_settings['url'], task, test_settings['prefix'], test_settings['in_ext'], test_settings['out_ext'], './testy/runtime')
        let command = `${settings['program']} <${settings['test_dir']}/in/${test_settings['prefix']}${task}${test_settings['in_ext']} > ${settings['test_dir']}/mout/${test_settings['prefix']}${task}${test_settings['out_ext']}`
        await run.run(command, runned + 1)
        runned++
        if (DEBUG != 0) console.log(`${runned} tests hah been run`)
        const result = await compare.compare(`${settings['test_dir']}/mout/${test_settings['prefix']}${task}${test_settings['out_ext']}`, `${settings['test_dir']}/out/${test_settings['prefix']}${task}${test_settings['out_ext']}`, `${test_settings['prefix']}${task}`)
        if (DEBUG != 0) console.log(`thread ${id} working (${task})`)
        tasks_done++
        if(tasks_done%settings['progres_update']==0){
            console.log(`Skończono sparwdzać ${tasks_done} testów`)
        }
        if (result == 1) {
            correct++
            if(DEBUG!=0)console.log(`correct (${correct} in total out of ${tasks_done})`)
        } else {
            wrong++
            wrong_tests.push(task)
            console.log(`wrong (${wrong} in total out of ${tasks_done})`)

        }
    }
}
function summary(){
    console.log("Podsumowanie:\n===================================")
    console.log(`${runned} wykonanych testów z czego\n${correct} poprawnych\n${correct/runned*100}% poprawności `)
    if(wrong>0){
        console.log(`Lista niepoprawnych testów:`)
        wrong_tests.sort(compareNumbers)
        for(let i=1;i<=Math.min(settings['wrong_skip'],wrong);i++){
            console.log(`Test nr ${wrong_tests.shift()}`)
        }
        if(wrong>settings['wrong_skip']){
            console.log(`Pomijam pozostałe ${wrong-settings['wrong_skip']} niepoprawnych testów`)
            console.log(`Aby zmienić liczbę wypisywanych testów zmień wartość "wrong_skip" w ustawieniach`)
        }
    }
    console.log(`Wszystkie wyjścia swojego programu znajdziesz w ${settings['test_dir']}/mout`)
}
async function get_task() {
    task_queue.push(-1)
    return task_queue.shift()
}
module.exports = {
    name: "core",
    init: async function () {
        let data;
        try {
            const a = await fs_p.readFile("settings.json", "utf8")
            data = JSON.parse(a);
            settings = data;
        }
        catch (e) {
            if (DEBUG != 0) console.log(e)
            fs_p.writeFile('./settings.json', default_settings.settings, function (err) {
                if (err)
                    return console.log('❌ ' + err);
            });
            console.log('⚠️  Stworzono plik ustawień, zmodyfikuj ustawienia do włassnych potezeb i uruchom ponownie');
            return -1;
        }
        try {
            let dirs = ['./testy', './testy/runtime', './testy/niepoprawne/', './testy/runtime/in', './testy/runtime/out', './testy/runtime/mout',
                './testy/niepoprawne/in', './testy/niepoprawne/out', './testy/niepoprawne/mout',`${settings['test_dir']}/mout`]
            for (let i = 0; i < dirs.length; i++) {
                await createPath(dirs[i]);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        } catch (e) {
            console.log("Wystąpił błąd:")
            console.log(e)
        }
        if (settings['threads'] < 0) {
            console.log('Nie podano poprawnej wartości dla "threads", ustawiam na 1')
            settings['threads'] = 1
        }
        if (settings['program'] == undefined) {
            console.log(`Niepoprawna wartość dla "program", zatrzymuję sprawdzarkę!`)
            return -1;
        }

        if (settings['download'] == true) {
            settings['test_dir'] = `./testy/runtime`
        }
        if (settings['test_dir'][settings['test_dir'].length - 1] == "/") {
            settings['test_dir'] = settings['test_dir'].substring(0, settings['test_dir'].length - 1)
        }
        return data;
    },
    init_tests: async function () {
        try {
            const a = await fs_p.readFile("test_settings.json", "utf8")
            data = JSON.parse(a);
            test_settings = data;
        }
        catch (e) {
            if (DEBUG != 0) console.log(e)
            fs_p.writeFile('./test_settings.json', default_settings.test_settings, function (err) {
                if (err)
                    return console.log('❌ ' + err);
            });
            console.log('⚠️  Stworzono plik ustawień testów, zmodyfikuj ustawienia do włassnych potezeb i uruchom ponownie');
            return -1;
        }
        for (let i = 1; i <= test_settings['quantity']; i++) {
            task_queue.push(i)
        }
        if(settings['download']==true)
        if (test_settings['url'][test_settings['url'].length - 1] == "/") {
            test_settings['url'] = test_settings['url'].substring(0, test_settings['url'].length - 1)
        }
    },
    init_threads: async function () {
        for (var i = 0; i < settings['threads']; i++) {
            init_thread(i, settings)
            running_threads++
        }

    }



}