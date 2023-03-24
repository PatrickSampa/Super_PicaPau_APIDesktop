"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXPathText = void 0;
const { JSDOM } = require('jsdom');
const xpath = require('xpath');
function getXPathText(html, xpathExpression) {
    const dom = html;
    var XPathResult = xpath.XPathResult;
    const nodes = dom.window.document.evaluate(xpathExpression, dom.window.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const textoDoXpathNaoExiste = nodes.singleNodeValue == null;
    if (textoDoXpathNaoExiste) {
        return null;
    }
    return nodes.singleNodeValue.textContent;
}
exports.getXPathText = getXPathText;
//# sourceMappingURL=GetTextoPorXPATH.js.map