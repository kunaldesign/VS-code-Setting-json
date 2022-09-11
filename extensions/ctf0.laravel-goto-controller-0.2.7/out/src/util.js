'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfig = exports.route_methods = exports.ignore_Controllers = exports.classmap_file_path = exports.PACKAGE_NAME = exports.scrollToText = exports.saveAppURL = exports.getRouteFilePath = exports.app_url = exports.routes_contents = exports.listenToFileChanges = exports.getControllerFilePaths = exports.setWs = exports.clearAll = exports.escapeStringRegexp = void 0;
const vscode_1 = require("vscode");
const fs = require('fs');
const path = require('path');
const sep = path.sep;
exports.escapeStringRegexp = require('escape-string-regexp');
exports.clearAll = new vscode_1.EventEmitter();
let ws;
function setWs(uri) {
    ws = vscode_1.workspace.getWorkspaceFolder(uri)?.uri.fsPath;
}
exports.setWs = setWs;
/* Controllers ------------------------------------------------------------------ */
let classmap_fileContents = '';
let cache_store_controller = [];
function getControllerFilePaths(text) {
    let editor = `${vscode_1.env.uriScheme}://file`;
    let info = text.replace(/['"]/g, '');
    let list = checkCache(cache_store_controller, info);
    if (!list.length) {
        let controller;
        let method;
        if (info.includes('@')) {
            let arr = info.split('@');
            controller = arr[0];
            method = arr[1];
        }
        else {
            let arr = info.split('\\');
            controller = arr.pop();
        }
        for (const path of getKeyLine(controller)) {
            let normalizedPath = editor + normalizePath(`${ws}${path}`);
            list.push({
                tooltip: path.replace(/^[\\\/]/g, ''),
                fileUri: vscode_1.Uri
                    .parse(normalizedPath)
                    .with({ authority: 'ctf0.laravel-goto-controller', query: method })
            });
        }
        if (list.length) {
            saveCache(cache_store_controller, info, list);
        }
    }
    return list;
}
exports.getControllerFilePaths = getControllerFilePaths;
function normalizePath(path) {
    return path
        .replace(/\/+/g, '/')
        .replace(/\+/g, '\\');
}
async function listenToFileChanges(classmap_file, artisan_file, debounce) {
    await getFileContent(classmap_file);
    await getRoutesInfo(artisan_file);
    let watcher = vscode_1.workspace.createFileSystemWatcher(exports.classmap_file_path);
    watcher.onDidChange(debounce(async function (e) {
        await getFileContent(classmap_file);
        await getRoutesInfo(artisan_file);
        cache_store_route = [];
        cache_store_controller = [];
    }, 500));
}
exports.listenToFileChanges = listenToFileChanges;
function getKeyLine(k) {
    let slash = '\\\\';
    k = k.includes('\\') ? k.replace(/\\/g, slash) : `${slash}${k}`;
    let match = classmap_fileContents.match(new RegExp(`['"].*${(0, exports.escapeStringRegexp)(k)}.*php['"]`, 'gm'));
    if (match) {
        let result = [];
        for (const item of match) {
            let line = item;
            let file = line.match(new RegExp(/['"]\S+(?=php).*?['"]/));
            if (file) {
                file = file[0].replace(/['"]/g, '');
                let path = line.includes('$baseDir')
                    ? file
                    : line.includes('$vendorDir')
                        ? `${sep}vendor${sep}${file}`
                        : null;
                result.push(path.replace(/[\\\/]+/g, sep));
            }
        }
        return result;
    }
    return [];
}
function getFileContent(file) {
    if (file) {
        return fs.readFile(file.path, 'utf8', (err, data) => {
            classmap_fileContents = data;
        });
    }
}
/* Routes ------------------------------------------------------------------- */
const exec = require('await-exec');
exports.routes_contents = [];
exports.app_url = '';
let cache_store_route = [];
function getRouteFilePath(text) {
    let cache_key = text.replace(/['"]/g, '');
    let list = checkCache(cache_store_route, cache_key);
    if (!list.length) {
        let info = extractController(cache_key);
        if (!info) {
            return [];
        }
        let { uri: url, action, method: urlType } = info;
        if (action == 'Closure') {
            return [];
        }
        let editor = `${vscode_1.env.uriScheme}://file`;
        let controller;
        let method;
        if (action.includes('@')) {
            let arr = action.split('@');
            method = arr[1];
            let namespace = arr[0].split('\\');
            controller = namespace.pop();
        }
        else {
            let arr = action.split('\\');
            controller = arr.pop();
        }
        let path = getKeyLine(controller)[0];
        if (!path) {
            return [];
        }
        let normalizedPath = editor + normalizePath(`${ws}${path}`);
        // controller
        list.push({
            tooltip: action,
            fileUri: vscode_1.Uri
                .parse(normalizedPath)
                .with({ authority: 'ctf0.laravel-goto-controller', query: method })
        });
        // browser
        if (urlType.includes('GET') && exports.app_url) {
            list.push({
                tooltip: `${exports.app_url}${url}`,
                fileUri: vscode_1.Uri.parse(`${exports.app_url}${url}`)
            });
        }
        saveCache(cache_store_route, cache_key, list);
    }
    return list;
}
exports.getRouteFilePath = getRouteFilePath;
let counter = 1;
async function getRoutesInfo(file) {
    let timer;
    try {
        let res = await exec('php artisan route:list --columns=uri,name,action,method --json', {
            cwd: vscode_1.workspace.getWorkspaceFolder(file)?.uri.fsPath,
            shell: vscode_1.env.shell
        });
        exports.routes_contents = JSON.parse(res.stdout);
    }
    catch (error) {
        // console.error(error)
        if (counter >= 3) {
            return clearTimeout(timer);
        }
        timer = setTimeout(() => {
            counter++;
            getRoutesInfo(file);
        }, 2000);
    }
}
function extractController(k) {
    return exports.routes_contents.find((e) => e.name == k);
}
async function saveAppURL() {
    exports.app_url = await vscode_1.window.showInputBox({
        placeHolder: 'project APP_URL',
        value: await vscode_1.env.clipboard.readText() || '',
        validateInput(v) {
            if (!v) {
                return 'you have to add a name';
            }
            else {
                return '';
            }
        }
    });
    if (exports.app_url) {
        exports.app_url = exports.app_url.endsWith(sep) ? exports.app_url : `${exports.app_url}${sep}`;
        exports.clearAll.fire(exports.clearAll);
    }
}
exports.saveAppURL = saveAppURL;
/* Scroll ------------------------------------------------------------------- */
function scrollToText() {
    vscode_1.window.registerUriHandler({
        handleUri(provider) {
            let { authority, path, query } = provider;
            if (authority == 'ctf0.laravel-goto-controller') {
                vscode_1.commands.executeCommand('vscode.open', vscode_1.Uri.file(path))
                    .then(() => {
                    setTimeout(() => {
                        let editor = vscode_1.window.activeTextEditor;
                        let range = getTextPosition(query, editor.document);
                        if (range) {
                            editor.selection = new vscode_1.Selection(range.start, range.end);
                            editor.revealRange(range, 2);
                        }
                        if (!range && query) {
                            vscode_1.window.showInformationMessage('Laravel Goto Controller: Copy Method Name To Clipboard', ...['Copy']).then((e) => {
                                if (e) {
                                    vscode_1.env.clipboard.writeText(query);
                                }
                            });
                        }
                    }, config.waitB4Scroll);
                });
            }
        }
    });
}
exports.scrollToText = scrollToText;
function getTextPosition(searchFor, doc) {
    if (searchFor) {
        const regex = new RegExp('function ' + (0, exports.escapeStringRegexp)(`${searchFor}(`));
        const match = regex.exec(doc.getText());
        if (match) {
            let pos = doc.positionAt(match.index + match[0].length);
            return new vscode_1.Range(pos, pos);
        }
    }
    return null;
}
/* Helpers ------------------------------------------------------------------ */
function checkCache(cache_store, text) {
    let check = cache_store.find((e) => e.key == text);
    return check ? check.val : [];
}
function saveCache(cache_store, text, val) {
    checkCache(cache_store, text).length
        ? false
        : cache_store.push({
            key: text,
            val: val
        });
    return val;
}
/* Config ------------------------------------------------------------------- */
exports.PACKAGE_NAME = 'laravelGotoController';
let config;
exports.classmap_file_path = '';
exports.ignore_Controllers = '';
exports.route_methods = '';
function readConfig() {
    config = vscode_1.workspace.getConfiguration(exports.PACKAGE_NAME);
    exports.classmap_file_path = config.classmap_file;
    exports.ignore_Controllers = config.ignoreControllers.map((e) => (0, exports.escapeStringRegexp)(e)).join('|');
    exports.route_methods = config.routeMethods.map((e) => (0, exports.escapeStringRegexp)(e)).join('|');
}
exports.readConfig = readConfig;
//# sourceMappingURL=util.js.map