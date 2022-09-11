'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineCounter = exports.Count = void 0;
class Count {
    constructor(code = 0, comment = 0, blank = 0) {
        this.code = code;
        this.comment = comment;
        this.blank = blank;
    }
    get total() { return this.code + this.comment + this.blank; }
    get isEmpty() { return (this.code === 0) && (this.comment === 0) && (this.blank === 0); }
    add(value) {
        this.code += value.code;
        this.comment += value.comment;
        this.blank += value.blank;
        return this;
    }
    sub(value) {
        this.code -= value.code;
        this.comment -= value.comment;
        this.blank -= value.blank;
        return this;
    }
}
exports.Count = Count;
;
const nextIndexOf = (str, searchValue, fromIndex = 0) => {
    const index = str.indexOf(searchValue, fromIndex);
    return (index >= 0) ? index + searchValue.length : index;
};
const findFirstOf = (str, searchStrings, position) => {
    let strIndex = Number.MAX_VALUE;
    let arrIndex = -1;
    searchStrings.forEach((s, ai) => {
        const si = str.indexOf(s, position);
        if (si >= 0 && strIndex > si) {
            strIndex = si;
            arrIndex = ai;
        }
    });
    return [strIndex, arrIndex];
};
const LineType = { Code: 0, Comment: 1, Blank: 2 };
class LineCounter {
    constructor(name, lineComments, blockComments, blockStrings) {
        this.name = name;
        this.lineComments = lineComments;
        this.blockComments = blockComments;
        this.blockStrings = blockStrings;
        this.blockCommentBegins = this.blockComments.map(b => b[0]);
        this.blockStringBegins = this.blockStrings.map(b => b[0]);
    }
    count(text) {
        let result = [0, 0, 0];
        let blockCommentEnd = '';
        let blockStringEnd = '';
        text.split(/\r\n|\r|\n/).map(line => line.trim()).forEach((line, lineIndex) => {
            let type = (blockCommentEnd.length > 0) ? LineType.Comment : (blockStringEnd.length > 0) ? LineType.Code : LineType.Blank;
            let i = 0;
            while (i < line.length) {
                if (blockCommentEnd.length > 0) {
                    // now in block comment
                    const index = nextIndexOf(line, blockCommentEnd, i);
                    if (index >= 0) {
                        blockCommentEnd = '';
                        i = index;
                    }
                    else {
                        break;
                    }
                }
                else if (blockStringEnd.length > 0) {
                    // now in block string (here document)
                    const index = nextIndexOf(line, blockStringEnd, i);
                    if (index >= 0) {
                        blockStringEnd = '';
                        i = index;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.lineComments.some(lc => line.startsWith(lc))) {
                        // now is line comment.
                        type = LineType.Comment;
                        break;
                    }
                    {
                        const [index, bi] = findFirstOf(line, this.blockCommentBegins, i);
                        if (bi >= 0) {
                            // start block comment
                            const range = this.blockComments[bi];
                            type = index === 0 ? LineType.Comment : LineType.Code;
                            blockCommentEnd = range[1];
                            i = index + range[0].length;
                            continue;
                        }
                    }
                    type = LineType.Code;
                    {
                        const [index, bi] = findFirstOf(line, this.blockStringBegins, i);
                        if (bi >= 0) {
                            // start block string
                            const range = this.blockStrings[bi];
                            blockStringEnd = range[1];
                            i = index + range[0].length;
                            continue;
                        }
                    }
                    break;
                }
            }
            result[type]++;
            // console.log(`${lineIndex+1} [${LineType[type]}]   ${line}`);
        });
        return new Count(result[LineType.Code], result[LineType.Comment], result[LineType.Blank]);
    }
}
exports.LineCounter = LineCounter;
//# sourceMappingURL=LineCounter.js.map