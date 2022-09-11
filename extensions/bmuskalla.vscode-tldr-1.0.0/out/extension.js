"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const TldrRepository_1 = require("./TldrRepository");
const fetchers_1 = require("./fetchers");
function activate(context) {
    let fetcher = new fetchers_1.CachingFetcher(context.globalState, new fetchers_1.GithubFetcher());
    let repository = new TldrRepository_1.TldrRepository(fetcher);
    let provider = newTldrHoverProvider(repository);
    let supportedLanguageModes = [
        "dockerfile",
        "makefile",
        "powershell",
        "shellscript",
        "bat"
    ];
    registerHoverWithSupportedLanguages(context, supportedLanguageModes, provider);
}
exports.activate = activate;
function newTldrHoverProvider(repository) {
    return {
        provideHover(document, position, token) {
            let currentTokenRange = document.getWordRangeAtPosition(position);
            if (currentTokenRange !== undefined && currentTokenRange.isSingleLine) {
                let currentToken = document.getText(currentTokenRange);
                const pageMarkdown = repository.getMarkdown(currentToken);
                return pageMarkdown.then(markdown => new vscode.Hover(markdown), rejected => null);
            }
        }
    };
}
function registerHoverWithSupportedLanguages(context, supportedEditors, provider) {
    supportedEditors.forEach(lang => {
        const selectors = [
            { scheme: "untitled", language: lang },
            { scheme: "file", language: lang }
        ];
        let disposable = vscode.languages.registerHoverProvider(selectors, provider);
        context.subscriptions.push(disposable);
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map