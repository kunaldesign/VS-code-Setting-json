'use strict';
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
exports.activate = void 0;
const vscode_1 = require("vscode");
function activate(context) {
    const triggers = ['{}', '!', '-', '{'];
    const expressions = [
        /({{(?!\s|-))(.*?)(}})/,
        /({!!(?!\s))(.*?)?(}?)/,
        /({{[\s]?--)(.*?)?(}})/
    ];
    const spacer = new Spacer();
    let tagType = -1;
    context.subscriptions.push(vscode_1.workspace.onDidChangeTextDocument((e) => __awaiter(this, void 0, void 0, function* () {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let ranges = [];
        let offsets = [];
        // changes (per line) come in right-to-left when we need them left-to-right
        e.contentChanges
            .slice()
            .reverse()
            .forEach(change => {
            if (triggers.indexOf(change.text) !== -1) {
                if (!offsets[change.range.start.line]) {
                    offsets[change.range.start.line] = 0;
                }
                let start = change.range.start.translate(0, offsets[change.range.start.line] -
                    spacer.charsForChange(e.document, change));
                let lineEnd = e.document.lineAt(start.line).range.end;
                for (let i = 0; i < expressions.length; i++) {
                    // if we typed a - or a !, don't consider the "double" tag type
                    if (i === spacer.TAG_DOUBLE &&
                        ['-', '!'].indexOf(change.text) !== -1) {
                        continue;
                    }
                    // Only look at unescaped tags if we need to
                    if (i === spacer.TAG_UNESCAPED && change.text !== '!') {
                        continue;
                    }
                    // Only look at unescaped tags if we need to
                    if (i === spacer.TAG_COMMENT && change.text !== '-') {
                        continue;
                    }
                    let tag = expressions[i].exec(e.document.getText(new vscode_1.Range(start, lineEnd)));
                    if (tag) {
                        tagType = i;
                        ranges.push(new vscode_1.Range(start, start.translate(0, tag[0].length)));
                        offsets[start.line] += tag[1].length;
                    }
                }
            }
        });
        if (ranges.length > 0) {
            yield spacer.replace(editor, tagType, ranges);
            try {
                yield vscode_1.commands.executeCommand('extension.vim_escape');
                yield vscode_1.commands.executeCommand("extension.vim_insert");
            }
            catch (error) { }
            ranges = [];
            tagType = -1;
        }
    })));
}
exports.activate = activate;
class Spacer {
    constructor() {
        this.TAG_DOUBLE = 0;
        this.TAG_UNESCAPED = 1;
        this.TAG_COMMENT = 2;
    }
    charsForChange(doc, change) {
        if (change.text === '!') {
            return 2;
        }
        else if (change.text === '-') {
            let textRange = doc.getText(new vscode_1.Range(change.range.start.translate(0, -2), change.range.start.translate(0, -1)));
            if (textRange === ' ') {
                return 4;
            }
            return 3;
        }
        return 1;
    }
    replace(editor, tagType, ranges) {
        if (tagType === this.TAG_DOUBLE) {
            return editor.insertSnippet(new vscode_1.SnippetString('{{ ${1:${TM_SELECTED_TEXT/[{}]//g}} }}$0'), ranges);
        }
        else if (tagType === this.TAG_UNESCAPED) {
            return editor.insertSnippet(new vscode_1.SnippetString('{!! ${1:${TM_SELECTED_TEXT/[{} !]//g}} !!}$0'), ranges);
        }
        else if (tagType === this.TAG_COMMENT) {
            return editor.insertSnippet(new vscode_1.SnippetString('{{-- ${1:${TM_SELECTED_TEXT/(--)|[{} ]//g}} --}}$0'), ranges);
        }
    }
}
//# sourceMappingURL=extension.js.map