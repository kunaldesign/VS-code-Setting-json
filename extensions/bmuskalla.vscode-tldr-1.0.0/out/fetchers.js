"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
class CachingFetcher {
    constructor(memento, delegate) {
        this.delegate = delegate;
        this.memento = memento;
    }
    fetch(command) {
        const cacheKey = CachingFetcher.cacheKeyPrefix + command.command;
        let cachedPage = this.memento.get(cacheKey);
        if (cachedPage === undefined) {
            return this.delegate.fetch(command).then(page => {
                this.memento.update(cacheKey, page);
                return page;
            });
        }
        return Promise.resolve(String(cachedPage));
    }
}
CachingFetcher.cacheKeyPrefix = "tldrfetcher.cache.";
exports.CachingFetcher = CachingFetcher;
class GithubFetcher {
    constructor() {
        this.baseUrl = "https://raw.githubusercontent.com/tldr-pages/tldr/master/pages/";
    }
    fetch(page) {
        let url = this.baseUrl + page.platform + "/" + page.command + ".md";
        let content = fetch(url)
            .then((response) => response.text())
            .then((text) => text);
        return content;
    }
}
exports.GithubFetcher = GithubFetcher;
//# sourceMappingURL=fetchers.js.map