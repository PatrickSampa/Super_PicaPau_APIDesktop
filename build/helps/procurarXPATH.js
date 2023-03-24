"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTextInHTML = void 0;
const { JSDOM } = require('jsdom');
const xpath = require('xpath');
function findTextInHTML(html, text) {
    const dom = new JSDOM(html);
    const xpathExpression = `//*[text()[contains(.,'${text}')]]`;
    const nodes = xpath.select(xpathExpression, dom.window.document);
    let xpaths = [];
    for (let i = 0; i < nodes.length; i++) {
        xpaths.push(getNodeXPath(nodes[i], dom.window.document));
    }
    return xpaths;
}
exports.findTextInHTML = findTextInHTML;
function getNodeXPath(node, doc) {
    if (!node.parentNode)
        return '/';
    const idx = getElementIdx(node);
    return `${getNodeXPath(node.parentNode, doc)}/${node.nodeName.toLowerCase()}[${idx}]`;
}
function getElementIdx(element) {
    let count = 1;
    for (let sib = element.previousSibling; sib; sib = sib.previousSibling) {
        if (sib.nodeName === element.nodeName) {
            count++;
        }
    }
    return count;
}
//# sourceMappingURL=procurarXPATH.js.map