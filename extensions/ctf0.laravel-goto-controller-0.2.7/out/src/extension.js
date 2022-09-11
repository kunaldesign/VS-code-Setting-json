'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const SharedLinkProvider_1 = require("./providers/SharedLinkProvider");
const lodash_1 = require("lodash");
const util = require("./util");
let providers = [];
let classmap_file;
let artisan_file;
async function activate({ subscriptions }) {
    util.readConfig();
    // config
    vscode_1.workspace.onDidChangeConfiguration(async (e) => {
        if (e.affectsConfiguration(util.PACKAGE_NAME)) {
            util.readConfig();
        }
    });
    // controllers & routes
    classmap_file = await vscode_1.workspace.findFiles(util.classmap_file_path, null, 1);
    artisan_file = await vscode_1.workspace.findFiles('artisan', null, 1);
    classmap_file = classmap_file[0];
    artisan_file = artisan_file[0];
    // init
    init();
    // route app_url
    subscriptions.push(vscode_1.commands.registerCommand('lgc.addAppUrl', util.saveAppURL));
    util.clearAll.event(async () => {
        await clearAll();
        initProviders();
    });
}
exports.activate = activate;
function init() {
    // links
    initProviders();
    vscode_1.window.onDidChangeActiveTextEditor(async (e) => {
        await clearAll();
        initProviders();
    });
    // scroll
    util.scrollToText();
    // file content changes
    util.listenToFileChanges(classmap_file, artisan_file, lodash_1.debounce);
}
const initProviders = (0, lodash_1.debounce)(function () {
    providers.push(vscode_1.languages.registerDocumentLinkProvider(['php', 'blade'], new SharedLinkProvider_1.default()));
}, 250);
function clearAll() {
    return new Promise((res, rej) => {
        providers.map((e) => e.dispose());
        providers = [];
        setTimeout(() => {
            return res(true);
        }, 500);
    });
}
function deactivate() {
    clearAll();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map