const fs_p = require('fs').promises;
const fs = require('fs');
const os = require('os');
const sudo = require('sudo-prompt');
const compare = require('./compare.js');
const default_settings = require('./default_settings.js')
const download = require('./download.js');
const run = require('./run_program.js');

let running_threads = 0, tasks_done = 0, correct = 0, wrong = 0, runned = 0
const DEBUG = 0
if (DEBUG != 0) {
    console.log(`core.js (./src) in debug mode`)
}
let settings = new Map(), test_settings = new Map(), times = new Map(), flags = new Map();
let task_queue = [], wrong_tests = [], times_qu = [];

function compareNumbers(a, b) {
    return a - b
}
function comparePairs(a, b) {
    return a[0] - b[0]
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
    if (DEBUG != 0) console.log("thread_inicialized")
    let task;
    while (true) {
        task = await get_task();
        if (task == -1) {
            running_threads--
            if (DEBUG != 0) console.log(`Thread ${id} finished, ${running_threads} remaining`)
            if (running_threads == 0) {
                summary()
            }

            return;
        }
        if (settings['download'] == true) await download.download_group(test_settings['url'], task, test_settings['prefix'], test_settings['in_ext'], test_settings['out_ext'], './testy/runtime')
        let command = `${settings['program']} <${settings['test_dir']}/in/${test_settings['prefix']}${task}${test_settings['in_ext']} > ${settings['test_dir']}/mout/${test_settings['prefix']}${task}${test_settings['out_ext']}`
        if (settings['use_oiejq'] == true) {
            let result = await run.time(command, task)
            times[task] = result;
            times_qu.push([result, task]);
        } else {
            await run.run(command, task)
        }
        runned++
        if (DEBUG != 0) console.log(`${runned} tests hah been run`)
        const result = await compare.compare(`${settings['test_dir']}/mout/${test_settings['prefix']}${task}${test_settings['out_ext']}`, `${settings['test_dir']}/out/${test_settings['prefix']}${task}${test_settings['out_ext']}`, `${test_settings['prefix']}${task}`)
        if (DEBUG != 0) console.log(`thread ${id} working (${task})`)
        tasks_done++
        if (tasks_done % settings['progres_update'] == 0) {
            console.log(`Skończono sparwdzać ${tasks_done} testów`)
        }
        if (result == 1) {
            correct++
            if (DEBUG != 0) console.log(`correct (${correct} in total out of ${tasks_done})`)
        } else {
            wrong++
            wrong_tests.push(task)
            console.log(`wrong (${wrong} in total out of ${tasks_done})`)

        }
    }
}
async function summary() {
    run.revoke_perms(settings['test_dir'] + '/mout', true)
    console.log("\n\nPodsumowanie:\n===================================")
    console.log(`${runned} wykonanych testów z czego\n${correct} poprawnych\n${correct / runned * 100}% poprawności `)
    if (wrong > 0) {
        console.log("===================================")
        console.log(`Lista niepoprawnych testów:`)
        wrong_tests.sort(compareNumbers)
        for (let i = 1; i <= Math.min(settings['wrong_skip'], wrong); i++) {
            console.log(`Test nr ${wrong_tests.shift()}`)
        }
        if (wrong > settings['wrong_skip']) {
            console.log(`Pomijam pozostałe ${wrong - settings['wrong_skip']} niepoprawnych testów`)
            console.log(`Aby zmienić liczbę wypisywanych testów zmień wartość "wrong_skip" w ustawieniach`)
        }
    }
    times_qu.sort(comparePairs).reverse()
    console.log("===================================\n")
    if (settings['use_oiejq']) {
        console.log("Najwyższe czasy:")
        for (let i = 1; i <= Math.min(settings['wrong_skip'], runned); i++) {
            let x = times_qu.shift()
            console.log(`Test nr ${x[1]}: ${(x[0]) / 1000}s`)
        }
        fs_p.writeFile('./times.json', JSON.stringify(times, null, 4), function (err) {
            if (err)
                return console.log('❌ ' + err);

        }).then(
            run.revoke_perms('times.json')
        );
        console.log();
    }
    console.log(`Wszystkie wyjścia swojego programu znajdziesz w ${settings['test_dir']}/mout`)
    if (settings['use_oiejq']) console.log(`Wszystkie czasy działania programu zostały zapisane w pliku times.json (czasy podane w ms)`)
}
async function get_task() {
    task_queue.push(-1)
    return task_queue.shift()
}
function parseFlags(stID) {
    for (let i = parseInt(stID); i < process.argv.length; i++) {
        flags[process.argv[i]] = (i != process.argv.length - 1) ? process.argv[i + 1] : 1;
        if (DEBUG) console.log(process.argv[i]);
    }
}
module.exports = {
    name: "core",
    init: async function () {
        let data;
        parseFlags(2);
        try {
            const a = await fs_p.readFile(`/var/tester/settings.json`, "utf8")
            data = JSON.parse(a);
            settings = data;
        }
        catch (e) {
            if (DEBUG != 0) console.log(e)
            try {
                await fs_p.writeFile(`/var/tester/settings.json`, default_settings.settings);
                console.log('⚠️ Stworzono plik ustawień, zmodyfikuj ustawienia do włassnych potezeb i uruchom ponownie');
                return -1;
            }
            catch (e) {
                if (DEBUG != 0) console.log(e)
            }
        }
        if (settings['threads'] < 0) {
            console.log('Nie podano poprawnej wartości dla "threads", ustawiam na 1')
            settings['threads'] = 1
        }
        if (settings['threads'] > os.cpus().length) {
            console.log(`Liczba wątków większa, zmniejszam do ${os.cpus().length}`)
            settings['threads'] = os.cpus().length;
        }
        if (settings['program'] == undefined) {
            console.log(`Niepoprawna wartość dla "program", zatrzymuję sprawdzarkę!`)
            return -1;
        }
        if (settings['download'] == true) {
            settings['test_dir'] = `./testy/runtime`
        }
        if (flags['-d'] != null) {
            if (DEBUG) console.log(`Podano ${flags['-d']} jako ścieżkę do testów`)
            settings['test_dir'] =flags['-d'];
        } else {
            if (DEBUG) console.log(`Brak podanej ścieżki: usatwiam "."`)
            settings['test_dir'] = `.`
        }
        try {
            dir = await fs_p.opendir(`${settings['test_dir']}/in`);
            dir3 = await fs_p.opendir(`${settings['test_dir']}/in`);
            dir2 = await fs_p.opendir(`${settings['test_dir']}/out`);
            for await (const dirent of dir) {
                let ch = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                let name = dirent.name;
                for (let i = 0; i < ch.length; i++) {
                    name = name.split(ch[i]).join('*')
                }
                name = name.split('*');
                test_settings['prefix'] = name[0];
                test_settings['in_ext'] = name[name.length - 1];
                console.log(`Ustawiam prefix i sufix wejścia na podstawie ${dirent.name}: ${test_settings['prefix']}???${test_settings['in_ext']}`)
                break;
            }
            for await (const dirent of dir3) {
                let num = dirent.name;
                if (test_settings['prefix']) {
                    num = num.split(test_settings['prefix'])[1]
                }
                if (test_settings['in_ext']) {
                    num = num.split(test_settings['in_ext'])[0];
                }
                task_queue.push(parseInt(num))
            }
            for await (const dirent of dir2) {
                let ch = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                let name = dirent.name;
                for (let i = 0; i < ch.length; i++) {
                    name = name.split(ch[i]).join('*')
                }
                name = name.split('*');
                test_settings['out_ext'] = name[name.length - 1];
                console.log(`Ustawiam prefix i sufix wyjścia na podstawie ${dirent.name}: ${test_settings['prefix']}???${test_settings['out_ext']}`)
                break;
            }
        } catch (err) {
            if (DEBUG) console.error(err);
            console.log(`❌ Nie można znaleść scieżki ${err.path} Kończę`)
            process.exit(1);
        }
        try {
            let dirs = [`${settings['test_dir']}/mout`]
            for (let i = 0; i < dirs.length; i++) {
                await createPath(dirs[i]);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        } catch (e) {
            console.log("Wystąpił błąd:")
            console.log(e)
        }
        if (settings['use_oiejq'] == true) {
            var uid = parseInt(process.env.SUDO_UID);
            if (!uid) {
                console.log("Not A root")
                process.exit(1);
            }
        }
        return data;
    },
    init_tests: async function () {
        /* try {
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
        if (settings['download'] == true)
            if (test_settings['url'][test_settings['url'].length - 1] == "/") {
                test_settings['url'] = test_settings['url'].substring(0, test_settings['url'].length - 1)
            } */
    },
    init_threads: async function () {
        for (var i = 0; i < settings['threads']; i++) {
            init_thread(i, settings)
            running_threads++
        }

    }



}