/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/commands.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatFromCommand = void 0;
const vscode_1 = __importDefault(__webpack_require__("vscode"));
const runtimeConfig_1 = __webpack_require__("./src/runtimeConfig.ts");
const util_1 = __webpack_require__("./src/util.ts");
const blade_formatter_1 = __webpack_require__("blade-formatter");
const logger_1 = __webpack_require__("./src/logger.ts");
const vsctmModule = (0, util_1.getCoreNodeModule)("vscode-textmate");
const onigurumaModule = (0, util_1.getCoreNodeModule)("vscode-oniguruma");
const { Range, Position } = vscode_1.default;
const formatFromCommand = function (editor, edit) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const extConfig = vscode_1.default.workspace.getConfiguration("bladeFormatter.format");
            const runtimeConfig = (0, runtimeConfig_1.readRuntimeConfig)(editor.document.uri.fsPath);
            const options = Object.assign({ vsctm: vsctmModule, oniguruma: onigurumaModule, indentSize: extConfig.indentSize, wrapLineLength: extConfig.wrapLineLength, wrapAttributes: extConfig.wrapAttributes, useTabs: extConfig.useTabs, sortTailwindcssClasses: extConfig.sortTailwindcssClasses, sortHtmlAttributes: (_a = extConfig.sortHtmlAttributes) !== null && _a !== void 0 ? _a : 'none', noMultipleEmptyLines: extConfig.noMultipleEmptyLines }, runtimeConfig);
            const originalText = editor.document.getText();
            const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
            const range = new Range(new Position(0, 0), lastLine.range.end);
            const formatted = yield new blade_formatter_1.Formatter(options).formatContent(originalText);
            yield editor.edit((editBuilder) => {
                editBuilder.replace(range, formatted);
            });
        }
        catch (e) {
            const logger = new logger_1.Logger();
            logger.logError("Error formatting document", e);
        }
    });
};
exports.formatFromCommand = formatFromCommand;


/***/ }),

/***/ "./src/constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtensionConstants = void 0;
var ExtensionConstants;
(function (ExtensionConstants) {
    ExtensionConstants["extensionId"] = "shufo.vscode-blade-formatter";
    ExtensionConstants["firstActivationStorageKey"] = "firstActivation";
    ExtensionConstants["globalVersionKey"] = "vscode-blade-formatter-version";
    ExtensionConstants["displayName"] = "Laravel Blade Formatter";
    ExtensionConstants["formatCommandKey"] = "vscode-blade-formatter.format";
})(ExtensionConstants = exports.ExtensionConstants || (exports.ExtensionConstants = {}));


/***/ }),

/***/ "./src/extension.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode_1 = __importStar(__webpack_require__("vscode"));
const path_1 = __importDefault(__webpack_require__("path"));
const find_config_1 = __importDefault(__webpack_require__("find-config"));
const fs_1 = __importDefault(__webpack_require__("fs"));
const ignore_1 = __importDefault(__webpack_require__("ignore"));
const blade_formatter_1 = __webpack_require__("blade-formatter");
const extensionContext_1 = __webpack_require__("./src/extensionContext.ts");
const telemetry_1 = __webpack_require__("./src/telemetry.ts");
const runtimeConfig_1 = __webpack_require__("./src/runtimeConfig.ts");
const constants_1 = __webpack_require__("./src/constants.ts");
const messages_1 = __webpack_require__("./src/messages.ts");
const commands_1 = __webpack_require__("./src/commands.ts");
const util_1 = __webpack_require__("./src/util.ts");
const { Range, Position } = vscode_1.default;
const vsctmModule = (0, util_1.getCoreNodeModule)("vscode-textmate");
const onigurumaModule = (0, util_1.getCoreNodeModule)("vscode-oniguruma");
const KNOWN_ISSUES = "Open known Issues";
const REPORT_ISSUE = "Report Issue";
const knownIssuesUrl = "https://github.com/shufo/vscode-blade-formatter/issues";
const newIssueUrl = "https://github.com/shufo/vscode-blade-formatter/issues/new";
const WASM_ERROR_MESSAGE = "Must invoke loadWASM first.";
let wasmInitialized = false;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    showWelcomeMessage(context);
    (0, extensionContext_1.setExtensionContext)(context);
    telemetry_1.telemetry.send(telemetry_1.TelemetryEventNames.Startup);
    if (context.globalState.get(constants_1.ExtensionConstants.firstActivationStorageKey) === undefined) {
        telemetry_1.telemetry.send(telemetry_1.TelemetryEventNames.NewInstall);
        context.globalState.update(constants_1.ExtensionConstants.firstActivationStorageKey, false);
    }
    vscode_1.commands.registerTextEditorCommand(constants_1.ExtensionConstants.formatCommandKey, commands_1.formatFromCommand);
    context.subscriptions.push(vscode_1.default.languages.registerDocumentFormattingEditProvider("blade", {
        provideDocumentFormattingEdits(document, vscodeOpts) {
            var _a;
            if (shouldIgnore(document.uri.fsPath)) {
                return document;
            }
            const extConfig = vscode_1.default.workspace.getConfiguration("bladeFormatter.format");
            if (!wasmInitialized) {
                // onigurumaModule.initCalled = false;
                wasmInitialized = true;
            }
            const originalText = document.getText();
            const lastLine = document.lineAt(document.lineCount - 1);
            const range = new Range(new Position(0, 0), lastLine.range.end);
            if (!extConfig.enabled) {
                return [new vscode_1.default.TextEdit(range, originalText)];
            }
            const runtimeConfig = (0, runtimeConfig_1.readRuntimeConfig)(document.uri.fsPath);
            const options = Object.assign({ vsctm: vsctmModule, oniguruma: onigurumaModule, indentSize: extConfig.indentSize, wrapLineLength: extConfig.wrapLineLength, wrapAttributes: extConfig.wrapAttributes, useTabs: extConfig.useTabs, sortTailwindcssClasses: extConfig.sortTailwindcssClasses, sortHtmlAttributes: (_a = extConfig.sortHtmlAttributes) !== null && _a !== void 0 ? _a : 'none', noMultipleEmptyLines: extConfig.noMultipleEmptyLines }, runtimeConfig);
            const progressMessage = isLargeFile(document) ? messages_1.messages.largeFileFormattingMessage : messages_1.messages.formattingMessage;
            const statusBarItem = vscode_1.default.window.createStatusBarItem(vscode_1.default.StatusBarAlignment.Right, 1000);
            statusBarItem.text = `$(loading~spin) ${progressMessage}`;
            statusBarItem.show();
            setTimeout(() => {
                statusBarItem.dispose();
            }, 5000);
            return new Promise((resolve, reject) => {
                return new blade_formatter_1.Formatter(options)
                    .formatContent(originalText)
                    .then((text) => {
                    statusBarItem.dispose();
                    resolve([new vscode_1.default.TextEdit(range, text)]);
                })
                    .then(undefined, (err) => {
                    var _a;
                    statusBarItem.dispose();
                    if (err.message === WASM_ERROR_MESSAGE) {
                        return reject(err);
                    }
                    (_a = vscode_1.default.window) === null || _a === void 0 ? void 0 : _a.showErrorMessage(err.message, KNOWN_ISSUES, REPORT_ISSUE).then((selected) => {
                        if (selected === KNOWN_ISSUES) {
                            vscode_1.default.env.openExternal(vscode_1.default.Uri.parse(knownIssuesUrl));
                        }
                        if (selected === REPORT_ISSUE) {
                            vscode_1.default.env.openExternal(vscode_1.default.Uri.parse(newIssueUrl));
                        }
                    });
                    reject(err);
                });
            });
        },
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function shouldIgnore(filepath) {
    var _a, _b;
    const ignoreFilename = ".bladeignore";
    try {
        const ignoreFilePath = (0, find_config_1.default)(ignoreFilename, {
            cwd: path_1.default.dirname(filepath),
        });
        const ignoreFileContent = fs_1.default.readFileSync(ignoreFilePath).toString();
        const ig = (0, ignore_1.default)().add(ignoreFileContent);
        return (_b = (_a = vscode_1.default.workspace) === null || _a === void 0 ? void 0 : _a.workspaceFolders) === null || _b === void 0 ? void 0 : _b.find((folder) => {
            return ig.ignores(path_1.default.relative(folder.uri.fsPath, filepath));
        });
    }
    catch (err) {
        return false;
    }
}
function showWelcomeMessage(context) {
    var _a, _b;
    const extConfig = vscode_1.default.workspace.getConfiguration("bladeFormatter.misc");
    if (extConfig.dontShowNewVersionMessage) {
        return;
    }
    let message = null;
    const previousVersion = context.globalState.get(constants_1.ExtensionConstants.globalVersionKey);
    const currentVersion = (_b = (_a = vscode_1.default.extensions.getExtension(constants_1.ExtensionConstants.extensionId)) === null || _a === void 0 ? void 0 : _a.packageJSON) === null || _b === void 0 ? void 0 : _b.version;
    const previousVersionArray = previousVersion ? previousVersion.split('.').map((s) => Number(s)) : [0, 0, 0];
    const currentVersionArray = currentVersion.split('.').map((s) => Number(s));
    if (previousVersion === undefined || previousVersion.length === 0) {
        message = `Thanks for using ${constants_1.ExtensionConstants.displayName}.`;
    }
    else if (currentVersion !== previousVersion && (
    // patch update
    (previousVersionArray[0] === currentVersionArray[0] && previousVersionArray[1] === currentVersionArray[1] && previousVersionArray[2] < currentVersionArray[2]) ||
        // minor update
        (previousVersionArray[0] === currentVersionArray[0] && previousVersionArray[1] < currentVersionArray[1]) ||
        // major update
        (previousVersionArray[0] < currentVersionArray[0]))) {
        message = `${constants_1.ExtensionConstants.displayName} updated to ${currentVersion}.`;
    }
    if (message) {
        vscode_1.default.window.showInformationMessage(message, '⭐️ Star on Github', '🐞 Report Bug')
            .then(function (val) {
            if (val === '🐞 Report Bug') {
                vscode_1.default.env.openExternal(vscode_1.default.Uri.parse('https://github.com/shufo/vscode-blade-formatter/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc'));
            }
            else if (val === '⭐️ Star on Github') {
                vscode_1.default.env.openExternal(vscode_1.default.Uri.parse('https://github.com/shufo/vscode-blade-formatter'));
            }
        });
        context.globalState.update(constants_1.ExtensionConstants.globalVersionKey, currentVersion);
    }
}
function isLargeFile(document) {
    return document.lineCount > 1000;
}


/***/ }),

/***/ "./src/extensionContext.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asAbsolutePath = exports.getExtensionContext = exports.setExtensionContext = void 0;
const vscode_1 = __webpack_require__("vscode");
let extensionContext;
/**
 * Save a referece for this extension's context
 */
function setExtensionContext(context) {
    extensionContext = context;
}
exports.setExtensionContext = setExtensionContext;
/**
 * Return a reference for this extension's context
 */
function getExtensionContext() {
    return extensionContext;
}
exports.getExtensionContext = getExtensionContext;
/**
 * Transform relative path inside the extension folder
 * to absolute path.
 * @param relativePath relative path to the file
 * @returns Uri of the file
 */
function asAbsolutePath(relativePath) {
    return vscode_1.Uri.file(extensionContext.asAbsolutePath(relativePath));
}
exports.asAbsolutePath = asAbsolutePath;


/***/ }),

/***/ "./src/logger.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = void 0;
const vscode_1 = __webpack_require__("vscode");
class Logger {
    constructor() {
        this.outputChannel = vscode_1.window.createOutputChannel("BladeFormatter");
        this.logLevel = "INFO";
    }
    setOutputLevel(logLevel) {
        this.logLevel = logLevel;
    }
    /**
     * Append messages to the output channel and format it with a title
     *
     * @param message The message to append to the output channel
     */
    logDebug(message, data) {
        if (this.logLevel === "NONE" ||
            this.logLevel === "INFO" ||
            this.logLevel === "WARN" ||
            this.logLevel === "ERROR") {
            return;
        }
        this.logMessage(message, "DEBUG");
        if (data) {
            this.logObject(data);
        }
    }
    /**
     * Append messages to the output channel and format it with a title
     *
     * @param message The message to append to the output channel
     */
    logInfo(message, data) {
        if (this.logLevel === "NONE" ||
            this.logLevel === "WARN" ||
            this.logLevel === "ERROR") {
            return;
        }
        this.logMessage(message, "INFO");
        if (data) {
            this.logObject(data);
        }
    }
    /**
     * Append messages to the output channel and format it with a title
     *
     * @param message The message to append to the output channel
     */
    logWarning(message, data) {
        if (this.logLevel === "NONE" || this.logLevel === "ERROR") {
            return;
        }
        this.logMessage(message, "WARN");
        if (data) {
            this.logObject(data);
        }
    }
    logError(message, error) {
        if (this.logLevel === "NONE") {
            return;
        }
        this.logMessage(message, "ERROR");
        if (typeof error === "string") {
            // Errors as a string usually only happen with
            // plugins that don't return the expected error.
            this.outputChannel.appendLine(error);
        }
        else if (error instanceof Error) {
            if (error === null || error === void 0 ? void 0 : error.message) {
                this.logMessage(error.message, "ERROR");
            }
            if (error === null || error === void 0 ? void 0 : error.stack) {
                this.outputChannel.appendLine(error.stack);
            }
        }
        else if (error) {
            this.logObject(error);
        }
    }
    show() {
        this.outputChannel.show();
    }
    logObject(data) {
        const message = JSON.stringify(data, null, 2); // dont use prettier to keep it simple
        this.outputChannel.appendLine(message);
    }
    /**
     * Append messages to the output channel and format it with a title
     *
     * @param message The message to append to the output channel
     */
    logMessage(message, logLevel) {
        const title = new Date().toLocaleTimeString();
        this.outputChannel.appendLine(`["${logLevel}" - ${title}] ${message}`);
    }
}
exports.Logger = Logger;


/***/ }),

/***/ "./src/messages.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.messages = void 0;
exports.messages = {
    formattingMessage: 'Formatting...',
    largeFileFormattingMessage: 'Formatting large file...please wait for a second',
};


/***/ }),

/***/ "./src/runtimeConfig.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.readRuntimeConfig = void 0;
const find_config_1 = __importDefault(__webpack_require__("find-config"));
const path_1 = __importDefault(__webpack_require__("path"));
const fs_1 = __importDefault(__webpack_require__("fs"));
const jtd_1 = __importDefault(__webpack_require__("ajv/dist/jtd"));
const ajv = new jtd_1.default();
const configFileNames = [".bladeformatterrc.json", ".bladeformatterrc"];
function readRuntimeConfig(filePath) {
    const configFilePath = findConfigFile(filePath);
    if (configFilePath === null) {
        return undefined;
    }
    const configFileContent = fs_1.default.readFileSync(configFilePath).toString();
    const schema = {
        optionalProperties: {
            indentSize: { type: "int32" },
            wrapLineLength: { type: "int32" },
            wrapAttributes: {
                enum: [
                    'auto',
                    'force',
                    'force-aligned ',
                    'force-expand-multiline',
                    'aligned-multiple',
                    'preserve',
                    'preserve-aligned'
                ]
            },
            endWithNewline: { type: 'boolean' },
            useTabs: { type: 'boolean' },
            sortTailwindcssClasses: { type: 'boolean' },
            sortHtmlAttributes: { type: 'string' },
            noMultipleEmptyLines: { type: 'boolean' },
        },
        additionalProperties: true,
    };
    const parse = ajv.compileParser(schema);
    return parse(configFileContent);
}
exports.readRuntimeConfig = readRuntimeConfig;
function findConfigFile(filePath) {
    for (let i = 0; i < configFileNames.length; i++) {
        const result = (0, find_config_1.default)(configFileNames[i], {
            cwd: path_1.default.dirname(filePath),
            home: false,
        });
        if (result) {
            return result;
        }
    }
    return null;
}


/***/ }),

/***/ "./src/telemetry.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.telemetry = exports.TelemetryEventNames = void 0;
const vscode_1 = __importDefault(__webpack_require__("vscode"));
const vscode_extension_telemetry_1 = __importDefault(__webpack_require__("vscode-extension-telemetry"));
const extensionContext_1 = __webpack_require__("./src/extensionContext.ts");
var TelemetryEventNames;
(function (TelemetryEventNames) {
    /**
     * Extension startup event.
     */
    TelemetryEventNames["Startup"] = "STARTUP";
    /**
     * First ever extension activation.
     */
    TelemetryEventNames["NewInstall"] = "NEW_INSTALL";
})(TelemetryEventNames = exports.TelemetryEventNames || (exports.TelemetryEventNames = {}));
const extensionId = "shufo.vscode-blade-formatter";
class Telemetry {
    constructor(extensionVersion) {
        // set your APP_INSIGHT_INSTRUMENT_KEY to `.env` file
        const key = "7374e5e8-42df-4610-a3d9-99e0338f9037";
        this.reporter = new vscode_extension_telemetry_1.default(extensionId, extensionVersion, key);
    }
    /**
     * Check if it's allowed to send the telemetry.
     */
    canSend() {
        // Don't send telemetry when developing or testing the extension
        if ((0, extensionContext_1.getExtensionContext)().extensionMode !== vscode_1.default.ExtensionMode.Production) {
            return false;
        }
        // Don't send telemetry when user disabled it in Settings
        if (!vscode_1.default.env.isTelemetryEnabled) {
            return false;
        }
        return true;
    }
    /**
     * Send custom events.
     *
     * @param eventName sent message title
     * @param payload custom properties to add to the message
     */
    send(eventName, payload) {
        if (!this.canSend()) {
            return;
        }
        // @ts-ignore
        this.reporter.sendTelemetryEvent(eventName, payload);
    }
    /**
     * Send caught or uncaught errors.
     *
     * @param eventName sent message title
     * @param error error object of the uncaught exception
     */
    sendError(eventName, error) {
        if (!this.canSend()) {
            return;
        }
        if (error) {
            this.reporter.sendTelemetryException(error, {
                name: eventName,
            });
        }
        else {
            this.reporter.sendTelemetryEvent(eventName);
        }
    }
    dispose() {
        this.reporter.dispose();
    }
}
function getExtensionVersion() {
    var _a;
    return ((_a = vscode_1.default.extensions.getExtension(extensionId)) === null || _a === void 0 ? void 0 : _a.packageJSON.version) || 'unknown version';
}
/**
 * Methods to report telemetry over Application Insights (Exceptions or Custom Events).
 */
exports.telemetry = new Telemetry(getExtensionVersion());


/***/ }),

/***/ "./src/util.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCoreNodeModule = void 0;
const vscode_1 = __importDefault(__webpack_require__("vscode"));
/**
 * Returns a node module installed with VSCode, or null if it fails.
 */
function getCoreNodeModule(moduleName) {
    try {
        // @ts-ignore
        return require(`${vscode_1.default.env.appRoot}/node_modules.asar/${moduleName}`);
    }
    catch (err) {
    }
    try {
        // @ts-ignore
        return require(`${vscode_1.default.env.appRoot}/node_modules/${moduleName}`);
    }
    catch (err) {
    }
    return null;
}
exports.getCoreNodeModule = getCoreNodeModule;


/***/ }),

/***/ "ajv/dist/jtd":
/***/ ((module) => {

module.exports = require("ajv/dist/jtd");

/***/ }),

/***/ "blade-formatter":
/***/ ((module) => {

module.exports = require("blade-formatter");

/***/ }),

/***/ "find-config":
/***/ ((module) => {

module.exports = require("find-config");

/***/ }),

/***/ "ignore":
/***/ ((module) => {

module.exports = require("ignore");

/***/ }),

/***/ "vscode":
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),

/***/ "vscode-extension-telemetry":
/***/ ((module) => {

module.exports = require("vscode-extension-telemetry");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extension.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map