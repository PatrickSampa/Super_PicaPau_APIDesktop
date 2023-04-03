'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../bufferer/index");
const index_2 = __importDefault(require("../parser/index"));
const fs_1 = require("fs");
process.on('message', async (options) => {
    const { filenames } = options;
    const parse = new index_2.default();
    const parseAndLog = async (buf) => console.log(await parse.parse(buf) + ',');
    const parsingQueue = filenames.reduce(async (result, filename) => {
        await result;
        return new Promise((resolve, reject) => {
            const reader = (0, fs_1.createReadStream)(filename);
            const bufferer = new index_1.Bufferer({ onEnd: parseAndLog });
            console.log("indez do work");
            reader
                .pipe(bufferer)
                .once('finish', resolve)
                .once('error', reject);
        });
    }, true);
    try {
        await parsingQueue;
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
//# sourceMappingURL=index.js.map