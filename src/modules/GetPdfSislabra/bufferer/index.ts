'use strict';

/* const { Writable } = require('stream'); */
import { Writable } from "stream";

export class Bufferer extends Writable {
  private chunks: any;
  private onEnd: any;
  constructor (options?: any) {
    console.log("indez do bufferer")
    super(options);
    this.chunks = [];
    this.onEnd = options.onEnd || undefined;

  }

  _write (chunk: any, encoding: any, callback:any) {

    this.chunks.push(chunk);
    callback();
  
  }

  async _final (callback: any) {

    const buffer = Buffer.concat(this.chunks);

    if (this.onEnd) {
      await this.onEnd(buffer);
    }

    callback();
  
  }

}


