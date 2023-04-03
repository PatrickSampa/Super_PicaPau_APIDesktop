'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bufferer = void 0;
const stream_1 = require("stream");
class Bufferer extends stream_1.Writable {
    constructor(options) {
        console.log("indez do bufferer");
        super(options);
        this.chunks = [];
        this.onEnd = options.onEnd || undefined;
    }
    _write(chunk, encoding, callback) {
        this.chunks.push(chunk);
        callback();
    }
    async _final(callback) {
        const buffer = Buffer.concat(this.chunks);
        if (this.onEnd) {
            await this.onEnd(buffer);
        }
        callback();
    }
}
exports.Bufferer = Bufferer;
//# sourceMappingURL=index.js.map