'use strict';
import { PdfReader } from 'pdfreader'
/* const { PdfReader } = require('pdfreader'); */
/* const parse = require('./parse.js'); */
import {parse} from './parse'

class Parser {
    private reader: any;
  constructor (options?: any) {

    this.reader = new PdfReader();

  }
  
  async parse (buffer: any) {
    console.log("index do parser: ")
    try {
      const data = await parse(buffer, this.reader);
      const outputString = JSON.stringify(data, null, 2);

      return outputString;
    } catch (err) {
      console.error(err);
    }

  }

}

export default Parser;

if (!module.parent) {
    require('./standalone.js');
  }