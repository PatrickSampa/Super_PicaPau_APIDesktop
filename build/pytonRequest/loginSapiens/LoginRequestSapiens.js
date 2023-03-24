"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLoginSapiens = void 0;
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = require("node-html-parser");
const RequestHeaders_1 = require("../../sapiensOperations/resquest/RequestHeaders");
const RequestHeadersLoginCheck_1 = require("../../sapiensOperations/resquest/RequestHeadersLoginCheck");
var querystring = require('querystring');
class RequestLoginSapiens {
    constructor(login) {
        this.login = login;
        this.urlSapiens = 'https://sapiens.agu.gov.br/';
        this.extesionUrlSapiens_loginCheck = 'login_check';
        this.extesionUrlSapiens_login = 'login';
        this.sessao = axios_1.default.create({ baseURL: this.urlSapiens });
        this.requestHeaders = new RequestHeaders_1.RequestHeaders();
    }
    async handle() {
        const requestHeadersLogingCheck = new RequestHeadersLoginCheck_1.RequestHeadersLogingCheck();
        var cookie;
        let headers = await this.getInicialToken();
        this.token = headers.token;
        cookie = (await this.getCookie(headers.arrayCookie));
        this.headers = requestHeadersLogingCheck.execute(cookie);
        cookie = await this.getCookie(await this.getLoginCookies());
        return cookie;
    }
    async getInicialToken() {
        const getSapiensExternalPage = await this.sessao.get(`${this.extesionUrlSapiens_login}`);
        const htmlPageLogin = getSapiensExternalPage.data;
        const root = (0, node_html_parser_1.parse)(htmlPageLogin);
        const token = root.querySelector('input').getAttribute('value');
        return { token, arrayCookie: getSapiensExternalPage.headers["set-cookie"] };
    }
    async getLoginCookies() {
        const dictPost = {
            "_csrf_token": this.token,
            "_username": `${this.login.cpf}`,
            "_password": `${this.login.senha}`,
            "_submit": 'Login',
        };
        console.log(querystring.stringify(dictPost));
        const request = await this.sessao.post(`${this.extesionUrlSapiens_loginCheck}`, (dictPost), { headers: this.headers });
        const cookiesLogado = request.headers["set-cookie"];
        return cookiesLogado;
    }
    async getCookie(Arraycookie) {
        let cookie1;
        let cookie2;
        if (Arraycookie.length != 2) {
            cookie1 = Arraycookie[0].split(';')[0];
        }
        else {
            cookie1 = Arraycookie[0].split(';')[0];
            cookie2 = Arraycookie[1].split(';')[0];
        }
        return cookie1 + "; " + cookie2;
    }
}
exports.RequestLoginSapiens = RequestLoginSapiens;
//# sourceMappingURL=LoginRequestSapiens.js.map