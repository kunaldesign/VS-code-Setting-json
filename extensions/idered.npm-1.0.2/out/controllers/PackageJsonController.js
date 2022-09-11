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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJsonController = void 0;
const Controller_1 = require("foundation/Routing/Controller");
const vscode_1 = require("vscode");
const foundation_1 = require("foundation");
const ClientManager_1 = require("../clients/ClientManager");
const path_1 = require("path");
const fs = require("fs");
// import depcheck from "./unimported-fn";
class PackageJsonController extends Controller_1.Controller {
    getPackageJSONFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const packages = yield vscode_1.workspace.findFiles("**/package.json", "**/node_modules/**");
            return packages.map((item) => (0, path_1.relative)(vscode_1.workspace.workspaceFolders[0].uri.fsPath, item.fsPath));
        });
    }
    getInstalledPackages(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clientManager.getClient(data.packageJSON).getAllPackages();
        });
    }
    installPackages(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = data.packages
                .map((item) => {
                return item.version ? `${item.name}@${item.version}` : item.name;
            })
                .join(" ");
            this.clientManager.getClient(data.packageJSON).install({
                query,
                isDev: data.dev,
            });
            return {};
        });
    }
    updatePackages(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = data.packages
                .map((item) => {
                return item.name;
            })
                .join(" ");
            this.clientManager.getClient(data.packageJSON).update({ query });
            return {};
        });
    }
    removePackage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clientManager
                .getClient(data.packageJSON)
                .remove({ packages: data.packages });
            return {};
        });
    }
    // async runDepCheck(data: { packageJSON: string }) {
    //   const path = Uri.joinPath(
    //     workspace.workspaceFolders[0].uri,
    //     data.packageJSON
    //   ).fsPath;
    //   try {
    //     const result = await depcheck(dirname(path));
    //     return { status: "success", result };
    //   } catch (err) {
    //     return { status: "error" };
    //   }
    // }
    swapPackageType(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clientManager.getClient(data.packageJSON).swapType({
                packageName: data.name,
                isDev: data.dev,
                version: data.version,
            });
            return {};
        });
    }
    changeVersion(data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.clientManager.getClient(data.packageJSON).install({
                query: `${data.name}@${data.version}`,
            });
            if (data.originalVersion.startsWith("^")) {
                const path = vscode_1.Uri.joinPath(vscode_1.workspace.workspaceFolders[0].uri, data.packageJSON).fsPath;
                const packageJson = JSON.parse(fs.readFileSync(path, "utf8"));
                if ((_a = packageJson.dependencies) === null || _a === void 0 ? void 0 : _a[data.name]) {
                    packageJson.dependencies[data.name] = `^${data.version}`;
                }
                if ((_b = packageJson.devDependencies) === null || _b === void 0 ? void 0 : _b[data.name]) {
                    packageJson.devDependencies[data.name] = `^${data.version}`;
                }
                fs.writeFileSync(path, JSON.stringify(packageJson, null, 2));
            }
            return {};
        });
    }
    showUpdateConfirmation() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield vscode_1.window.showInformationMessage("You are about to update all packages to their latest versions based on the specified ranges. Are you sure you want to continue?", {
                modal: true,
            }, "Update all");
        });
    }
}
__decorate([
    (0, foundation_1.inject)(ClientManager_1.ClientManager),
    __metadata("design:type", ClientManager_1.ClientManager)
], PackageJsonController.prototype, "clientManager", void 0);
exports.PackageJsonController = PackageJsonController;
//# sourceMappingURL=PackageJsonController.js.map