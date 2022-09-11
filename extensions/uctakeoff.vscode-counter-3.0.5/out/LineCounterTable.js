'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineCounterTable = void 0;
const path = require("path");
const minimatch = require("minimatch");
const LineCounter_1 = require("./LineCounter");
const uniqueLanguageConf = (conf) => {
    // console.log(`1langExtensions : `, conf);
    conf.aliases = [...new Set(conf.aliases)];
    conf.filenames = [...new Set(conf.filenames)];
    conf.extensions = [...new Set(conf.extensions)];
    conf.lineComments = [...new Set(conf.lineComments)];
    conf.blockComments = [...new Map(conf.blockComments)];
    conf.blockStrings = [...new Map(conf.blockStrings)];
    // console.log(`2langExtensions : `, conf);
};
class LineCounterTable {
    constructor(langExtensions, associations) {
        this.langExtensions = langExtensions;
        this.associations = associations;
        this.langIdTable = new Map();
        this.aliasTable = new Map();
        this.fileextRules = new Map();
        this.filenameRules = new Map();
        this.entries = () => this.langExtensions;
        // log(`associations : ${this.associations.length}\n[${this.associations.join("],[")}]`);
        this.langExtensions.forEach(v => uniqueLanguageConf(v));
        langExtensions.forEach((lang, id) => {
            const langName = lang.aliases.length > 0 ? lang.aliases[0] : id;
            const lineCounter = new LineCounter_1.LineCounter(langName, lang.lineComments, lang.blockComments, lang.blockStrings);
            lang.aliases.forEach(v => this.aliasTable.set(v, lineCounter));
            lang.extensions.forEach(v => this.fileextRules.set(v.startsWith('.') ? v : `.${v}`, lineCounter));
            lang.filenames.forEach(v => this.filenameRules.set(v, lineCounter));
        });
    }
    getCounter(filePath, langId) {
        // priority
        return this.getByAssociations(filePath)
            || this.filenameRules.get(path.basename(filePath))
            || this.getById(langId)
            || this.fileextRules.get(filePath)
            || this.fileextRules.get(path.extname(filePath));
    }
    getById(langId) {
        return !langId ? undefined : (this.langIdTable.get(langId) || this.aliasTable.get(langId));
    }
    getByAssociations(filePath) {
        const patType = this.associations.find(([pattern,]) => minimatch(filePath, pattern, { matchBase: true }));
        // log(`## ${filePath}: ${patType}`);
        return (patType !== undefined) ? this.getById(patType[1]) : undefined;
    }
}
exports.LineCounterTable = LineCounterTable;
//# sourceMappingURL=LineCounterTable.js.map