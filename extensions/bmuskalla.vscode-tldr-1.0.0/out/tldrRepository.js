"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class TldrPage {
    constructor(platform, command) {
        this.platform = platform;
        this.command = command;
    }
    toString() {
        return this.platform + "/" + this.command;
    }
}
exports.TldrPage = TldrPage;
var TldrPlatform;
(function (TldrPlatform) {
    TldrPlatform["Common"] = "common";
    TldrPlatform["Linux"] = "linux";
    TldrPlatform["OSX"] = "osx";
    TldrPlatform["SunOS"] = "sunos";
    TldrPlatform["Windows"] = "windows";
})(TldrPlatform = exports.TldrPlatform || (exports.TldrPlatform = {}));
const fetch = require("isomorphic-fetch");
class TldrIndex {
    constructor() {
        this.pages = [];
        this.baseUrl = "https://api.github.com/repos/tldr-pages/tldr/contents/pages/";
        this.initializeData();
    }
    initializeData() {
        return __awaiter(this, void 0, void 0, function* () {
            Object.values(TldrPlatform).forEach((platform) => __awaiter(this, void 0, void 0, function* () {
                yield this.fetchPageIndex(platform);
            }));
        });
    }
    fetchPageIndex(platformToFetch) {
        return fetch(this.baseUrl + platformToFetch)
            .then((response) => response.json())
            .then((data) => {
            let doc;
            for (doc of data) {
                let commandName = doc.name.split(".")[0];
                let page = new TldrPage(platformToFetch, commandName);
                this.pages.push(page);
            }
        });
    }
    isAvailable(command) {
        return this.pages.filter((p) => p.command === command)[0];
    }
}
class TldrRepository {
    constructor(fetcher) {
        this.fetcher = fetcher;
        this.index = new TldrIndex();
    }
    getMarkdown(command) {
        let page = this.index.isAvailable(command);
        if (page) {
            return this.fetcher
                .fetch(page)
                .then(text => new vscode_1.MarkdownString(this.format(text)));
        }
        return Promise.reject(new vscode_1.MarkdownString("not available"));
    }
    format(contents) {
        contents = contents.replace("\n> ", "\n");
        let headline = contents.indexOf("\n");
        return contents.substring(headline);
    }
}
exports.TldrRepository = TldrRepository;
//# sourceMappingURL=TldrRepository.js.map