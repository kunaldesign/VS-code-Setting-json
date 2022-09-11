"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientManager = void 0;
const foundation_1 = require("foundation");
const fs_1 = require("fs");
const path_1 = require("path");
const vscode_1 = require("vscode");
const NpmClient_1 = require("./NpmClient");
const PnpmClient_1 = require("./PnpmClient");
const YarnClient_1 = require("./YarnClient");
let ClientManager = class ClientManager {
    getClient(packageJSON) {
        const uri = vscode_1.Uri.joinPath(vscode_1.workspace.workspaceFolders[0].uri, packageJSON);
        const dir = (0, path_1.dirname)(uri.fsPath);
        const yarnLockExists = (0, fs_1.existsSync)(`${dir}/yarn.lock`);
        const packageLockExists = (0, fs_1.existsSync)(`${dir}/package-lock.json`);
        const pnpmLockExists = (0, fs_1.existsSync)(`${dir}/pnpm-lock.yaml`);
        const configuredPackageManager = vscode_1.workspace
            .getConfiguration("iridium")
            .get("npm.packageManager");
        const client = yarnLockExists
            ? this.yarn
            : packageLockExists
                ? this.npm
                : pnpmLockExists
                    ? this.pnpm
                    : this[configuredPackageManager];
        return client.cwdFromUri(uri);
    }
};
__decorate([
    (0, foundation_1.inject)(NpmClient_1.NpmClient),
    __metadata("design:type", NpmClient_1.NpmClient)
], ClientManager.prototype, "npm", void 0);
__decorate([
    (0, foundation_1.inject)(YarnClient_1.YarnClient),
    __metadata("design:type", YarnClient_1.YarnClient)
], ClientManager.prototype, "yarn", void 0);
__decorate([
    (0, foundation_1.inject)(PnpmClient_1.PnpmClient),
    __metadata("design:type", PnpmClient_1.PnpmClient)
], ClientManager.prototype, "pnpm", void 0);
ClientManager = __decorate([
    (0, foundation_1.injectable)()
], ClientManager);
exports.ClientManager = ClientManager;
//# sourceMappingURL=ClientManager.js.map