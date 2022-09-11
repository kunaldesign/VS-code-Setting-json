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
const simple_git_1 = require("simple-git");
const path = require("path");
const process_js_1 = require("unimported/dist/process.js");
const traverse_js_1 = require("unimported/dist/traverse.js");
const cache_js_1 = require("unimported/dist/cache.js");
const fs = require("unimported/dist/fs.js");
const config_js_1 = require("unimported/dist/config.js");
const meta = require("unimported/dist/meta.js");
function unimported(cwd, args = {}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        cwd = path.resolve(cwd);
        const pkgPath = path.join(cwd, "package.json");
        const hasPkg = yield fs.exists(pkgPath);
        if (!hasPkg) {
            throw new Error(`No package.json found in ${cwd}`);
        }
        // FIXME:
        process.chdir(path.dirname(pkgPath));
        (0, config_js_1.__clearCachedConfig)();
        const config = yield (0, config_js_1.getConfig)(args);
        const [dependencies, peerDependencies] = yield Promise.all([
            meta.getDependencies(cwd),
            meta.getPeerDependencies(cwd),
        ]);
        const moduleDirectory = (_a = config.moduleDirectory) !== null && _a !== void 0 ? _a : ["node_modules"];
        const context = Object.assign(Object.assign({ dependencies,
            peerDependencies,
            config,
            moduleDirectory }, args), { cwd });
        if (args.ignoreUntracked) {
            const git = (0, simple_git_1.default)({ baseDir: context.cwd });
            const status = yield git.status();
            config.ignorePatterns.push(...status.not_added.map((file) => path.resolve(file)));
        }
        const traverseResult = (0, traverse_js_1.getResultObject)();
        for (const entry of config.entryFiles) {
            const traverseConfig = {
                extensions: entry.extensions,
                // resolve full path of aliases
                aliases: yield meta.getAliases(entry),
                cacheId: args.cache ? (0, cache_js_1.getCacheIdentity)(entry) : undefined,
                flow: config.flow,
                moduleDirectory,
                preset: config.preset,
                dependencies,
            };
            // we can't use the third argument here, to keep feeding to traverseResult
            // as that would break the import alias overrides. A client-entry file
            // can resolve `create-api` as `create-api-client.js` while server-entry
            // would resolve `create-api` to `create-api-server`. Sharing the subresult
            // between the initial and retry attempt, would make it fail cache recovery
            const subResult = yield (0, traverse_js_1.traverse)(path.resolve(entry.file), traverseConfig).catch((err) => {
                if (err instanceof cache_js_1.InvalidCacheError) {
                    (0, cache_js_1.purgeCache)();
                    // Retry once after invalid cache case.
                    return (0, traverse_js_1.traverse)(path.resolve(entry.file), traverseConfig);
                }
                else {
                    throw err;
                }
            });
            subResult.files = new Map([...subResult.files].sort());
            // and that's why we need to merge manually
            subResult.modules.forEach((module) => {
                traverseResult.modules.add(module);
            });
            subResult.unresolved.forEach((unresolved) => {
                traverseResult.unresolved.add(unresolved);
            });
            for (const [key, stat] of subResult.files) {
                const prev = traverseResult.files.get(key);
                if (!prev) {
                    traverseResult.files.set(key, stat);
                    continue;
                }
                const added = new Set(prev.imports.map((x) => x.path));
                for (const file of stat.imports) {
                    if (!added.has(file.path)) {
                        prev.imports.push(file);
                        added.add(file.path);
                    }
                }
            }
        }
        const baseUrl = (yield fs.exists("src", cwd)) ? path.join(cwd, "src") : cwd;
        const files = yield fs.list("**/*", baseUrl, {
            extensions: config.extensions,
            ignore: config.ignorePatterns,
        });
        const normalizedFiles = files.map((path) => path.replace(/\\/g, "/"));
        const result = yield (0, process_js_1.processResults)(normalizedFiles, traverseResult, context);
        return result;
    });
}
exports.default = unimported;
//# sourceMappingURL=unimported-fn.js.map