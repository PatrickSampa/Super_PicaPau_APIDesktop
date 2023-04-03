'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const index_1 = require("./input/index");
(async function main() {
    if (cluster.isMaster) {
        const workerData = await (0, index_1.getTerminalInput)(numCPUs);
        for (let i = 0; i < workerData.length; i++) {
            const worker = cluster.fork();
            const params = { filenames: workerData[i] };
            worker.send(params);
        }
    }
    else {
        require('./worker/index');
    }
})();
//# sourceMappingURL=index.js.map