'use strict';

/* const { PdfReader } = require('pdfreader'); */
import { PdfReader } from 'pdfreader'

function readPDFPages (buffer: any, reader=(new PdfReader())) {
  console.log("parser do parser: ")
  return new Promise((resolve, reject) => {
    let pages: any = [];
    reader.parseBuffer(buffer, (err: any, item: any) => {

      if (err)
        reject(err)

      else if (!item)
        resolve(pages);

      else if (item.page)
        pages.push({});

      else if (item.text) {
        const row = pages[pages.length-1][item.y] || [];
        row.push(item.text);
        pages[pages.length-1][item.y] = row;
      }

    });
  });

}

function parseToddPDF (pages: any) {
  console.log("parser do parser: ")
  const page = pages[0]; // We know there's only going to be one page

  // Declarative map of PDF data that we expect, based on Todd's structure
  const fields: any = {
    reqID: { row: '5.185', index: 0 },
    date: { row: '4.329', index: 0 },
    sku: { row: '12.235', index: 1 },
    name: { row: '13.466', index: 1 },
    foodGrade: { row: '14.698', index: 1 },
    unitPrice: { row: '15.928999999999998', index: 1 },
    location: { row: '17.16', index: 1 },
  };

  const data: any = {};

  // Assign the page data to an object we can return, as per
  // our field specification
  Object.keys(fields)
    .forEach((key) => {

      const field = fields[key];
      const val = page[field.row][field.index];

      // We don't want to lose leading zeros here, and can trust
      // any backend / data handling to worry about that. This is
      // why we don't coerce to Number.
      data[key] = val;

    });

  // Manually fixing up some text fields so theyre usable
  data.reqID = data.reqID.slice('Requsition ID: '.length);
  data.date = data.date.slice('Date: '.length);

  return data;

}

export async function parse (buf: any, reader: any) {

    const data = await readPDFPages(buf, reader);
    //console.log({'beforeParse': data});
    /* const parsedData = parseToddPDF(data);   */
    return data;
    /* return parsedData; */

};
