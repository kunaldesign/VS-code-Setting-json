"use strict";
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
exports.ConfigController = void 0;
const Controller_1 = require("foundation/Routing/Controller");
const vscode_1 = require("vscode");
class ConfigController extends Controller_1.Controller {
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = vscode_1.workspace.getConfiguration("iridium.npm");
            return {
                showAnalyzeTab: config.get("showAnalyzeTab"),
                showProTab: config.get("showProTab"),
                showResultDescription: config.get("showResultDescription"),
                excludeVersions: config.get("excludeVersions"),
                showAlgoliaInfo: config.get("showAlgoliaInfo"),
                showShortcuts: config.get("showShortcuts"),
                maxNumberOfResults: config.get("maxNumberOfResults"),
            };
        });
    }
}
exports.ConfigController = ConfigController;
//# sourceMappingURL=ConfigController.js.map