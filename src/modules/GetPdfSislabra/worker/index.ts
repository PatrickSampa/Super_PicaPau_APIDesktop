'use strict';

/* const Bufferer = require('../bufferer/index'); */
import { Bufferer } from '../bufferer/index'
import parser from '../parser/index'
/* const { createReadStream } = require('fs'); */
import { createReadStream } from 'fs'

process.on('message', async (options: any) => {

  const { filenames }: any = options;
  const parse:any = new parser();

  const parseAndLog = async (buf: any) => console.log(await parse.parse(buf) + ',');

  const parsingQueue = filenames.reduce(async (result: any, filename: any) => {

    await result;

    return new Promise((resolve, reject) => {

      const reader = createReadStream(filename);
      const bufferer = new Bufferer({ onEnd: parseAndLog });
      console.log("indez do work")
      reader
        .pipe(bufferer)
        .once('finish', resolve)
        .once('error', reject)
    
    });
  
  }, true);

  try {
    await parsingQueue;
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

});
