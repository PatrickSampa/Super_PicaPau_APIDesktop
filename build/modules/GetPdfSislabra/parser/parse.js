'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const pdfreader_1 = require("pdfreader");
function readPDFPages(buffer, reader = (new pdfreader_1.PdfReader())) {
    console.log("parser do parser: ");
    return new Promise((resolve, reject) => {
        let pages = [];
        reader.parseBuffer(buffer, (err, item) => {
            if (err)
                reject(err);
            else if (!item)
                resolve(pages);
            else if (item.page)
                pages.push({});
            else if (item.text) {
                const row = pages[pages.length - 1][item.y] || [];
                row.push(item.text);
                pages[pages.length - 1][item.y] = row;
            }
        });
    });
}
function parseToddPDF(pages) {
    console.log("parser do parser: ");
    const page = pages[0];
    const fields = {
        reqID: { row: '5.185', index: 0 },
        date: { row: '4.329', index: 0 },
        sku: { row: '12.235', index: 1 },
        name: { row: '13.466', index: 1 },
        foodGrade: { row: '14.698', index: 1 },
        unitPrice: { row: '15.928999999999998', index: 1 },
        location: { row: '17.16', index: 1 },
    };
    const data = {};
    Object.keys(fields)
        .forEach((key) => {
        const field = fields[key];
        const val = page[field.row][field.index];
        data[key] = val;
    });
    data.reqID = data.reqID.slice('Requsition ID: '.length);
    data.date = data.date.slice('Date: '.length);
    return data;
}
async function parse(buf, reader) {
    const data = await readPDFPages(buf, reader);
    return data;
}
exports.parse = parse;
;
//# sourceMappingURL=parse.js.map